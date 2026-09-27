// ============================================================================
// reportes.tsx — Módulo de REPORTES con 5 pestañas:
//   1. Stock bajo          2. Top productos      3. Clientes frecuentes
//   4. Ventas por mes      5. Créditos pendientes
// Regla del brief: los reportes se consultan EN TIEMPO REAL,
// no se guardan en tablas de la base de datos.
// ============================================================================

import { createFileRoute } from "@tanstack/react-router";
import { LayoutPanel } from "@/components/DashboardLayout";
import { Panel, TablaDatos, TarjetaEstadistica, GraficoBarras, Etiqueta } from "@/components/module-ui";
// Componentes de pestañas (shadcn/ui) — nombres fijos de la librería
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Ruta "/reportes" con metadatos SEO
export const Route = createFileRoute("/reportes")({
  head: () => ({
    meta: [
      { title: "Reportes — Datronix" },
      {
        name: "description",
        content:
          "Reportes Datronix en tiempo real: stock bajo, productos más vendidos, clientes frecuentes, ventas por mes y créditos pendientes.",
      },
      { property: "og:title", content: "Reportes — Datronix" },
      {
        property: "og:description",
        content: "Stock crítico, top productos, top clientes, ventas por mes y cartera.",
      },
    ],
  }),
  component: Reportes,
});

// Clase para resaltar en rojo los productos con stock crítico
const textoRojo = "text-destructive font-medium";

