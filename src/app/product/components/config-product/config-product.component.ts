import { Component, EventEmitter, Output } from '@angular/core';
import {
  Categoria,
  Material,
  Presentacion,
} from '../../interface/product.interface';

@Component({
  selector: 'app-config-product',
  templateUrl: './config-product.component.html',
  styleUrl: './config-product.component.css',
})
export class ConfigProductComponent {
  categoria: Categoria = {
    nombre: '',
  };

  presentacion: Presentacion = {
    nombre: '',
  };

  material: Material = {
    nombre: '',
  };

  @Output() agregarCat: EventEmitter<Categoria> = new EventEmitter();
  @Output() agregarPre: EventEmitter<Presentacion> = new EventEmitter();
  @Output() agregarMat: EventEmitter<Material> = new EventEmitter();

  AgregarCate(categoria: Categoria): void {
    if (categoria.nombre.length === 0) {
      alert('El nombre de la categoria no debe ser vacio.');
      return;
    }

    // Validación para asegurarse de que el nombre no contenga números
    const hasNumber = /\d/.test(categoria.nombre);
    if (hasNumber) {
      alert('El nombre de la categoría no debe contener números.');
      return;
    }

    this.agregarCat.emit(categoria);
    this.LimpiarFormulario();
  }

  AgregarMate(material: Material): void {
    if (material.nombre.length === 0) {
      alert('El nombre del material no debe ser vacio.');
      return;
    }

    // Validación para asegurarse de que el nombre no contenga números
    const hasNumber = /\d/.test(material.nombre);
    if (hasNumber) {
      alert('El nombre del material no debe contener números.');
      return;
    }

    this.agregarMat.emit(material);
    this.LimpiarFormulario();
  }

  AgregarPres(presentacion: Presentacion): void {
    if (presentacion.nombre.length === 0) {
      alert('El nombre de la presentación no debe ser vacio.');
      return;
    }

    // Validación para asegurarse de que el nombre no contenga números
    const hasNumber = /\d/.test(presentacion.nombre);
    if (hasNumber) {
      alert('El nombre de la presentación no debe contener números.');
      return;
    }

    this.agregarPre.emit(presentacion);
    this.LimpiarFormulario();
  }

  LimpiarFormulario(): void {
    this.categoria = {
      nombre: '',
    };

    this.presentacion = {
      nombre: '',
    };

    this.material = {
      nombre: '',
    };
  }
}
