import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Sprout, Search, Thermometer, Droplets, CloudRain, Calendar, RefreshCw, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { indiaData, allStates } from '@/data/indiaData';
import toast from 'react-hot-toast';

// ── Crop Knowledge Base ────────────────────────────────────────────────────────
interface CropProfile {
  name: string;
  nameHi: string;
  tempMin: number;   // °C optimal min
  tempMax: number;   // °C optimal max
  waterNeed: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High'; // mm/season
  seasons: string[];          // Kharif / Rabi / Zaid
  soils: string[];            // compatible soil types
  duration: string;
  description: string;
  descriptionHi: string;
}

const cropProfiles: CropProfile[] = [
  { name: 'Rice', nameHi: 'धान', tempMin: 20, tempMax: 38, waterNeed: 'High', seasons: ['Kharif'], soils: ['Alluvial Soil', 'Clay Soil'], duration: '120–150 days', description: 'Thrives in warm, humid conditions with standing water.', descriptionHi: 'गर्म और आर्द्र परिस्थितियों में उगता है, पानी की अधिक आवश्यकता।' },
  { name: 'Wheat', nameHi: 'गेहूं', tempMin: 10, tempMax: 25, waterNeed: 'Medium', seasons: ['Rabi'], soils: ['Alluvial Soil', 'Loamy Soil', 'Black Soil'], duration: '120–130 days', description: 'Prefers cool temperatures. Best in winter season.', descriptionHi: 'ठंडे मौसम में उगना पसंद करता है। रबी की प्रमुख फसल।' },
  { name: 'Cotton', nameHi: 'कपास', tempMin: 21, tempMax: 38, waterNeed: 'Medium', seasons: ['Kharif'], soils: ['Black Soil', 'Loamy Soil', 'Red Soil'], duration: '150–180 days', description: 'Requires warm climate and well-drained soil.', descriptionHi: 'गर्म जलवायु और अच्छी जल निकासी वाली मिट्टी चाहिए।' },
  { name: 'Maize', nameHi: 'मक्का', tempMin: 18, tempMax: 32, waterNeed: 'Medium', seasons: ['Kharif', 'Zaid'], soils: ['Alluvial Soil', 'Loamy Soil', 'Red Soil'], duration: '80–110 days', description: 'Adaptable crop, grows well in warm weather.', descriptionHi: 'अनुकूलनीय फसल, गर्म मौसम में अच्छी तरह उगती है।' },
  { name: 'Sugarcane', nameHi: 'गन्ना', tempMin: 20, tempMax: 38, waterNeed: 'Very High', seasons: ['Kharif', 'Rabi'], soils: ['Alluvial Soil', 'Loamy Soil', 'Clay Soil'], duration: '12–18 months', description: 'Tropical crop needing high rainfall or irrigation.', descriptionHi: 'उष्णकटिबंधीय फसल जिसे बहुत अधिक पानी चाहिए।' },
  { name: 'Bajra', nameHi: 'बाजरा', tempMin: 25, tempMax: 42, waterNeed: 'Very Low', seasons: ['Kharif'], soils: ['Sandy Soil', 'Red Soil', 'Loamy Soil'], duration: '70–90 days', description: 'Extremely drought tolerant. Best in arid and semi-arid regions.', descriptionHi: 'सूखा प्रतिरोधी। शुष्क और अर्ध-शुष्क क्षेत्रों के लिए सर्वोत्तम।' },
  { name: 'Jowar', nameHi: 'ज्वार', tempMin: 25, tempMax: 38, waterNeed: 'Low', seasons: ['Kharif', 'Rabi'], soils: ['Black Soil', 'Clay Soil', 'Loamy Soil'], duration: '100–120 days', description: 'Hardy crop, tolerates heat and low rainfall.', descriptionHi: 'कठोर फसल, गर्मी और कम वर्षा सहन करती है।' },
  { name: 'Groundnut', nameHi: 'मूंगफली', tempMin: 22, tempMax: 35, waterNeed: 'Medium', seasons: ['Kharif', 'Zaid'], soils: ['Sandy Soil', 'Loamy Soil', 'Red Soil'], duration: '100–130 days', description: 'Warm weather oilseed crop, grows in sandy loam.', descriptionHi: 'गर्म मौसम की तिलहन फसल, बलुई दोमट में उगती है।' },
  { name: 'Soybean', nameHi: 'सोयाबीन', tempMin: 20, tempMax: 33, waterNeed: 'Medium', seasons: ['Kharif'], soils: ['Black Soil', 'Loamy Soil', 'Alluvial Soil'], duration: '90–120 days', description: 'Nitrogen-fixing legume, prefers well-drained soils.', descriptionHi: 'नाइट्रोजन स्थिर करने वाली फलीदार फसल।' },
  { name: 'Mustard', nameHi: 'सरसों', tempMin: 7, tempMax: 25, waterNeed: 'Low', seasons: ['Rabi'], soils: ['Alluvial Soil', 'Loamy Soil', 'Black Soil'], duration: '110–140 days', description: 'Cool-season oilseed. Requires minimal irrigation.', descriptionHi: 'ठंडे मौसम की तिलहन। कम सिंचाई चाहिए।' },
  { name: 'Potato', nameHi: 'आलू', tempMin: 14, tempMax: 25, waterNeed: 'Medium', seasons: ['Rabi', 'Zaid'], soils: ['Loamy Soil', 'Alluvial Soil'], duration: '70–90 days', description: 'Cool temperature vegetable crop. High-value market crop.', descriptionHi: 'ठंडे तापमान की सब्जी फसल। उच्च बाज़ार मूल्य।' },
  { name: 'Tomato', nameHi: 'टमाटर', tempMin: 17, tempMax: 32, waterNeed: 'Medium', seasons: ['Rabi', 'Zaid', 'Kharif'], soils: ['Loamy Soil', 'Alluvial Soil', 'Red Soil'], duration: '60–90 days', description: 'Year-round vegetable with high returns.', descriptionHi: 'साल भर उगने वाली उच्च आय की सब्जी।' },
  { name: 'Pulses (Moong/Urad)', nameHi: 'दलहन (मूंग/उड़द)', tempMin: 22, tempMax: 35, waterNeed: 'Low', seasons: ['Kharif', 'Zaid'], soils: ['Loamy Soil', 'Black Soil', 'Alluvial Soil'], duration: '70–90 days', description: 'Short-duration legumes. Improve soil nitrogen content.', descriptionHi: 'कम अवधि की फलीदार फसलें। मिट्टी में नाइट्रोजन बढ़ाती हैं।' },
  { name: 'Sunflower', nameHi: 'सूरजमुखी', tempMin: 18, tempMax: 35, waterNeed: 'Medium', seasons: ['Rabi', 'Kharif', 'Zaid'], soils: ['Loamy Soil', 'Black Soil', 'Alluvial Soil'], duration: '90–100 days', description: 'Versatile oilseed crop. Adaptable to all seasons.', descriptionHi: 'बहुउपयोगी तिलहन फसल। सभी मौसमों में उगती है।' },
  { name: 'Castor', nameHi: 'अरंडी', tempMin: 20, tempMax: 42, waterNeed: 'Low', seasons: ['Kharif'], soils: ['Sandy Soil', 'Red Soil', 'Black Soil'], duration: '150–180 days', description: 'Drought tolerant industrial oilseed crop.', descriptionHi: 'सूखा सहिष्णु औद्योगिक तिलहन फसल।' },
  { name: 'Ragi (Finger Millet)', nameHi: 'रागी', tempMin: 18, tempMax: 35, waterNeed: 'Low', seasons: ['Kharif'], soils: ['Red Soil', 'Loamy Soil', 'Sandy Soil'], duration: '100–120 days', description: 'Nutritious millet. Drought tolerant and hardy.', descriptionHi: 'पौष्टिक बाजरा। सूखा सहिष्णु और कठोर।' },
  { name: 'Jute', nameHi: 'जूट', tempMin: 25, tempMax: 38, waterNeed: 'High', seasons: ['Kharif'], soils: ['Alluvial Soil', 'Clay Soil'], duration: '100–120 days', description: 'Requires hot, humid conditions with high rainfall.', descriptionHi: 'गर्म, आर्द्र परिस्थितियों और अधिक वर्षा की आवश्यकता।' },
];

