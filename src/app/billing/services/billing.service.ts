import { Injectable } from '@angular/core';
import jsPDF from 'jspdf'; //npm install jspdf html2canvas
import html2canvas from 'html2canvas';
import { Compra, Comprobante, detalleCompra, ventas } from '../interfaces/voucher.interface';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { enviroment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  comprobante: Comprobante[] = [];

  private dataComprobante?: Comprobante;

  private OneComprobante?: Comprobante;

  private boletas: number = 0;

  private facturas: number = 0;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
    this.loadLocalStorageC();
    this.loadLocalStorageCompro();
    this.loadLocalStorageB();
    this.loadLocalStorageF();

    //API
    this.loadCompraLocalStorage();
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

  //CONSUMIENDO API
  
    private apiURL: string = enviroment.apiURL;

    private compra?: Compra	
    private detalleCompra?: detalleCompra;
    private ventas?:ventas[]=[];

  setDetalleCompra(detalle: detalleCompra) {
    this.detalleCompra = detalle;
  }

  getDetalleCompra(): detalleCompra | undefined {
    return this.detalleCompra;
  } 



  comprar(detalleCompra: detalleCompra) {
    const token = this.authService.token;
    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log(headers)
    this.http
      .post<Compra>(`${this.apiURL}venta`, detalleCompra, { headers })
      .subscribe({
        next: (response) => {
          this.compra = response;
          localStorage.setItem('compra', JSON.stringify(this.compra));
          this.router.navigate(['/comprobante'])
        },
        error: (err) => {
          alert(`Datos del perfil dañado: ${err.message}`);
        },
      });
  }

  loadCompraLocalStorage() {
    if (!localStorage.getItem('compra')) return;
    this.compra = JSON.parse(localStorage.getItem('compra')!);
    return this.compra;
  }

  get compraActual(){
    return this.compra
  }

  traerVentas() {
    const token = this.authService.token;
    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http
      .get<ventas[]>(`${this.apiURL}venta`, { headers })
      .subscribe({
        next: (response) => {
          this.ventas = response;
          localStorage.setItem('ventas', JSON.stringify(this.ventas));         
        },
        error: (err) => {
          alert(`No se pudo traer las ventas: ${err.message}`);
        },
      });
      
  }
  loadVentasLocalStorage() {
    if (!localStorage.getItem('ventas')) return;
    this.ventas = JSON.parse(localStorage.getItem('ventas')!);
    return this.ventas;
  }

  get ventitas(){
    return this.ventas!
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
