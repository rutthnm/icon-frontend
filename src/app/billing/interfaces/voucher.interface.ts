export interface Comprobante {
  idComprobante?: string;
  tipo?: string; //boleta o factura
  numeracion?: number; //001
  serie?: string; //F
  nombrePersona?: string; //Pedro
  apellidos?: string; //Juarezz
  documento?: string; //DNI
  nDocumento?: string; //78854446149
  telefono?: string; //9865321
  fecha?: string; //2024-05-21
  categoria?: string;
  nombreProducto?: string; //Cuadro
  cantidad?: number; //5
  subTotal?: number; //12.00
  igv?: number; //13
  total?: number; //25
}
