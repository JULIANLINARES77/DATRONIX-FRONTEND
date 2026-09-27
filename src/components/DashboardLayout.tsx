// ============================================================================
// DashboardLayout.tsx — Plantilla general del panel (menú lateral + encabezado)
// Todas las pantallas internas del back-office se envuelven con LayoutPanel.
// ============================================================================

// Link: navegación entre rutas; useRouterState: saber en qué ruta estamos
import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
// Iconos de lucide-react (los nombres vienen de la librería, en inglés)
import {
  Home, // casa → Principal
  Tag, // etiqueta → Nueva venta
  Package, // paquete → Productos
  Truck, // camión → Proveedores
  BarChart3, // gráfico → Reportes
  Users, // personas → Clientes
  History, // reloj → Historial
  Undo2, // flecha de devolver → Devoluciones
  Wallet, // billetera → Nómina
  Headphones, // audífonos → Soporte
  LogOut, // salir
  Menu, // menú hamburguesa (móvil)
  Bell, // campana de notificaciones
  Search, // lupa de búsqueda
  ShoppingCart, // carrito → Compras
  ShieldCheck, // escudo → Usuarios y roles
} from "lucide-react";
// Utilidad para unir clases condicionalmente
import { cn } from "@/lib/utils";
// Asistente flotante de preguntas frecuentes
import { AsistenteIA } from "@/components/AsistenteIA";

// ----------------------------------------------------------------------------
// menuNavegacion: lista de opciones del menú lateral
// Cada ítem tiene: ruta (a), texto visible (etiqueta) e icono
// ----------------------------------------------------------------------------
const menuNavegacion = [
  { a: "/", etiqueta: "Principal", icono: Home },
  { a: "/ventas", etiqueta: "Nueva venta", icono: Tag },
  { a: "/historial", etiqueta: "Historial y remisiones", icono: History },
  { a: "/clientes", etiqueta: "Clientes", icono: Users },
  { a: "/productos", etiqueta: "Productos", icono: Package },
  { a: "/proveedores", etiqueta: "Proveedores", icono: Truck },
  { a: "/compras", etiqueta: "Compras", icono: ShoppingCart },
  { a: "/devoluciones", etiqueta: "Devoluciones", icono: Undo2 },
  { a: "/reportes", etiqueta: "Reportes", icono: BarChart3 },
  { a: "/nomina", etiqueta: "Nómina", icono: Wallet },
  { a: "/usuarios", etiqueta: "Usuarios", icono: ShieldCheck },
  { a: "/soporte", etiqueta: "Soporte", icono: Headphones },
] as const;

// ----------------------------------------------------------------------------
// fechaHoyEspanol: devuelve la fecha actual en formato colombiano largo
// Ejemplo: "jueves, 17 de septiembre de 2026"
// ----------------------------------------------------------------------------
function fechaHoyEspanol() {
  return new Date().toLocaleDateString("es-CO", {
    weekday: "long", // día de la semana
    day: "numeric", // día del mes
    month: "long", // nombre del mes
    year: "numeric", // año
  });
}

