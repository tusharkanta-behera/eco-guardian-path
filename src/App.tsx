import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import TrainingModule from "./components/TrainingModule";
import Shop from "./pages/Shop";
import ReportForm from "./pages/ReportForm";
import MapLocator from "./pages/MapLocator";
import ChampionDashboard from "./pages/ChampionDashboard";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              
              {/* Demo Routes - No Auth Required */}
              <Route path="/demo/training" element={<TrainingModule trainingId="demo-training" />} />
              <Route path="/demo/shop" element={<Shop />} />
              <Route path="/demo/report" element={<ReportForm />} />
              <Route path="/demo/map" element={<MapLocator />} />
              <Route path="/demo/dashboard" element={<Dashboard />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/training/:trainingId" element={
                <ProtectedRoute>
                  <TrainingModule trainingId="sample-training" />
                </ProtectedRoute>
              } />
              
              <Route path="/training" element={
                <ProtectedRoute>
                  <TrainingModule trainingId="waste-segregation-101" />
                </ProtectedRoute>
              } />
              
              <Route path="/shop" element={
                <ProtectedRoute>
                  <Shop />
                </ProtectedRoute>
              } />
              
              <Route path="/report" element={
                <ProtectedRoute>
                  <ReportForm />
                </ProtectedRoute>
              } />
              
              <Route path="/map" element={
                <ProtectedRoute>
                  <MapLocator />
                </ProtectedRoute>
              } />
              
              {/* Role-specific routes */}
              <Route path="/champion" element={
                <ProtectedRoute allowedRoles={['champion', 'admin']}>
                  <ChampionDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
