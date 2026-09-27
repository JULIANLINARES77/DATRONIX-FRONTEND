import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/recuperar")({
  head: () => ({
    meta: [
      { title: "Recuperar contraseña — Datronix Back-Office" },
      {
        name: "description",
        content: "Recupera el acceso a tu cuenta Datronix con tu correo corporativo.",
      },
      { property: "og:title", content: "Recuperar contraseña — Datronix" },
      {
        property: "og:description",
        content: "Recupera el acceso a tu cuenta Datronix con tu correo corporativo.",
      },
    ],
  }),
  component: Recuperar,
});

function Recuperar() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-gradient-sidebar p-10 text-sidebar-foreground lg:flex">
        <div>
          <p className="text-2xl font-semibold tracking-wide">Datronix</p>
          <p className="mt-1 text-xs tracking-[0.35em] opacity-80">IA</p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold leading-tight">
            We Transform Data into Intelligent Decisions
          </h2>
          <p className="mt-4 max-w-md text-sm opacity-85">
            Back-office centralizado para comercializadoras y distribuidoras:
            pedidos, inventario, cartera y remisiones en un solo lugar.
          </p>
        </div>
        <p className="flex items-center gap-2 text-xs opacity-75">
          <Sparkles className="size-4" /> Asistente IA incluido
        </p>
      </section>

      <section className="flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-card">
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-3.5" /> Volver a iniciar sesión
          </Link>
          <h1 className="mt-4 text-xl font-semibold">Recuperar contraseña</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ingresa tu correo y te enviaremos instrucciones para restablecer tu
            contraseña.
          </p>

          <form className="mt-6 space-y-4">
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Correo electrónico
              </span>
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Mail className="size-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="usuario@empresa.com"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </label>

            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Enviar instrucciones
            </button>

            <Link
              to="/restablecer"
              className="flex w-full items-center justify-center rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Ya verifiqué el código · Definir nueva contraseña
            </Link>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            POST /api/usuarios/recuperar
          </p>
        </div>
      </section>
    </main>
  );
}
