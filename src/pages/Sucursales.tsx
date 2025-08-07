import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Users, Monitor } from "lucide-react";

const Sucursales = () => {
  const sucursales = [
    {
      id: 1,
      nombre: "Sucursal Centro",
      direccion: "Av. 10 de Agosto 123, Quito",
      estado: "Activa",
      kioskos: 3,
      usuariosEspera: 12
    },
    {
      id: 2,
      nombre: "Sucursal Norte",
      direccion: "Av. Eloy Alfaro 456, Quito",
      estado: "Activa",
      kioskos: 2,
      usuariosEspera: 8
    },
    {
      id: 3,
      nombre: "Sucursal Sur",
      direccion: "Av. Maldonado 789, Quito",
      estado: "Mantenimiento",
      kioskos: 4,
      usuariosEspera: 0
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-admin-text-primary">Sucursales</h1>
          <p className="text-admin-text-secondary">Gestión de ubicaciones y puntos de atención</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Sucursal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sucursales.map((sucursal) => (
          <Card key={sucursal.id} className="bg-admin-surface border-admin-border-light">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-admin-text-primary">{sucursal.nombre}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  sucursal.estado === 'Activa' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {sucursal.estado}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-admin-text-muted mt-0.5" />
                <span className="text-sm text-admin-text-secondary">{sucursal.direccion}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-admin-text-muted" />
                  <div>
                    <p className="text-sm font-medium text-admin-text-primary">{sucursal.kioskos}</p>
                    <p className="text-xs text-admin-text-muted">Kioskos</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-admin-text-muted" />
                  <div>
                    <p className="text-sm font-medium text-admin-text-primary">{sucursal.usuariosEspera}</p>
                    <p className="text-xs text-admin-text-muted">En espera</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Detalles
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Configurar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sucursales;