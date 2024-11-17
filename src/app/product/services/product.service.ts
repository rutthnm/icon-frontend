import { Injectable } from '@angular/core';
import {
  Categoria,
  Material,
  Presentacion,
  Product,
} from '../interface/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /*GENERAL*/

  private urlImg: string = 'https://api.imgbb.com/1/upload?';
  private keyImg: string = '1b59a71f4ca356692141cca0b4f4d818';

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

  constructor(private http: HttpClient) {
    this.loadLocalStorageP();
    this.loadLocalStorageH();
    this.loadCategoriaLocalStorage();
    this.loadMaterialLocalStorage();
    this.loadPresentacionLocalStorage();
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

  private loadLocalStorageH() {
    if (!localStorage.getItem('history')) return;
    this._productSelected = JSON.parse(localStorage.getItem('history')!);
  }

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
}
