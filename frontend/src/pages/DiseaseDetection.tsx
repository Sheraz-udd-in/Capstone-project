import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Bug, Activity, ShieldCheck, AlertTriangle, Info, ShieldAlert, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const DiseaseDetection = () => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    status: string;
    disease_name: string;
    confidence: number;
    disease_percentage: number;
    recommendation: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error(isHi ? 'फ़ाइल बहुत बड़ी है (अधिकतम 10MB)' : 'File too large (Max 10MB)');
        return;
      }
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null); // Reset previous result
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setPreviewUrl(event.target?.result as string);
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const analyzeDisease = async () => {
    if (!selectedFile) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      // Call Python Microservice
      const mlBaseUrl = import.meta.env.VITE_ML_URL || 'https://capstone-ai-model-2.onrender.com';
      const res = await axios.post(`${mlBaseUrl}/detect_disease`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setResult({
        status: res.data.status,
        disease_name: res.data.disease_name,
        confidence: res.data.confidence,
        disease_percentage: res.data.disease_percentage,
        recommendation: isHi ? res.data.recommendation_hi : res.data.recommendation_en
      });
      
      toast.success(isHi ? 'स्कैन सफल' : 'Scan Successful');
    } catch (err: any) {
      console.error(err);
      toast.error(isHi ? 'विश्लेषण विफल। क्या Python सर्वर चल रहा है?' : 'Analysis failed. Is the Python server running?');
    } finally {
      setLoading(false);
    }
  };

  const resetAnalyzer = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatRecommendation = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      let currentLine = line.trim();
      let isBullet = false;
      
      // Check if it's a bullet point
      if (currentLine.startsWith('* ') || currentLine.startsWith('- ')) {
        isBullet = true;
        currentLine = currentLine.substring(2);
      }
      
      // Parse markdown-style tags
      const boldParts = currentLine.split(/(\*\*.*?\*\*)/g);
      
      const parsedParts = boldParts.flatMap((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2);
          return [<strong key={`b-${partIdx}`} className="font-extrabold text-primary">{boldText}</strong>];
        } else {
          const italicParts = part.split(/(\*.*?\*)/g);
          return italicParts.map((subPart, subIdx) => {
            if (subPart.startsWith('*') && subPart.endsWith('*')) {
              return <em key={`i-${partIdx}-${subIdx}`} className="italic text-foreground/80">{subPart.slice(1, -1)}</em>;
            }
            return subPart;
          });
        }
      });

      if (isBullet) {
        return (
          <div key={index} className="flex gap-2 pl-4 mb-2 last:mb-0">
            <span className="text-primary font-bold">•</span>
            <div className="flex-1">{parsedParts}</div>
          </div>
        );
      }

      return (
        <p key={index} className="min-h-[1.5em] mb-2 last:mb-0">
          {parsedParts}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 relative">
        <div className="absolute top-0 left-0 w-1/2 h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/10">
              <Bug className="w-3 h-3 mr-2" /> Computer Vision Model
            </Badge>
            <h1 className="text-4xl font-bold gradient-text mb-4">{t('diseaseDetectionTitle') || 'Plant Disease Identifier'}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('diseaseDetectionSubtitle') || 'Upload a photo of a sick leaf. Our Computer Vision AI will analyze it to detect diseases and provide instant treatment recommendations.'}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* Upload Section */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
              <Card className="glass-dark border-primary/20 overflow-hidden h-full relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2"><Camera className="w-5 h-5 text-primary" /> {isHi ? 'पत्ते की फोटो अपलोड करें' : 'Upload Leaf Image'}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex flex-col h-[calc(100%-70px)] relative z-10">
                  
                  <div 
                    className={`relative flex-1 min-h-[350px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${previewUrl ? (result ? (result.status === 'Healthy' ? 'border-emerald-500 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]' : 'border-red-500 shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)]') : 'border-primary shadow-[0_0_40px_-10px_rgba(var(--primary),0.4)]') : 'border-border/50 hover:border-primary/50 bg-accent/10 hover:bg-accent/20 cursor-pointer'}`}
                    onClick={() => !previewUrl && fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Leaf Preview" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${loading ? 'scale-110 blur-[2px]' : 'scale-100 blur-0'}`} />
                        
                        {/* High-Tech Scanner Animation */}
                        {loading && (
                          <>
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                            <motion.div 
                              className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_5px_rgba(var(--primary),0.8)] z-10"
                              initial={{ top: '0%' }}
                              animate={{ top: ['0%', '100%', '0%'] }}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                              <div className="bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-primary/50 shadow-xl flex items-center gap-3">
                                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                <span className="font-bold tracking-widest text-primary uppercase text-sm">ANALYZING PIXELS...</span>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Scanner Grid Overlay for result */}
                        {result && (
                           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.3)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40 mix-blend-overlay" />
                        )}

                        <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20 backdrop-blur-sm">
                          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black scale-95 hover:scale-105 transition-transform" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                            <Camera className="w-4 h-4 mr-2" /> {isHi ? 'नई फोटो लें' : 'Retake Photo'}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-6 pointer-events-none">
                        <motion.div 
                          className="bg-primary/10 p-5 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-inner"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Upload className="h-10 w-10 text-primary" />
                        </motion.div>
                        <p className="font-bold text-xl mb-2">{isHi ? 'यहाँ खींचें और छोड़ें' : 'Drag & drop leaf image here'}</p>
                        <p className="text-sm text-muted-foreground">{isHi ? 'या फ़ाइलें ब्राउज़ करने के लिए क्लिक करें' : 'or click to browse files (JPEG, PNG)'}</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                    />
                  </div>

                  {result ? (
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full mt-6 h-14 text-lg border-primary text-primary hover:bg-primary/10 transition-colors"
                      onClick={resetAnalyzer}
                    >
                      <RefreshCw className="mr-2 h-5 w-5" /> {isHi ? 'दूसरी पत्ती स्कैन करें' : 'Scan Another Leaf'}
                    </Button>
                  ) : (
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className={`w-full mt-6 h-14 text-lg transition-all duration-500 ${loading ? 'animate-pulse' : ''}`}
                      disabled={!selectedFile || loading}
                      onClick={analyzeDisease}
                    >
                      {loading ? (
                        <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> {isHi ? 'स्कैनिंग कर रहा है...' : 'Scanning Image...'}</>
                      ) : (
                        <><Activity className="mr-2 h-6 w-6" /> {isHi ? 'बीमारी का पता लगाएं' : 'Detect Disease'}</>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Section */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="h-full">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", bounce: 0.4 }} className="h-full">
                    <Card className={`h-full glass-dark border-2 relative overflow-hidden ${result.status === 'Healthy' ? 'border-emerald-500/50 shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]' : result.status === 'Mild Infection' ? 'border-yellow-500/50 shadow-[0_0_50px_-12px_rgba(234,179,8,0.2)]' : 'border-red-500/50 shadow-[0_0_50px_-12px_rgba(239,68,68,0.2)]'}`}>
                      {/* Decorative Background Blob */}
                      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${result.status === 'Healthy' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      
                      <CardHeader className="pb-6 relative z-10 border-b border-border/50 bg-accent/20">
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge className={`mb-3 px-3 py-1 text-xs uppercase tracking-wider ${result.status === 'Healthy' ? 'text-emerald-500 border-emerald-500 bg-emerald-500/10' : result.status === 'Mild Infection' ? 'text-yellow-500 border-yellow-500 bg-yellow-500/10' : 'text-red-500 border-red-500 bg-red-500/10'}`} variant="outline">
                              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full animate-pulse ${result.status === 'Healthy' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                {result.status}
                              </motion.span>
                            </Badge>
                            <CardTitle className={`text-3xl font-black ${result.status === 'Healthy' ? 'text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]'}`}>
                              {result.disease_name}
                            </CardTitle>
                          </div>
                          <motion.div 
                            initial={{ scale: 0, rotate: -180 }} 
                            animate={{ scale: 1, rotate: 0 }} 
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className={`p-4 rounded-full shadow-lg backdrop-blur-md ${result.status === 'Healthy' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}
                          >
                            {result.status === 'Healthy' ? <ShieldCheck className="w-10 h-10" /> : <ShieldAlert className="w-10 h-10" />}
                          </motion.div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-8 pt-8 relative z-10">
                        
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Activity className="w-4 h-4" /> {isHi ? 'AI आत्मविश्वास स्कोर' : 'AI Confidence Score'}</span>
                              <span className="font-black text-lg">{result.confidence}%</span>
                            </div>
                            <Progress value={result.confidence} className="h-3 shadow-inner" />
                          </div>

                          {result.status !== 'Not a Leaf' && (
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                              <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> {isHi ? 'रोगग्रस्त क्षेत्र' : 'Infected Area'}</span>
                                <span className={`font-black text-lg ${result.status === 'Healthy' ? 'text-emerald-500' : 'text-red-500'}`}>{result.disease_percentage}%</span>
                              </div>
                              <Progress value={result.disease_percentage} className={`h-3 shadow-inner ${result.status === 'Healthy' ? '[&>div]:bg-emerald-500' : '[&>div]:bg-red-500'}`} />
                            </motion.div>
                          )}
                        </div>

                        <motion.div 
                          initial={{ opacity: 0, y: 20 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          transition={{ delay: 0.5 }}
                          className={`p-6 rounded-2xl border backdrop-blur-md shadow-lg ${result.status === 'Healthy' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-destructive/10 border-destructive/20'}`}
                        >
                          <h4 className={`font-black mb-3 flex items-center gap-2 text-lg ${result.status === 'Healthy' ? 'text-emerald-500' : 'text-destructive'}`}>
                            <Info className="w-5 h-5" /> 
                            {isHi ? 'उपचार की सिफारिश' : 'Prescription & Action Plan'}
                          </h4>
                          <div className="text-foreground/90 leading-relaxed font-medium">
                            {formatRecommendation(result.recommendation)}
                          </div>
                        </motion.div>

                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <div className="h-full min-h-[400px] flex items-center justify-center p-8 border-2 border-dashed border-muted/50 rounded-2xl bg-accent/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="text-center max-w-sm relative z-10">
                      <motion.div 
                        animate={{ y: [0, -10, 0] }} 
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="bg-primary/10 p-5 rounded-full inline-block mb-6 shadow-[0_0_30px_rgba(var(--primary),0.2)]"
                      >
                        <Bug className="w-12 h-12 text-primary" />
                      </motion.div>
                      <h3 className="text-2xl font-black mb-3">{isHi ? 'परिणामों की प्रतीक्षा' : 'Awaiting Scan Results'}</h3>
                      <p className="text-muted-foreground">
                        {isHi ? 'एक पत्ता अपलोड करें और हमारा कंप्यूटर विज़न मॉडल बीमारी की पहचान करने के लिए रंग और बनावट का विश्लेषण करेगा।' : 'Upload a leaf image on the left. Our Computer Vision AI will analyze the cell pathology and identify any diseases instantly.'}
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiseaseDetection;
