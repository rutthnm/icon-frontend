import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import {
  Categoria,
  Product,
  Material,
  Presentacion,
} from '../../interface/product.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  public product: Product = {
    nombre: '',
    idCategoria: '',
    descripcion: '',
    idPresentacion: '',
    idMaterial: '',
  };

  listcategoria: Categoria[] = [];
  listmaterial: Material[] = [];
  listpresentacion: Presentacion[] = [];

  public selectedFile: File | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    if (this.productService.productSelected) {
      this.product = this.productService.productSelected;
    }
    this.listcategoria = this.productService.categorias;
    this.listmaterial = this.productService.materiales;
    this.listpresentacion = this.productService.presentaciones;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addProduct(): void {
    // Validación de campos requeridos
    if (
      !this.product.nombre ||
      !this.product.descripcion ||
      !this.product.idCategoria ||
      !this.product.idMaterial ||
      !this.product.idPresentacion ||
      this.product.precio! <= 0 ||
      !this.product.precio
    ) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    if (!this.selectedFile) {
      alert('Por favor, selecciona una imagen para el producto.');
      return;
    }

    this.productService
      .addProduct(this.product, this.selectedFile)
      .subscribe(() => {
        this.router.navigate(['/producto-lista']);
      });
  }

  updateProduct(): void {
    // Validación de campos requeridos
    if (
      !this.product.nombre ||
      !this.product.descripcion ||
      !this.product.idCategoria ||
      !this.product.idMaterial ||
      !this.product.idPresentacion ||
      this.product.precio! <= 0 ||
      !this.product.precio
    ) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    // Llamar al servicio para agregar el producto si todas las validaciones pasan
    if (this.product.idProducto) {
      // Actualizar producto existente
      this.productService
        .actualizarProduct(this.product, this.selectedFile)
        .subscribe(() => {
          this.router.navigate(['/producto-lista']);
        });
    } else {
      if (!this.selectedFile) {
        alert('Por favor, selecciona una imagen para el producto.');
        return;
      }

      // Agregar nuevo producto
      this.productService
        .addProduct(this.product, this.selectedFile)
        .subscribe(() => {
          this.router.navigate(['/producto-lista']);
        });
    }
  }
}