// ----------------------------------------------------------------------------
// Reportes: pantalla del módulo
// ----------------------------------------------------------------------------
function Reportes() {
  return (
    <LayoutPanel rutaMiga="Administrador/Control/Reportes">
      {/* Título + nota de que los reportes son en tiempo real */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Reportes</h1>
        <p className="text-xs text-muted-foreground">
          Los reportes se consultan en tiempo real, no se almacenan.
        </p>
      </div>

      {/* KPIs generales */}
      <div className="mb-4 grid gap-4 sm:grid-cols-4">
        <TarjetaEstadistica etiqueta="Ingresos del mes" valor="$48.3M" />
        <TarjetaEstadistica etiqueta="Ventas realizadas" valor="384" />
        <TarjetaEstadistica etiqueta="Cartera en crédito" valor="$5.42M" />
        <TarjetaEstadistica etiqueta="Stock crítico" valor="9" />
      </div>

      {/* Sistema de pestañas; "stock" es la pestaña inicial */}
      <Tabs defaultValue="stock">
        {/* Botones de las 5 pestañas */}
        <TabsList className="flex h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="stock">Stock bajo</TabsTrigger>
          <TabsTrigger value="productos">Top productos</TabsTrigger>
          <TabsTrigger value="clientes">Clientes frecuentes</TabsTrigger>
          <TabsTrigger value="meses">Ventas por mes</TabsTrigger>
          <TabsTrigger value="creditos">Créditos pendientes</TabsTrigger>
        </TabsList>

        {/* ---- Pestaña 1: Stock bajo (stock actual < stock mínimo) ---- */}
        <TabsContent value="stock" className="mt-4">
          <Panel titulo="Inventario crítico (stock actual < stock mínimo)">
            <TablaDatos
              columnas={["ID Producto", "Nombre", "Stock actual", "Stock mínimo"]}
              filas={[
                ["4", <span className={textoRojo}>SSD NVMe 1TB</span>, <span className={textoRojo}>0</span>, "15"],
                ["2", <span className={textoRojo}>Monitor 27&quot; QHD</span>, <span className={textoRojo}>8</span>, "12"],
                ["9", <span className={textoRojo}>Switch 24 puertos</span>, <span className={textoRojo}>3</span>, "10"],
                ["14", <span className={textoRojo}>Cable HDMI 2m</span>, <span className={textoRojo}>11</span>, "40"],
              ]}
            />
          </Panel>
        </TabsContent>

        {/* ---- Pestaña 2: Top productos más vendidos ---- */}
        <TabsContent value="productos" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel titulo="Top 10 productos más vendidos">
              <TablaDatos
                columnas={["Producto", "Total vendido", "Ingresos generados"]}
                filas={[
                  ["Portátil Ryzen 7", "142", "$546.700.000"],
                  ["Mouse inalámbrico M2", "820", "$65.518.000"],
                  ["Teclado mecánico K80", "410", "$77.490.000"],
                  ["Monitor 27\" QHD", "96", "$123.840.000"],
                  ["SSD NVMe 1TB", "230", "$96.600.000"],
                ]}
              />
            </Panel>
            {/* Gráfico de barras con las unidades vendidas */}
            <Panel titulo="Unidades vendidas">
              <GraficoBarras
                datos={[
                  { etiqueta: "Mouse", valor: 820 },
                  { etiqueta: "Teclado", valor: 410 },
                  { etiqueta: "SSD", valor: 230 },
                  { etiqueta: "Portátil", valor: 142 },
                  { etiqueta: "Monitor", valor: 96 },
                ]}
              />
            </Panel>
          </div>
        </TabsContent>

        {/* ---- Pestaña 3: Clientes frecuentes ---- */}
        <TabsContent value="clientes" className="mt-4">
          <Panel titulo="Clientes frecuentes">
            <TablaDatos
              columnas={["Cliente", "N° de compras", "Total invertido", "Promedio de compra", "Última compra"]}
              filas={[
                ["Distribuciones M", "132", "$182.400.000", "$1.381.818", "30/08/2026"],
                ["Comercial JR", "64", "$74.200.000", "$1.159.375", "31/08/2026"],
                ["Andrea Ruiz", "18", "$5.780.000", "$321.111", "31/08/2026"],
                ["Luis Ortega", "7", "$1.240.000", "$177.142", "30/08/2026"],
              ]}
            />
          </Panel>
        </TabsContent>

        {/* ---- Pestaña 4: Ventas por mes ---- */}
        <TabsContent value="meses" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel titulo="Ventas por mes">
              <TablaDatos
                columnas={["Mes", "Año", "N° de ventas", "Total mes", "Promedio venta"]}
                filas={[
                  ["Agosto", "2026", "384", "$48.320.000", "$125.833"],
                  ["Julio", "2026", "351", "$44.180.000", "$125.868"],
                  ["Junio", "2026", "402", "$52.640.000", "$130.945"],
                  ["Mayo", "2026", "338", "$41.220.000", "$121.952"],
                ]}
              />
            </Panel>
            {/* Gráfico de la tendencia mensual (valores en millones) */}
            <Panel titulo="Tendencia mensual">
              <GraficoBarras
                datos={[
                  { etiqueta: "May", valor: 41 },
                  { etiqueta: "Jun", valor: 53 },
                  { etiqueta: "Jul", valor: 44 },
                  { etiqueta: "Ago", valor: 48 },
                ]}
              />
            </Panel>
          </div>
        </TabsContent>

        {/* ---- Pestaña 5: Créditos pendientes (estado_pago = CREDITO) ---- */}
        <TabsContent value="creditos" className="mt-4">
          <Panel titulo="Créditos pendientes (estado de pago = CREDITO)">
            <TablaDatos
              columnas={["ID Venta", "Cliente", "Fecha", "Total", "Días transcurridos", "Estado"]}
              filas={[
                ["10244", "Comercial JR", "31/08/2026", "$1.150.000", "0", <Etiqueta tono="success">Al día</Etiqueta>],
                ["10242", "Distribuciones M", "30/08/2026", "$2.430.000", "1", <Etiqueta tono="success">Al día</Etiqueta>],
                ["10198", "Tecno Sur", "15/07/2026", "$980.000", "47", <Etiqueta tono="warning">Por vencer</Etiqueta>],
                ["10120", "Distribuciones M", "02/06/2026", "$860.000", "90", <Etiqueta tono="danger">Vencido</Etiqueta>],
              ]}
            />
          </Panel>
        </TabsContent>
      </Tabs>
    </LayoutPanel>
  );
}
