export interface Compra {
  comprobante:  Comprobante;
  venta:        Venta;
  detalleVenta: DetalleVenta;
}

export interface Comprobante {
  idComprobante: string;
  serie:         string;
  numeracion:    number;
  tipo:          string;
}

export interface DetalleVenta {
  categoria:      string;
  nombreProducto: string;
  cantidad:       number;
  subTotal:       number;
  igv:            number;
  total:          number;
}

export interface Venta {
  nombrePersona: string;
  apellidos:     string;
  documento:     string;
  nDocumento:    string;
  telefono:      string;
  fecha:         string;
}

export interface detalleCompra {
  idProducto: string;
  cantidad: number;
  alturaM?: number;
  baseM?: number;
}