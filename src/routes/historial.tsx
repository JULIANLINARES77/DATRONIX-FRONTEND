// ============================================================================
// historial.tsx — HISTORIAL DE VENTAS Y REMISIONES
// Tabla de ventas con su remisión asociada (relación 1:1 Venta → Remisión)
// y un modal "Ver detalle" con los productos de la venta y la remisión.
// ============================================================================

import { createFileRoute } from "@tanstack/react-router";
// Iconos: ojo (ver detalle) e impresora
import { Eye, Printer } from "lucide-react";
import { LayoutPanel } from "@/components/DashboardLayout";
import { Panel, TablaDatos, Etiqueta, TarjetaEstadistica } from "@/components/module-ui";
import { BarraBusqueda } from "@/components/form-ui";
// Componentes del modal (shadcn/ui) — nombres fijos de la librería
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Ruta "/historial" con metadatos SEO
export const Route = createFileRoute("/historial")({
  head: () => ({
    meta: [
      { title: "Historial de ventas y remisiones — Datronix" },
      {
        name: "description",
        content:
          "Consulta el historial de ventas Datronix con su detalle de productos y la remisión generada por cada venta.",
      },
      {
        property: "og:title",
        content: "Historial de ventas y remisiones — Datronix",
      },
      {
        property: "og:description",
        content: "Ventas, detalle de productos y comprobantes de salida.",
      },
    ],
  }),
  component: Historial,
});

// ----------------------------------------------------------------------------
// DetalleVenta: botón "Ver detalle" que abre un modal con:
// datos de la venta, tabla de productos (DetalleVenta del backend)
// y la remisión generada (con botón de imprimir)
// ----------------------------------------------------------------------------
function DetalleVenta() {
  return (
    <Dialog>
      {/* Botón que abre el modal */}
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs hover:bg-muted">
          <Eye className="size-3.5" /> Ver detalle
        </button>
      </DialogTrigger>
      {/* Contenido del modal */}
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Venta #10244 — Comercial JR</DialogTitle>
        </DialogHeader>

        {/* Datos generales de la venta */}
        <div className="grid gap-3 rounded-md bg-muted/60 p-3 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">Fecha</p>
            <p className="font-medium">31/08/2026</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Estado de pago</p>
            <p className="font-medium">CREDITO</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Dirección de entrega</p>
            <p className="font-medium">Cl 45 #12-08, Medellín</p>
          </div>
        </div>

        {/* Productos de la venta (tabla DetalleVenta del backend) */}
        <table className="mt-2 w-full text-sm">
          <thead>
            <tr className="bg-primary-soft text-left text-secondary-foreground">
              {["ID detalle", "ID producto", "Producto", "Cant.", "Precio", "Desc.", "Subtotal"].map((columna) => (
                <th key={columna} className="px-3 py-2 font-semibold">
                  {columna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "101", "Portátil Ryzen 7", "1", "$3.850.000", "$0", "$3.850.000"],
              ["2", "102", "Mouse inalámbrico M2", "2", "$79.900", "$0", "$159.800"],
            ].map((fila) => (
              <tr key={fila[0]} className="border-b border-border last:border-0">
                {fila.map((celda, i) => (
                  <td key={i} className="px-3 py-2">
                    {celda}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Remisión asociada a la venta (relación 1:1) */}
        <div className="rounded-md border border-dashed border-border p-3 text-sm">
          <p className="font-semibold">Remisión #8841</p>
          <p className="text-muted-foreground">
            Emitida el 31/08/2026 · Total $4.009.800
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Observaciones: entregar en horario de la mañana.
          </p>
        </div>

        {/* Botón imprimir (visual) */}
        <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          <Printer className="size-4" /> Imprimir remisión
        </button>
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------------------------------------------
// Historial: pantalla del módulo
// ----------------------------------------------------------------------------
function Historial() {
  return (
    <LayoutPanel rutaMiga="Administrador/Ventas/Historial y remisiones">
      {/* Título + buscador */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Historial de ventas</h1>
        <BarraBusqueda placeholder="Buscar por ID de venta o cliente..." />
      </div>

      {/* KPIs del historial */}
      <div className="mb-4 grid gap-4 sm:grid-cols-4">
        <TarjetaEstadistica etiqueta="Ventas del mes" valor="384" />
        <TarjetaEstadistica etiqueta="Total facturado" valor="$48.320.000" />
        <TarjetaEstadistica etiqueta="Contado" valor="72%" />
        <TarjetaEstadistica etiqueta="Crédito" valor="28%" />
      </div>

      {/* Tabla de ventas con remisión y botón de detalle */}
      <Panel>
        <TablaDatos
          columnas={["ID Venta", "Cliente", "Fecha", "Total", "Estado de pago", "Dirección de entrega", "ID Remisión", "Detalle"]}
          filas={[
            ["10245", "Andrea Ruiz", "31/08/2026", "$320.000", <Etiqueta tono="success">CONTADO</Etiqueta>, "Cra 10 #20-30, Bogotá", "8842", <DetalleVenta />],
            ["10244", "Comercial JR", "31/08/2026", "$1.150.000", <Etiqueta tono="warning">CREDITO</Etiqueta>, "Cl 45 #12-08, Medellín", "8841", <DetalleVenta />],
            ["10243", "Luis Ortega", "30/08/2026", "$85.000", <Etiqueta tono="success">CONTADO</Etiqueta>, "Av 6 #14-22, Cali", "8840", <DetalleVenta />],
            ["10242", "Distribuciones M", "30/08/2026", "$2.430.000", <Etiqueta tono="warning">CREDITO</Etiqueta>, "Cl 72 #40-11, Barranquilla", "8839", <DetalleVenta />],
            ["10241", "Marta Peña", "29/08/2026", "$64.500", <Etiqueta tono="success">CONTADO</Etiqueta>, "Cl 19 #8-40, Bogotá", "8838", <DetalleVenta />],
          ]}
        />
      </Panel>
    </LayoutPanel>
  );
}