// ----------------------------------------------------------------------------
// LayoutPanel: estructura fija de todas las pantallas internas
// Recibe la "rutaMiga" (breadcrumb del encabezado azul) y el contenido (children)
// ----------------------------------------------------------------------------
export function LayoutPanel({
  rutaMiga,
  breadcrumb,
  children,
}: {
  rutaMiga?: string;
  breadcrumb?: string;
  children: ReactNode;
}) {
  // Estado: si el menú lateral está abierto en pantallas móviles
  const [menuAbierto, setMenuAbierto] = useState(false);
  // Ruta actual: sirve para resaltar la opción activa del menú
  const rutaActual = useRouterState({ select: (s) => s.location.pathname });
  const rutaVisible = rutaMiga ?? breadcrumb ?? "Datronix";

  return (
    <div className="min-h-screen bg-background">
      {/* ============ MENÚ LATERAL (azul oscuro) ============ */}
      <aside
        className={cn(
          // Fijo a la izquierda; en pantallas grandes siempre visible
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gradient-sidebar text-sidebar-foreground transition-transform lg:translate-x-0",
          // En móvil se muestra u oculta según "menuAbierto"
          menuAbierto ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo / marca */}
        <div className="border-b border-sidebar-border px-6 py-6 text-center">
          <p className="text-xl font-semibold tracking-wide">Datronix</p>
          <div className="mx-auto mt-3 h-px w-32 bg-sidebar-border" />
          <p className="mt-3 text-xs font-medium tracking-[0.3em] opacity-80">
            IA
          </p>
        </div>

        {/* Opciones de navegación */}
        <nav className="flex-1 overflow-y-auto py-2">
          {menuNavegacion.map(({ a, etiqueta, icono: Icono }) => {
            // ¿Esta opción corresponde a la ruta en la que estoy?
            const activa = rutaActual === a;
            return (
              <Link
                key={a}
                to={a}
                // Al hacer clic en móvil, se cierra el menú
                onClick={() => setMenuAbierto(false)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 text-sm transition-colors",
                  // La opción activa se pinta con fondo resaltado
                  activa
                    ? "bg-sidebar-primary font-semibold"
                    : "hover:bg-sidebar-accent/70",
                )}
              >
                <Icono className="size-5 shrink-0" />
                <span>{etiqueta}</span>
              </Link>
            );
          })}
        </nav>

        {/* Botón Salir → vuelve al login */}
        <div className="border-t border-sidebar-border p-4">
          <Link
            to="/login"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-sidebar-accent/50 px-4 py-2 text-sm transition-colors hover:bg-sidebar-accent"
          >
            <LogOut className="size-4" />
            Salir
          </Link>
        </div>
      </aside>

      {/* Fondo oscuro detrás del menú cuando está abierto en móvil */}
      {menuAbierto && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* ============ ZONA DE CONTENIDO (deja espacio al menú lateral) ============ */}
      <div className="lg:pl-64">
        {/* Barra superior blanca con el slogan */}
        <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-2 text-sm">
          {/* Botón hamburguesa: solo visible en móvil */}
          <button
            className="rounded-md p-2 hover:bg-muted lg:hidden"
            onClick={() => setMenuAbierto(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </button>
          <span className="text-primary">♥</span>
          <span className="font-medium">
            We Transform Data into Intelligent Decisions!
          </span>
          {/* Lado derecho: buscador, campana y avatar */}
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-md border border-border px-3 py-1.5 text-muted-foreground md:flex">
              <Search className="size-4" />
              <span className="text-xs">Buscar...</span>
            </div>
            <button className="rounded-md p-2 hover:bg-muted" aria-label="Notificaciones">
              <Bell className="size-5" />
            </button>
            {/* Avatar con iniciales del usuario */}
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              AD
            </div>
          </div>
        </div>

        {/* Encabezado azul con la ruta (breadcrumb) y la fecha de hoy */}
        <header className="bg-gradient-header px-6 py-8 text-primary-foreground">
          <p className="text-center text-lg font-medium">{rutaVisible}</p>
          <p className="mt-4 text-center text-base opacity-90">
            Hoy es {fechaHoyEspanol()}
          </p>
        </header>

        {/* Aquí se pinta el contenido de cada módulo */}
        <main className="p-4 md:p-6">{children}</main>
      </div>

      {/* Asistente IA flotante, disponible en todas las pantallas */}
      <AsistenteIA />
    </div>
  );
}

export function DashboardLayout(props: {
  breadcrumb?: string;
  children: ReactNode;
}) {
  return (
    <LayoutPanel
      {...props}
      {...(props.breadcrumb ? { rutaMiga: props.breadcrumb } : {})}
    />
  );
}
