import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import CustomerLogin from "./pages/CustomerLogin";
import Categories from "./pages/Categories";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import FeeWallet from "./pages/FeeWallet";
import SkillMatcher from "./pages/SkillMatcher";
import Scheduling from "./pages/Scheduling";
import LocalMap from "./pages/LocalMap";
import LearnEarn from "./pages/LearnEarn";
import Community from "./pages/Community";
import CandidateLogin from "./pages/CandidateLogin";
import CandidateProfile from "./pages/CandidateProfile";
import CandidateDashboard from "./pages/CandidateDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import CustomerDashboard from "./pages/CustomerDashboard";
import PostGig from "./pages/PostGig";
import RoleOpportunities from "./pages/RoleOpportunities";
import CandidateProfileView from "./pages/CandidateProfileView";
import CandidateAvailability from "./pages/CandidateAvailability";
import CandidateCalendar from "./pages/CandidateCalendar";
import CandidateMap from "./pages/CandidateMap";
import CandidateWallet from "./pages/CandidateWallet";
import CandidateApplications from "./pages/CandidateApplications";
import CandidateHistory from "./pages/CandidateHistory";
import CandidateNotifications from "./pages/CandidateNotifications";
import CustomerSearch from "./pages/CustomerSearch";
import CustomerSaved from "./pages/CustomerSaved";
import CustomerMyGigs from "./pages/CustomerMyGigs";
import CustomerHistory from "./pages/CustomerHistory";
import CustomerAuthorizeShift from "./pages/CustomerAuthorizeShift";
import CustomerFinalizeShift from "./pages/CustomerFinalizeShift";
import CustomerShiftCompleted from "./pages/CustomerShiftCompleted";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/services" element={<Services />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/features" element={<Features />} />
              <Route path="/features/fee-wallet" element={<FeeWallet />} />
              <Route path="/features/skill-matcher" element={<SkillMatcher />} />
              <Route path="/features/scheduling" element={<Scheduling />} />
              <Route path="/features/map" element={<LocalMap />} />
              <Route path="/features/learn-earn" element={<LearnEarn />} />
              <Route path="/features/verification" element={<Features />} />
              <Route path="/community" element={<Community />} />
              <Route path="/login/customer" element={<CustomerLogin />} />
              <Route path="/login/candidate" element={<CandidateLogin />} />
              <Route path="/candidate/profile" element={<CandidateProfile />} />
              <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
              <Route path="/candidate/profile-view" element={<CandidateProfileView />} />
              <Route path="/candidate/availability" element={<CandidateAvailability />} />
              <Route path="/candidate/calendar" element={<CandidateCalendar />} />
              <Route path="/candidate/map" element={<CandidateMap />} />
              <Route path="/candidate/wallet" element={<CandidateWallet />} />
              <Route path="/candidate/applications" element={<CandidateApplications />} />
              <Route path="/candidate/history" element={<CandidateHistory />} />
              <Route path="/candidate/notifications" element={<CandidateNotifications />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/customer/post-gig" element={<PostGig />} />
              <Route path="/customer/search" element={<CustomerSearch />} />
              <Route path="/customer/saved" element={<CustomerSaved />} />
              <Route path="/customer/gigs" element={<CustomerMyGigs />} />
              <Route path="/customer/history" element={<CustomerHistory />} />
              <Route path="/customer/manage" element={<CustomerAuthorizeShift />} />
              <Route path="/customer/authorize" element={<CustomerAuthorizeShift />} />
              <Route path="/customer/finalize" element={<CustomerFinalizeShift />} />
              <Route path="/customer/completed" element={<CustomerShiftCompleted />} />
              <Route path="/roles/:role" element={<RoleOpportunities />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
