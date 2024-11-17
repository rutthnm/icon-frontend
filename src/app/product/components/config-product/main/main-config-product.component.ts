import { Component } from '@angular/core';
import {
  Categoria,
  Material,
  Presentacion,
} from '../../../interface/product.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-main-config-product',
  templateUrl: './main-config-product.component.html',
})
export class MainConfigProductComponent {
  constructor(private productservice: ProductService) {}

  AgregarCat(categoria: Categoria): void {
    this.showSuccessAlert('Categoria agregada con éxito');
    this.productservice.agregarCategoria(categoria);
    this.LimpiarFormulario();
  }

  AgregarMat(material: Material): void {
    this.showSuccessAlert('Material agregad con éxito');
    this.productservice.agregarMaterial(material);
    this.LimpiarFormulario();
  }

  AgregarPre(presentacion: Presentacion): void {
    this.showSuccessAlert('Presentacion agregada con éxito');
    this.productservice.agregarPresentacion(presentacion);
    this.LimpiarFormulario();
  }

  LimpiarFormulario(): void {
    this.categoria = {
      idCategoria: '',
      nombre: '',
    };

    this.presentacion = {
      idPresentacion: '',
      nombre: '',
    };

    this.material = {
      idMaterial: '',
      nombre: '',
    };
  }

  categoria: Categoria = {
    nombre: '',
  };

  presentacion: Presentacion = {
    nombre: '',
  };

  material: Material = {
    nombre: '',
  };

  showSuccessAlert(message: string): void {
    const alertBox = document.createElement('div');
    alertBox.innerText = message;
    alertBox.style.position = 'fixed';
    alertBox.style.bottom = '10px';
    alertBox.style.right = '10px';
    alertBox.style.backgroundColor = '#28a745'; // Verde para éxito
    alertBox.style.color = '#fff';
    alertBox.style.padding = '10px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.1)';
    document.body.appendChild(alertBox);

    setTimeout(() => {
      document.body.removeChild(alertBox);
    }, 1000); // Mostrar por 2 segundos
  }
}
