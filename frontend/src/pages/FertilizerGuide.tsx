import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Droplet, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

interface FertilizerData {
  crop: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  organic: string;
  appTips: { en: string; hi: string }[];
  precautions: { en: string; hi: string }[];
}

const fertilizerDB: Record<string, FertilizerData> = {
  Rice: {
    crop: 'Rice', nitrogen: '120 kg/ha', phosphorus: '60 kg/ha', potassium: '40 kg/ha',
    organic: '10 tons/ha FYM or Compost',
    appTips: [
      { en: 'Apply 1/3 N at transplanting, 1/3 at tillering, 1/3 at panicle initiation', hi: 'रोपाई पर 1/3 नाइट्रोजन, कंसे निकलते समय 1/3, और बाली बनते समय 1/3 डालें' },
      { en: 'Apply P and K as basal dose before transplanting', hi: 'रोपाई से पहले P और K को आधार खुराक के रूप में डालें' },
      { en: 'Use zinc sulphate 25 kg/ha if zinc deficiency is observed', hi: 'जिंक की कमी होने पर जिंक सल्फेट 25 kg/ha उपयोग करें' },
    ],
    precautions: [
      { en: 'Avoid N application during heavy rainfall', hi: 'भारी बारिश के दौरान नाइट्रोजन न डालें' },
      { en: 'Do not apply fertilizer to waterlogged fields', hi: 'जलभराव वाले खेतों में उर्वरक न डालें' },
    ],
  },
  Wheat: {
    crop: 'Wheat', nitrogen: '120 kg/ha', phosphorus: '60 kg/ha', potassium: '40 kg/ha',
    organic: '8–10 tons/ha FYM',
    appTips: [
      { en: 'Apply half N + full P + full K as basal; remaining N at first irrigation', hi: 'आधा N + पूरा P + पूरा K आधार खुराक के रूप में; शेष N पहली सिंचाई पर डालें' },
      { en: 'Use urea as top-dressing at crown root initiation stage', hi: 'ताज की जड़ बनने के समय यूरिया को ऊपरी खुराक के रूप में डालें' },
      { en: 'Foliar spray of 2% urea at grain filling improves protein content', hi: 'दाना भरते समय 2% यूरिया का पर्णीय छिड़काव प्रोटीन बढ़ाता है' },
    ],
    precautions: [
      { en: 'Excessive N causes lodging', hi: 'अधिक नाइट्रोजन से फसल गिर सकती है' },
      { en: 'Avoid late N application to prevent susceptibility to rust', hi: 'रतुआ रोग से बचने के लिए देर से नाइट्रोजन न डालें' },
    ],
  },
  Cotton: {
    crop: 'Cotton', nitrogen: '150 kg/ha', phosphorus: '70 kg/ha', potassium: '60 kg/ha',
    organic: '12 tons/ha Compost',
    appTips: [
      { en: 'Apply N in 3 splits: basal, squaring, and boll formation stages', hi: 'N को 3 बार में डालें: आधार, कली बनते समय, और टिंडा बनते समय' },
      { en: 'Apply P and K fully as basal dose', hi: 'P और K पूरी तरह आधार खुराक के रूप में डालें' },
      { en: 'Boron 0.5 kg/ha improves boll setting', hi: 'बोरॉन 0.5 kg/ha टिंडा बनने में सुधार करता है' },
    ],
    precautions: [
      { en: 'Over-fertilization causes excessive vegetative growth', hi: 'अधिक उर्वरक से अत्यधिक वानस्पतिक वृद्धि होती है' },
      { en: 'Avoid K deficiency — causes leaf scorch', hi: 'K की कमी से पत्तियां झुलस जाती हैं — इससे बचें' },
    ],
  },
  Sugarcane: {
    crop: 'Sugarcane', nitrogen: '275 kg/ha', phosphorus: '65 kg/ha', potassium: '115 kg/ha',
    organic: '20 tons/ha Pressmud Compost',
    appTips: [
      { en: 'Apply N in 4 splits over the crop duration', hi: 'फसल अवधि में N को 4 बार में डालें' },
      { en: 'Apply P and K as basal at planting', hi: 'रोपाई के समय P और K को आधार खुराक के रूप में डालें' },
      { en: 'Apply trash mulching to conserve soil moisture', hi: 'मिट्टी की नमी बचाने के लिए फसल अवशेष मल्चिंग करें' },
    ],
    precautions: [
      { en: 'Excess N delays ripening and reduces sugar recovery', hi: 'अधिक N पकने में देरी करता है और चीनी की मात्रा घटाता है' },
      { en: 'Ensure proper drainage before top-dressing', hi: 'ऊपरी खुराक देने से पहले उचित जल निकासी सुनिश्चित करें' },
    ],
  },
  Maize: {
    crop: 'Maize', nitrogen: '120 kg/ha', phosphorus: '60 kg/ha', potassium: '40 kg/ha',
    organic: '8 tons/ha FYM',
    appTips: [
      { en: 'Apply 1/3 N at sowing, 1/3 at knee-high stage, 1/3 at tasselling', hi: 'बुवाई पर 1/3 N, घुटने ऊंचाई पर 1/3, और सिट्टा निकलते समय 1/3 डालें' },
      { en: 'Apply full P and K as basal', hi: 'पूरा P और K आधार खुराक के रूप में डालें' },
      { en: 'Zinc sulphate 25 kg/ha improves germination', hi: 'जिंक सल्फेट 25 kg/ha अंकुरण में सुधार करता है' },
    ],
    precautions: [
      { en: 'Avoid waterlogging after fertilizer application', hi: 'उर्वरक डालने के बाद जलभराव से बचें' },
      { en: 'Do not apply N in a band close to seed', hi: 'बीज के पास N को बैंड में न डालें' },
    ],
  },
  Bajra: {
    crop: 'Bajra', nitrogen: '80 kg/ha', phosphorus: '40 kg/ha', potassium: '40 kg/ha',
    organic: '6 tons/ha FYM',
    appTips: [
      { en: 'Apply 50% N and full P & K as basal; remaining N at tillering', hi: '50% N और पूरा P & K आधार खुराक में; शेष N कंसे निकलते समय' },
      { en: 'Gypsum 200 kg/ha on sulphur-deficient soils', hi: 'सल्फर की कमी वाली मिट्टी पर जिप्सम 200 kg/ha डालें' },
    ],
    precautions: [
      { en: 'Excess N causes lodging in bajra', hi: 'अधिक N से बाजरा गिर सकता है' },
      { en: 'Avoid applying on very dry soils', hi: 'बहुत सूखी मिट्टी पर उर्वरक न डालें' },
    ],
  },
  Jowar: {
    crop: 'Jowar', nitrogen: '80 kg/ha', phosphorus: '40 kg/ha', potassium: '30 kg/ha',
    organic: '5 tons/ha FYM',
    appTips: [
      { en: 'Apply 50% N at sowing and 50% at knee-high stage', hi: 'बुवाई पर 50% N और घुटने ऊंचाई पर 50% डालें' },
      { en: 'Foliar spray of 1% urea at panicle initiation helps grain filling', hi: 'बाली बनते समय 1% यूरिया का छिड़काव दाना भरने में मदद करता है' },
    ],
    precautions: [
      { en: 'Excess N leads to lodging', hi: 'अधिक N से फसल गिर सकती है' },
      { en: 'Do not apply fertilizer during drought stress', hi: 'सूखे के समय उर्वरक न डालें' },
    ],
  },
  Groundnut: {
    crop: 'Groundnut', nitrogen: '25 kg/ha', phosphorus: '50 kg/ha', potassium: '75 kg/ha',
    organic: '5 tons/ha FYM + Rhizobium culture',
    appTips: [
      { en: 'Seed inoculation with Rhizobium and PSB before sowing', hi: 'बुवाई से पहले राइजोबियम और PSB से बीज उपचार करें' },
      { en: 'Apply gypsum 400 kg/ha at pegging stage', hi: 'खूंटी बनते समय जिप्सम 400 kg/ha डालें' },
      { en: 'Boron and molybdenum correction improves yield', hi: 'बोरॉन और मोलिब्डेनम की कमी दूर करने से उपज बढ़ती है' },
    ],
    precautions: [
      { en: 'Excess N suppresses nodulation', hi: 'अधिक N ग्रंथि निर्माण को दबाता है' },
      { en: 'K deficiency causes crinkle leaf', hi: 'K की कमी से पत्तियां सिकुड़ जाती हैं' },
    ],
  },
  Soybean: {
    crop: 'Soybean', nitrogen: '30 kg/ha', phosphorus: '60 kg/ha', potassium: '40 kg/ha',
    organic: '5 tons/ha Compost + Rhizobium',
    appTips: [
      { en: 'Treat seed with Rhizobium + PSB + Trichoderma', hi: 'बीज को राइजोबियम + PSB + ट्राइकोडर्मा से उपचारित करें' },
      { en: 'Apply P as basal for good nodulation', hi: 'अच्छी ग्रंथि वृद्धि के लिए P आधार खुराक में डालें' },
      { en: 'Foliar spray of 0.5% ZnSO4 at podding stage', hi: 'फली बनते समय 0.5% ZnSO4 का पर्णीय छिड़काव करें' },
    ],
    precautions: [
      { en: 'High N reduces biological N fixation', hi: 'अधिक N जैविक नाइट्रोजन स्थिरीकरण को कम करता है' },
      { en: 'Test soil pH — soybean prefers 6.0–6.5', hi: 'मिट्टी का pH जांचें — सोयाबीन 6.0–6.5 पसंद करता है' },
    ],
  },
  Mustard: {
    crop: 'Mustard', nitrogen: '80 kg/ha', phosphorus: '40 kg/ha', potassium: '40 kg/ha',
    organic: '5 tons/ha FYM + sulphur 30 kg/ha',
    appTips: [
      { en: 'Apply full N as 2 splits: basal + first irrigation', hi: 'पूरा N 2 भागों में डालें: आधार + पहली सिंचाई' },
      { en: 'Sulphur application improves oil content in mustard', hi: 'सल्फर डालने से सरसों में तेल की मात्रा बढ़ती है' },
    ],
    precautions: [
      { en: 'Avoid excess N — causes delayed maturity', hi: 'अधिक N से परिपक्वता में देरी होती है' },
      { en: 'Apply sulphur to correct deficiency symptoms', hi: 'कमी के लक्षण दिखने पर सल्फर डालें' },
    ],
  },
  Tomato: {
    crop: 'Tomato', nitrogen: '120 kg/ha', phosphorus: '60 kg/ha', potassium: '100 kg/ha',
    organic: '25 tons/ha FYM or Vermicompost',
    appTips: [
      { en: 'Apply P and K fully as basal; split N into 4 applications', hi: 'P और K पूरा आधार में; N को 4 भागों में बांटें' },
      { en: 'Calcium nitrate spray prevents blossom-end rot', hi: 'कैल्शियम नाइट्रेट छिड़काव से फूल-सिरे का सड़न रोकें' },
      { en: 'Drip fertigation improves efficiency by 30%', hi: 'ड्रिप फर्टिगेशन से दक्षता 30% बढ़ती है' },
    ],
    precautions: [
      { en: 'Excess N causes foliage growth at expense of fruits', hi: 'अधिक N से पत्तियां बढ़ती हैं, फल कम लगते हैं' },
      { en: 'Monitor for Mg & Ca deficiency', hi: 'Mg और Ca की कमी पर नज़र रखें' },
    ],
  },
  Potato: {
    crop: 'Potato', nitrogen: '150 kg/ha', phosphorus: '100 kg/ha', potassium: '200 kg/ha',
    organic: '20 tons/ha FYM',
    appTips: [
      { en: 'Apply half N + full P + full K at planting; remaining N at earthing up', hi: 'रोपाई पर आधा N + पूरा P + पूरा K; शेष N मिट्टी चढ़ाते समय' },
      { en: 'High K improves tuber quality and starch content', hi: 'अधिक K कंद की गुणवत्ता और स्टार्च बढ़ाता है' },
      { en: 'Spray 0.5% ZnSO4 if zinc deficiency is observed', hi: 'जिंक की कमी होने पर 0.5% ZnSO4 का छिड़काव करें' },
    ],
    precautions: [
      { en: 'Excess N causes excessive vegetative growth', hi: 'अधिक N से अत्यधिक वानस्पतिक वृद्धि होती है' },
      { en: 'Avoid K deficiency — causes discolouration of tubers', hi: 'K की कमी से कंदों का रंग बदल जाता है — इससे बचें' },
    ],
  },
  Onion: {
    crop: 'Onion', nitrogen: '100 kg/ha', phosphorus: '50 kg/ha', potassium: '100 kg/ha',
    organic: '15 tons/ha FYM',
    appTips: [
      { en: 'Split N into 3 doses: transplanting, 3 weeks later, and 6 weeks after', hi: 'N को 3 बार में डालें: रोपाई, 3 सप्ताह बाद, और 6 सप्ताह बाद' },
      { en: 'High K improves bulb quality and shelf life', hi: 'अधिक K बल्ब की गुणवत्ता और भंडारण क्षमता बढ़ाता है' },
      { en: 'Boron deficiency causes hollow stem — apply 1 kg/ha boron', hi: 'बोरॉन की कमी से खोखला तना — 1 kg/ha बोरॉन डालें' },
    ],
    precautions: [
      { en: 'Stop N 30 days before harvest for good keeping quality', hi: 'अच्छी भंडारण गुणवत्ता के लिए कटाई से 30 दिन पहले N बंद करें' },
      { en: 'Excess N causes scales to remain green', hi: 'अधिक N से बाहरी छिलके हरे रह जाते हैं' },
    ],
  },
};

