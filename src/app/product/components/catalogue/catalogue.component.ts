import { Component, ElementRef, ViewChild } from '@angular/core';
import { Categoria, Product } from '../../interface/product.interface';
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
}
