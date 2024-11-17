import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import {
  Categoria,
  Material,
  Presentacion,
  Product,
} from '../../../interface/product.interface';

@Component({
  selector: 'main-list-product',
  templateUrl: './main-list-product.component.html',
})
export class MainListProductComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}

  selectedCategory: string = 'TODOS';

  producto: Product[] = [];
  categoria: Categoria[] = [];
  material: Material[] = [];
  presentacion: Presentacion[] = [];

  //METODO PARA HACER LA PETICION DE ELIMINAR AL PRODUCTO
  eliminarProductoById(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar el producto?')) {
      this.productService.eliminarPorId(id);
      // Actualizar la lista de productos
      this.producto = this.productService.products;
    }
  }

  //METODO PARA ENVIAR AL SE3RVICIO LA PETICIO DE EDITAR UN PRODUCTO
  editarProducto(producto: Product): void {
    this.productService.setProductSeleccionado(producto);
    this.router.navigate(['/producto-agregar']);
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.producto =
      this.selectedCategory === 'TODOS'
        ? this.productService.products
        : this.productService.products.filter(
            (producto) => producto.idCategoria === this.selectedCategory
          );
  }

  ngOnInit(): void {
    this.onCategoryChange(this.selectedCategory);
    this.categoria = this.productService.categorias;
    this.presentacion = this.productService.presentaciones;
    this.material = this.productService.materiales;
  }
}
