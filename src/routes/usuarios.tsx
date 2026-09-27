import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Warehouse, Users } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TarjetaEstadistica, Panel, TablaDatos } from "@/components/module-ui";
import { BarraBusqueda, AccionesFila } from "@/components/form-ui";

export const Route = createFileRoute("/usuarios")({
  head: () => ({
    meta: [
      { title: "Usuarios — Datronix" },
      {
        name: "description",
        content: "Gestión de usuarios: identificación, nombre, correo y credenciales.",
      },
      { property: "og:title", content: "Usuarios — Datronix" },
      {
        property: "og:description",
        content: "Cuentas de usuario registradas en Datronix.",
      },
    ],
  }),
  component: Usuarios,
});

const usuariosMock = [
  { idUsuario: "1094567321", nombreUsuario: "Andrea Ruiz", correoUsuario: "andrea@datronix.co" },
  { idUsuario: "1020334455", nombreUsuario: "Luis Ortega", correoUsuario: "luis@datronix.co" },
  { idUsuario: "1033445566", nombreUsuario: "Marta Peña", correoUsuario: "marta@datronix.co" },
  { idUsuario: "1077889900", nombreUsuario: "Carlos Mena", correoUsuario: "carlos@datronix.co" },
];

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

function Usuarios() {
  return (
    <DashboardLayout breadcrumb="Administrador/Seguridad/Usuarios">
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <TarjetaEstadistica
          label="Usuarios registrados"
          value={String(usuariosMock.length)}
          icon={<Users className="size-4" />}
        />
        <TarjetaEstadistica
          label="Correos únicos"
          value={String(new Set(usuariosMock.map((usuario) => usuario.correoUsuario)).size)}
          hint="El correo tiene restricción única en la base de datos"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Registrar nuevo usuario">
          <form className="grid gap-3" onSubmit={(event) => event.preventDefault()}>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Cédula (ID usuario)</span>
              <input name="idUsuario" required className={inputClass} placeholder="Ej: 1094567321" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Nombre completo</span>
              <input name="nombreUsuario" required className={inputClass} placeholder="Nombre del usuario" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Correo</span>
              <input name="correoUsuario" type="email" required className={inputClass} placeholder="usuario@datronix.co" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Contraseña</span>
              <input name="contrasenaUsuario" type="password" required className={inputClass} placeholder="••••••••" />
            </label>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Guardar usuario
            </button>
          </form>
        </Panel>

        <Panel title="Usuarios del sistema" className="lg:col-span-2">
          <div className="mb-3">
            <BarraBusqueda placeholder="Buscar por cédula, nombre o correo..." />
          </div>
          <TablaDatos
            columns={["ID usuario", "Nombre", "Correo", "Acciones"]}
            rows={usuariosMock.map((usuario) => [
              usuario.idUsuario,
              usuario.nombreUsuario,
              usuario.correoUsuario,
              <AccionesFila />,
            ])}
          />
        </Panel>
      </div>
    </DashboardLayout>
  );
}
