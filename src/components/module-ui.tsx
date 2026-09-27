// ============================================================================
// module-ui.tsx — Componentes visuales reutilizables de los módulos Datronix
// Aquí viven las "piezas" que se repiten en todas las pantallas:
// tarjetas de KPI, paneles, tablas de datos, etiquetas de estado y gráficos.
// ============================================================================

// Tipo de React para aceptar "hijos" (cualquier contenido JSX dentro de un componente)
import type { ReactNode } from "react";
// Iconos de la librería lucide-react (nombres en inglés: vienen de la librería, no se pueden traducir)
import { Plus, Filter, Download } from "lucide-react";
// Utilidad "cn": une clases de Tailwind condicionalmente
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------------
// BarraHerramientas: título de la página + botones Filtrar / Exportar / Nuevo
// ----------------------------------------------------------------------------
export function BarraHerramientas({ titulo, accion }: { titulo: string; accion?: string }) {
  return (
    // Contenedor en fila: título a la izquierda, botones a la derecha
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      {/* Título principal del módulo */}
      <h1 className="text-xl font-semibold">{titulo}</h1>
      {/* Grupo de botones de acción (solo visuales, sin lógica) */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Botón Filtrar */}
        <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm hover:bg-muted">
          <Filter className="size-4" /> Filtrar
        </button>
        {/* Botón Exportar */}
        <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm hover:bg-muted">
          <Download className="size-4" /> Exportar
        </button>
        {/* Botón principal de acción (por defecto dice "Nuevo") */}
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          <Plus className="size-4" /> {accion ?? "Nuevo"}
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// TarjetaEstadistica: tarjeta KPI con etiqueta, valor grande, pista e icono
// Ejemplo: "Ventas de hoy" / "$4.820.000" / "14 ventas registradas"
// ----------------------------------------------------------------------------
export function TarjetaEstadistica({
  etiqueta,
  label,
  valor,
  value,
  pista,
  hint,
  icono,
  icon,
}: {
  etiqueta?: string;
  label?: string;
  valor?: string | number;
  value?: string | number;
  pista?: string;
  hint?: string;
  icono?: ReactNode;
  icon?: ReactNode;
}) {
  const textoEtiqueta = etiqueta ?? label ?? "";
  const valorVisible = valor ?? value ?? "";
  const pistaVisible = pista ?? hint;
  const iconoVisible = icono ?? icon;

  return (
    // Caja con borde, fondo de tarjeta y sombra suave
    <div className="rounded-lg border border-border bg-card p-4 shadow-card">
      {/* Fila superior: etiqueta a la izquierda, icono a la derecha */}
      <div className="flex items-start justify-between">
        <p className="text-sm text-muted-foreground">{textoEtiqueta}</p>
        {/* El icono solo se pinta si se envía */}
        {iconoVisible && (
          <span className="rounded-md bg-primary-soft p-2 text-primary">
            {iconoVisible}
          </span>
        )}
      </div>
      {/* Valor principal en grande */}
      <p className="mt-2 text-2xl font-semibold">{valorVisible}</p>
      {/* Pista opcional (texto pequeño gris) */}
      {pistaVisible && <p className="mt-1 text-xs text-muted-foreground">{pistaVisible}</p>}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Panel: caja contenedora con título opcional y contenido dentro
// ----------------------------------------------------------------------------
export function Panel({
  titulo,
  title,
  children,
  className,
}: {
  titulo?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const tituloVisible = titulo ?? title;

  return (
    // <section> semántico con estilo de tarjeta; cn() une las clases base con las extra
    <section
      className={cn(
        "rounded-lg border border-border bg-card shadow-card",
        className,
      )}
    >
      {/* Encabezado solo si hay título */}
      {tituloVisible && (
        <header className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold">{tituloVisible}</h2>
        </header>
      )}
      {/* Contenido con relleno interno */}
      <div className="p-4">{children}</div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// TablaDatos: tabla genérica con columnas y filas + paginación visual
// Recibe "columnas" (textos del encabezado) y "filas" (celdas: texto o JSX)
// ----------------------------------------------------------------------------
export function TablaDatos({
  columnas,
  filas,
  columns,
  rows,
}: {
  columnas?: string[];
  filas?: (string | ReactNode)[][];
  columns?: string[];
  rows?: (string | ReactNode)[][];
}) {
  const columnasVisible = columnas ?? columns ?? [];
  const filasVisible = filas ?? rows ?? [];

  return (
    // Contenedor con scroll horizontal para pantallas pequeñas
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        {/* Encabezado de la tabla con fondo azul suave */}
        <thead>
          <tr className="bg-primary-soft text-left text-secondary-foreground">
            {/* Se recorre el arreglo de columnas y se crea un <th> por cada una */}
            {columnasVisible.map((columna) => (
              <th key={columna} className="px-3 py-2 font-semibold">
                {columna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Se recorre cada fila (i = índice de la fila) */}
          {filasVisible.map((fila, i) => (
            <tr
              key={i}
              className="border-b border-border last:border-0 hover:bg-muted/60"
            >
              {/* Dentro de cada fila se recorre cada celda (j = índice de celda) */}
              {fila.map((celda, j) => (
                <td key={j} className="px-3 py-2">
                  {celda}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pie de tabla: conteo de registros + botones de paginación (visuales) */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Mostrando {filasVisible.length} registros</span>
        <div className="flex gap-1">
          {["Anterior", "1", "2", "3", "Siguiente"].map((pagina) => (
            <button
              key={pagina}
              className="rounded border border-border px-2 py-1 hover:bg-muted"
            >
              {pagina}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const DataTable = TablaDatos;
export const StatCard = TarjetaEstadistica;
export const Pill = Etiqueta;

// ----------------------------------------------------------------------------
// Etiqueta: "píldora" de color para estados (CONTADO, CREDITO, Pagado, etc.)
// tono: primary (azul), success (verde), warning (amarillo), danger (rojo)
// ----------------------------------------------------------------------------
export function Etiqueta({
  children,
  tono,
  tone,
}: {
  children: ReactNode;
  tono?: "primary" | "success" | "warning" | "danger";
  tone?: "primary" | "success" | "warning" | "danger";
}) {
  const tonoVisible = tono ?? tone ?? "primary";

  // Mapa de tono -> clases de color de Tailwind (tokens del tema)
  const tonos = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/25 text-warning-foreground",
    danger: "bg-destructive/15 text-destructive",
  } as const;
  return (
    // Span redondeado; se elige el color según el tono recibido
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
        tonos[tonoVisible],
      )}
    >
      {children}
    </span>
  );
}

// ----------------------------------------------------------------------------
// GraficoBarras: gráfico de barras simple hecho con divs (sin librerías)
// Recibe datos = [{ etiqueta, valor }] y calcula la altura de cada barra
// ----------------------------------------------------------------------------
export function GraficoBarras({
  datos,
  data,
}: {
  datos?: { etiqueta: string; valor: number }[];
  data?: { etiqueta: string; valor: number }[];
}) {
  const datosVisible = datos ?? data ?? [];
  if (datosVisible.length === 0) return null;

  // Valor máximo del conjunto: sirve para escalar las barras al 100%
  const maximo = Math.max(...datosVisible.map((d) => d.valor));
  return (
    // Contenedor flexible; las barras crecen desde abajo (items-end)
    <div className="flex h-48 items-end gap-3">
      {datosVisible.map((d) => (
        <div key={d.etiqueta} className="flex flex-1 flex-col items-center gap-2">
          {/* La barra: su altura es el porcentaje del valor respecto al máximo */}
          <div
            className="w-full rounded-t bg-primary transition-all"
            style={{ height: `${(d.valor / maximo) * 100}%` }}
          />
          {/* Etiqueta debajo de la barra */}
          <span className="text-xs text-muted-foreground">{d.etiqueta}</span>
        </div>
      ))}
    </div>
  );
}