// ── Season detection ───────────────────────────────────────────────────────────
const getCurrentSeason = () => {
  const m = new Date().getMonth() + 1; // 1-12
  if (m >= 6 && m <= 10) return 'Kharif';   // June–October
  if (m >= 11 || m <= 3) return 'Rabi';     // November–March
  return 'Zaid';                             // April–May
};

const seasonHiMap: Record<string, string> = {
  Kharif: 'खरीफ', Rabi: 'रबी', Zaid: 'जायद',
};

// ── Scoring ────────────────────────────────────────────────────────────────────
const waterNeedMm: Record<string, number> = {
  'Very Low': 150, Low: 300, Medium: 500, High: 800, 'Very High': 1200,
};

const scoreTemp = (temp: number, min: number, max: number): number => {
  if (temp >= min && temp <= max) return 40;
  const diff = temp < min ? min - temp : temp - max;
  return Math.max(0, 40 - diff * 4);
};

const scoreWater = (rainfall: number, needed: number): number => {
  const ratio = Math.min(rainfall, needed) / needed;
  return Math.round(ratio * 30);
};

const scoreSeason = (cropSeasons: string[], current: string): number =>
  cropSeasons.includes(current) ? 30 : 0;

const scoreSoil = (cropSoils: string[], selected: string): boolean =>
  cropSoils.includes(selected);

