import { Component, ElementRef, ViewChild } from '@angular/core';
import { Cat, Categoria, Product, Producto } from '../../interface/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css',
})
export class CatalogueComponent {
  @ViewChild('selectedCategory') categorySelec!: ElementRef<HTMLSelectElement>;

  allProducts: Product[] = [];

  productsCatalogue: Product[] = [];

  Categories: Categoria[] = [];

  constructor(private productService: ProductService) {
    this.loadProduct();
    this.loadCategories();

    //API
    this.loadInfo();
  }

  private loadProduct() {
    this.allProducts = this.productService.products;
    this.productsCatalogue = this.allProducts;
  }

  infoProduct(product: string) {
    this.productService.searchProduct(product);
  }

  private loadCategories() {
    this.Categories = this.productService.categorias;
  }

  filterProduct() {
    const categorie = this.categorySelec.nativeElement.value;
    if (categorie !== 'Todos') {
      this.productsCatalogue = this.allProducts.filter(
        (produc) => produc.idCategoria === categorie
      );
    } else {
      this.productsCatalogue = this.allProducts;
    }
  }

  //CONSUMIENDO LA API
  listcat: Cat[] = []
  productos: Producto[] = []

  private loadInfo() {
    this.productService.traerCategorias();
    this.productService.traerProductos();

    if (!this.listcat || this.listcat.length === 0) {
      this.listcat = this.productService.loadCatLocalStorage() || [];
    }
    if (!this.productos || this.productos.length === 0) {
      this.productos = this.productService.loadProLocalStorage() || [];
    }
  }

  seleccionarProducto(idProducto: string){
    this.productService.buscarProducto(idProducto)
  }
}
