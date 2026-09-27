// ============================================================================
// AsistenteIA.tsx — Chat flotante de preguntas frecuentes (modo demostración)
// Botón redondo en la esquina inferior derecha que abre una ventana de chat.
// Responde solo las preguntas frecuentes definidas abajo; lo demás da un
// mensaje genérico (el backend IA se conectará después).
// ============================================================================

import { useState } from "react";
// Iconos: robot, enviar, cerrar y chispa
import { Bot, Send, X, Sparkles } from "lucide-react";
// Utilidad para unir clases condicionalmente
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------------
// preguntasFrecuentes: botones de acceso rápido que se muestran en el chat
// ----------------------------------------------------------------------------
const preguntasFrecuentes = [
  "¿Cómo registro una venta?",
  "¿Qué hago con un crédito vencido?",
  "¿Cómo repongo stock bajo?",
  "¿Dónde veo las remisiones?",
];

// Tipo de cada mensaje del chat: quién lo envía (ia o user) y el texto
type Mensaje = { de: "ia" | "usuario"; texto: string };

// ----------------------------------------------------------------------------
// respuestas: diccionario pregunta → respuesta predefinida
// ----------------------------------------------------------------------------
const respuestas: Record<string, string> = {
  "¿Cómo registro una venta?":
    "Ve al módulo Ventas, busca el cliente por cédula, agrega productos al carrito, define dirección de entrega y estado de pago (CONTADO o CRÉDITO) y finaliza. La remisión se genera automáticamente.",
  "¿Qué hago con un crédito vencido?":
    "Abre Reportes > Créditos pendientes. Allí ves las ventas con estado CRÉDITO y los días transcurridos para gestionar el cobro.",
  "¿Cómo repongo stock bajo?":
    "En Reportes > Stock bajo verás los productos por debajo del mínimo, resaltados en rojo. Contacta al proveedor asociado desde el módulo Proveedores.",
  "¿Dónde veo las remisiones?":
    "En Historial de ventas, cada venta tiene el botón Ver detalle con los productos y la remisión generada.",
};

export function AsistenteIA() {
  // Estado: si la ventana de chat está abierta
  const [abierto, setAbierto] = useState(false);
  // Estado: lista de mensajes del chat (arranca con el saludo de la IA)
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      de: "ia",
      texto: "¡Hola! Soy el asistente Datronix IA. ¿En qué te ayudo hoy?",
    },
  ]);
  // Estado: texto que el usuario está escribiendo
  const [texto, setTexto] = useState("");

  // --------------------------------------------------------------------------
  // enviar: agrega el mensaje del usuario y la respuesta de la IA al chat
  // Si la pregunta existe en el diccionario, usa esa respuesta; si no, responde
  // con el mensaje genérico de demostración.
  // --------------------------------------------------------------------------
  function enviar(valor: string) {
    // No enviar mensajes vacíos
    if (!valor.trim()) return;
    setMensajes((lista) => [
      ...lista, // mensajes anteriores
      { de: "usuario", texto: valor }, // mensaje del usuario
      {
        de: "ia",
        texto:
          respuestas[valor] ?? // respuesta conocida...
          "Estoy en modo demostración. Pronto podré responder consultas sobre tus ventas, inventario y cartera en tiempo real.", // ...o genérica
      },
    ]);
    // Limpiar la caja de texto
    setTexto("");
  }

  return (
    <>
      {/* Botón flotante redondo que abre/cierra el chat */}
      <button
        onClick={() => setAbierto((valor) => !valor)}
        aria-label="Asistente IA"
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-gradient-header text-primary-foreground shadow-card transition-transform hover:scale-105"
      >
        {/* Icono X si está abierto, robot si está cerrado */}
        {abierto ? <X className="size-6" /> : <Bot className="size-6" />}
      </button>

      {/* Ventana del chat: solo se pinta cuando está abierta */}
      {abierto && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[26rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card">
          {/* Encabezado azul del chat */}
          <div className="flex items-center gap-2 bg-gradient-header px-4 py-3 text-primary-foreground">
            <Sparkles className="size-4" />
            <p className="text-sm font-semibold">Datronix IA</p>
          </div>

          {/* Zona de mensajes con scroll */}
          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            {mensajes.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                  // Burbujas de la IA a la izquierda (gris), del usuario a la derecha (azul)
                  m.de === "ia"
                    ? "bg-muted text-foreground"
                    : "ml-auto bg-primary text-primary-foreground",
                )}
              >
                {m.texto}
              </div>
            ))}
            {/* Botones de preguntas frecuentes */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {preguntasFrecuentes.map((pregunta) => (
                <button
                  key={pregunta}
                  onClick={() => enviar(pregunta)}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted"
                >
                  {pregunta}
                </button>
              ))}
            </div>
          </div>

          {/* Caja de texto + botón enviar */}
          <div className="flex items-center gap-2 border-t border-border p-2">
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              // Enter también envía el mensaje
              onKeyDown={(e) => e.key === "Enter" && enviar(texto)}
              placeholder="Escribe tu consulta..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={() => enviar(texto)}
              aria-label="Enviar"
              className="rounded-md bg-primary p-2 text-primary-foreground hover:opacity-90"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
