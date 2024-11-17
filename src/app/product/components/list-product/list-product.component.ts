import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Categoria,
  Material,
  Presentacion,
  Product,
} from '../../interface/product.interface';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent {
  constructor(private productService: ProductService, private router: Router) {}
  //EVENTOS EMITIDOS PARA EL COMPONENTE PADRE
  @Output() eliminarProduct: EventEmitter<string> = new EventEmitter(); //evento para eliminar
  @Output() editarProduct: EventEmitter<Product> = new EventEmitter(); //evento para editar un producto
  @Output() categoryChange: EventEmitter<string> = new EventEmitter(); // Evento emitido al cambiar la categoría seleccionada

  //EVENTOS RECIBIDOS DESDE EL COMPONENTE PADRE
  @Input() productos: Product[] = [];
  @Input() categorias: Categoria[] = [];
  @Input() presentaciones: Presentacion[] = [];
  @Input() materiales: Material[] = [];
  @Input() selectedCategory: string = 'TODOS'; // Categoría seleccionada para filtrar productos, inicializada como 'TODOS'

  //METODO PARA ELIMINAR UN PRODUCTO
  eliminarProducto(id: string): void {
    this.eliminarProduct.emit(id);
  }

  //METODO PARA EDITAR UN PRODUCTO
  editarProducto(producto: Product): void {
    this.editarProduct.emit(producto);
  }

  //METODO PARA OBTENER EL NOMBRE DE CATEGORIA POR ID
  getCategoriaByName(id: string): string {
    const categoria = this.categorias.find((c) => c.nombre === id);
    return categoria ? categoria.nombre : 'categoria desconocida';
  }

  //METODO PARA OBTENR EL NOMBRE DE PRESENTACION POR ID
  getPresentacionByName(id: string): string {
    const presentacion = this.presentaciones.find((p) => p.nombre === id);
    return presentacion ? presentacion.nombre : 'presentacion desconocida';
  }

  getMaterialByName(id: string): string {
    const material = this.materiales.find((m) => m.nombre === id);
    return material ? material.nombre : 'material desconocido';
  }

  //METODO PARA FILTRAR POR CATEGORIA
  onCategoryChange(event: any): void {
    this.categoryChange.emit(event.target.value); // Emite el evento 'categoryChange' con el valor seleccionado
  }

  addProduct() {
    this.productService.resetProductSelected();
    this.router.navigate(['/producto-agregar']);
  }
}
