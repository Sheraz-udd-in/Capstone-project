import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Shield, User, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { apiService } from '@/services/api';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface AdminLoginForm {
  username: string;
  password: string;
}

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<AdminLoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: AdminLoginForm) => {
    try {
      // Map 'admin' username to the seeded admin email
      const username = data.username.trim().toLowerCase();
      const email = username === 'admin' ? 'admin@admin.com' : username;
      
      const response = await apiService.auth.adminLogin({
        email,
        password: data.password
      });

      if (response.success) {
        login(response.data.user, response.data.token);
        toast.success('Admin login successful! 🎉');
        navigate('/admin');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      toast.error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="glass-dark shadow-large border-2 border-secondary/30">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-secondary p-4 rounded-2xl text-white w-fit mx-auto mb-4">
                <Shield className="h-10 w-10" />
              </div>
              <CardTitle className="text-3xl font-bold gradient-text">
                Admin Login
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Secure access for administrators 🔐
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter admin username"
                      className="pl-10 h-12 text-base"
                      {...register('username', {
                        required: 'Username is required',
                      })}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-destructive mt-1">{errors.username.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter admin password"
                      className="pl-10 pr-10 h-12 text-base"
                      {...register('password', {
                        required: 'Password is required',
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/30">
                  <p className="text-sm text-muted-foreground">
                    🔐 <strong>Demo Credentials:</strong><br />
                    Username: <code className="bg-muted px-2 py-1 rounded">admin</code><br />
                    Password: <code className="bg-muted px-2 py-1 rounded">admin123</code>
                  </p>
                </div>

                <Button type="submit" variant="secondary" size="lg" className="w-full">
                  Login to Admin Panel 🔐
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">
                  ← Back to Farmer Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLogin;
