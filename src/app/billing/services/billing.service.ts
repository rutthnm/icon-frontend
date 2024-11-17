import { Injectable } from '@angular/core';
import jsPDF from 'jspdf'; //npm install jspdf html2canvas
import html2canvas from 'html2canvas';
import { Comprobante } from '../interfaces/voucher.interface';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  comprobante: Comprobante[] = [];

  private dataComprobante?: Comprobante;

  private OneComprobante?: Comprobante;

  private boletas: number = 0;

  private facturas: number = 0;

  constructor(private router: Router) {
    this.loadLocalStorageC();
    this.loadLocalStorageCompro();
    this.loadLocalStorageB();
    this.loadLocalStorageF();
  }

  private saveLocalStorageC() {
    localStorage.setItem('comprobante', JSON.stringify(this.comprobante));
  }

  private loadLocalStorageC() {
    if (!localStorage.getItem('comprobante')) return;
    this.comprobante = JSON.parse(localStorage.getItem('comprobante')!);
  }

  saveLocalStorageB() {
    localStorage.setItem('boletas', JSON.stringify(this.boletas));
  }

  private loadLocalStorageB() {
    if (!localStorage.getItem('boletas')) return;
    this.boletas = JSON.parse(localStorage.getItem('boletas')!);
  }

  saveLocalStorageF() {
    localStorage.setItem('facturas', JSON.stringify(this.facturas));
  }

  private loadLocalStorageF() {
    if (!localStorage.getItem('facturas')) return;
    this.facturas = JSON.parse(localStorage.getItem('facturas')!);
  }

  addComprobante(comprobante: Comprobante) {
    const newComprobante: Comprobante = {
      idComprobante: uuid(),
      ...comprobante,
    };
    this.comprobante.push(newComprobante);
    this.saveLocalStorageC();
    this.saveLocalStorageDataCompro(newComprobante);
  }

  get listComprobante() {
    return this.comprobante;
  }

  dataProductBuy(comprobante: Comprobante) {
    this.dataComprobante = comprobante;
  }

  datanNumeracionBoletas(numero: number) {
    this.boletas = numero;
    this.saveLocalStorageB();
  }

  datanNumeracionFacturas(numero: number) {
    this.facturas = numero;
    this.saveLocalStorageF();
  }

  get DataComprobante() {
    return this.dataComprobante;
  }

  get OneDataComprobante() {
    return this.OneComprobante;
  }

  get nboleta() {
    return this.boletas;
  }

  get nfactura() {
    return this.facturas;
  }

  saveLocalStorageDataCompro(comprobante: Comprobante) {
    localStorage.setItem('oneDataComprobante', JSON.stringify(comprobante));
  }

  loadLocalStorageCompro() {
    if (!localStorage.getItem('oneDataComprobante')) return;
    this.OneComprobante = JSON.parse(
      localStorage.getItem('oneDataComprobante')!
    );
  }

  //metodo para generar el pdf de comprobante
  generarPDF(comprobanteId: string, widthInMm: number, heightInMm: number) {
    const doc = new jsPDF(); // Crear una instancia de jsPDF

    const element = document.getElementById(comprobanteId); // Obtener el elemento HTML por su ID

    if (!element) {
      console.error(`Elemento con ID '${comprobanteId}' no encontrado.`);
      return; // Salir de la función si el elemento no se encuentra
    }

    // Calcular la conversión exacta de milímetros a píxeles
    const dpi = 96; // Píxeles por pulgada (ejemplo: 96 PPI)
    const width = (widthInMm * dpi) / 25.4;
    const height = (heightInMm * dpi) / 25.4;

    // Capturar el contenido del elemento HTML en un canvas usando html2canvas
    html2canvas(element, { width, height }).then((canvas) => {
      const imageData = canvas.toDataURL('image/png'); // Convertir el canvas a una imagen base64

      // Calcular coordenadas para centrar la imagen horizontalmente y verticalmente
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();
      const xOffset = (pdfWidth - widthInMm) / 2;
      const yOffset = (pdfHeight - heightInMm) / 6;

      // Agregar la imagen al documento PDF centrada
      doc.addImage(imageData, 'PNG', xOffset, yOffset, widthInMm, heightInMm);

      // Guardar el documento PDF
      doc.save('comprobante.pdf');
    });
  }
}
