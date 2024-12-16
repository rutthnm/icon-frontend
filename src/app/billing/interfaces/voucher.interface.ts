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

export interface ventas {
  idVenta:    string;
  nDocumento: string;
  cliente:    string;
  producto:   string;
  cantidad:   number;
  tipo:       string;
  fecha:      string;
  monto:      string;
}

export interface compras {
  idVenta:   string;
  nombre:    string;
  categoria: string;
  cantidad:  number;
  fecha:     string;
  monto:     string;
}