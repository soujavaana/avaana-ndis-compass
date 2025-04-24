
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Compliance from "./pages/Compliance";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Registrations from "./pages/Registrations";
import BusinessGoals from "./pages/BusinessGoals";
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
import ProductUpdates from "./pages/ProductUpdates";
import Settings from "./pages/Settings";
import Integrations from "./pages/Integrations";
import Reports from "./pages/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/compliance" element={<Compliance />} />
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
          <Route path="/product-updates" element={<ProductUpdates />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/business-goals" element={<BusinessGoals />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
