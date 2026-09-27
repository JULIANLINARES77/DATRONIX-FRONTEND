// ============================================================================
// ventas.tsx — Registrar una NUEVA VENTA en 3 pasos (flujo del brief):
//   Paso 1: buscar y seleccionar el cliente (por cédula o RUC)
//   Paso 2: agregar productos al carrito (producto + cantidad)
//   Paso 3: finalizar (dirección, CONTADO/CREDITO, fecha, observaciones)
// Al finalizar, el backend descontará el stock y generará la remisión.
// Todo es visual: datos de ejemplo, sin llamadas al backend todavía.
// ============================================================================

import { createFileRoute } from "@tanstack/react-router";
// Iconos: lupa, caneca, más y check
import { Search, Trash2, Plus, CheckCircle2 } from "lucide-react";
import { LayoutPanel } from "@/components/DashboardLayout";
import { Panel } from "@/components/module-ui";

// Ruta "/ventas" con metadatos SEO
export const Route = createFileRoute("/ventas")({
  head: () => ({
    meta: [
      { title: "Nueva venta — Datronix" },
      {
        name: "description",
        content:
          "Registro de ventas Datronix: cliente, carrito de productos, dirección de entrega y estado de pago contado o crédito.",
      },
      { property: "og:title", content: "Nueva venta — Datronix" },
      {
        property: "og:description",
        content: "Carrito de venta con generación automática de remisión.",
      },
    ],
  }),
  component: Ventas,
});

// ----------------------------------------------------------------------------
// Paso: caja numerada que agrupa cada etapa del proceso de venta
// Recibe: numero (1, 2, 3), titulo y el contenido interno
// ----------------------------------------------------------------------------
function Paso({
  numero,
  titulo,
  children,
}: {
  numero: number;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card shadow-card">
      {/* Encabezado del paso: círculo con el número + título */}
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {numero}
        </span>
        <h2 className="text-sm font-semibold">{titulo}</h2>
      </header>
      {/* Contenido del paso */}
      <div className="p-4">{children}</div>
    </section>
  );
}

// Clases base reutilizadas por todos los inputs de esta pantalla
const claseInput =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

// ----------------------------------------------------------------------------
// Ventas: pantalla del módulo
// ----------------------------------------------------------------------------
function Ventas() {
  return (
    <LayoutPanel rutaMiga="Administrador/Ventas/Nueva venta">
      <h1 className="mb-4 text-xl font-semibold">Registrar venta</h1>

      {/* Dos columnas: pasos (izquierda) y resumen (derecha) */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* ======== PASO 1: datos del cliente ======== */}
          <Paso numero={1} titulo="Datos del cliente">
            {/* Buscador de cliente por cédula o RUC */}
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Search className="size-4 text-muted-foreground" />
                <input
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Buscar cliente por cédula o RUC..."
                />
              </div>
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                Buscar
              </button>
            </div>
            {/* Ficha del cliente encontrado (ejemplo) */}
            <div className="mt-3 grid gap-3 rounded-md bg-muted/60 p-3 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs text-muted-foreground">Nombre</p>
                <p className="font-medium">Andrea Ruiz</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Teléfono</p>
                <p className="font-medium">300 445 1120</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Dirección</p>
                <p className="font-medium">Cra 10 #20-30, Bogotá</p>
              </div>
            </div>
            {/* Enlace para registrar el cliente si no existe */}
            <p className="mt-2 text-xs text-muted-foreground">
              ¿El cliente no existe?{" "}
              <span className="cursor-pointer font-medium text-primary">
                Agregar cliente
              </span>
            </p>
          </Paso>

          {/* ======== PASO 2: carrito de productos ======== */}
          <Paso numero={2} titulo="Agregar productos al carrito">
            {/* Buscador de producto + cantidad + botón añadir */}
            <div className="grid gap-3 sm:grid-cols-[1fr_7rem_auto]">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Search className="size-4 text-muted-foreground" />
                <input
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Buscar producto por ID o nombre..."
                />
              </div>
              <input
                type="number"
                min={1}
                defaultValue={1}
                className={claseInput}
                aria-label="Cantidad"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                <Plus className="size-4" /> Añadir
              </button>
            </div>

            {/* Tabla del carrito (productos agregados, de ejemplo) */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="bg-primary-soft text-left text-secondary-foreground">
                    {["Producto", "Cantidad", "Precio unitario", "Subtotal", ""].map(
                      (columna) => (
                        <th key={columna} className="px-3 py-2 font-semibold">
                          {columna}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Teclado mecánico K80", "2", "$189.000", "$378.000"],
                    ["Mouse inalámbrico M2", "3", "$79.900", "$239.700"],
                    ['Monitor 27" QHD', "1", "$1.290.000", "$1.290.000"],
                  ].map((fila) => (
                    <tr key={fila[0]} className="border-b border-border last:border-0">
                      {/* Celdas de la fila */}
                      {fila.map((celda, i) => (
                        <td key={i} className="px-3 py-2">
                          {celda}
                        </td>
                      ))}
                      {/* Botón para quitar el producto del carrito */}
                      <td className="px-3 py-2">
                        <button
                          aria-label="Quitar"
                          className="rounded-md border border-border p-1.5 text-destructive hover:bg-muted"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Paso>

          {/* ======== PASO 3: finalizar venta ======== */}
          <Paso numero={3} titulo="Finalizar venta">
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Dirección de entrega (precargada con la del cliente) */}
              <label className="block space-y-1.5 sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Dirección de entrega
                </span>
                <input
                  className={claseInput}
                  defaultValue="Cra 10 #20-30, Bogotá"
                />
              </label>
              {/* Estado de pago: solo dos valores posibles (evita errores) */}
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Estado de pago
                </span>
                <select className={claseInput} defaultValue="CONTADO">
                  <option value="CONTADO">CONTADO</option>
                  <option value="CREDITO">CREDITO</option>
                </select>
              </label>
              {/* Fecha de la venta */}
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Fecha de venta
                </span>
                <input type="date" className={claseInput} />
              </label>
              {/* Observaciones opcionales de la remisión asociada */}
              <label className="block space-y-1.5 sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Observaciones de la remisión (opcional)
                </span>
                <textarea name="observacionesRemision" rows={3} className={claseInput} />
              </label>
            </div>
          </Paso>
        </div>

        {/* ======== Columna derecha: resumen y botón finalizar ======== */}
        <div className="space-y-4">
          <Panel titulo="Resumen de la venta">
            {/* Lista de totales: ítems, unidades, descuentos */}
            <dl className="space-y-2 text-sm">
              {[
                ["Ítems", "3"],
                ["Unidades", "6"],
                ["Descuentos", "$0"],
              ].map(([etiqueta, valor]) => (
                <div key={etiqueta} className="flex justify-between">
                  <dt className="text-muted-foreground">{etiqueta}</dt>
                  <dd>{valor}</dd>
                </div>
              ))}
              {/* Total de la venta, separado con línea */}
              <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-semibold">
                <dt>Total venta</dt>
                <dd>$1.907.700</dd>
              </div>
            </dl>
            {/* Botón finalizar (visual; el backend descontará stock y generará remisión) */}
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              <CheckCircle2 className="size-4" /> Finalizar venta
            </button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Al finalizar se descuenta el stock y se genera la remisión.
            </p>
          </Panel>
        </div>
      </div>
    </LayoutPanel>
  );
}
