import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, KeyRound, Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/restablecer")({
  head: () => ({
    meta: [
      { title: "Restablecer contraseña — Datronix Back-Office" },
      {
        name: "description",
        content:
          "Define una nueva contraseña para tu cuenta Datronix y vuelve a iniciar sesión.",
      },
      { property: "og:title", content: "Restablecer contraseña — Datronix" },
      {
        property: "og:description",
        content:
          "Define una nueva contraseña para tu cuenta Datronix y vuelve a iniciar sesión.",
      },
    ],
  }),
  component: Restablecer,
});

function Requisito({ texto, activo }: { texto: string; activo: boolean }) {
  return (
    <li
      className={
        activo ? "text-xs text-primary font-medium" : "text-xs text-muted-foreground"
      }
    >
      {activo ? "✓" : "•"} {texto}
    </li>
  );
}

function Restablecer() {
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [ver, setVer] = useState(false);

  const tieneLongitud = password.length >= 8;
  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const coincide = password.length > 0 && password === confirmar;

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

          <div className="mt-4 flex items-center gap-2">
            <div className="rounded-md bg-primary/10 p-2 text-primary">
              <KeyRound className="size-4" />
            </div>
            <h1 className="text-xl font-semibold">Restablecer contraseña</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Correo verificado. Define tu nueva contraseña para restablecer el
            acceso.
          </p>

          <form className="mt-6 space-y-4">
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Nueva contraseña
              </span>
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Lock className="size-4 text-muted-foreground" />
                <input
                  type={ver ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setVer((v) => !v)}
                  aria-label={ver ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {ver ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Confirmar contraseña
              </span>
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <Lock className="size-4 text-muted-foreground" />
                <input
                  type={ver ? "text" : "password"}
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
              {confirmar.length > 0 && !coincide && (
                <span className="text-xs text-destructive">
                  Las contraseñas no coinciden.
                </span>
              )}
              {coincide && (
                <span className="text-xs text-primary font-medium">
                  ✓ Las contraseñas coinciden.
                </span>
              )}
            </label>

            <ul className="space-y-1 rounded-md border border-border bg-muted/40 p-3">
              <Requisito texto="Mínimo 8 caracteres" activo={tieneLongitud} />
              <Requisito
                texto="Al menos una letra mayúscula"
                activo={tieneMayuscula}
              />
              <Requisito texto="Al menos un número" activo={tieneNumero} />
            </ul>

            <Link
              to="/login"
              className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Restablecer contraseña
            </Link>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            POST /api/usuarios/restablecer
          </p>
        </div>
      </section>
    </main>
  );
}
