import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { apiService } from '@/services/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';

interface Query {
  _id: string;
  farmerName: string;
  district: string;
  query: string;
  date: string;
  status: 'pending' | 'answered';
}

const AdminPanel = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedQueryId, setSelectedQueryId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/admin-login');
      return;
    }

    fetchQueries();
  }, [isAuthenticated, user, navigate]);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const response: any = await apiService.getQueries();
      setQueries(response.data);
    } catch (error) {
      console.error('Failed to fetch queries');
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async () => {
    if (!selectedQueryId || !replyText.trim()) return;
    
    setSubmittingReply(true);
    try {
      await apiService.answerQuery(selectedQueryId, replyText);
      toast.success('Reply sent successfully!');
      setReplyModalOpen(false);
      setReplyText('');
      fetchQueries();
    } catch (error) {
      toast.error('Failed to send reply');
    } finally {
      setSubmittingReply(false);
    }
  };

  const openReplyModal = (queryId: string) => {
    setSelectedQueryId(queryId);
    setReplyText('');
    setReplyModalOpen(true);
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const stats = [
    {
      title: 'Total Farmers',
      value: '2,547',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Active Queries',
      value: queries.filter(q => q.status === 'pending').length.toString(),
      icon: MessageSquare,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Resolved Queries',
      value: queries.filter(q => q.status === 'answered').length.toString(),
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-secondary p-3 rounded-xl text-white">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">Admin Panel</h1>
                <p className="text-muted-foreground">Manage farmer queries and system overview</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`${stat.bgColor} p-3 rounded-xl`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Queries Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-dark shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Farmer Queries
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Farmer Name</TableHead>
                          <TableHead>District</TableHead>
                          <TableHead>Query</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {queries.map((query) => (
                          <TableRow key={query._id || query.id} className="hover:bg-accent/50">
                            <TableCell className="font-medium">#{query._id ? query._id.substring(0, 6) : '...'}</TableCell>
                            <TableCell>{query.farmerName}</TableCell>
                            <TableCell>{query.district}</TableCell>
                            <TableCell className="max-w-md truncate">{query.query}</TableCell>
                            <TableCell>{new Date(query.date || Date.now()).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge
                                variant={query.status === 'answered' ? 'default' : 'secondary'}
                                className={query.status === 'answered' 
                                  ? 'bg-primary/20 text-primary hover:bg-primary/30' 
                                  : 'bg-secondary/20 text-secondary hover:bg-secondary/30'
                                }
                              >
                                {query.status === 'answered' ? '✓ Answered' : '⏳ Pending'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {query.status === 'pending' && (
                                <Button size="sm" onClick={() => openReplyModal(query._id)}>
                                  Reply
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {!loading && queries.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">No queries found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Dialog open={replyModalOpen} onOpenChange={setReplyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Query</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Type your answer here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyModalOpen(false)}>Cancel</Button>
            <Button onClick={handleReplySubmit} disabled={!replyText.trim() || submittingReply}>
              {submittingReply ? 'Sending...' : 'Send Reply'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminPanel;
