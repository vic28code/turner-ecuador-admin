import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";

interface SucursalOption {
  id: number;
  nombre: string;
  kioskos: number;
}

const RegistrarKiosko = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Registrar Kiosko | Panel Admin";
  }, []);

  // Mock de sucursales (coherente con la página Sucursales)
  const sucursales: SucursalOption[] = [
    { id: 1, nombre: "Sucursal Centro", kioskos: 3 },
    { id: 2, nombre: "Sucursal Norte", kioskos: 2 },
    { id: 3, nombre: "Sucursal Sur", kioskos: 4 },
    { id: 4, nombre: "Sucursal Guayaquil Centro", kioskos: 5 },
    { id: 5, nombre: "Sucursal Cuenca", kioskos: 0 },
  ];

  // Solo mostrar sucursales que ya tienen kioskos agregados (según pedido)
  const sucursalesConKioskos = sucursales.filter((s) => s.kioskos > 0);

  const estados = ["activo", "inactivo", "mantenimiento"] as const;

  const [form, setForm] = useState({
    nombre: "",
    sucursalId: "",
    ubicacion: "",
    estado: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es requerido";
    if (!form.sucursalId) e.sucursalId = "Seleccione una sucursal";
    if (!form.ubicacion.trim()) e.ubicacion = "La ubicación es requerida";
    if (!form.estado) e.estado = "Seleccione el estado";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast({ title: "Errores en el formulario", description: "Revise los campos marcados", variant: "destructive" });
      return;
    }

    toast({ title: "Kiosko registrado", description: `${form.nombre} creado correctamente` });
    setForm({ nombre: "", sucursalId: "", ubicacion: "", estado: "" });
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-admin-text-primary">Registrar Kiosko</h1>
          <p className="text-admin-text-secondary">Cree un kiosko y asígnele su sucursal y estado operativo</p>
        </div>
      </header>

      <main>
        <Card className="bg-admin-surface border-admin-border-light">
          <CardHeader>
            <CardTitle className="text-admin-text-primary">Formulario de registro</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-admin-text-primary">Nombre del kiosko</Label>
                  <Input
                    id="nombre"
                    value={form.nombre}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, nombre: e.target.value }));
                      if (errors.nombre) setErrors((er) => ({ ...er, nombre: "" }));
                    }}
                    placeholder="Ej: Kiosko Principal Centro"
                    className={`bg-admin-background border-admin-border-light ${errors.nombre ? "border-red-500" : ""}`}
                  />
                  {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
                </div>

                {/* Sucursal */}
                <div className="space-y-2">
                  <Label className="text-admin-text-primary">Sucursal asignada</Label>
                  <Select
                    value={form.sucursalId}
                    onValueChange={(val) => {
                      setForm((f) => ({ ...f, sucursalId: val }));
                      if (errors.sucursalId) setErrors((er) => ({ ...er, sucursalId: "" }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una sucursal" />
                    </SelectTrigger>
                    <SelectContent>
                      {sucursalesConKioskos.map((s) => (
                        <SelectItem key={s.id} value={String(s.id)}>
                          {s.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.sucursalId && <p className="text-sm text-red-500">{errors.sucursalId}</p>}
                </div>

                {/* Ubicación */}
                <div className="space-y-2">
                  <Label htmlFor="ubicacion" className="text-admin-text-primary">Ubicación del kiosko</Label>
                  <Input
                    id="ubicacion"
                    value={form.ubicacion}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, ubicacion: e.target.value }));
                      if (errors.ubicacion) setErrors((er) => ({ ...er, ubicacion: "" }));
                    }}
                    placeholder="Ej: Planta baja, frente a atención al cliente"
                    className={`bg-admin-background border-admin-border-light ${errors.ubicacion ? "border-red-500" : ""}`}
                  />
                  {errors.ubicacion && <p className="text-sm text-red-500">{errors.ubicacion}</p>}
                </div>

                {/* Estado */}
                <div className="space-y-2">
                  <Label className="text-admin-text-primary">Estado operativo</Label>
                  <Select
                    value={form.estado}
                    onValueChange={(val) => {
                      setForm((f) => ({ ...f, estado: val }));
                      if (errors.estado) setErrors((er) => ({ ...er, estado: "" }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {estados.map((e) => (
                        <SelectItem key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.estado && <p className="text-sm text-red-500">{errors.estado}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" onClick={() => navigate('/kioskos')}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Registrar Kiosko
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RegistrarKiosko;