const cropList = Object.keys(fertilizerDB).sort();

const FertilizerGuide = () => {
  const { t, language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [fertData, setFertData] = useState<FertilizerData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCrop) return;
    setFertData(fertilizerDB[selectedCrop] || null);
  };

  const tip = (item: { en: string; hi: string }) => language === 'hi' ? item.hi : item.en;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="bg-gradient-secondary p-4 rounded-2xl text-white w-fit mx-auto mb-4">
              <Droplet className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-3">{t('fertPageTitle')}</h1>
            <p className="text-lg text-muted-foreground">{t('fertPageSubtitle')}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-dark shadow-large mb-8">
              <CardHeader><CardTitle>{t('selectYourCrop')}</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="crop" className="text-sm font-medium">{t('cropType')}</Label>
                    <Select onValueChange={(v) => { setSelectedCrop(v); setFertData(null); }} value={selectedCrop}>
                      <SelectTrigger className="mt-2 h-12">
                        <SelectValue placeholder={t('selectCropPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className="max-h-72 overflow-y-auto">
                        {cropList.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={!selectedCrop}>
                    {t('getFertGuide')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {fertData && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="space-y-6">
                <Card className="glass-dark shadow-large">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      {t('npkRequirements')} {fertData.crop}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.div whileHover={{ scale: 1.04 }} className="bg-primary/10 rounded-xl p-6 text-center border-2 border-primary/20">
                        <div className="text-5xl font-black text-primary mb-2">N</div>
                        <p className="text-sm text-muted-foreground mb-1">{t('nitrogen')}</p>
                        <p className="text-xl font-bold">{fertData.nitrogen}</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.04 }} className="bg-secondary/10 rounded-xl p-6 text-center border-2 border-secondary/20">
                        <div className="text-5xl font-black text-secondary mb-2">P</div>
                        <p className="text-sm text-muted-foreground mb-1">{t('phosphorus')}</p>
                        <p className="text-xl font-bold">{fertData.phosphorus}</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.04 }} className="bg-accent rounded-xl p-6 text-center border-2 border-primary/20">
                        <div className="text-5xl font-black text-primary mb-2">K</div>
                        <p className="text-sm text-muted-foreground mb-1">{t('potassium')}</p>
                        <p className="text-xl font-bold">{fertData.potassium}</p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-dark shadow-large">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-6 w-6 text-secondary" />
                      {t('organicFertRec')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="bg-secondary/10 rounded-xl p-5 border-2 border-secondary/20">
                      <p className="text-2xl font-bold text-secondary mb-1">{fertData.organic}</p>
                      <p className="text-muted-foreground text-sm">{t('organicManureTip')}</p>
                    </div>

                    <div className="bg-accent/30 rounded-xl p-5">
                      <h4 className="font-semibold mb-3">{t('applicationTips')}</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {fertData.appTips.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary font-bold mt-0.5">•</span>
                            {tip(item)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-primary/10 rounded-xl p-5">
                      <h4 className="font-semibold mb-3">{t('importantPrecautions')}</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {fertData.precautions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-destructive font-bold mt-0.5">•</span>
                            {tip(item)}
                          </li>
                        ))}
                      </ul>
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

export default FertilizerGuide;
