import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Camera, Activity, Droplets, Sun, Leaf, 
  AlertTriangle, CheckCircle2, RefreshCw, Volume2, 
  BarChart3, Sprout, TrendingUp, MapPin, ThermometerSun
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// --- Types ---
interface RankedCrop {
  name: string;
  nameHi: string;
  matchScore: number;
  waterNeed: string;
  duration: string;
  expectedProfit: number;
  expectedProfitHi: string;
}

interface AnalysisResult {
  soilScore: number;
  moistureLevel: 'Low' | 'Medium' | 'High';
  vegetationHealth: 'Poor' | 'Fair' | 'Good';
  topCrops: RankedCrop[];
  risks: { type: string; level: 'Low' | 'Medium' | 'High'; labelHi: string }[];
  tips: { en: string; hi: string }[];
  fertilizerRec: string;
  soilType: string;
  seasonPrediction: string;
  seasonPredictionHi: string;
}

// --- Component ---
const FarmAnalytics = () => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';
  
  const [appState, setAppState] = useState<'splash' | 'upload' | 'analyzing' | 'results'>('splash');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [district, setDistrict] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Phase 1: Splash Screen
  useEffect(() => {
    if (appState === 'splash') {
      const timer = setTimeout(() => {
        setAppState('upload');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error(isHi ? 'फ़ाइल बहुत बड़ी है (अधिकतम 10MB)' : 'File too large (Max 10MB)');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run Analysis Engine
  const runAnalysis = async () => {
    if (!selectedImage) return;
    setAppState('analyzing');

    try {
      // 1. Image Color Analysis via Canvas
      const img = new Image();
      img.src = selectedImage;
      await new Promise((resolve) => { img.onload = resolve; });

      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Canvas not found');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Context not found');

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      const pixelCount = data.length / 4;
      r = r / pixelCount;
      g = g / pixelCount;
      b = b / pixelCount;

      // Basic heuristic logic
      let moistureLevel: 'Low' | 'Medium' | 'High' = 'Medium';
      let vegHealth: 'Poor' | 'Fair' | 'Good' = 'Fair';
      let soilScore = 65;
      let soilType = 'Loamy Soil';

      if (g > r && g > b) {
        vegHealth = 'Good';
        moistureLevel = 'High';
        soilScore = Math.min(100, soilScore + 25);
      } else if (r > g && r > b) {
        vegHealth = 'Poor';
        moistureLevel = 'Low';
        soilScore = Math.max(0, soilScore - 20);
        soilType = 'Sandy or Red Soil';
      } else if (r > 150 && g > 150 && b < 100) {
        vegHealth = 'Fair';
        soilScore = 70;
        soilType = 'Alluvial Soil';
      }

      // 2. Weather Integration (Optional)
      let temp = 28;
      let rain = 0;
      if (district) {
        try {
          const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(district + ', India')}&format=json&limit=1`);
          if (Array.isArray(geoRes.data) && geoRes.data.length > 0 && geoRes.data[0].lat) {
            const { lat, lon } = geoRes.data[0];
            const wx = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation`);
            temp = wx.data.current.temperature_2m;
            rain = wx.data.current.precipitation;
          }
        } catch (e) {
          console.warn("Weather fetch failed, using defaults");
        }
      }

      // Adjust score based on weather
      if (temp > 35 && moistureLevel === 'Low') {
        soilScore -= 10;
      }
      if (rain > 10) {
        moistureLevel = 'High';
      }

      // 3. Dynamic Crop Selection based on conditions
      const cropDatabase = [
        { name: 'Wheat', nameHi: 'गेहूं', baseScore: 85, idealMoisture: 'Medium', idealTemp: [15, 25], duration: '120 days', profit: 45000 },
        { name: 'Rice (Paddy)', nameHi: 'चावल (धान)', baseScore: 88, idealMoisture: 'High', idealTemp: [22, 32], duration: '140 days', profit: 55000 },
        { name: 'Maize', nameHi: 'मक्का', baseScore: 80, idealMoisture: 'Medium', idealTemp: [20, 30], duration: '100 days', profit: 35000 },
        { name: 'Mustard', nameHi: 'सरसों', baseScore: 78, idealMoisture: 'Low', idealTemp: [10, 20], duration: '110 days', profit: 30000 },
        { name: 'Millets (Bajra)', nameHi: 'बाजरा', baseScore: 75, idealMoisture: 'Low', idealTemp: [25, 35], duration: '80 days', profit: 25000 },
        { name: 'Sugarcane', nameHi: 'गन्ना', baseScore: 90, idealMoisture: 'High', idealTemp: [25, 35], duration: '300 days', profit: 80000 },
        { name: 'Cotton', nameHi: 'कपास', baseScore: 82, idealMoisture: 'Medium', idealTemp: [25, 35], duration: '150 days', profit: 60000 },
        { name: 'Soybean', nameHi: 'सोयाबीन', baseScore: 80, idealMoisture: 'Medium', idealTemp: [20, 30], duration: '100 days', profit: 40000 },
        { name: 'Jowar', nameHi: 'ज्वार', baseScore: 75, idealMoisture: 'Low', idealTemp: [25, 35], duration: '110 days', profit: 22000 },
        { name: 'Groundnut', nameHi: 'मूंगफली', baseScore: 85, idealMoisture: 'Medium', idealTemp: [25, 30], duration: '120 days', profit: 35000 },
        { name: 'Tomato', nameHi: 'टमाटर', baseScore: 92, idealMoisture: 'Medium', idealTemp: [20, 28], duration: '90 days', profit: 120000 },
        { name: 'Potato', nameHi: 'आलू', baseScore: 88, idealMoisture: 'Medium', idealTemp: [15, 20], duration: '100 days', profit: 90000 },
        { name: 'Onion', nameHi: 'प्याज', baseScore: 86, idealMoisture: 'Medium', idealTemp: [15, 25], duration: '120 days', profit: 85000 }
      ];

      // Calculate dynamic scores
      const scoredCrops = cropDatabase.map(c => {
        let score = c.baseScore;
        
        // Moisture match
        if (c.idealMoisture === moistureLevel) score += 10;
        else if (c.idealMoisture === 'Low' && moistureLevel === 'High') score -= 20;
        else if (c.idealMoisture === 'High' && moistureLevel === 'Low') score -= 25;
        else score -= 5;

        // Temp match
        if (temp >= c.idealTemp[0] && temp <= c.idealTemp[1]) score += 5;
        else score -= 10;

        // Soil health match
        score = Math.min(98, score * (soilScore / 100) + 15);
        
        return {
          name: c.name,
          nameHi: c.nameHi,
          matchScore: Math.round(score),
          waterNeed: c.idealMoisture,
          duration: c.duration,
          expectedProfit: Math.round(c.profit * (soilScore / 100)),
          expectedProfitHi: `₹${Math.round(c.profit * (soilScore / 100)).toLocaleString('en-IN')}`
        };
      }).filter(c => c.matchScore >= 50).sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);

      // Dynamic Risks
      const risks = [];
      if (vegHealth === 'Poor') risks.push({ type: 'High Pest Vulnerability', level: 'High', labelHi: 'उच्च कीट संवेदनशीलता' });
      else if (vegHealth === 'Fair') risks.push({ type: 'Moderate Pest Risk', level: 'Medium', labelHi: 'मध्यम कीट जोखिम' });
      else risks.push({ type: 'Low Pest Risk', level: 'Low', labelHi: 'कम कीट जोखिम' });

      if (moistureLevel === 'Low' && temp > 32) risks.push({ type: 'Severe Drought Risk', level: 'High', labelHi: 'गंभीर सूखा जोखिम' });
      else if (moistureLevel === 'Low') risks.push({ type: 'Dry Soil Risk', level: 'Medium', labelHi: 'सूखी मिट्टी जोखिम' });

      if (rain > 50 || moistureLevel === 'High') risks.push({ type: 'Waterlogging Risk', level: rain > 50 ? 'High' : 'Medium', labelHi: 'जलभराव जोखिम' });

      if (soilScore < 60) risks.push({ type: 'Low Fertility', level: 'High', labelHi: 'कम उर्वरता' });
      if (risks.length === 0) risks.push({ type: 'Optimal Conditions', level: 'Low', labelHi: 'इष्टतम स्थितियाँ' });

      // Dynamic Tips
      const tips = [];
      if (moistureLevel === 'Low') tips.push({ en: 'Implement drip irrigation to conserve water immediately.', hi: 'पानी बचाने के लिए तुरंत ड्रिप सिंचाई लागू करें।' });
      if (vegHealth === 'Poor') tips.push({ en: 'Spray organic neem oil to prevent severe pest damage.', hi: 'गंभीर कीट क्षति को रोकने के लिए जैविक नीम का तेल छिड़कें।' });
      if (soilScore < 70) tips.push({ en: 'Add vermicompost and cow dung manure to boost soil organic carbon.', hi: 'मिट्टी के जैविक कार्बन को बढ़ाने के लिए वर्मीकम्पोस्ट और गोबर की खाद डालें।' });
      if (temp > 35) tips.push({ en: 'Apply organic mulch to protect topsoil from extreme heat.', hi: 'अत्यधिक गर्मी से ऊपरी मिट्टी को बचाने के लिए जैविक मल्च का प्रयोग करें।' });
      if (tips.length < 3) tips.push({ en: 'Consider practicing crop rotation in the next season.', hi: 'अगले मौसम में फसल चक्र का अभ्यास करने पर विचार करें।' });

      // 4. Generate Results
      setTimeout(() => {
        setAnalysis({
          soilScore: Math.round(soilScore),
          moistureLevel,
          vegetationHealth: vegHealth,
          topCrops: scoredCrops,
          risks: risks.slice(0, 3) as any,
          tips: tips.slice(0, 3),
          fertilizerRec: soilScore < 60 ? 'High Nitrogen (N) & Phosphorus (P) required' : 'Balanced NPK (10:26:26)',
          soilType,
          seasonPrediction: temp > 28 ? 'Kharif (Monsoon/Summer)' : 'Rabi (Winter)',
          seasonPredictionHi: temp > 28 ? 'खरीफ (मानसून/गर्मी)' : 'रबी (सर्दी)'
        });
        setAppState('results');
        toast.success(isHi ? 'विश्लेषण पूर्ण!' : 'Analysis Complete!');
      }, 2000);

    } catch (err) {
      toast.error(isHi ? 'विश्लेषण विफल रहा' : 'Analysis failed');
      setAppState('upload');
    }
  };

  // Voice Assistant
  const speakRecommendation = () => {
    if (!analysis) return;
    const topCrop = analysis.topCrops[0];
    const text = isHi 
      ? `आपके खेत के लिए सबसे अच्छी फसल ${topCrop.nameHi} है। इसका मिलान स्कोर ${topCrop.matchScore} प्रतिशत है।`
      : `The best crop for your field is ${topCrop.name}. It has a match score of ${topCrop.matchScore} percent.`;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isHi ? 'hi-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  // Render Splash
  if (appState === 'splash') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full w-48 h-48 animate-pulse" />
          <Activity className="w-24 h-24 text-primary relative z-10" />
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold mt-8 gradient-text"
        >
          {t('comingSoonTitle')}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mt-2"
        >
          {t('comingSoonSubtitle')}
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-4xl font-bold gradient-text mb-4">{t('farmAnalyticsPageTitle')}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('farmAnalyticsPageSubtitle')}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Upload State */}
            {(appState === 'upload' || appState === 'analyzing') && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-3xl mx-auto"
              >
                <Card className="glass-dark border-primary/20 shadow-large overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{t('uploadFieldImage')}</h3>
                        <p className="text-muted-foreground mb-6">{t('uploadDesc')}</p>
                        
                        <div className="space-y-4 mb-6">
                          <Label>{t('optionalLocation')}</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input 
                              placeholder={t('enterDistrictOptional')} 
                              className="pl-10 h-12"
                              value={district}
                              onChange={(e) => setDistrict(e.target.value)}
                            />
                          </div>
                        </div>

                        <Button 
                          variant="hero" 
                          size="lg" 
                          className="w-full relative overflow-hidden group"
                          disabled={!selectedImage || appState === 'analyzing'}
                          onClick={runAnalysis}
                        >
                          {appState === 'analyzing' ? (
                            <><RefreshCw className="mr-2 h-5 w-5 animate-spin" /> {t('analyzingField')}</>
                          ) : (
                            <><Activity className="mr-2 h-5 w-5" /> {t('analyzeField')}</>
                          )}
                          
                          {/* Scan animation overlay when analyzing */}
                          {appState === 'analyzing' && (
                            <motion.div 
                              className="absolute inset-0 bg-primary/20"
                              initial={{ y: '-100%' }}
                              animate={{ y: '100%' }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                          )}
                        </Button>
                      </div>

                      {/* Image Dropzone / Preview */}
                      <div className="relative h-64 md:h-auto border-2 border-dashed border-primary/50 rounded-xl bg-accent/10 flex flex-col items-center justify-center overflow-hidden group">
                        {selectedImage ? (
                          <>
                            <img src={selectedImage} alt="Field" className="absolute inset-0 w-full h-full object-cover" />
                            {appState === 'analyzing' && (
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-transparent h-1/2"
                                initial={{ top: '-50%' }}
                                animate={{ top: '100%' }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                              />
                            )}
                            {appState === 'upload' && (
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Label htmlFor="image-upload" className="cursor-pointer bg-white/20 backdrop-blur p-3 rounded-full hover:bg-white/30 transition">
                                  <Camera className="h-8 w-8 text-white" />
                                </Label>
                              </div>
                            )}
                          </>
                        ) : (
                          <Label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-6 text-center">
                            <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                              <Upload className="h-8 w-8 text-primary" />
                            </div>
                            <span className="font-semibold">{t('dragDropText')}</span>
                            <span className="text-sm text-muted-foreground mt-1">{t('orClickUpload')}</span>
                            <span className="text-xs text-muted-foreground mt-4">{t('supportedFormats')}</span>
                          </Label>
                        )}
                        <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Results State */}
            {appState === 'results' && analysis && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-accent/20 p-4 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    <h2 className="text-xl font-bold">{t('analysisComplete')}</h2>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={speakRecommendation} className="bg-primary/20 text-primary hover:bg-primary/30">
                      <Volume2 className="mr-2 h-4 w-4" />
                      {t('listenRecommendation')}
                    </Button>
                    <Button variant="outline" onClick={() => { setAppState('upload'); setSelectedImage(null); setAnalysis(null); }}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      {t('uploadAnotherImage')}
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Soil Health Gauge */}
                  <Card className="glass-dark border-t-4 border-t-primary flex flex-col items-center justify-center p-6">
                    <h3 className="text-lg font-semibold mb-6 w-full text-left">{t('soilHealthScore')}</h3>
                    <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                      {/* CSS Circle */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-muted opacity-20" strokeWidth="8" />
                        <motion.circle 
                          cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-primary" strokeWidth="8"
                          strokeDasharray="283"
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 283 - (283 * analysis.soilScore) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold">{analysis.soilScore}</span>
                        <span className="text-sm text-muted-foreground">/ 100</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-primary border-primary">
                      {t('overallFieldScore')}
                    </Badge>
                  </Card>

                  {/* Conditions Grid */}
                  <Card className="glass-dark md:col-span-2">
                    <CardHeader>
                      <CardTitle>{t('fieldConditions')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-accent/30 p-4 rounded-xl border border-border/50">
                          <Droplets className="h-6 w-6 text-blue-500 mb-2" />
                          <p className="text-sm text-muted-foreground">{t('soilMoisture')}</p>
                          <p className="font-bold text-lg">{isHi ? (analysis.moistureLevel === 'Low' ? 'कम' : analysis.moistureLevel === 'Medium' ? 'मध्यम' : 'अधिक') : analysis.moistureLevel}</p>
                        </div>
                        <div className="bg-accent/30 p-4 rounded-xl border border-border/50">
                          <Leaf className="h-6 w-6 text-emerald-500 mb-2" />
                          <p className="text-sm text-muted-foreground">{t('vegetationHealth')}</p>
                          <p className="font-bold text-lg">{isHi ? (analysis.vegetationHealth === 'Poor' ? 'खराब' : analysis.vegetationHealth === 'Fair' ? 'ठीक' : 'अच्छा') : analysis.vegetationHealth}</p>
                        </div>
                        <div className="bg-accent/30 p-4 rounded-xl border border-border/50">
                          <Sprout className="h-6 w-6 text-amber-600 mb-2" />
                          <p className="text-sm text-muted-foreground">{t('detectedSoilType')}</p>
                          <p className="font-bold">{analysis.soilType}</p>
                        </div>
                        <div className="bg-accent/30 p-4 rounded-xl border border-border/50">
                          <ThermometerSun className="h-6 w-6 text-orange-500 mb-2" />
                          <p className="text-sm text-muted-foreground">{t('bestSeason')}</p>
                          <p className="font-bold">{isHi ? analysis.seasonPredictionHi : analysis.seasonPrediction}</p>
                        </div>
                        <div className="bg-accent/30 p-4 rounded-xl border border-border/50 md:col-span-2 flex items-center gap-4">
                          <div className="p-3 bg-primary/20 rounded-full text-primary">
                            <Activity className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t('fertilizerRec')}</p>
                            <p className="font-bold">{analysis.fertilizerRec}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Results: Crops & Risks */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Top Crops */}
                  <Card className="glass-dark md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> {t('topCropMatches')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysis.topCrops.map((crop, idx) => (
                        <div key={idx} className="bg-card p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                              #{idx + 1}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold">{isHi ? crop.nameHi : crop.name}</h4>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1"><Droplets className="h-3 w-3" /> {crop.waterNeed}</span>
                                <span>•</span>
                                <span>{crop.duration}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">{t('expectedProfit')}</p>
                              <p className="font-bold text-emerald-600">{isHi ? crop.expectedProfitHi : `₹${crop.expectedProfit}`}/{isHi ? 'एकड़' : 'acre'}</p>
                            </div>
                            <div className="w-24 text-right">
                              <p className="text-sm text-muted-foreground mb-1">{t('matchScore')}</p>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: `${crop.matchScore}%` }} />
                              </div>
                              <p className="text-xs font-bold mt-1 text-primary">{crop.matchScore}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Risks & Tips */}
                  <div className="space-y-6">
                    <Card className="glass-dark border-destructive/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle className="h-5 w-5" /> {t('riskAlerts')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {analysis.risks.map((risk, idx) => (
                            <li key={idx} className="flex justify-between items-center bg-card p-3 rounded-lg border border-border/50">
                              <span className="font-medium">{isHi ? risk.labelHi : risk.type}</span>
                              <Badge variant={risk.level === 'High' ? 'destructive' : risk.level === 'Medium' ? 'default' : 'outline'}
                                     className={risk.level === 'Medium' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : ''}
                              >
                                {isHi ? (risk.level === 'High' ? 'उच्च' : risk.level === 'Medium' ? 'मध्यम' : 'कम') : risk.level}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="glass-dark bg-primary/5 border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-primary"><CheckCircle2 className="h-5 w-5" /> {t('smartFarmingTips')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {analysis.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-primary mt-0.5">•</span>
                              <span className="text-sm">{isHi ? tip.hi : tip.en}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Profit Chart */}
                <Card className="glass-dark">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> {t('profitEstimation')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analysis.topCrops} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey={isHi ? 'nameHi' : 'name'} stroke="currentColor" opacity={0.5} />
                          <YAxis stroke="currentColor" opacity={0.5} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                            itemStyle={{ color: 'var(--foreground)' }}
                            formatter={(value: number) => [`₹${value}`, t('expectedProfit')]}
                          />
                          <Bar dataKey="expectedProfit" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default function FarmAnalyticsWithBoundary() {
  return (
    <ErrorBoundary>
      <FarmAnalytics />
    </ErrorBoundary>
  );
}
