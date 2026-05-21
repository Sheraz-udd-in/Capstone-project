import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToaster } from 'react-hot-toast';
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CropRecommendation from "./pages/CropRecommendation";
import FertilizerGuide from "./pages/FertilizerGuide";
import Weather from "./pages/Weather";
import AskExpert from "./pages/AskExpert";
import AdminLogin from "./pages/AdminLogin";
import YieldPrediction from './pages/YieldPrediction';
import DiseaseDetection from './pages/DiseaseDetection';
import AdminPanel from "./pages/AdminPanel";
import About from "./pages/About";
import CropCalendar from "./pages/CropCalendar";
import NotFound from "./pages/NotFound";
import FarmAnalytics from "./pages/FarmAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <HotToaster 
            position="top-right"
            toastOptions={{
              className: 'glass-dark',
              duration: 3000,
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/crop-recommendation" element={<CropRecommendation />} />
              <Route path="/fertilizer-guide" element={<FertilizerGuide />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/ask-expert" element={<AskExpert />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/yield-prediction" element={<YieldPrediction />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/about" element={<About />} />
              <Route path="/calendar" element={<CropCalendar />} />
              <Route path="/analytics" element={<FarmAnalytics />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
