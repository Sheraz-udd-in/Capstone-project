import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sprout, Wheat, Sun, Droplets, Leaf, Package, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { calendarDataEn, calendarDataHi, CropCalendarData } from '@/data/calendarData';

const CropCalendar = () => {
  const { t, language } = useLanguage();
  const calendarData = language === 'hi' ? calendarDataHi : calendarDataEn;
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [activeData, setActiveData] = useState<CropCalendarData | null>(null);

  useEffect(() => {
    if (selectedCrop) {
      const data = calendarData.find((c) => c.id === selectedCrop);
      setActiveData(data || null);
    } else {
      setActiveData(null);
    }
  }, [selectedCrop, calendarData]);

  const getPhaseDetails = (phase: string) => {
    switch (phase) {
      case 'sowing':
        return {
          icon: <Sprout className="w-6 h-6 text-emerald-600" />,
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          gradient: 'from-emerald-500/20 to-transparent',
          label: t('sowingPhase'),
          text: 'text-emerald-700 dark:text-emerald-400'
        };
      case 'growing':
        return {
          icon: <Sun className="w-6 h-6 text-amber-500" />,
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          gradient: 'from-amber-500/20 to-transparent',
          label: t('growingPhase'),
          text: 'text-amber-700 dark:text-amber-400'
        };
      case 'harvesting':
        return {
          icon: <Wheat className="w-6 h-6 text-orange-500" />,
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/20',
          gradient: 'from-orange-500/20 to-transparent',
          label: t('harvestingPhase'),
          text: 'text-orange-700 dark:text-orange-400'
        };
      default:
        return {
          icon: <Package className="w-6 h-6 text-slate-400" />,
          bg: 'bg-slate-500/5',
          border: 'border-slate-200 dark:border-slate-800',
          gradient: 'from-slate-500/5 to-transparent',
          label: 'Off-Season',
          text: 'text-slate-500'
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12 px-4 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-primary/10 mb-6 border border-slate-100 dark:border-slate-700">
              <Calendar className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-600 to-secondary">
              {t('calendarPageTitle')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
              {t('calendarPageSubtitle')}
            </p>
          </motion.div>

          {/* Crop Selector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-12 max-w-md mx-auto relative z-20"
          >
            <div className="p-1 rounded-2xl bg-gradient-to-r from-primary/50 to-secondary/50 shadow-lg">
              <div className="bg-card rounded-xl p-4">
                <label className="block text-sm font-semibold mb-3 text-card-foreground flex items-center gap-2">
                  <Search className="w-4 h-4 text-primary" />
                  {t('selectCropCalendar')}
                </label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="h-14 text-base bg-background/50 border-2 border-primary/20 focus:border-primary transition-colors rounded-xl">
                    <SelectValue placeholder={t('cropCalendarPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {calendarData.map((crop) => (
                      <SelectItem key={crop.id} value={crop.id} className="cursor-pointer py-3 font-medium">
                        {crop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Calendar Display */}
          <AnimatePresence mode="wait">
            {activeData ? (
              <motion.div
                key={activeData.id}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {activeData.months.map((monthData, index) => {
                  const phaseStyle = getPhaseDetails(monthData.phase);
                  const isActive = monthData.phase !== 'none';

                  return (
                    <motion.div key={index} variants={itemVariants} className="h-full">
                      <Card 
                        className={`h-full group relative overflow-hidden transition-all duration-300 ${
                          isActive 
                            ? 'hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-primary/10' 
                            : 'opacity-70 bg-slate-50/50 dark:bg-slate-800/20'
                        }`}
                      >
                        {isActive && (
                          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${phaseStyle.gradient} rounded-bl-full -z-10 opacity-50 group-hover:opacity-100 transition-opacity`} />
                        )}
                        
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h3 className="text-2xl font-bold text-foreground mb-1">{monthData.month}</h3>
                              {isActive && (
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${phaseStyle.bg} ${phaseStyle.text}`}>
                                  {phaseStyle.label}
                                </span>
                              )}
                            </div>
                            <div className={`p-3 rounded-2xl ${phaseStyle.bg} shadow-inner`}>
                              {phaseStyle.icon}
                            </div>
                          </div>

                          <div className="space-y-3">
                            {monthData.activities.length > 0 ? (
                              monthData.activities.map((activity, actIndex) => (
                                <div key={actIndex} className="flex items-start gap-3">
                                  <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                                    monthData.phase === 'sowing' ? 'bg-emerald-500' :
                                    monthData.phase === 'growing' ? 'bg-amber-500' :
                                    monthData.phase === 'harvesting' ? 'bg-orange-500' : 'bg-slate-400'
                                  }`} />
                                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                    {activity}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <div className="flex items-center gap-2 text-muted-foreground/60 italic mt-4">
                                <Leaf className="w-4 h-4" />
                                <span className="text-sm">Field rests or preparation</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              selectedCrop === '' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 px-4 text-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <img 
                      src="/vite.svg" 
                      alt="Select Crop" 
                      className="w-32 h-32 opacity-20 mb-8 relative z-10 grayscale"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Ready to plan your season?</h3>
                  <p className="text-muted-foreground max-w-md">
                    Select a crop from the dropdown above to view its complete 12-month agricultural calendar and key activities.
                  </p>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CropCalendar;
