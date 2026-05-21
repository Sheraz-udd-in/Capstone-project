import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { apiService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';

interface QueryForm {
  question: string;
}

interface PastQuery {
  _id: string;
  query: string;
  answer?: string;
  status: 'pending' | 'answered';
  createdAt: string;
}

const AskExpert = () => {
  const { t } = useLanguage();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<QueryForm>();
  const { user } = useAuth();
  const [pastQueries, setPastQueries] = useState<PastQuery[]>([]);

  const fetchPastQueries = async () => {
    try {
      const data = await apiService.getMyQueries();
      setPastQueries(data.data || []);
    } catch (error) {
      console.error('Failed to fetch past queries:', error);
    }
  };

  useEffect(() => {
    fetchPastQueries();
  }, []);

  const onSubmit = async (data: QueryForm) => {
    setLoading(true);
    try {
      await apiService.submitQuery({
        farmerName: user?.name || 'Anonymous',
        farmerEmail: user?.email || 'anonymous@example.com',
        district: user?.district || 'Unknown',
        query: data.question,
      });
      setShowSuccessDialog(true);
      reset();
      fetchPastQueries(); // Refresh list after submitting
      toast.success(t('querySuccessTitle'));
    } catch (error) {
      toast.error('Failed to submit query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="bg-gradient-primary p-4 rounded-2xl text-white w-fit mx-auto mb-4">
              <MessageSquare className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-3">{t('askPageTitle')}</h1>
            <p className="text-lg text-muted-foreground">{t('askPageSubtitle')}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-dark shadow-large">
              <CardHeader>
                <CardTitle>{t('submitQuery')}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">{t('expertResponseTime')}</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium">{t('yourName')}</Label>
                      <Input value={user?.name || ''} disabled className="mt-2 h-12 text-base bg-muted" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">{t('yourDistrict')}</Label>
                      <Input value={user?.district || ''} disabled className="mt-2 h-12 text-base bg-muted" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="question" className="text-sm font-medium">{t('yourQuestion')}</Label>
                    <Textarea
                      id="question"
                      placeholder={t('questionPlaceholder')}
                      className="mt-2 min-h-[200px] text-base resize-none"
                      {...register('question', {
                        required: t('questionRequired'),
                        minLength: { value: 20, message: t('questionMinLength') },
                        maxLength: { value: 1000, message: t('questionMaxLength') },
                      })}
                    />
                    {errors.question && (
                      <p className="text-sm text-destructive mt-1">{errors.question.message}</p>
                    )}
                  </div>

                  <div className="bg-accent/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{t('betterResponsesTips')}</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• {t('queryTip1')}</li>
                      <li>• {t('queryTip2')}</li>
                      <li>• {t('queryTip3')}</li>
                      <li>• {t('queryTip4')}</li>
                    </ul>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                    {loading ? t('submittingQuery') : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        {t('submitToExpert')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Past Queries Section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8">
              <Card className="glass-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl">{t('myQueriesTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pastQueries.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      {t('noQueriesFound')}
                    </div>
                  ) : (
                    pastQueries.map((q) => (
                      <div key={q._id} className="border border-border/50 bg-background/40 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium opacity-80">
                            {new Date(q.createdAt).toLocaleDateString()}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${q.status === 'answered' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                            {q.status === 'answered' ? t('statusAnswered') : t('statusPending')}
                          </span>
                        </div>
                        <p className="text-base mb-3">{q.query}</p>
                        
                        {q.status === 'answered' && q.answer && (
                          <div className="bg-accent/20 rounded p-3 border-l-4 border-primary">
                            <p className="text-sm font-semibold mb-1 text-primary">{t('adminResponse')}</p>
                            <p className="text-sm text-foreground/90">{q.answer}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8">
              <Card className="glass-dark">
                <CardHeader>
                  <CardTitle>{t('faqTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold mb-1">{t('faq1Q')}</h4>
                    <p className="text-sm text-muted-foreground">{t('faq1A')}</p>
                  </div>
                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-semibold mb-1">{t('faq2Q')}</h4>
                    <p className="text-sm text-muted-foreground">{t('faq2A')}</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold mb-1">{t('faq3Q')}</h4>
                    <p className="text-sm text-muted-foreground">{t('faq3A')}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto bg-primary/20 p-4 rounded-full w-fit mb-4">
              <MessageSquare className="h-12 w-12 text-primary" />
            </div>
            <DialogTitle className="text-center text-2xl">{t('querySuccessTitle')}</DialogTitle>
            <DialogDescription className="text-center pt-4">{t('querySuccessDesc')}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowSuccessDialog(false)} variant="hero">{t('gotIt')}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AskExpert;
