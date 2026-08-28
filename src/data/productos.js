const productos = [
  {
    codigo: "P-001", nombre: "Laptop UltraBook 14", categoria: "Portatiles",
    precio: 7499.00, existencia: 12, icono: "bi-laptop",
    specs: {
      Procesador: "8 nucleos de 3.4 GHz",
      "Memoria RAM": "16 GB",
      Almacenamiento: "512 GB SSD",
      Pantalla: "14 pulgadas",
      Bateria: "12 horas",
      Garantia: "12 meses",
    },
    caja: ["Cargador de 65 W", "Cable de 1.5 metros", "Guia de instalacion", "Certificado de garantia"],
  },
  {
    codigo: "P-002", nombre: "Audifonos Inalambricos Pro", categoria: "Audio",
    precio: 899.00, existencia: 34, icono: "bi-headphones",
    specs: {
      Tipo: "Over-ear inalambricos",
      Bateria: "30 horas",
      Conectividad: "Bluetooth 5.0",
      "Cancelacion de ruido": "Si",
      Garantia: "6 meses",
    },
    caja: ["Estuche de transporte", "Cable USB-C de carga", "Manual de usuario"],
  },
  {
    codigo: "P-003", nombre: "Teclado Mecanico RGB", categoria: "Accesorios",
    precio: 549.00, existencia: 20, icono: "bi-keyboard",
    specs: {
      "Tipo de switch": "Mecanico rojo",
      Iluminacion: "RGB personalizable",
      Conexion: "USB con cable trenzado",
      Teclas: "104 teclas",
      Garantia: "12 meses",
    },
    caja: ["Cable USB-C desmontable", "Llavero extractor de teclas", "Manual de usuario"],
  },
  {
    codigo: "P-004", nombre: "Mouse Ergonomico Silent", categoria: "Accesorios",
    precio: 219.00, existencia: 45, icono: "bi-mouse2",
    specs: {
      Tipo: "Ergonomico vertical",
      Sensor: "Optico 3200 DPI",
      Clics: "Silenciosos",
      Conexion: "Inalambrico 2.4 GHz",
      Garantia: "6 meses",
    },
    caja: ["Receptor USB", "Pilas AA", "Manual de usuario"],
  },
  {
    codigo: "P-005", nombre: "Monitor de 27 pulgadas", categoria: "Accesorios",
    precio: 2150.00, existencia: 8, icono: "bi-display",
    specs: {
      Panel: "IPS",
      Resolucion: "2560 x 1440 (QHD)",
      "Tasa de refresco": "75 Hz",
      Conexiones: "HDMI, DisplayPort",
      Garantia: "24 meses",
    },
    caja: ["Cable HDMI", "Cable de poder", "Base ajustable"],
  },
  {
    codigo: "P-006", nombre: "Disco SSD Externo 1 TB", categoria: "Almacenamiento",
    precio: 780.00, existencia: 0, icono: "bi-device-hdd",
    specs: {
      Capacidad: "1 TB",
      Interfaz: "USB 3.2 Type-C",
      "Velocidad de lectura": "1050 MB/s",
      Garantia: "36 meses",
    },
    caja: ["Cable USB-C a USB-A", "Funda protectora"],
  },
];

export default productos;