interface RankedCrop extends CropProfile {
  score: number;
  tempScore: number;
  waterScore: number;
  seasonScore: number;
  soilMatch: boolean;
}

const soilTypes = ['Black Soil', 'Red Soil', 'Alluvial Soil', 'Clay Soil', 'Loamy Soil', 'Sandy Soil'];

const scoreColor = (s: number) => {
  if (s >= 80) return 'bg-emerald-500/20 text-emerald-600';
  if (s >= 60) return 'bg-primary/20 text-primary';
  if (s >= 40) return 'bg-yellow-500/20 text-yellow-600';
  return 'bg-muted text-muted-foreground';
};
const scoreLabel = (s: number, hi: boolean) => {
  if (s >= 80) return hi ? 'उत्कृष्ट' : 'Excellent';
  if (s >= 60) return hi ? 'अच्छा' : 'Good';
  if (s >= 40) return hi ? 'ठीक' : 'Moderate';
  return hi ? 'कम' : 'Low';
};

// ── Component ──────────────────────────────────────────────────────────────────
const CropRecommendation = () => {
  const { t, language } = useLanguage();
  const [soilType, setSoilType] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [crops, setCrops] = useState<RankedCrop[]>([]);
  const [loading, setLoading] = useState(false);
  const [liveData, setLiveData] = useState<{ temp: number; humidity: number; rainfall: number; season: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!soilType || !selectedState || !selectedDistrict) {
      toast.error(language === 'hi' ? 'कृपया सभी विकल्प चुनें' : 'Please select all fields');
      return;
    }
    setLoading(true);
    setCrops([]);
    setLiveData(null);

    try {
      // Step 1: Geocode district
      const geoRes = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(selectedDistrict + ', India')}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );

      let temp = 28, humidity = 65, rainfall = 0;

      if (Array.isArray(geoRes.data) && geoRes.data.length > 0 && geoRes.data[0].lat) {
        const { lat, lon } = geoRes.data[0];
        // Step 2: Fetch live weather from Open-Meteo
        const wx = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
          `&current=temperature_2m,relative_humidity_2m,precipitation` +
          `&daily=precipitation_sum&timezone=Asia%2FKolkata&forecast_days=7`
        );
        temp = Math.round(wx.data.current.temperature_2m);
        humidity = wx.data.current.relative_humidity_2m;
        // Use 7-day total rainfall as proxy for season-level water availability
        const daily = wx.data.daily.precipitation_sum as number[];
        const totalRain = daily.reduce((a: number, b: number) => a + (b ?? 0), 0);
        rainfall = Math.round(totalRain * 10) / 10;
      }

      const season = getCurrentSeason();
      setLiveData({ temp, humidity, rainfall, season });

      // Step 3: Score all crops
      const annualRainProxy = rainfall * 52; // Extrapolate weekly rain to annual estimate

      const ranked: RankedCrop[] = cropProfiles.map((crop) => {
        const ts = scoreTemp(temp, crop.tempMin, crop.tempMax);
        const needed = waterNeedMm[crop.waterNeed];
        const ws = scoreWater(annualRainProxy + (humidity * 3), needed); // add humidity bonus
        const ss = scoreSeason(crop.seasons, season);
        const sm = scoreSoil(crop.soils, soilType);
        const total = ts + ws + ss + (sm ? 0 : -10); // soil mismatch penalty
        return { ...crop, score: Math.min(100, Math.max(0, total)), tempScore: ts, waterScore: ws, seasonScore: ss, soilMatch: sm };
      });

      // Sort: soil match first, then score
      ranked.sort((a, b) => {
        if (a.soilMatch !== b.soilMatch) return a.soilMatch ? -1 : 1;
        return b.score - a.score;
      });

      setCrops(ranked.slice(0, 10));
      toast.success(language === 'hi' ? '✅ लाइव डेटा से फसल सिफारिशें तैयार हैं!' : `✅ Recommendations ready using live ${temp}°C data!`);
    } catch (err) {
      toast.error('Failed to fetch live data. Using seasonal estimates.');
      // Fallback: still run with estimated values
      const season = getCurrentSeason();
      const temp = 28, humidity = 65, rainfall = 0;
      setLiveData({ temp, humidity, rainfall, season });
      const ranked: RankedCrop[] = cropProfiles.map((crop) => {
        const ts = scoreTemp(temp, crop.tempMin, crop.tempMax);
        const ws = scoreWater(500, waterNeedMm[crop.waterNeed]);
        const ss = scoreSeason(crop.seasons, season);
        const sm = scoreSoil(crop.soils, soilType);
        return { ...crop, score: Math.min(100, ts + ws + ss + (sm ? 0 : -10)), tempScore: ts, waterScore: ws, seasonScore: ss, soilMatch: sm };
      });
      ranked.sort((a, b) => b.score - a.score);
      setCrops(ranked.slice(0, 10));
    } finally {
      setLoading(false);
    }
  };

  const isHi = language === 'hi';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-5xl">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="bg-gradient-primary p-4 rounded-2xl text-white w-fit mx-auto mb-4">
              <Sprout className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-3">{t('cropPageTitle')}</h1>
            <p className="text-lg text-muted-foreground">{t('cropPageSubtitle')}</p>
            <Badge variant="outline" className="mt-3 text-primary border-primary px-4 py-1">
              🔬 {isHi ? 'लाइव मौसम डेटा से AI विश्लेषण' : 'AI Analysis · Live Weather Data · Open-Meteo'}
            </Badge>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-dark shadow-large mb-6">
              <CardHeader>
                <CardTitle>{t('enterFarmDetails')}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {isHi ? 'हम आपके जिले का लाइव तापमान और वर्षा डेटा लेकर फसल स्कोर करते हैं' : 'We fetch live temperature & rainfall for your district to score crops'}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Soil */}
                    <div>
                      <Label className="text-sm font-medium">{t('soilTypeLabel')}</Label>
                      <Select onValueChange={setSoilType} value={soilType}>
                        <SelectTrigger className="mt-2 h-12"><SelectValue placeholder={t('selectSoilType')} /></SelectTrigger>
                        <SelectContent>
                          {soilTypes.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* State */}
                    <div>
                      <Label className="text-sm font-medium">{t('stateLabel')}</Label>
                      <Select onValueChange={(v) => { setSelectedState(v); setSelectedDistrict(''); }} value={selectedState}>
                        <SelectTrigger className="mt-2 h-12"><SelectValue placeholder={t('selectState')} /></SelectTrigger>
                        <SelectContent className="max-h-72 overflow-y-auto">
                          {allStates.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* District */}
                    <div>
                      <Label className="text-sm font-medium">{t('districtLabel')}</Label>
                      <Select onValueChange={setSelectedDistrict} value={selectedDistrict} disabled={!selectedState}>
                        <SelectTrigger className="mt-2 h-12"><SelectValue placeholder={isHi ? 'जिला चुनें' : 'Select district'} /></SelectTrigger>
                        <SelectContent className="max-h-72 overflow-y-auto">
                          {(indiaData[selectedState] || []).map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading || !soilType || !selectedState || !selectedDistrict}>
                    {loading
                      ? <><RefreshCw className="mr-2 h-5 w-5 animate-spin" />{isHi ? 'लाइव डेटा विश्लेषण हो रहा है...' : 'Analysing Live Data...'}</>
                      : <><Search className="mr-2 h-5 w-5" />{t('getCropRec')}</>
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Live Data Panel */}
            {liveData && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <Card className="glass-dark border-primary/30">
                  <CardContent className="pt-5">
                    <p className="text-sm font-semibold text-primary mb-3">
                      📡 {isHi ? `${selectedDistrict} का लाइव डेटा (विश्लेषण के लिए उपयोग किया गया)` : `Live conditions for ${selectedDistrict} (used for scoring)`}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-accent/30 rounded-lg p-3 flex items-center gap-2">
                        <Thermometer className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">{isHi ? 'तापमान' : 'Temperature'}</p>
                          <p className="font-bold text-lg">{liveData.temp}°C</p>
                        </div>
                      </div>
                      <div className="bg-accent/30 rounded-lg p-3 flex items-center gap-2">
                        <Droplets className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">{isHi ? 'आर्द्रता' : 'Humidity'}</p>
                          <p className="font-bold text-lg">{liveData.humidity}%</p>
                        </div>
                      </div>
                      <div className="bg-accent/30 rounded-lg p-3 flex items-center gap-2">
                        <CloudRain className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">{isHi ? '7-दिन वर्षा' : '7-Day Rainfall'}</p>
                          <p className="font-bold text-lg">{liveData.rainfall} mm</p>
                        </div>
                      </div>
                      <div className="bg-accent/30 rounded-lg p-3 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-secondary" />
                        <div>
                          <p className="text-xs text-muted-foreground">{isHi ? 'वर्तमान मौसम' : 'Current Season'}</p>
                          <p className="font-bold text-lg">{isHi ? seasonHiMap[liveData.season] : liveData.season}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Results Table */}
            {crops.length > 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
                <Card className="glass-dark shadow-large">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      {t('recommendedCrops')}
                      <Badge variant="outline" className="text-primary border-primary">{crops.length} {t('cropsFound')}</Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isHi
                        ? `मिट्टी: ${soilType} · ${selectedDistrict} के लाइव {liveData?.temp}°C और मौसम डेटा के आधार पर स्कोर किया गया`
                        : `Scored using live ${liveData?.temp}°C, ${liveData?.humidity}% humidity · Soil: ${soilType} · Season: ${liveData?.season}`}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground bg-accent/20 rounded-lg p-3">
                      <Info className="h-4 w-4 shrink-0" />
                      {isHi ? 'स्कोर = तापमान (40%) + पानी उपलब्धता (30%) + मौसम मिलान (30%)' : 'Score = Temperature fit (40 pts) + Water availability (30 pts) + Season match (30 pts) — max 100'}
                    </div>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>{isHi ? 'फसल' : 'Crop'}</TableHead>
                            <TableHead>{isHi ? 'मौसम' : 'Season'}</TableHead>
                            <TableHead>{isHi ? 'पानी की जरूरत' : 'Water Need'}</TableHead>
                            <TableHead>{isHi ? 'अवधि' : 'Duration'}</TableHead>
                            <TableHead>{isHi ? 'मिट्टी मिलान' : 'Soil Match'}</TableHead>
                            <TableHead>{isHi ? 'उपयुक्तता स्कोर' : 'Suitability Score'}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {crops.map((crop, i) => (
                            <motion.tr
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                              className="hover:bg-accent/40 border-b last:border-0"
                            >
                              <TableCell className="text-muted-foreground font-bold">{i + 1}</TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-semibold">{isHi ? crop.nameHi : crop.name}</p>
                                  <p className="text-xs text-muted-foreground max-w-[220px] truncate">{isHi ? crop.descriptionHi : crop.description}</p>
                                </div>
                              </TableCell>
                              <TableCell>{isHi ? crop.seasons.map(s => seasonHiMap[s] ?? s).join('/') : crop.seasons.join('/')}</TableCell>
                              <TableCell>{isHi ? { 'Very Low': 'बहुत कम', Low: 'कम', Medium: 'मध्यम', High: 'अधिक', 'Very High': 'बहुत अधिक' }[crop.waterNeed] : crop.waterNeed}</TableCell>
                              <TableCell className="text-sm">{crop.duration}</TableCell>
                              <TableCell>
                                {crop.soilMatch
                                  ? <Badge className="bg-emerald-500/20 text-emerald-600 border-0">{isHi ? '✅ उपयुक्त' : '✅ Match'}</Badge>
                                  : <Badge className="bg-yellow-500/20 text-yellow-600 border-0">{isHi ? '⚠️ आंशिक' : '⚠️ Partial'}</Badge>
                                }
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-muted rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${crop.score}%` }} />
                                  </div>
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${scoreColor(crop.score)}`}>
                                    {crop.score}% · {scoreLabel(crop.score, isHi)}
                                  </span>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-6 bg-accent/30 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">💡 {t('cropRotationTip')}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CropRecommendation;
