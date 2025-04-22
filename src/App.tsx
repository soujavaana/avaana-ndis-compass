
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
          <Route path="/communication" element={<Communication />} />
          <Route path="/business-goals" element={<BusinessGoals />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
