import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, TrendingUp, CloudRain, MessageSquare, BarChart3, Calendar, Target, Bug } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardCard from '@/components/DashboardCard';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const dashboardItems = [
    {
      title: t('cropRecommendation'),
      description: t('cropRecommendationDesc'),
      icon: Sprout,
      to: '/crop-recommendation',
      emoji: '🌱',
      disabled: false,
    },
    {
      title: t('fertilizerGuide'),
      description: t('fertilizerGuideDesc'),
      icon: TrendingUp,
      to: '/fertilizer-guide',
      emoji: '💧',
      disabled: false,
    },
    {
      title: t('weather'),
      description: t('weatherDesc'),
      icon: CloudRain,
      to: '/weather',
      emoji: '🌦️',
      disabled: false,
    },
    {
      title: t('askExpert'),
      description: t('askExpertDesc'),
      icon: MessageSquare,
      to: '/ask-expert',
      emoji: '🎤',
      disabled: false,
    },
    {
      title: t('farmAnalytics'),
      description: t('farmAnalyticsDesc'),
      icon: BarChart3,
      to: '/analytics',
      emoji: '📊',
      disabled: false,
    },
    {
      title: t('predictYield'),
      description: t('predictYieldDesc'),
      icon: Target,
      to: '/yield-prediction',
      emoji: '🎯',
      disabled: false,
    },
    {
      title: t('detectDisease'),
      description: t('detectDiseaseDesc'),
      icon: Bug,
      to: '/disease-detection',
      emoji: '🔍',
      disabled: false,
    },
    {
      title: t('cropCalendar'),
      description: t('cropCalendarDesc'),
      icon: Calendar,
      to: '/calendar',
      emoji: '📅',
      disabled: false,
    },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-gradient-hero rounded-2xl p-8 text-white shadow-large">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {user?.name}! 👨‍🌾
              </h1>
              <p className="text-white/90 text-lg">
                {t('welcomeMessage')}
              </p>
              <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/80 text-sm">{t('stateLabel')}</p>
                  <p className="font-semibold text-lg">{user?.state || '—'}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/80 text-sm">{t('districtLabel')}</p>
                  <p className="font-semibold text-lg">{user?.district || '—'}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white/80 text-sm">{t('statusLabel')}</p>
                  <p className="font-semibold text-lg">{t('statusActive')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dashboard Cards */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">{t('advisoryTools')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardItems.map((item, index) => (
                <DashboardCard key={index} {...item} index={index} />
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-accent/30 rounded-xl p-6 border border-border"
          >
            <h3 className="text-xl font-bold mb-4">{t('todaysTips')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">🌱</span>
                <p className="text-muted-foreground">{t('tip1')}</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">🌦️</span>
                <p className="text-muted-foreground">{t('tip2')}</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">🐄</span>
                <p className="text-muted-foreground">{t('tip3')}</p>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
