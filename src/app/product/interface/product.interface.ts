export interface Product {
  idProducto?: string;
  idCategoria?: string;
  nombre: string;
  descripcion?: string;
  idMaterial?: string;
  idPresentacion?: string;
  imagen?: string;
  precio?: number;
}

export interface Categoria {
  idCategoria?: string;
  nombre: string;
}

export interface Material {
  idMaterial?: string;
  nombre: string;
}

export interface Presentacion {
  idPresentacion?: string;
  nombre: string;
}

export interface nProducto{
  idCategoria: string;
  nombre: string;
  descripcion: string;
  idMaterial: string;
  idPresentacion: string;
  imagen?: string;
  precio?: number;
}

export interface Cat {
  idCategoria?: string;
  nombre: string;
}

export interface Mat {
  idMaterial?: string;
  nombre: string;
}

export interface Pre {
  idPresentacion?: string;
  nombre: string;
}

export interface Producto {
  idProducto:   string;
  nombre:       string;
  descripcion:  string;
  imagen:       string;
  precio:       string;
  categoria:    string;
  presentacion: string;
  material:     string;
}

export interface infoProducto {
  idProducto:   string;
  nombre:       string;
  descripcion:  string;
  imagen:       string;
  precio:       number;
  categoria:    string;
  presentacion: string;
  material:     string;
}
