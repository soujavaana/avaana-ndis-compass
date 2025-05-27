import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Protected pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Registrations from "./pages/Registrations";
import Documents from "./pages/Documents";
import Communication from "./pages/Communication";
import Networking from "./pages/Networking";
import Tests from "./pages/Tests";
import Frameworks from "./pages/compliance/Frameworks";
import Controls from "./pages/compliance/Controls";
import Policies from "./pages/compliance/Policies";
import EvidenceTasks from "./pages/compliance/EvidenceTasks";
import Cloud from "./pages/compliance/Cloud";
import Vault from "./pages/compliance/Vault";
import RiskManagement from "./pages/risk/RiskManagement";
import Vendors from "./pages/risk/Vendors";
import TrustVault from "./pages/trust/TrustVault";
import AuditCenter from "./pages/audit/AuditCenter";
import CorrectiveAction from "./pages/audit/CorrectiveAction";
import Employees from "./pages/people/Employees";
import TrainingCampaigns from "./pages/people/TrainingCampaigns";
import NotFound from "./pages/NotFound";
import BusinessGoals from "./pages/BusinessGoals";

// Keep existing onboarding pages for now
import SignUp from "./pages/SignUp";
import OnboardingDemo from "./pages/OnboardingDemo";
import Onboarding1 from "./pages/Onboarding1";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public auth routes */}
            <Route path="/auth/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/auth/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path="/auth/forgot-password" element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            } />
            
            {/* Legacy routes - keep for backwards compatibility */}
            <Route path="/signup" element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } />
            <Route path="/onboarding-demo" element={
              <PublicRoute>
                <OnboardingDemo />
              </PublicRoute>
            } />
            <Route path="/onboarding-1" element={
              <PublicRoute>
                <Onboarding1 />
              </PublicRoute>
            } />
            
            {/* Protected dashboard routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/registrations" element={
              <ProtectedRoute>
                <Registrations />
              </ProtectedRoute>
            } />
            <Route path="/documents" element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            } />
            <Route path="/communication" element={
              <ProtectedRoute>
                <Communication />
              </ProtectedRoute>
            } />
            <Route path="/networking" element={
              <ProtectedRoute>
                <Networking />
              </ProtectedRoute>
            } />
            <Route path="/tests" element={
              <ProtectedRoute>
                <Tests />
              </ProtectedRoute>
            } />
            <Route path="/compliance/frameworks" element={
              <ProtectedRoute>
                <Frameworks />
              </ProtectedRoute>
            } />
            <Route path="/compliance/controls" element={
              <ProtectedRoute>
                <Controls />
              </ProtectedRoute>
            } />
            <Route path="/compliance/policies" element={
              <ProtectedRoute>
                <Policies />
              </ProtectedRoute>
            } />
            <Route path="/compliance/evidence-tasks" element={
              <ProtectedRoute>
                <EvidenceTasks />
              </ProtectedRoute>
            } />
            <Route path="/compliance/cloud" element={
              <ProtectedRoute>
                <Cloud />
              </ProtectedRoute>
            } />
            <Route path="/compliance/vault" element={
              <ProtectedRoute>
                <Vault />
              </ProtectedRoute>
            } />
            <Route path="/risk/vendors" element={
              <ProtectedRoute>
                <Vendors />
              </ProtectedRoute>
            } />
            <Route path="/risk/management" element={
              <ProtectedRoute>
                <RiskManagement />
              </ProtectedRoute>
            } />
            <Route path="/trust/vault" element={
              <ProtectedRoute>
                <TrustVault />
              </ProtectedRoute>
            } />
            <Route path="/audit/center" element={
              <ProtectedRoute>
                <AuditCenter />
              </ProtectedRoute>
            } />
            <Route path="/audit/corrective-action" element={
              <ProtectedRoute>
                <CorrectiveAction />
              </ProtectedRoute>
            } />
            <Route path="/people/employees" element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            } />
            <Route path="/people/training" element={
              <ProtectedRoute>
                <TrainingCampaigns />
              </ProtectedRoute>
            } />
            <Route path="/business-goals" element={
              <ProtectedRoute>
                <BusinessGoals />
              </ProtectedRoute>
            } />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
