
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import SignUp from "./pages/SignUp";
import OnboardingDemo from "./pages/OnboardingDemo";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/onboarding-demo" element={<OnboardingDemo />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/compliance/frameworks" element={<Frameworks />} />
          <Route path="/compliance/controls" element={<Controls />} />
          <Route path="/compliance/policies" element={<Policies />} />
          <Route path="/compliance/evidence-tasks" element={<EvidenceTasks />} />
          <Route path="/compliance/cloud" element={<Cloud />} />
          <Route path="/compliance/vault" element={<Vault />} />
          <Route path="/risk/vendors" element={<Vendors />} />
          <Route path="/risk/management" element={<RiskManagement />} />
          <Route path="/trust/vault" element={<TrustVault />} />
          <Route path="/audit/center" element={<AuditCenter />} />
          <Route path="/audit/corrective-action" element={<CorrectiveAction />} />
          <Route path="/people/employees" element={<Employees />} />
          <Route path="/people/training" element={<TrainingCampaigns />} />
          <Route path="/business-goals" element={<BusinessGoals />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
