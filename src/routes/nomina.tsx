import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Panel, TablaDatos, TarjetaEstadistica } from "@/components/module-ui";
import {
  DialogoFormulario,
  BotonAgregar,
  AccionesFila,
  type DefinicionCampo,
} from "@/components/form-ui";

export const Route = createFileRoute("/nomina")({
  head: () => ({
    meta: [
      { title: "Nómina y empleados — Datronix" },
      {
        name: "description",
        content:
          "Gestión de empleados y registro de pagos de nómina por período en el back-office Datronix.",
      },
      { property: "og:title", content: "Nómina y empleados — Datronix" },
      {
        property: "og:description",
        content: "Empleados, salarios base y pagos de nómina por período.",
      },
    ],
  }),
  component: Nomina,
});

const camposEmpleado: DefinicionCampo[] = [
  { nombre: "idEmpleado", etiqueta: "ID (Cédula)", requerido: true },
  { nombre: "nombreEmpleado", etiqueta: "Nombre", requerido: true },
  { nombre: "cargo", etiqueta: "Cargo", requerido: true },
  { nombre: "correoEmpleado", etiqueta: "Correo", tipo: "email" },
  { nombre: "telefonoEmpleado", etiqueta: "Teléfono" },
  { nombre: "fechaIngreso", etiqueta: "Fecha de ingreso", tipo: "date", requerido: true },
  { nombre: "salarioBase", etiqueta: "Salario base", tipo: "number", requerido: true },
];

const camposPago: DefinicionCampo[] = [
  {
    nombre: "empleado",
    etiqueta: "Empleado (ID)",
    tipo: "select",
    requerido: true,
    opciones: [
      { valor: "1020334", etiqueta: "Carolina Gómez" },
      { valor: "79221884", etiqueta: "Mauricio López" },
      { valor: "52998010", etiqueta: "Paula Díaz" },
      { valor: "1144220", etiqueta: "Julián Silva" },
    ],
  },
  { nombre: "fechaPago", etiqueta: "Fecha de pago", tipo: "date", requerido: true },
  { nombre: "salarioPagado", etiqueta: "Salario pagado", tipo: "number", requerido: true },
  { nombre: "periodo", etiqueta: "Período", placeholder: "2026-08", requerido: true },
];

function Nomina() {
  return (
    <DashboardLayout breadcrumb="Administrador/Talento humano/Nómina">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Nómina y empleados</h1>
        <div className="flex flex-wrap gap-2">
          <DialogoFormulario
            title="Agregar empleado"
            fields={camposEmpleado}
            trigger={<BotonAgregar label="Agregar empleado" />}
          />
          <DialogoFormulario
            title="Registrar pago de nómina"
            fields={camposPago}
            trigger={<BotonAgregar label="Registrar pago" />}
            submitLabel="Registrar pago"
          />
        </div>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <TarjetaEstadistica label="Empleados registrados" value="36" />
        <TarjetaEstadistica label="Período" value="2026-08" />
        <TarjetaEstadistica label="Total pagado" value="$92.400.000" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Empleados">
          <TablaDatos
            columns={["ID empleado", "Nombre", "Cargo", "Correo", "Teléfono", "Fecha de ingreso", "Salario base", "Acciones"]}
            rows={[
              ["1020334", "Carolina Gómez", "Ventas", "carolina@datronix.co", "3004451120", "12/02/2023", "$3.200.000", <AccionesFila />],
              ["79221884", "Mauricio López", "Ventas", "mauricio@datronix.co", "3108872211", "05/07/2022", "$3.200.000", <AccionesFila />],
              ["52998010", "Paula Díaz", "Contabilidad", "paula@datronix.co", "3152213344", "18/01/2021", "$4.100.000", <AccionesFila />],
              ["1144220", "Julián Silva", "Logística", "julian@datronix.co", "3207789900", "03/09/2024", "$2.700.000", <AccionesFila />],
            ]}
          />
        </Panel>

        <Panel title="Pagos registrados">
          <TablaDatos
            columns={["ID nómina", "ID empleado", "Empleado", "Período", "Fecha de pago", "Salario pagado"]}
            rows={[
              ["881", "1020334", "Carolina Gómez", "2026-08", "30/08/2026", "$2.860.000"],
              ["880", "79221884", "Mauricio López", "2026-08", "30/08/2026", "$2.860.000"],
              ["879", "52998010", "Paula Díaz", "2026-08", "30/08/2026", "$3.640.000"],
              ["878", "1144220", "Julián Silva", "2026-08", "30/08/2026", "$2.415.000"],
            ]}
          />
        </Panel>
      </div>
    </DashboardLayout>
  );
}
