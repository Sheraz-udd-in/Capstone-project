import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  Sprout,
  Target,
  Heart,
  Lightbulb,
  Globe,
  Users,
  TrendingUp,
  Award,
  Leaf,
  ShieldCheck,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '120+', label: t('statFarmersHelped'), icon: Users, emoji: '👨‍🌾' },
    { value: '3', label: t('statStatesCovered'), icon: Globe, emoji: '🗺️' },
    { value: '20%', label: t('statYieldIncrease'), icon: TrendingUp, emoji: '📈' },
    { value: '92%', label: t('statSatisfaction'), icon: Award, emoji: '⭐' },
  ];

  const values = [
    {
      icon: Leaf,
      title: t('valueSustainability'),
      description: t('valueSustainabilityDesc'),
      emoji: '🌿',
    },
    {
      icon: Lightbulb,
      title: t('valueInnovation'),
      description: t('valueInnovationDesc'),
      emoji: '💡',
    },
    {
      icon: Heart,
      title: t('valueFarmerFirst'),
      description: t('valueFarmerFirstDesc'),
      emoji: '❤️',
    },
    {
      icon: ShieldCheck,
      title: t('valueTrust'),
      description: t('valueTrustDesc'),
      emoji: '🔒',
    },
  ];

  const team = [
    {
      name: t('member1Name'),
      role: t('member1Role'),
      bio: t('member1Bio'),
      emoji: '🎨',
      gradient: 'from-pink-100 to-purple-100',
    },
    {
      name: t('member2Name'),
      role: t('member2Role'),
      bio: t('member2Bio'),
      emoji: '👨‍💻',
      gradient: 'from-primary/20 to-accent',
    },
    {
      name: t('member3Name'),
      role: t('member3Role'),
      bio: t('member3Bio'),
      emoji: '🛠️',
      gradient: 'from-secondary/20 to-orange-100',
    },
    {
      name: t('member4Name'),
      role: t('member4Role'),
      bio: t('member4Bio'),
      emoji: '🤖',
      gradient: 'from-green-100 to-teal-100',
    },
  ];

  const milestones = [
    { year: t('phase1Label'), event: t('phase1Event') },
    { year: t('phase2Label'), event: t('phase2Event') },
    { year: t('phase3Label'), event: t('phase3Event') },
    { year: t('phase4Label'), event: t('phase4Event') },
    { year: t('phase5Label'), event: t('phase5Event') },
    { year: t('phase6Label'), event: t('phase6Event') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sprout className="h-4 w-4" />
              {t('aboutOurStory')}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              {t('aboutHeroTitle')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('aboutHeroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Target,
                title: t('aboutOurMission'),
                emoji: '🎯',
                text: t('aboutMissionText'),
              },
              {
                icon: Globe,
                title: t('aboutOurVision'),
                emoji: '🌏',
                text: t('aboutVisionText'),
              },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }}>
                <Card className="h-full card-hover">
                  <CardContent className="p-8">
                    <div className="bg-gradient-primary p-3 rounded-xl text-white w-fit mb-4">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <h2 className="text-2xl font-bold">{item.title}</h2>
                      <span className="text-2xl">{item.emoji}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            {...fadeUp}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          >
            {t('aboutImpactTitle')}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-4xl mb-2">{stat.emoji}</div>
                <div className="text-4xl md:text-5xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('aboutValuesTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('aboutValuesSubtitle')}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="h-full card-hover">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{v.emoji}</div>
                    <div className="bg-gradient-primary p-2 rounded-xl text-white w-fit mx-auto mb-4">
                      <v.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('aboutJourneyTitle')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('aboutJourneySubtitle')}
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 -translate-x-1/2" />
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-4 mb-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="md:w-1/2 flex md:justify-center">
                  <div className="bg-gradient-primary text-white text-sm font-bold px-3 py-1.5 rounded-full whitespace-nowrap z-10">
                    {m.year}
                  </div>
                </div>
                <Card className={`md:w-1/2 card-hover ${i % 2 === 0 ? '' : 'md:text-right'}`}>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{m.event}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('aboutTeamTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('aboutTeamSubtitle')}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="h-full card-hover overflow-hidden">
                  <div className={`bg-gradient-to-br ${member.gradient} py-10 flex justify-center text-6xl`}>
                    {member.emoji}
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-base mb-0.5">{member.name}</h3>
                    <p className="text-xs text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('aboutCtaTitle')}</h2>
            <p className="text-lg text-white/90 mb-8">
              {t('aboutCtaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90 font-semibold">
                <Link to="/signup">{t('getStartedFree')}</Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
                <Link to="/crop-recommendation">{t('exploreServices')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
