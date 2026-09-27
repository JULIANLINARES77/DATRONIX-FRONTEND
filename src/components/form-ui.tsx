// ============================================================================
// form-ui.tsx — Piezas reutilizables de formularios y tablas CRUD
// BarraBusqueda, CampoFormulario, DialogoFormulario, BotonAgregar,
// AccionesFila y EncabezadoCrud se usan en casi todos los módulos.
// ============================================================================

import { useState, type ReactNode } from "react";
// Iconos de lucide-react (nombres fijos de la librería)
import { Search, Pencil, Trash2, Plus } from "lucide-react";
// Componentes del diálogo modal (shadcn/ui) — nombres fijos de la librería
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// Utilidad para unir clases de Tailwind
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------------
// DefinicionCampo: describe un campo de formulario de forma declarativa
// Así cada módulo solo declara sus campos y DialogoFormulario los dibuja
// ----------------------------------------------------------------------------
export type DefinicionCampo = {
  nombre: string; // identificador del campo (ej. "nombre_cliente")
  etiqueta: string; // texto visible sobre el campo
  tipo?: "text" | "number" | "email" | "date" | "textarea" | "select"; // tipo de entrada
  opciones?: (string | { valor: string; etiqueta: string })[]; // opciones cuando el tipo es "select"
  placeholder?: string; // texto de ayuda dentro del campo
  requerido?: boolean; // si el campo es obligatorio
};

export type FieldDef = DefinicionCampo;

// ----------------------------------------------------------------------------
// BarraBusqueda: caja con icono de lupa + input de búsqueda (solo visual)
// ----------------------------------------------------------------------------
export function BarraBusqueda({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex w-full max-w-sm items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
      {/* Icono de lupa */}
      <Search className="size-4 text-muted-foreground" />
      {/* Campo de texto transparente que ocupa todo el ancho */}
      <input
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        placeholder={placeholder}
      />
    </div>
  );
}

// ----------------------------------------------------------------------------
// CampoFormulario: dibuja UN campo según su DefinicionCampo
// Soporta: textarea, select (lista desplegable) e input normal
// ----------------------------------------------------------------------------
export function CampoFormulario({ campo }: { campo: DefinicionCampo }) {
  // Clases base compartidas por todos los tipos de campo
  const clasesBase =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";
  return (
    // <label> envuelve todo: al hacer clic en el texto se enfoca el campo
    <label className="block space-y-1.5">
      {/* Texto de la etiqueta */}
      <span className="text-xs font-medium text-muted-foreground">
        {campo.etiqueta}
      </span>
      {/* Se elige el control según el tipo declarado */}
      {campo.tipo === "textarea" ? (
        // Área de texto de varias líneas
        <textarea
          name={campo.nombre}
          required={campo.requerido}
          rows={3}
          className={clasesBase}
          placeholder={campo.placeholder}
        />
      ) : campo.tipo === "select" ? (
        // Lista desplegable con placeholder deshabilitado + opciones
        <select
          name={campo.nombre}
          required={campo.requerido}
          className={clasesBase}
          defaultValue=""
        >
          <option value="" disabled>
            Seleccionar...
          </option>
          {/* Una <option> por cada texto del arreglo "opciones" */}
          {campo.opciones?.map((opcion) => {
            const valor = typeof opcion === "string" ? opcion : opcion.valor;
            const etiqueta = typeof opcion === "string" ? opcion : opcion.etiqueta;
            return <option key={valor} value={valor}>{etiqueta}</option>;
          })}
        </select>
      ) : (
        // Input normal (texto, número, correo o fecha según "tipo")
        <input
          name={campo.nombre}
          required={campo.requerido}
          type={campo.tipo ?? "text"}
          className={clasesBase}
          placeholder={campo.placeholder}
        />
      )}
    </label>
  );
}

