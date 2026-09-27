// ============================================================================
// productos.tsx — CRUD visual de Productos e inventario
// Muestra KPIs, tabla de productos y resalta en ROJO el stock que está
// por debajo del stock mínimo (regla visual del brief).
// ============================================================================

import { createFileRoute } from "@tanstack/react-router";
import { LayoutPanel } from "@/components/DashboardLayout";
import { Panel, TablaDatos, TarjetaEstadistica, Etiqueta } from "@/components/module-ui";
import { EncabezadoCrud, AccionesFila, type DefinicionCampo } from "@/components/form-ui";

// Ruta "/productos" con metadatos SEO
export const Route = createFileRoute("/productos")({
  head: () => ({
    meta: [
      { title: "Productos e inventario — Datronix" },
      {
        name: "description",
        content:
          "Catálogo de productos Datronix: precios de costo y venta, stock, stock mínimo y proveedor asociado.",
      },
      { property: "og:title", content: "Productos e inventario — Datronix" },
      {
        property: "og:description",
        content: "Inventario, precios y alertas de stock por debajo del mínimo.",
      },
    ],
  }),
  component: Productos,
});

// ----------------------------------------------------------------------------
// camposProducto: campos del formulario "Agregar producto"
// Coinciden con ProductoDTO; el proveedor se envía por su idProveedor String.
// ----------------------------------------------------------------------------
const camposProducto: DefinicionCampo[] = [
  { nombre: "nombreProducto", etiqueta: "Nombre del producto", requerido: true },
  { nombre: "categoriaProducto", etiqueta: "Categoría" },
  { nombre: "marcaProducto", etiqueta: "Marca" },
  { nombre: "modeloProducto", etiqueta: "Modelo" },
  { nombre: "skuProducto", etiqueta: "SKU" },
  { nombre: "precioCostoProducto", etiqueta: "Precio costo", tipo: "number", requerido: true },
  { nombre: "precioVentaProducto", etiqueta: "Precio venta", tipo: "number", requerido: true },
  { nombre: "stockProducto", etiqueta: "Stock", tipo: "number", requerido: true },
  { nombre: "stockMinimoProducto", etiqueta: "Stock mínimo", tipo: "number", requerido: true },
  {
    nombre: "idProveedor",
    etiqueta: "Proveedor",
    tipo: "select",
    opciones: [
      { valor: "PROV-001", etiqueta: "Tecno Import SAS" },
      { valor: "PROV-002", etiqueta: "Delta Distribuciones" },
      { valor: "PROV-003", etiqueta: "Andina Hardware" },
    ],
  },
  { nombre: "descripcionProducto", etiqueta: "Descripción", tipo: "textarea" },
  { nombre: "especificacionesProducto", etiqueta: "Especificaciones", tipo: "textarea" },
];

// Clase reutilizable para pintar en rojo las celdas de stock bajo
const estiloStockBajo = "bg-destructive/10 text-destructive font-medium";

// ----------------------------------------------------------------------------
// Productos: pantalla del módulo
// ----------------------------------------------------------------------------
function Productos() {
  return (
    <LayoutPanel rutaMiga="Administrador/Inventario/Productos">
      {/* Encabezado CRUD: buscador + modal de agregar producto */}
      <EncabezadoCrud
        titulo="Productos"
        placeholderBusqueda="Buscar por ID o nombre..."
        etiquetaAgregar="Agregar producto"
        campos={camposProducto}
      />
      {/* KPIs del inventario */}
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <TarjetaEstadistica etiqueta="Referencias" valor="562" />
        <TarjetaEstadistica etiqueta="Stock bajo" valor="9" pista="Requiere reposición" />
        <TarjetaEstadistica etiqueta="Valor inventario" valor="$210.450.000" />
      </div>
      {/* Tabla de productos; el stock bajo va envuelto en un span rojo */}
      <Panel>
        <TablaDatos
          columnas={[
            "ID",
            "Nombre",
            "Categoría",
            "Marca",
            "Modelo",
            "Descripción",
            "Especificaciones",
            "SKU",
            "Precio costo",
            "Precio venta",
            "Stock",
            "Stock mín.",
            "Proveedor",
            "Acciones",
          ]}
          filas={[
            ["1", "Teclado mecánico K80", "Periféricos", "Logi", "K80-RGB", "Teclado mecánico retroiluminado", "Switches mecánicos; distribución español", "TEC-K80", "$120.000", "$189.000", "42", "10", "Tecno Import SAS", <AccionesFila />],
            ["2", 'Monitor 27" QHD', "Pantallas", "Viewx", "VX-QHD27", "Monitor QHD de 27 pulgadas", "2560×1440; 165 Hz; IPS", "MON-QHD27", "$980.000", "$1.290.000", <span className={estiloStockBajo}>8</span>, "12", "Delta Distribuciones", <AccionesFila />],
            ["3", "Mouse inalámbrico M2", "Periféricos", "Logi", "M2-WL", "Mouse inalámbrico ergonómico", "Bluetooth; 6 botones", "MOU-M2", "$52.000", "$79.900", "120", "20", "Tecno Import SAS", <AccionesFila />],
            ["4", "SSD NVMe 1TB", "Almacenamiento", "Kingx", "KN-NV1T", "Unidad de estado sólido NVMe", "1 TB; PCIe 4.0; M.2 2280", "SSD-NVME1T", "$310.000", "$420.000", <span className={estiloStockBajo}>0</span>, "15", "Andina Hardware", <AccionesFila />],
            ["5", "Portátil Ryzen 7", "Computo", "Nexo", "NX-R7-15", "Portátil para trabajo y creación", "Ryzen 7; 16 GB RAM; SSD 512 GB", "POR-R7", "$3.100.000", "$3.850.000", "15", "5", "Delta Distribuciones", <AccionesFila />],
          ]}
        />
        {/* Nota aclaratoria de la regla visual */}
        <p className="mt-3 text-xs text-muted-foreground">
          Los valores en rojo indican stock por debajo del stock mínimo.
        </p>
      </Panel>
      <div className="mt-4">
        <Etiqueta tono="danger">Stock crítico</Etiqueta>
      </div>
    </LayoutPanel>
  );
}
