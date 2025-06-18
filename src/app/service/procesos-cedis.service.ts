import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, pairwise } from 'rxjs';
import { APIURL_AVANCEREC, APIURL_CALIDAD,APIURL_CIERREOC,APIRUL_G3TB4I4, APIURL_GETPRIMERCONTEOFOLIO,APIURL_GETPRIMERCONTEOSCANER,APIURL_GETSEGUNDOCONTEOFOLIO,APIURL_GETSEGUNDOCONTEOSCANER,APIURL_RECIBO, APIURL_VALPRECIO, APIRUL_PR1M3R5C4N30, APIRUL_PR1M3R5C4N30F4L74N735, APIRUL_53GUMD05C4N30, APIRUL_53GUMD05C4N30F4L74N735 } from '../variables';
import { Iembarqes } from '../interfaces/iembarqes';
import { Ibahia } from '../interfaces/ibahia';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
  
})
export class ProcesosCedisService {
  private perfil: string = '';
  private apiUrlCalidad = APIURL_CALIDAD;
  private apiUrlRecibo = APIURL_RECIBO;
  private apiUrlCierreOC = APIURL_CIERREOC;
  private apiUrlAvanceRecibo = APIURL_AVANCEREC;
  private apiUrlValidacionPrec = APIURL_VALPRECIO;
  private apiUrlGetPrimerConteofolio = APIURL_GETPRIMERCONTEOFOLIO;
  private apiUrlGetPrimerConteoScaner = APIURL_GETPRIMERCONTEOSCANER;
  private apiUrlGetSegundoConteofolio = APIURL_GETSEGUNDOCONTEOFOLIO;
  private apiUrlGetSegundoConteoScaner = APIURL_GETSEGUNDOCONTEOSCANER;
  private apiUrlG3TB4I4 = APIRUL_G3TB4I4;
  private apiUrlPR1M3R5C4N30 = APIRUL_PR1M3R5C4N30;
  private apiUrlPR1M3R5C4N30F4L74N735 = APIRUL_PR1M3R5C4N30F4L74N735;
  private apiUrl53GUMD05C4N30 = APIRUL_53GUMD05C4N30;
  private apiUrl53GUMD05C4N30F4L74N735 = APIRUL_53GUMD05C4N30F4L74N735;
  private datosPrimerEscaneo: any = null;

  private previousUrl: string = '';
  private currentUrl: string = '';
  
  constructor(private http: HttpClient, private router: Router) { 
    this.currentUrl = this.router.url;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      pairwise()
    ).subscribe(([prev, curr]: [NavigationEnd, NavigationEnd]) => {
      this.previousUrl = prev.urlAfterRedirects;
      this.currentUrl = curr.urlAfterRedirects;
    });
  }
  public getPreviousUrl(): string {
    return this.previousUrl;
  }

  public getCurrentUrl(): string {
    return this.currentUrl;
  }

guardarDatosPrimerEscaneo(data: any): void {
  this.datosPrimerEscaneo = data;
}

obtenerDatosPrimerEscaneo(): any {
  return this.datosPrimerEscaneo;
}

  CedisCalidad(codigo_escaner: string): Observable<any> {
    const url = `${this.apiUrlCalidad}?codigo_escaner=${codigo_escaner}`;
    return this.http.get<any>(url);
  }
  // --------------------------------------------------------------------------------------
  CedisRecibo(codigo_escaner: string): Observable<any> {
    const url = `${this.apiUrlRecibo}?codigo_escaner=${codigo_escaner}`;
    return this.http.get<any>(url);
  }
  // --------------------------------------------------------------------------------------
  CedisCierre(codigo_escaner: string): Observable<any> {
    const url = `${this.apiUrlCierreOC}?codigo_escaner=${codigo_escaner}`;
    return this.http.get<any>(url);
  }
  // --------------------------------------------------------------------------------------
  CedisAvanceRec(codigo_escaner: string): Observable<any> {
    const url = `${this.apiUrlAvanceRecibo}?codigo_escaner=${codigo_escaner}`;
    return this.http.get<any>(url);
  }
  // --------------------------------------------------------------------------------------
  CedisValPrecio(codigo_escaner: number): Observable<any> {
    const url = `${this.apiUrlValidacionPrec}?codigo_escaneo=${codigo_escaner}`;
    return this.http.get<any>(url);
  }

  getPrimerConteoFolio(body:Iembarqes): Observable<any> {    
    const url = `${this.apiUrlGetPrimerConteofolio}?proceso=${body.proceso}&folio_embarque=${body.folio_embarque}`;
    return this.http.get<any>(url);
  }

  getPrimerConteoScaner(body:Iembarqes): Observable<any> {    
    const url = `${this.apiUrlGetPrimerConteoScaner}?proceso=${body.proceso}&folio_embarque=${body.folio_embarque}
    &id_tienda=${body.id_tienda}&etiqueta_caja=${body.etiqueta_caja}`;
    return this.http.get<any>(url);
  } 

  getSegundoConteoFolio(body:Iembarqes): Observable<any> {    
    const url = `${this.apiUrlGetSegundoConteofolio}?proceso=${body.proceso}&folio_embarque=${body.folio_embarque}`;
    return this.http.get<any>(url);
  }

  getSegundoConteoScaner(body:Iembarqes): Observable<any> {    
    const url = `${this.apiUrlGetSegundoConteoScaner}?proceso=${body.proceso}&folio_embarque=${body.folio_embarque}
    &id_tienda=${body.id_tienda}&etiqueta_caja=${body.etiqueta_caja}`;
    return this.http.get<any>(url);
  } 

  getBahia(body:Ibahia): Observable<any> {    
    // const url = `${this.apiUrlG3TB4I4}?proceso=${body.proceso}&bahia=${body.bahia}`;
    const url = `${this.apiUrlG3TB4I4}?proceso=${body.proceso}&bahia=${body.bahia}&etiqueta_caja=${body.etiqueta_caja}`;
    return this.http.get<any>(url);
  } 

  setPerfil(value: any) {
    this.perfil = value;
  }

  getPerfil(): string {
    return this.perfil;
  }

  clearPerfil() {
    this.perfil = '';
  }

  primerEscaneo(escaneo_caja: string){
    const url = `${this.apiUrlPR1M3R5C4N30}?escaneo_caja=${escaneo_caja}`;
    return this.http.get<any>(url);
  }

  primerFaltante(orden: string){
    const url = `${this.apiUrlPR1M3R5C4N30F4L74N735}?orden=${orden}`;
    return this.http.get<any>(url);
  }

  segundoEscaneo(escaneo_caja: string){
    const url = `${this.apiUrl53GUMD05C4N30}?escaneo_caja=${escaneo_caja}`;
    return this.http.get<any>(url);
  }

  segundoFaltante(orden: string){
    const url = `${this.apiUrl53GUMD05C4N30F4L74N735}?orden=${orden}`;
    return this.http.get<any>(url);
  }
}
