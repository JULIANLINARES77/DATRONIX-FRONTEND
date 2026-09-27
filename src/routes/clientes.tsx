// ============================================================================
// clientes.tsx — CRUD visual de Clientes
// Encabezado con buscador + botón "Agregar cliente" (modal), 3 KPIs y tabla.
// Los nombres de los campos (nombre, etiqueta) coinciden con la tabla Cliente
// del backend: id_cliente, nombre_cliente, telefono_cliente, etc.
// ============================================================================

import { createFileRoute } from "@tanstack/react-router";
import { LayoutPanel } from "@/components/DashboardLayout";
import { Panel, TablaDatos, TarjetaEstadistica } from "@/components/module-ui";
import { EncabezadoCrud, AccionesFila, type DefinicionCampo } from "@/components/form-ui";

// Ruta "/clientes" con sus metadatos SEO
export const Route = createFileRoute("/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes — Datronix" },
      {
        name: "description",
        content:
          "Gestión de clientes Datronix: cédula o RUC, contacto, dirección y tipo de cliente.",
      },
      { property: "og:title", content: "Clientes — Datronix" },
      {
        property: "og:description",
        content: "Alta, edición y búsqueda de clientes del back-office.",
      },
    ],
  }),
  component: Clientes,
});

// ----------------------------------------------------------------------------
// camposCliente: definición de los campos del formulario "Agregar cliente"
// El tipo "select" dibuja una lista desplegable con las opciones dadas
// ----------------------------------------------------------------------------
const camposCliente: DefinicionCampo[] = [
  { nombre: "idCliente", etiqueta: "ID (Cédula / RUC)", placeholder: "1020334", requerido: true },
  { nombre: "nombreCliente", etiqueta: "Nombre", placeholder: "Andrea Ruiz", requerido: true },
  { nombre: "telefonoCliente", etiqueta: "Teléfono", tipo: "number", placeholder: "3000000000", requerido: true },
  { nombre: "emailCliente", etiqueta: "Correo", tipo: "email" },
  { nombre: "direccionCliente", etiqueta: "Dirección", placeholder: "Cra 10 #20-30" },
  {
    nombre: "tipoCliente",
    etiqueta: "Tipo de cliente",
    tipo: "select",
    opciones: ["NATURAL", "JURIDICO", "MAYORISTA"],
  },
];

// ----------------------------------------------------------------------------
// Clientes: pantalla del módulo
// ----------------------------------------------------------------------------
function Clientes() {
  return (
    <LayoutPanel rutaMiga="Administrador/CRM/Clientes">
      {/* Encabezado: título + buscador + botón que abre el modal de registro */}
      <EncabezadoCrud
        titulo="Clientes"
        placeholderBusqueda="Buscar por ID o nombre..."
        etiquetaAgregar="Agregar cliente"
        campos={camposCliente}
      />
      {/* Tarjetas KPI del módulo */}
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <TarjetaEstadistica etiqueta="Clientes registrados" valor="1.284" />
        <TarjetaEstadistica etiqueta="Nuevos este mes" valor="34" />
        <TarjetaEstadistica etiqueta="Con crédito pendiente" valor="12" />
      </div>
      {/* Tabla de clientes (datos de ejemplo) */}
      <Panel>
        <TablaDatos
          columnas={["ID", "Nombre", "Teléfono", "Correo", "Dirección", "Tipo", "Acciones"]}
          filas={[
            ["1020334", "Andrea Ruiz", "3004451120", "andrea@mail.com", "Cra 10 #20-30, Bogotá", "NATURAL", <AccionesFila />],
            ["9007712", "Comercial JR", "6013448890", "ventas@jr.com", "Cl 45 #12-08, Medellín", "JURIDICO", <AccionesFila />],
            ["79554221", "Luis Ortega", "3108872211", "lortega@mail.com", "Av 6 #14-22, Cali", "NATURAL", <AccionesFila />],
            ["9010048", "Distribuciones M", "6052213344", "compras@dism.com", "Cl 72 #40-11, Barranquilla", "MAYORISTA", <AccionesFila />],
          ]}
        />
      </Panel>
    </LayoutPanel>
  );
}
