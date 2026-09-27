import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mail, ArrowLeft, Sparkles, ShieldCheck, Timer } from "lucide-react";

export const Route = createFileRoute("/verificar")({
  head: () => ({
    meta: [
      { title: "Verificar acceso por código — Datronix Back-Office" },
      {
        name: "description",
        content:
          "Desbloquea tu cuenta Datronix con un código de verificación de 6 dígitos enviado a tu correo corporativo.",
      },
      { property: "og:title", content: "Verificar acceso — Datronix" },
      {
        property: "og:description",
        content:
          "Desbloqueo de cuenta por límite de intentos con código de 6 dígitos y vigencia de 2 minutos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Verificar,
});

const DURACION = 120;

function Verificar() {
  const [enviado, setEnviado] = useState(false);
  const [segundos, setSegundos] = useState(DURACION);
  const [codigo, setCodigo] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!enviado || segundos <= 0) return;
    const id = setInterval(() => setSegundos((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [enviado, segundos]);

  const mm = String(Math.floor(segundos / 60)).padStart(2, "0");
  const ss = String(segundos % 60).padStart(2, "0");
  const expirado = enviado && segundos === 0;
  const completo = codigo.every((c) => c !== "");

  const escribir = (i: number, valor: string) => {
    const v = valor.replace(/\D/g, "").slice(-1);
    setCodigo((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    if (v && i < 5) inputs.current[i + 1]?.focus();
  };

  const tecla = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codigo[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const enviar = () => {
    setEnviado(true);
    setSegundos(DURACION);
    setCodigo(Array(6).fill(""));
    setTimeout(() => inputs.current[0]?.focus(), 50);
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-gradient-sidebar p-10 text-sidebar-foreground lg:flex">
        <div>
          <p className="text-2xl font-semibold tracking-wide">Datronix</p>
          <p className="mt-1 text-xs tracking-[0.35em] opacity-80">IA</p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold leading-tight">
            Seguridad y control de acceso
          </h2>
          <p className="mt-4 max-w-md text-sm opacity-85">
            Si la cuenta se bloquea por exceder el límite de intentos, el ingreso
            se habilita con un código de verificación enviado al correo
            corporativo registrado.
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

          <h1 className="mt-4 flex items-center gap-2 text-xl font-semibold">
            <ShieldCheck className="size-5 text-primary" /> Verificar acceso
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Cuenta bloqueada por límite de intentos. Confirma tu correo para
            recibir un código de 6 dígitos válido por 2 minutos.
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
              onClick={enviar}
              className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              {enviado ? "Reenviar código" : "Enviar código al correo"}
            </button>

            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Código de verificación
                </span>
                <span
                  className={`flex items-center gap-1 text-xs font-medium ${
                    expirado ? "text-destructive" : "text-primary"
                  }`}
                >
                  <Timer className="size-3.5" />
                  {enviado ? `${mm}:${ss}` : "02:00"}
                </span>
              </div>

              <div className="flex justify-between gap-1.5">
                {codigo.map((valor, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el;
                    }}
                    value={valor}
                    onChange={(e) => escribir(i, e.target.value)}
                    onKeyDown={(e) => tecla(i, e)}
                    inputMode="numeric"
                    maxLength={1}
                    disabled={!enviado || expirado}
                    className="h-11 w-full rounded-md border border-input bg-background text-center text-base font-semibold outline-none focus:border-primary disabled:opacity-50"
                  />
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                {expirado
                  ? "El código expiró. Solicita uno nuevo para continuar."
                  : enviado
                    ? "Revisa tu bandeja de entrada y escribe los 6 dígitos."
                    : "Primero envía el código a tu correo registrado."}
              </p>
            </div>

            {completo && !expirado ? (
              <Link
                to="/"
                className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Verificar y entrar
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-50"
              >
                Verificar y entrar
              </button>
            )}
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            POST /api/usuarios/codigo · POST /api/usuarios/codigo/validar
          </p>
        </div>
      </section>
    </main>
  );
}
