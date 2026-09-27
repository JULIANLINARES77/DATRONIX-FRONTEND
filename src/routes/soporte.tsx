import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Panel, TablaDatos } from "@/components/module-ui";

export const Route = createFileRoute("/soporte")({
  head: () => ({
    meta: [
      { title: "Soporte y tickets — Datronix" },
      {
        name: "description",
        content:
          "Registro de solicitudes de soporte técnico Datronix y sus datos de creación.",
      },
    ],
  }),
  component: Soporte,
});

const input =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

function Soporte() {
  return (
    <DashboardLayout breadcrumb="Administrador/Ayuda/Soporte">
      <h1 className="mb-4 text-xl font-semibold">Soporte</h1>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Nuevo ticket">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block space-y-1.5 sm:col-span-2">
              <span className="text-xs font-medium text-muted-foreground">Empresa</span>
              <input name="empresa" required className={input} placeholder="Comercial JR" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                ID remitente (Cédula)
              </span>
              <input name="idRemitente" required className={input} placeholder="1020334" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Nombre del remitente
              </span>
              <input name="nombreRemitente" className={input} placeholder="Andrea Ruiz" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Teléfono</span>
              <input name="telefonoRemitente" required className={input} placeholder="3000000000" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Asunto</span>
              <input name="asunto" required className={input} placeholder="Error al generar remisión" />
            </label>
            <label className="block space-y-1.5 sm:col-span-2">
              <span className="text-xs font-medium text-muted-foreground">Descripción</span>
              <textarea name="descripcion" required rows={5} className={input} placeholder="Describe el inconveniente..." />
            </label>
            <label className="block space-y-1.5 sm:col-span-2">
              <span className="text-xs font-medium text-muted-foreground">Fecha de creación</span>
              <input name="fechaCreacion" type="datetime-local" required className={input} />
            </label>
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Send className="size-4" /> Enviar ticket
          </button>
        </Panel>

        <Panel title="Tickets enviados">
          <TablaDatos
            columns={["ID", "Empresa", "ID remitente", "Nombre remitente", "Teléfono", "Asunto", "Descripción", "Fecha de creación"]}
            rows={[
              ["112", "Comercial JR", "1020334", "Andrea Ruiz", "3004451120", "Error al generar remisión", "El sistema no genera el documento de entrega después de confirmar la venta.", "30/08/2026 10:20"],
              ["111", "Distribuciones M", "9010048", "Sara Muñoz", "6052213344", "Actualizar precios masivo", "Solicito orientación para actualizar varios precios del catálogo.", "28/08/2026 14:05"],
              ["110", "Tecno Sur", "79554221", "Camilo Vega", "6021189032", "No carga el inventario", "La lista de productos queda cargando y no presenta resultados.", "26/08/2026 09:15"],
              ["109", "Comercial JR", "9007712", "Jorge Peña", "6013448890", "Solicitud de usuario nuevo", "Necesitamos registrar una cuenta para un nuevo integrante.", "24/08/2026 16:40"],
            ]}
          />
        </Panel>
      </div>
    </DashboardLayout>
  );
}
