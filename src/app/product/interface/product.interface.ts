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

export interface Producto{
  idCategoria: string;
  nombre: string;
  descripcion: string;
  idMaterial: string;
  idPresentacion: string;
  imagen: string;
  precio: number;
}
