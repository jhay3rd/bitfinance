
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import InvestmentPlan from "./pages/InvestmentPlan";
import Markets from "./pages/Markets";
import News from "./pages/News";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import FAQ from "./pages/FAQ";
import PlansPage from "./pages/dashboard/PlansPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import SupportPage from "./pages/dashboard/SupportPage";
import TransactionsPage from "./pages/dashboard/TransactionsPage";
import DepositRedirect from "./pages/dashboard/DepositRedirect";
import DepositConfirm from "./pages/dashboard/DepositConfirm";
import WithdrawConfirm from "./pages/dashboard/WithdrawConfirm";
import PrivateRoute from "./components/auth/PrivateRoute";
import WelcomePage from "./pages/dashboard/WelcomePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/dashboard/welcome" element={<PrivateRoute><WelcomePage /></PrivateRoute>} />
            <Route path="/dashboard/invest/:planId" element={<PrivateRoute><InvestmentPlan /></PrivateRoute>} />
            <Route path="/dashboard/plans" element={<PrivateRoute><PlansPage /></PrivateRoute>} />
            <Route path="/dashboard/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
            <Route path="/dashboard/support" element={<PrivateRoute><SupportPage /></PrivateRoute>} />
            <Route path="/dashboard/transactions" element={<PrivateRoute><TransactionsPage /></PrivateRoute>} />
            <Route path="/dashboard/deposit" element={<PrivateRoute><DepositRedirect /></PrivateRoute>} />
            <Route path="/dashboard/deposit/confirm" element={<PrivateRoute><DepositConfirm /></PrivateRoute>} />
            <Route path="/dashboard/withdraw/confirm" element={<PrivateRoute><WithdrawConfirm /></PrivateRoute>} />
            
            {/* Public Routes */}
            <Route path="/markets" element={<Markets />} />
            <Route path="/news" element={<News />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/career" element={<Careers />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/faq" element={<FAQ />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
