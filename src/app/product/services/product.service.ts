import { Injectable } from '@angular/core';
import {
  Categoria,
  Cat,
  Material,
  Presentacion,
  Product,
  nProducto,
  Mat,
  Pre,
  Producto,
  infoProducto,
} from '../interface/product.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { enviroment } from '../../../environments/environments';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /*GENERAL*/

 

  productos: Product[] = [
    {
      idProducto: uuid(),
      idCategoria: 'Tarjetas',
      nombre: 'Lapiceros',
      descripcion: 'Clásicos',
      idMaterial: 'COUCHE DE 350GR MATE',
      idPresentacion: 'Unidad',
      imagen: 'https://angular.io/assets/images/logos/angular/angular.png',
      precio: 100,
    },
  ];

  private categoria: Categoria[] = [
    { idCategoria: uuid(), nombre: 'Tarjetas' },
  ];

  private material: Material[] = [
    { idMaterial: uuid(), nombre: 'COUCHE DE 350GR MATE' },
  ];

  private presentacion: Presentacion[] = [
    { idPresentacion: uuid(), nombre: 'Unidad' },
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loadLocalStorageP();
    // this.loadLocalStorageH();
    this.loadCategoriaLocalStorage();
    this.loadMaterialLocalStorage();
    this.loadPresentacionLocalStorage();

    //API
    this.loadCatLocalStorage();
    this.loadMatLocalStorage();
    this.loadPreLocalStorage();
    this.loadProLocalStorage();
    this.loadProSelectLocalStorage();
  }
  /*GET*/
  //Productos
  get products(): Product[] {
    return this.productos;
  }

  get productSelected(): Product {
    return this._productSelected!;
  }

  //CATEGORIAS
  get categorias(): Categoria[] {
    return this.categoria;
  }

  //MATERIALES
  get materiales(): Material[] {
    return this.material;
  }

  //PRESENTACIONES
  get presentaciones(): Presentacion[] {
    return this.presentacion;
  }

  //Set
  setProductSeleccionado(producto: Product) {
    this._productSelected = producto;
    this.saveProductoseleccionado();
  }

  /*Diego*/
  private _productSelected?: Product;

  private saveLocalStorageH() {
    localStorage.setItem('history', JSON.stringify(this._productSelected));
  }

  // private loadLocalStorageH() {
  //   if (!localStorage.getItem('history')) return;
  //   this._productSelected = JSON.parse(localStorage.getItem('history')!);
  // }

  searchProduct(name: string) {
    if (name.length === 0) return;
    this._productSelected = this.products.find((p) => p.nombre === name);
    this.saveLocalStorageH();
  }

  /*Carlos Eduardo*/

  resetProductSelected() {
    this._productSelected = undefined;
  }

  private saveLocalStorageP() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  private loadLocalStorageP() {
    if (!localStorage.getItem('productos')) return;
    this.productos = JSON.parse(localStorage.getItem('productos')!);
  }

  
  addProduct(producto: Product, imageFile: File): Observable<void> {
    return this.uploadImage(imageFile).pipe(
      switchMap((imageUrl) => {
        const newProduct: Product = {
          idProducto: uuid(),
          imagen: imageUrl,
          ...producto,
        };
        this.productos.push(newProduct);
        this.saveLocalStorageP();
        return of<void>(undefined);
      })
    );
  }

  /*Hilder*/

  private saveProductoseleccionado() {
    localStorage.setItem('ps', JSON.stringify(this._productSelected));
  }

  loadProductoseleccionado() {
    const productSelect = localStorage.getItem('ps');
    if (productSelect) {
      this._productSelected = JSON.parse(productSelect);
    }
  }
  saveproductos() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  actualizarProduct(
    producto: Product,
    imageFile: File | null
  ): Observable<void> {
    if (imageFile) {
      return this.uploadImage(imageFile).pipe(
        switchMap((imageUrl) => {
          producto.imagen = imageUrl;
          const indice = this.productos.findIndex(
            (p) => p.idProducto === producto.idProducto
          );
          if (indice !== -1) {
            this.productos[indice] = { ...producto };
            this.saveLocalStorageP();
          }
          this.clearSelectedProduct();
          return of<void>(undefined);
        })
      );
    } else {
      const indice = this.productos.findIndex(
        (p) => p.idProducto === producto.idProducto
      );
      if (indice !== -1) {
        this.productos[indice] = { ...producto };
        this.saveLocalStorageP();
      }
      this.clearSelectedProduct();
      return of<void>(undefined);
    }
  }

  /* Eliminar producto seleccionado del local storage */
  private clearSelectedProduct(): void {
    localStorage.removeItem('ps');
  }

  eliminarPorId(id: string): void {
    this.productos = this.productos.filter(
      (producto) => producto.idProducto !== id
    );
    this.saveLocalStorageP();
  }

  agregarCategoria(categoria: Categoria): void {
    const newCategoria: Categoria = { idCategoria: uuid(), ...categoria };
    this.categoria.push(newCategoria);
    this.saveCategoriaLocalStorage();
  }

  agregarPresentacion(presentacion: Presentacion): void {
    const newPresentacion: Presentacion = {
      idPresentacion: uuid(),
      ...presentacion,
    };
    this.presentacion.push(newPresentacion);
    this.savePresentacionLocalStorage();
  }

  agregarMaterial(material: Material): void {
    const newMaterial: Material = { idMaterial: uuid(), ...material };
    this.material.push(newMaterial);
    this.saveMaterialLocalStorage();
  }

  /*save*/
  saveCategoriaLocalStorage() {
    localStorage.setItem('categorias', JSON.stringify(this.categoria));
  }
  saveMaterialLocalStorage() {
    localStorage.setItem('materiales', JSON.stringify(this.material));
  }
  savePresentacionLocalStorage() {
    localStorage.setItem('presentaciones', JSON.stringify(this.presentacion));
  }
  /*load*/
  loadCategoriaLocalStorage() {
    const categorias = localStorage.getItem('categorias');
    if (categorias) {
      this.categoria = JSON.parse(categorias);
    }
  }
  loadMaterialLocalStorage() {
    const materiales = localStorage.getItem('materiales');
    if (materiales) {
      this.material = JSON.parse(materiales);
    }
  }
  loadPresentacionLocalStorage() {
    const presentaciones = localStorage.getItem('presentaciones');
    if (presentaciones) {
      this.presentacion = JSON.parse(presentaciones);
    }
  }

  //CONSUMIENDO LA API
  private apiURL: string = enviroment.apiURL;
  private urlImg: string = 'https://api.imgbb.com/1/upload?';
  private keyImg: string = '1b59a71f4ca356692141cca0b4f4d818';

  private cat: Cat[] = [];
  private mat: Mat[] = [];
  private pre: Pre[] = [];
  private Productos: Producto[] = [];
  private producto?: Producto;

  private uploadImage(image: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http
      .post<any>(`${this.urlImg}key=${this.keyImg}`, formData)
      .pipe(
        map((response) => {
          const imgUrl = response.data.url;
          return imgUrl;
        })
      );
  }

  nuevoProducto(producto: nProducto, imageFile: File): Observable<void> {
    return this.uploadImage(imageFile).pipe(
      switchMap((imageUrl) => {
        producto.imagen = imageUrl;
        this.http.post(`${this.apiURL}productos`, producto).subscribe({
          next: () => {
            this.router.navigate(['/producto-lista']).then(() => {
              window.location.reload();
            });
          },
          error: (err) => {
            const errorMessage =
              err?.error?.message || 'Hubo un error al registrar el producto.';
            alert(errorMessage);
          },
        });
        return of<void>(undefined);
      })
    );
  }

  traerCategorias() {
    this.http.get<Cat[]>(`${this.apiURL}config-product/categoria`).subscribe({
      next: (response) => {
        this.cat = response;
        localStorage.setItem('cat', JSON.stringify(this.cat));
      },
      error: (err) => {
        alert(`Error al traer las categorías: ${err}`);
      },
    });
  }

  traerMaterial() {
    this.http.get<Mat[]>(`${this.apiURL}config-product/material`).subscribe({
      next: (response) => {
        this.mat = response;
        localStorage.setItem('mat', JSON.stringify(this.mat));
      },
      error: (err) => {
        alert(`Error al traer los materiales: ${err}`);
      },
    });
  }

  traerPresentacion() {
    this.http
      .get<Pre[]>(`${this.apiURL}config-product/presentacion`)
      .subscribe({
        next: (response) => {
          this.pre = response;
          localStorage.setItem('pre', JSON.stringify(this.pre));
        },
        error: (err) => {
          alert(`Error al traer las presentaciones: ${err}`);
        },
      });
  }

  traerProductos() {
    this.http.get<Producto[]>(`${this.apiURL}productos`).subscribe({
      next: (response) => {
        this.Productos = response;
        localStorage.setItem('pro', JSON.stringify(this.Productos));
      },
      error: (err) => {
        alert(`Error al traer los productos: ${err}`);
      },
    });
  }

  buscarProducto(idProducto: string) {
    this.http.get<Producto>(`${this.apiURL}productos/${idProducto}`).subscribe({
      next: (response) => {
      this.producto = response;
        localStorage.setItem('proselect', JSON.stringify(this.producto));
        this.router.navigate(['/producto']);
      },
      error: (err) => {
        alert(`Error al traer los productos: ${err}`);
      },
    });
  }

  loadMatLocalStorage() {
    if (!localStorage.getItem('mat')) return;
    this.mat = JSON.parse(localStorage.getItem('mat')!);
    return this.mat;
  }

  loadCatLocalStorage() {
    if (!localStorage.getItem('cat')) return;
    this.cat = JSON.parse(localStorage.getItem('cat')!);
    return this.cat;
  }

  loadPreLocalStorage() {
    if (!localStorage.getItem('pre')) return;
    this.pre = JSON.parse(localStorage.getItem('pre')!);
    return this.pre;
  }

  loadProLocalStorage() {    
    if (!localStorage.getItem('pro')) return;
    this.Productos = JSON.parse(localStorage.getItem('pro')!);
    return this.Productos;
  }

  loadProSelectLocalStorage() {    
    if (!localStorage.getItem('proselect')) return;
    this.producto = JSON.parse(localStorage.getItem('proselect')!);
    return this.producto;
  }

  get productoSelect(): infoProducto | undefined{
    if (this.producto) {
      // Asegúrate de que el precio esté como número, convirtiendo de forma segura
      return {
        ...this.producto,
        precio: this.producto.precio ? parseFloat(this.producto.precio) : 0  // Verifica si 'precio' existe y conviértelo
      };
    }
    // Si no hay producto, devolvemos un objeto con precio 0
    return undefined
  }


}
