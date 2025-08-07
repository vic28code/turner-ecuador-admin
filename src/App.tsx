import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Sucursales from "./pages/Sucursales";
import Kioskos from "./pages/Kioskos";
import Publicidad from "./pages/Publicidad";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import { 
  FolderOpen, 
  Tv, 
  Megaphone, 
  Users, 
  Shield, 
  Clock, 
  BarChart3, 
  HelpCircle, 
  Settings 
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/kioskos" element={<Kioskos />} />
          <Route path="/publicidad" element={<Publicidad />} />
            <Route path="/categorias" element={
              <PlaceholderPage 
                title="Categorías" 
                description="Gestión de categorías de servicios"
                icon={<FolderOpen className="h-5 w-5" />}
              />
            } />
            <Route path="/pantallas" element={
              <PlaceholderPage 
                title="Pantallas" 
                description="Control de pantallas y displays"
                icon={<Tv className="h-5 w-5" />}
              />
            } />
            <Route path="/usuarios" element={
              <PlaceholderPage 
                title="Usuarios" 
                description="Administración de usuarios del sistema"
                icon={<Users className="h-5 w-5" />}
              />
            } />
            <Route path="/roles" element={
              <PlaceholderPage 
                title="Roles" 
                description="Gestión de roles y permisos"
                icon={<Shield className="h-5 w-5" />}
              />
            } />
            <Route path="/turnos" element={
              <PlaceholderPage 
                title="Turnos" 
                description="Sistema de gestión de turnos"
                icon={<Clock className="h-5 w-5" />}
              />
            } />
            <Route path="/reportes" element={
              <PlaceholderPage 
                title="Reportes" 
                description="Informes y estadísticas del sistema"
                icon={<BarChart3 className="h-5 w-5" />}
              />
            } />
            <Route path="/soporte" element={
              <PlaceholderPage 
                title="Soporte" 
                description="Centro de ayuda y soporte técnico"
                icon={<HelpCircle className="h-5 w-5" />}
              />
            } />
            <Route path="/configuracion" element={
              <PlaceholderPage 
                title="Configuración" 
                description="Configuración general del sistema"
                icon={<Settings className="h-5 w-5" />}
              />
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
