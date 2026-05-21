import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CloudRain, Droplets, Thermometer, Wind, MapPin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useLanguage } from '@/context/LanguageContext';
import { indiaData, allStates } from '@/data/indiaData';
import toast from 'react-hot-toast';



// WMO weather code → description + emoji
const wmoCode = (code: number): { label: string; emoji: string } => {
  if (code === 0) return { label: 'Clear Sky', emoji: '☀️' };
  if (code <= 2) return { label: 'Partly Cloudy', emoji: '🌤️' };
  if (code === 3) return { label: 'Overcast', emoji: '☁️' };
  if (code <= 48) return { label: 'Foggy', emoji: '🌫️' };
  if (code <= 55) return { label: 'Drizzle', emoji: '🌦️' };
  if (code <= 65) return { label: 'Rainy', emoji: '🌧️' };
  if (code <= 75) return { label: 'Snow', emoji: '❄️' };
  if (code <= 82) return { label: 'Rain Showers', emoji: '🌧️' };
  if (code <= 86) return { label: 'Snow Showers', emoji: '🌨️' };
  if (code <= 99) return { label: 'Thunderstorm', emoji: '⛈️' };
  return { label: 'Unknown', emoji: '🌡️' };
};

const getDayLabel = (dateStr: string, index: number) => {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[new Date(dateStr).getDay()];
};

interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  rainfall: number;
  pressure: number;
  condition: string;
  emoji: string;
}

interface ForecastDay {
  date: string;
  day: string;
  temp_max: number;
  temp_min: number;
  condition: string;
  emoji: string;
  rainfall: number;
  wind_max: number;
}

