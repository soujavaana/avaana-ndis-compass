
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Compliance from "./pages/Compliance";
import Communication from "./pages/Communication";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Import new routes
import Profile from "./pages/Profile";
import Registrations from "./pages/Registrations";
import Participants from "./pages/Participants";
import BusinessGoals from "./pages/BusinessGoals";
import TaxAccounting from "./pages/TaxAccounting";
import Networking from "./pages/Networking";

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
          <Route path="/participants" element={<Participants />} />
          <Route path="/business-goals" element={<BusinessGoals />} />
          <Route path="/tax-accounting" element={<TaxAccounting />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
