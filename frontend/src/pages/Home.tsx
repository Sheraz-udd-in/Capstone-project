import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  Sprout,
  CloudRain,
  MessageSquare,
  TrendingUp,
  Users,
  Shield,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Sprout,
      title: t('cropRecommendation'),
      description: t('cropRecommendationHomeDesc'),
      emoji: '🌱',
      link: '/crop-recommendation',
    },
    {
      icon: TrendingUp,
      title: t('fertilizerGuide'),
      description: t('fertilizerGuideHomeDesc'),
      emoji: '💧',
      link: '/fertilizer-guide',
    },
    {
      icon: CloudRain,
      title: t('weather'),
      description: t('weatherHomeDesc'),
      emoji: '🌦️',
      link: '/weather',
    },
    {
      icon: MessageSquare,
      title: t('askExpert'),
      description: t('askExpertHomeDesc'),
      emoji: '🎤',
      link: '/ask-expert',
    },
    {
      icon: Users,
      title: t('communitySupport'),
      description: t('communitySupportDesc'),
      emoji: '👥',
      link: '/about',
    },
    {
      icon: Shield,
      title: t('dataSecurity'),
      description: t('dataSecurityDesc'),
      emoji: '🔒',
      link: '/dashboard',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
                <Link to="/signup">
                  {t('getStarted')} 🚀
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
                <Link to="/login">
                  {t('login')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem & Vision Section */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">{t('empoweringTitle')}</h2>
            <p className="text-lg text-muted-foreground mb-4">
              {t('empoweringDesc1')}
            </p>
            <p className="text-lg text-muted-foreground">
              {t('empoweringDesc2')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('features')} ✨
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('featuresSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={feature.link} className="block h-full">
                  <Card className="card-hover h-full cursor-pointer hover:border-primary/50 overflow-hidden group relative">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                    <CardContent className="p-6">
                      <div className="bg-gradient-primary p-3 rounded-xl text-white w-fit mb-4 group-hover:scale-110 transition-transform">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <span className="text-2xl">{feature.emoji}</span>
                      </div>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t('ctaSubtitle')}
            </p>
            <Button asChild variant="glass" size="xl" className="bg-white text-primary hover:bg-white/90">
              <Link to="/signup">
                {t('ctaButton')}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