const Weather = () => {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchWeather = async () => {
    if (!selectedState || !selectedDistrict) {
      toast.error('Please select both State and District');
      return;
    }

    setLoading(true);
    setCurrent(null);
    setForecast([]);

    try {
      // Step 1: Geocode district → lat/lon using OpenStreetMap Nominatim (free, no key)
      const geoRes = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(selectedDistrict + ', India')}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );

      if (!geoRes.data || geoRes.data.length === 0) {
        toast.error(`Could not locate "${selectedDistrict}". Try a nearby city.`);
        setLoading(false);
        return;
      }

      const { lat, lon, display_name } = geoRes.data[0];
      setCityName(display_name.split(',')[0]);

      // Step 2: Fetch weather from Open-Meteo (free, no API key needed)
      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max` +
        `&timezone=Asia%2FKolkata&forecast_days=7`
      );

      const c = weatherRes.data.current;
      const d = weatherRes.data.daily;

      const cond = wmoCode(c.weather_code);

      setCurrent({
        temp: Math.round(c.temperature_2m),
        feels_like: Math.round(c.apparent_temperature),
        humidity: c.relative_humidity_2m,
        wind_speed: Math.round(c.wind_speed_10m),
        rainfall: c.precipitation ?? 0,
        pressure: Math.round(c.surface_pressure),
        condition: cond.label,
        emoji: cond.emoji,
      });

      const forecastDays: ForecastDay[] = d.time.slice(0, 7).map((date: string, i: number) => {
        const fc = wmoCode(d.weather_code[i]);
        return {
          date,
          day: getDayLabel(date, i),
          temp_max: Math.round(d.temperature_2m_max[i]),
          temp_min: Math.round(d.temperature_2m_min[i]),
          condition: fc.label,
          emoji: fc.emoji,
          rainfall: Math.round((d.precipitation_sum[i] ?? 0) * 10) / 10,
          wind_max: Math.round(d.wind_speed_10m_max[i]),
        };
      });

      setForecast(forecastDays);
      setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }));
      toast.success(`✅ Live weather loaded for ${selectedDistrict}!`);
    } catch (err: any) {
      console.error('Weather fetch error:', err);
      toast.error('Failed to fetch weather data. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-5xl">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="bg-gradient-primary p-4 rounded-2xl text-white w-fit mx-auto mb-4">
              <CloudRain className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-3">{t('weatherPageTitle')}</h1>
            <p className="text-lg text-muted-foreground">{t('weatherPageSubtitle')}</p>
            <Badge variant="outline" className="mt-3 text-primary border-primary px-4 py-1">
              🌐 Powered by Live Weather Data
            </Badge>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-dark shadow-large mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {t('enterLocation')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); fetchWeather(); }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* State */}
                    <div>
                      <Label className="text-sm font-medium">{t('stateLabel')}</Label>
                      <Select
                        onValueChange={(val) => { setSelectedState(val); setSelectedDistrict(''); setCurrent(null); setForecast([]); }}
                        value={selectedState}
                      >
                        <SelectTrigger className="mt-2 h-12">
                          <SelectValue placeholder={t('selectState')} />
                        </SelectTrigger>
                      <SelectContent className="max-h-72 overflow-y-auto">
                          {allStates.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* District */}
                    <div>
                      <Label className="text-sm font-medium">{t('districtLabel')}</Label>
                      <Select
                        onValueChange={(val) => { setSelectedDistrict(val); setCurrent(null); setForecast([]); }}
                        value={selectedDistrict}
                        disabled={!selectedState}
                      >
                        <SelectTrigger className="mt-2 h-12">
                          <SelectValue placeholder={selectedState ? t('enterDistrict') : 'Select state first'} />
                        </SelectTrigger>
                        <SelectContent className="max-h-72 overflow-y-auto">
                          {(indiaData[selectedState] || []).map((d) => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                    {loading
                      ? <><RefreshCw className="mr-2 h-5 w-5 animate-spin" />{t('gettingWeather')}</>
                      : <><CloudRain className="mr-2 h-5 w-5" />{t('getWeather')}</>
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>

            {loading && <LoadingSpinner />}

            {!loading && current && (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="space-y-6">

                {/* Current Weather */}
                <Card className="glass-dark shadow-large overflow-hidden">
                  <div className="bg-gradient-hero p-8 text-white">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-3xl font-bold">{cityName || selectedDistrict}</h3>
                        <p className="text-white/80 text-sm mt-1">{selectedState} · {t('currentWeather')}</p>
                        {lastUpdated && <p className="text-white/60 text-xs mt-1">⏱ Updated at {lastUpdated}</p>}
                      </div>
                      <span className="text-7xl">{current.emoji}</span>
                    </div>
                    <div className="flex items-end gap-4">
                      <p className="text-8xl font-bold">{current.temp}°C</p>
                      <div className="mb-3">
                        <p className="text-2xl font-medium">{current.condition}</p>
                        <p className="text-white/70">Feels like {current.feels_like}°C</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3 bg-accent/30 rounded-xl p-4">
                        <div className="bg-red-500/20 p-2 rounded-lg"><Thermometer className="h-5 w-5 text-red-500" /></div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t('temperature')}</p>
                          <p className="text-xl font-bold">{current.temp}°C</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-accent/30 rounded-xl p-4">
                        <div className="bg-blue-500/20 p-2 rounded-lg"><Droplets className="h-5 w-5 text-blue-500" /></div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t('humidity')}</p>
                          <p className="text-xl font-bold">{current.humidity}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-accent/30 rounded-xl p-4">
                        <div className="bg-cyan-500/20 p-2 rounded-lg"><Wind className="h-5 w-5 text-cyan-500" /></div>
                        <div>
                          <p className="text-xs text-muted-foreground">Wind</p>
                          <p className="text-xl font-bold">{current.wind_speed} km/h</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-accent/30 rounded-xl p-4">
                        <div className="bg-primary/20 p-2 rounded-lg"><CloudRain className="h-5 w-5 text-primary" /></div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t('rainfall')}</p>
                          <p className="text-xl font-bold">{current.rainfall} mm</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                      <div className="bg-accent/20 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">Pressure</p>
                        <p className="font-semibold">{current.pressure} hPa</p>
                      </div>
                      <div className="bg-accent/20 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">Apparent Temp</p>
                        <p className="font-semibold">{current.feels_like}°C</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 7-Day Forecast */}
                {forecast.length > 0 && (
                  <Card className="glass-dark shadow-large">
                    <CardHeader>
                      <CardTitle>📅 7-Day {t('forecast')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {forecast.map((day, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06 }}
                            className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 text-center border border-primary/20 hover:border-primary/50 hover:scale-105 transition-all cursor-default"
                          >
                            <p className="font-bold text-sm">{day.day}</p>
                            <p className="text-xs text-muted-foreground mb-2">{day.date.slice(5)}</p>
                            <span className="text-4xl">{day.emoji}</span>
                            <p className="text-lg font-bold mt-2">{day.temp_max}°</p>
                            <p className="text-xs text-muted-foreground">{day.temp_min}°</p>
                            <p className="text-xs mt-1 text-muted-foreground truncate">{day.condition}</p>
                            {day.rainfall > 0 && (
                              <p className="text-xs text-blue-500 mt-1">🌧 {day.rainfall}mm</p>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 bg-accent/30 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">💡 {t('weatherFarmTip')}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Weather;