// ----------------------------------------------------------------------------
// DialogoFormulario: ventana modal con un formulario generado desde campos
// "disparador" es el botón que abre el modal (ej. BotonAgregar)
// ----------------------------------------------------------------------------
export function DialogoFormulario({
  titulo,
  title,
  campos,
  fields,
  disparador,
  trigger,
  etiquetaGuardar = "Guardar",
  submitLabel,
  columnas = 2,
  columns,
}: {
  titulo?: string;
  title?: string;
  campos?: DefinicionCampo[];
  fields?: DefinicionCampo[];
  disparador?: ReactNode;
  trigger?: ReactNode;
  etiquetaGuardar?: string;
  submitLabel?: string;
  columnas?: 1 | 2;
  columns?: 1 | 2;
}) {
  const tituloVisible = titulo ?? title ?? "Formulario";
  const camposVisible = campos ?? fields ?? [];
  const disparadorVisible = disparador ?? trigger;
  const etiquetaGuardarVisible = etiquetaGuardar ?? submitLabel ?? "Guardar";
  const columnasVisible = columnas ?? columns ?? 2;

  // Estado local: controla si el modal está abierto o cerrado
  const [abierto, setAbierto] = useState(false);
  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      {/* El disparador recibe el comportamiento de abrir el modal */}
      <DialogTrigger asChild>{disparadorVisible}</DialogTrigger>
      {/* Contenido del modal con scroll si es muy alto */}
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{tituloVisible}</DialogTitle>
        </DialogHeader>
        {/* Cuadrícula de campos: 1 o 2 columnas según el parámetro */}
        <div
          className={cn(
            "grid gap-3",
            columnasVisible === 2 ? "sm:grid-cols-2" : "grid-cols-1",
          )}
        >
          {/* Se dibuja un CampoFormulario por cada definición */}
          {camposVisible.map((campo) => (
            <CampoFormulario key={campo.nombre} campo={campo} />
          ))}
        </div>
        <DialogFooter>
          {/* Cancelar solo cierra el modal (visual) */}
          <button
            onClick={() => setAbierto(false)}
            className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"
          >
            Cancelar
          </button>
          {/* Guardar solo cierra el modal; la lógica la hará el backend */}
          <button
            onClick={() => setAbierto(false)}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {etiquetaGuardarVisible}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------------------------------------------
// BotonAgregar: botón azul con icono + (se usa como disparador del modal)
// ----------------------------------------------------------------------------
export function BotonAgregar({
  etiqueta,
  label,
}: {
  etiqueta?: string;
  label?: string;
}) {
  const textoVisible = etiqueta ?? label ?? "Agregar";
  return (
    <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
      <Plus className="size-4" /> {textoVisible}
    </button>
  );
}

// ----------------------------------------------------------------------------
// AccionesFila: botones Editar (lápiz) y Eliminar (caneca) para cada fila
// ----------------------------------------------------------------------------
export function AccionesFila() {
  return (
    <div className="flex gap-1">
      {/* Botón editar */}
      <button
        aria-label="Editar"
        className="rounded-md border border-border p-1.5 text-primary hover:bg-muted"
      >
        <Pencil className="size-3.5" />
      </button>
      {/* Botón eliminar */}
      <button
        aria-label="Eliminar"
        className="rounded-md border border-border p-1.5 text-destructive hover:bg-muted"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
}

// ----------------------------------------------------------------------------
// EncabezadoCrud: fila estándar de los CRUD = título + buscador + botón agregar
// ----------------------------------------------------------------------------
export const SearchBar = BarraBusqueda;
export const FormDialog = DialogoFormulario;
export const AddButton = BotonAgregar;
export const RowActions = AccionesFila;

export function EncabezadoCrud({
  titulo,
  placeholderBusqueda,
  etiquetaAgregar,
  campos,
}: {
  titulo: string;
  placeholderBusqueda: string;
  etiquetaAgregar: string;
  campos: DefinicionCampo[];
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      {/* Título del módulo */}
      <h1 className="text-xl font-semibold">{titulo}</h1>
      {/* Buscador + botón que abre el modal de agregar */}
      <div className="flex flex-wrap items-center gap-2">
        <BarraBusqueda placeholder={placeholderBusqueda} />
        <DialogoFormulario
          titulo={etiquetaAgregar}
          campos={campos}
          disparador={<BotonAgregar etiqueta={etiquetaAgregar} />}
        />
      </div>
    </div>
  );
}
