// ============================================================================
// index.tsx — Pantalla PRINCIPAL (dashboard) del back-office Datronix
// Muestra: 4 tarjetas KPI, gráfico de ventas de 7 días, accesos rápidos
// y la tabla de últimas ventas registradas. Todo con datos de ejemplo.
// ============================================================================

import { createFileRoute, Link } from "@tanstack/react-router";
// Iconos para las tarjetas KPI
import { DollarSign, AlertTriangle, CreditCard, Package } from "lucide-react";
// Plantilla general (menú lateral + encabezado azul)
import { LayoutPanel } from "@/components/DashboardLayout";
// Componentes reutilizables de los módulos
import { TarjetaEstadistica, Panel, TablaDatos, Etiqueta, GraficoBarras } from "@/components/module-ui";

// ----------------------------------------------------------------------------
// Definición de la ruta "/" (página de inicio)
// head(): título y descripción para el navegador y buscadores (SEO)
// ----------------------------------------------------------------------------
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Datronix — Panel principal del back-office" },
      {
        name: "description",
        content:
          "Panel principal Datronix: ventas del día, stock crítico, créditos pendientes e inventario total.",
      },
      { property: "og:title", content: "Datronix — Panel principal" },
      {
        property: "og:description",
        content: "Ventas del día, stock crítico y cartera en tiempo real.",
      },
    ],
  }),
  // Componente que se dibuja al entrar a "/"
  component: Principal,
});

// ----------------------------------------------------------------------------
// Principal: contenido del dashboard
// ----------------------------------------------------------------------------
function Principal() {
  return (
    // Se envuelve todo en la plantilla con su breadcrumb
    <LayoutPanel rutaMiga="Administrador/Control/Panel principal">
      {/* ---- Fila de 4 tarjetas KPI ---- */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TarjetaEstadistica
          etiqueta="Ventas de hoy"
          valor="$4.820.000"
          pista="14 ventas registradas"
          icono={<DollarSign className="size-4" />}
        />
        <TarjetaEstadistica
          etiqueta="Productos con stock bajo"
          valor="9"
          pista="Por debajo del mínimo"
          icono={<AlertTriangle className="size-4" />}
        />
        <TarjetaEstadistica
          etiqueta="Clientes con crédito pendiente"
          valor="12"
          pista="$5.420.000 en cartera"
          icono={<CreditCard className="size-4" />}
        />
        <TarjetaEstadistica
          etiqueta="Productos en inventario"
          valor="562"
          pista="Valor $210.450.000"
          icono={<Package className="size-4" />}
        />
      </div>

      {/* ---- Gráfico de barras + accesos rápidos ---- */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* El gráfico ocupa 2 de las 3 columnas en pantallas grandes */}
        <Panel titulo="Ventas de los últimos 7 días" className="lg:col-span-2">
          <GraficoBarras
            datos={[
              { etiqueta: "Lun", valor: 42 },
              { etiqueta: "Mar", valor: 55 },
              { etiqueta: "Mié", valor: 38 },
              { etiqueta: "Jue", valor: 71 },
              { etiqueta: "Vie", valor: 64 },
              { etiqueta: "Sáb", valor: 88 },
              { etiqueta: "Dom", valor: 26 },
            ]}
          />
        </Panel>
        {/* Accesos rápidos: enlaces directos a las acciones más usadas */}
        <Panel titulo="Accesos rápidos">
          <div className="grid gap-2 text-sm">
            {[
              { a: "/ventas", etiqueta: "Registrar nueva venta" } as const,
              { a: "/clientes", etiqueta: "Agregar cliente" } as const,
              { a: "/productos", etiqueta: "Actualizar inventario" } as const,
              { a: "/devoluciones", etiqueta: "Registrar devolución" } as const,
              { a: "/reportes", etiqueta: "Ver reportes" } as const,
            ].map((acceso) => (
              // Cada acceso es un Link con estilo de botón
              <Link
                key={acceso.a}
                to={acceso.a}
                className="rounded-md border border-border px-3 py-2 hover:bg-muted"
              >
                {acceso.etiqueta}
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      {/* ---- Tabla de últimas ventas ---- */}
      <Panel titulo="Últimas ventas registradas" className="mt-4">
        <TablaDatos
          columnas={["ID Venta", "Cliente", "Fecha", "Total", "Estado de pago"]}
          filas={[
            // Etiqueta verde para CONTADO, amarilla para CREDITO
            ["10245", "Andrea Ruiz", "31/08/2026", "$320.000", <Etiqueta tono="success">CONTADO</Etiqueta>],
            ["10244", "Comercial JR", "31/08/2026", "$1.150.000", <Etiqueta tono="warning">CREDITO</Etiqueta>],
            ["10243", "Luis Ortega", "30/08/2026", "$85.000", <Etiqueta tono="success">CONTADO</Etiqueta>],
            ["10242", "Distribuciones M", "30/08/2026", "$2.430.000", <Etiqueta tono="warning">CREDITO</Etiqueta>],
            ["10241", "Marta Peña", "29/08/2026", "$64.500", <Etiqueta tono="success">CONTADO</Etiqueta>],
          ]}
        />
      </Panel>
    </LayoutPanel>
  );
}
