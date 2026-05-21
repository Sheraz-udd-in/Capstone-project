import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-primary p-2 rounded-xl">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">
                {t('brandName')}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('brandDesc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/admin-login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('adminLogin')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{t('servicesTitle')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/crop-recommendation" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('cropRecommendation')}
                </Link>
              </li>
              <li>
                <Link to="/fertilizer-guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('fertilizerGuide')}
                </Link>
              </li>
              <li>
                <Link to="/weather" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('weather')}
                </Link>
              </li>
              <li>
                <Link to="/ask-expert" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('askExpert')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                info@cropadvisory.in
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +91 1800-XXX-XXXX
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Punjab, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Smart Crop Advisory System. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
