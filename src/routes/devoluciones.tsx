import { createFileRoute } from '@tanstack/react-router'
// ============================================================================
// devoluciones.tsx — Registro de DEVOLUCIONES
// Formulario: producto (con buscador), cliente, cantidad y motivo.
// Regla del brief: la cantidad devuelta se SUMA de nuevo al stock del producto.
// ============================================================================
// Iconos: lupa y flecha de devolver
import { Search, Undo2 } from "lucide-react";
import { LayoutPanel } from "@/components/DashboardLayout";
import { Panel, TablaDatos, TarjetaEstadistica } from "@/components/module-ui";

// Ruta "/devoluciones" con metadatos SEO
export const Route = createFileRoute("/devoluciones")({
  head: () => ({
    meta: [
      { title: "Devoluciones — Datronix" },
      {
        name: "description",
        content:
          "Registro de devoluciones Datronix: producto, cliente, cantidad y motivo, con reingreso de stock.",
      },
      { property: "og:title", content: "Devoluciones — Datronix" },
      {
        property: "og:description",
        content: "Devoluciones de producto y reingreso automático al inventario.",
      },
    ],
  }),
  component: Devoluciones,
});

// Clases base de los inputs de esta pantalla
const claseInput =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

// ----------------------------------------------------------------------------
// Devoluciones: pantalla del módulo
// ----------------------------------------------------------------------------
function Devoluciones() {
  return (
    <LayoutPanel rutaMiga="Administrador/Inventario/Devoluciones">
      <h1 className="mb-4 text-xl font-semibold">Devoluciones</h1>

      {/* KPIs del módulo */}
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <TarjetaEstadistica etiqueta="Devoluciones del mes" valor="18" />
        <TarjetaEstadistica etiqueta="Unidades reingresadas" valor="41" />
        <TarjetaEstadistica etiqueta="Tasa de devolución" valor="1.8%" />
      </div>

      {/* Dos columnas: formulario (izquierda) y tabla de recientes (derecha) */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* ---- Formulario de registro ---- */}
        <Panel titulo="Registrar devolución">
          <div className="space-y-3">
            {/* Producto con buscador */}
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Producto
              </span>
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Search className="size-4 text-muted-foreground" />
                <input
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Buscar producto por ID o nombre..."
                />
              </div>
            </label>
            {/* Nombre del cliente */}
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Nombre del cliente
              </span>
              <input name="nombreCliente" className={claseInput} placeholder="Andrea Ruiz" />
            </label>
            {/* Cantidad devuelta */}
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Cantidad
              </span>
              <input name="cantidad" type="number" min={1} defaultValue={1} required className={claseInput} />
            </label>
            {/* Motivo de la devolución */}
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Motivo
              </span>
              <textarea name="motivo" rows={3} className={claseInput} placeholder="Producto defectuoso..." />
            </label>
            {/* Fecha y hora de devolución */}
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Fecha y hora de devolución
              </span>
              <input name="fechaDevolucion" type="datetime-local" required className={claseInput} />
            </label>
            {/* Botón registrar (visual) */}
            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              <Undo2 className="size-4" /> Registrar devolución
            </button>
            {/* Recordatorio de la regla de negocio */}
            <p className="text-center text-xs text-muted-foreground">
              El registro requiere producto, cantidad y fecha de devolución.
            </p>
          </div>
        </Panel>

        {/* ---- Tabla de devoluciones recientes ---- */}
        <Panel titulo="Devoluciones recientes" className="lg:col-span-2">
          <TablaDatos
            columnas={["ID", "Producto", "Cliente", "Cantidad", "Motivo", "Fecha"]}
            filas={[
              ["41", "Monitor 27\" QHD", "Comercial JR", "1", "Pantalla con píxeles muertos", "30/08/2026"],
              ["40", "Mouse inalámbrico M2", "Andrea Ruiz", "2", "Producto equivocado", "29/08/2026"],
              ["39", "SSD NVMe 1TB", "Distribuciones M", "3", "Empaque abierto", "28/08/2026"],
              ["38", "Teclado mecánico K80", "Luis Ortega", "1", "No enciende", "27/08/2026"],
            ]}
          />
        </Panel>
      </div>
    </LayoutPanel>
  );
}
