import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";


import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus, Layers3, Save } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface SucursalOption {
  id: number;
  nombre: string;
}

interface PublicidadItem {
  id: number;
  nombre: string;
}

interface Pantalla {
  id: number;
  nombre: string;
  sucursalId: number | null;
  sucursalNombre: string;
  publicidadIds: number[];
}

const Pantallas = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "Pantallas | Panel Admin";
  }, []);

  const sucursales: SucursalOption[] = useMemo(
    () => [
      { id: 1, nombre: "Sucursal Centro" },
      { id: 2, nombre: "Sucursal Norte" },
      { id: 3, nombre: "Sucursal Sur" },
      { id: 4, nombre: "Sucursal Guayaquil Centro" },
      { id: 5, nombre: "Sucursal Cuenca" },
    ],
    []
  );

  const publicidadCatalogo: PublicidadItem[] = useMemo(
    () => [
      { id: 101, nombre: "Promo 2x1" },
      { id: 102, nombre: "Descuento Fin de Semana" },
      { id: 103, nombre: "Nuevos Servicios" },
      { id: 104, nombre: "Tarifas Actualizadas" },
      { id: 105, nombre: "Campaña Temporada" },
    ],
    []
  );

  const [pantallas, setPantallas] = useState<Pantalla[]>([
    { id: 9001, nombre: "Pantalla Recepción", sucursalId: 1, sucursalNombre: "Sucursal Centro", publicidadIds: [101, 103] },
    { id: 9002, nombre: "Pantalla Sala", sucursalId: 2, sucursalNombre: "Sucursal Norte", publicidadIds: [102] },
  ]);

  // Si venimos de "/pantallas/nueva" con una pantalla recién creada, agregarla
  useEffect(() => {
    const nueva = (location.state as any)?.newPantalla as Pantalla | undefined;
    if (nueva) {
      setPantallas((prev) => {
        if (prev.some((p) => p.id === nueva.id)) return prev;
        return [nueva, ...prev];
      });
    }
  }, [location.state]);

  // Asignación de publicidad
  const [dialogOpenFor, setDialogOpenFor] = useState<number | null>(null);
  const [tempAds, setTempAds] = useState<number[]>([]);

  const abrirDialogoAds = (p: Pantalla) => {
    setTempAds(p.publicidadIds);
    setDialogOpenFor(p.id);
  };

  const toggleAd = (id: number) => {
    setTempAds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const guardarAds = () => {
    if (dialogOpenFor == null) return;
    setPantallas((prev) =>
      prev.map((p) => (p.id === dialogOpenFor ? { ...p, publicidadIds: [...tempAds] } : p))
    );
    setDialogOpenFor(null);
    toast({ title: "Publicidad actualizada", description: "Se guardó la asignación de contenidos." });
  };

  const actualizarSucursal = (idPantalla: number, sucursalId: number) => {
    const suc = sucursales.find((s) => s.id === Number(sucursalId));
    if (!suc) return;
    setPantallas((prev) => prev.map((p) => (p.id === idPantalla ? { ...p, sucursalId: suc.id, sucursalNombre: suc.nombre } : p)));
    toast({ title: "Sucursal asignada", description: `La pantalla ahora apunta a: ${suc.nombre}` });
  };

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-admin-text-primary">Pantallas</h1>
        <Button onClick={() => navigate("/pantallas/nueva")}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Pantalla
        </Button>
      </header>

      <Table>
        <TableCaption className="text-admin-text-secondary">Administración de pantallas y su contenido publicitario.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Sucursal</TableHead>
            <TableHead>Publicidad</TableHead>
            <TableHead className="w-[160px] text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pantallas.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium text-admin-text-primary">{p.nombre}</TableCell>
              <TableCell>
                <Select
                  value={String(p.sucursalId ?? "")}
                  onValueChange={(val) => actualizarSucursal(p.id, Number(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione sucursal" />
                  </SelectTrigger>
                  <SelectContent>
                    {sucursales.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-admin-text-secondary">
                  <Layers3 className="h-4 w-4" />
                  <span>{p.publicidadIds.length} elementos</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Dialog open={dialogOpenFor === p.id} onOpenChange={(o) => setDialogOpenFor(o ? p.id : null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Asignar publicidad</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Asignar publicidad</DialogTitle>
                      <DialogDescription>Seleccione el contenido a mostrar en "{p.nombre}"</DialogDescription>
                    </DialogHeader>

                    <div className="max-h-64 overflow-auto space-y-2 pr-1">
                      {publicidadCatalogo.map((item) => (
                        <label key={item.id} className="flex items-center gap-3">
                          <Checkbox
                            checked={tempAds.includes(item.id)}
                            onCheckedChange={() => toggleAd(item.id)}
                            aria-label={`Seleccionar ${item.nombre}`}
                          />
                          <span className="text-admin-text-primary">{item.nombre}</span>
                        </label>
                      ))}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                      <Button variant="ghost" onClick={() => setDialogOpenFor(null)}>Cancelar</Button>
                      <Button onClick={guardarAds}>
                        <Save className="mr-2 h-4 w-4" /> Guardar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default Pantallas;
