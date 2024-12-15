import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Cat, Mat, Pre, nProducto } from '../../interface/product.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  public producto: nProducto = {
    idCategoria: '',
    nombre: '',
    descripcion: '',
    idMaterial: '',
    idPresentacion: '',
  };

  listcat: Cat[] = [];
  listmat: Mat[] = [];
  listpre: Pre[] = [];

  public selectedFile: File | null = null;

  constructor(private productService: ProductService, private router: Router) {
    this.loadInfo();
  }

  private loadInfo() {
    this.productService.traerCategorias();
    this.productService.traerMaterial();
    this.productService.traerPresentacion();

    if (!this.listcat || this.listcat.length === 0) {
      this.listcat = this.productService.loadCatLocalStorage() || [];
    }
    if (!this.listmat || this.listmat.length === 0) {
      this.listmat = this.productService.loadMatLocalStorage() || [];
    }
    if (!this.listpre || this.listpre.length === 0) {
      this.listpre = this.productService.loadPreLocalStorage() || [];
    }
  }

  // ngOnInit(): void {
  //   if (this.productService.productSelected) {
  //   this.produ = this.productService.productSelected;
  // }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  nuevoProducto(): void {
    if (
      !this.producto.nombre ||
      !this.producto.descripcion ||
      !this.producto.idCategoria ||
      !this.producto.idMaterial ||
      !this.producto.idPresentacion ||
      this.producto.precio! <= 0 ||
      !this.producto.precio
    ) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    if (!this.selectedFile) {
      alert('Por favor, selecciona una imagen para el producto.');
      return;
    }
    this.productService
      .nuevoProducto(this.producto, this.selectedFile)
      .subscribe(() => {
        this.router.navigate(['/producto-lista']);
        this.productService.traerProductos();
      });
  }

  // updateProduct(): void {
  //   // Validación de campos requeridos
  //   if (
  //     !this.product.nombre ||
  //     !this.product.descripcion ||
  //     !this.product.idCategoria ||
  //     !this.product.idMaterial ||
  //     !this.product.idPresentacion ||
  //     this.product.precio! <= 0 ||
  //     !this.product.precio
  //   ) {
  //     alert('Por favor, completa todos los campos requeridos.');
  //     return;
  //   }

  //   // Llamar al servicio para agregar el producto si todas las validaciones pasan
  //   if (this.product.idProducto) {
  //     // Actualizar producto existente
  //     this.productService
  //       .actualizarProduct(this.product, this.selectedFile)
  //       .subscribe(() => {
  //         this.router.navigate(['/producto-lista']);
  //       });
  //   } else {
  //     if (!this.selectedFile) {
  //       alert('Por favor, selecciona una imagen para el producto.');
  //       return;
  //     }

  //     // Agregar nuevo producto
  //     this.productService
  //       .addProduct(this.product, this.selectedFile)
  //       .subscribe(() => {
  //         this.router.navigate(['/producto-lista']);
  //       });
  //   }
  // }
}
