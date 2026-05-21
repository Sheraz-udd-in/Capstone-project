import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { TrendingUp, CloudRain, ThermometerSun, Sprout, Loader2, Target, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const YieldPrediction = () => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  const [crop, setCrop] = useState('');
  const [temperature, setTemperature] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    yield_q_ha: number;
    yield_kg_acre: number;
    crop: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crop || !temperature || !rainfall) {
      toast.error(isHi ? 'कृपया सभी फ़ील्ड भरें' : 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      // Connect to Python Flask ML Microservice
      const mlBaseUrl = import.meta.env.VITE_ML_URL || 'https://capstone-ai-model-2.onrender.com';
      const res = await axios.post(`${mlBaseUrl}/predict_yield`, {
        crop,
        temperature: parseFloat(temperature),
        rainfall: parseFloat(rainfall)
      });
      
      setResult({
        yield_q_ha: res.data.predicted_yield_q_per_ha,
        yield_kg_acre: res.data.predicted_yield_kg_per_acre,
        crop: res.data.crop
      });
      toast.success(isHi ? 'ML भविष्यवाणी सफल' : 'ML Prediction Successful');
    } catch (err: any) {
      console.error(err);
      toast.error(isHi ? 'भविष्यवाणी विफल रही। क्या Python सर्वर चल रहा है?' : 'Prediction failed. Is the Python server running?');
    } finally {
      setLoading(false);
    }
  };

  // Dummy chart data to visualize typical growth curves based on prediction
  const chartData = result ? Array.from({length: 6}).map((_, i) => ({
    month: `Month ${i+1}`,
    expected: (result.yield_kg_acre / 6) * (i + 1) * (0.8 + (Math.random() * 0.4))
  })) : [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 relative">
        <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/10">
              <TrendingUp className="w-3 h-3 mr-2" /> Machine Learning Model
            </Badge>
            <h1 className="text-4xl font-bold gradient-text mb-4">{t('yieldPredictionTitle') || 'Smart Yield Prediction'}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t('yieldPredictionSubtitle') || 'Powered by a Random Forest ML model to estimate expected crop production based on climate conditions.'}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-5">
              <Card className="glass-dark border-primary/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">{isHi ? 'इनपुट पैरामीटर' : 'Input Parameters'}</CardTitle>
                  <CardDescription>{isHi ? 'सटीक ML भविष्यवाणी के लिए डेटा दर्ज करें' : 'Enter data for accurate ML prediction'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Sprout className="w-4 h-4 text-emerald-500" /> {isHi ? 'फसल का प्रकार' : 'Crop Type'}</Label>
                      <select 
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                        required
                      >
                        <option value="" disabled>{isHi ? 'फसल चुनें...' : 'Select Crop...'}</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Rice">Rice</option>
                        <option value="Maize">Maize</option>
                        <option value="Sugarcane">Sugarcane</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Soybean">Soybean</option>
                        <option value="Mustard">Mustard</option>
                        <option value="Millets">Millets (Bajra)</option>
                        <option value="Jowar">Jowar</option>
                        <option value="Groundnut">Groundnut</option>
                        <option value="Tomato">Tomato</option>
                        <option value="Potato">Potato</option>
                        <option value="Onion">Onion</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><ThermometerSun className="w-4 h-4 text-orange-500" /> {isHi ? 'औसत तापमान (°C)' : 'Avg Temperature (°C)'}</Label>
                      <Input 
                        type="number" 
                        step="0.1" 
                        placeholder="e.g., 25.5" 
                        className="h-12"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><CloudRain className="w-4 h-4 text-blue-500" /> {isHi ? 'वार्षिक वर्षा (मिमी)' : 'Annual Rainfall (mm)'}</Label>
                      <Input 
                        type="number" 
                        step="1" 
                        placeholder="e.g., 850" 
                        className="h-12"
                        value={rainfall}
                        onChange={(e) => setRainfall(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" variant="hero" className="w-full h-12 text-lg" disabled={loading}>
                      {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {isHi ? 'मॉडल चल रहा है...' : 'Running Model...'}</> : <><Target className="mr-2 h-5 w-5" /> {isHi ? 'उपज का अनुमान लगाएं' : 'Predict Yield'}</>}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Card className="glass-dark border-emerald-500/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <TrendingUp className="w-24 h-24" />
                        </div>
                        <CardHeader>
                          <CardDescription>{isHi ? 'अनुमानित उपज (क्विंटल/हेक्टेयर)' : 'Estimated Yield (Quintals/Hectare)'}</CardDescription>
                          <CardTitle className="text-5xl font-black text-emerald-500">{result.yield_q_ha}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center text-sm text-emerald-500/80">
                            <CheckCircle2 className="w-4 h-4 mr-1" /> {isHi ? 'यादृच्छिक वन मॉडल द्वारा' : 'by Random Forest Model'}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-dark border-primary/20">
                        <CardHeader>
                          <CardDescription>{isHi ? 'अनुमानित उपज (किलो/एकड़)' : 'Estimated Yield (kg/Acre)'}</CardDescription>
                          <CardTitle className="text-4xl font-bold">{result.yield_kg_acre.toLocaleString()}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Target Crop: {result.crop}
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="glass-dark">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2"><Target className="w-5 h-5" /> {isHi ? 'अनुमानित वृद्धि प्रक्षेपवक्र' : 'Estimated Growth Trajectory'}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 w-full mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                              <XAxis dataKey="month" stroke="currentColor" opacity={0.5} tick={{fontSize: 12}} />
                              <YAxis stroke="currentColor" opacity={0.5} tick={{fontSize: 12}} />
                              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }} />
                              <Area type="monotone" dataKey="expected" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorExpected)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <div className="h-full min-h-[400px] flex items-center justify-center p-8 border-2 border-dashed border-muted rounded-2xl bg-accent/5">
                    <div className="text-center max-w-sm">
                      <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
                        <TrendingUp className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{isHi ? 'ML परिणाम की प्रतीक्षा' : 'Awaiting ML Results'}</h3>
                      <p className="text-muted-foreground text-sm">
                        {isHi ? 'अपने खेत की उपज क्षमता का गणितीय अनुमान प्राप्त करने के लिए बाईं ओर के मापदंडों को भरें।' : 'Fill out the parameters on the left to get a mathematical estimation of your farm\'s yield capacity.'}
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

export default YieldPrediction;
