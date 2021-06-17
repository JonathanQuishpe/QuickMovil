import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  API_END = environment.API;
  constructor(
    private http: HttpClient
  ) { }

  acceso(userInfo): Observable<any> {
    return this.http.post(this.API_END + '/login', userInfo, { headers: this.httpHeaders });
  }
  datos(id): Observable<any> {
    return this.http.get(this.API_END + '/datos/' + id);
  }
  updateUsuario(usr) {
    return this.http.post(this.API_END + '/userUpdate', usr, { headers: this.httpHeaders });
  }
  getCategorias(): Observable<any> {
    return this.http.get(this.API_END + '/category');
  }
  listaServicios(id): Observable<any> {
    return this.http.get(this.API_END + '/listado-contrato/' + id);
  }
  aprobar_transito(id): Observable<any> {
    return this.http.get(this.API_END + '/proveedor-transito/' + id);
  }
  aprobar_finalizado(id): Observable<any> {
    return this.http.get(this.API_END + '/proveedor-finalizado/' + id);
  }
  detalle_servicio(id): Observable<any> {
    return this.http.get(this.API_END + '/detalle_servicio/' + id);
  }
  cambiarEstado(estado): Observable<any> {
    return this.http.post(this.API_END + '/cambiar-estado', estado, { headers: this.httpHeaders });
  }
  calificar(datos): Observable<any> {
    return this.http.post(this.API_END + '/calificar', datos, { headers: this.httpHeaders });
  }
  proveedorXcategoria(id): Observable<any> {
    return this.http.get<any>(this.API_END + '/proveedor/' + id);
  }
  datosContrato(id): Observable<any> {
    return this.http.get(this.API_END + '/datos-contrato/' + id);
  }
  guardarContrato(contrato): Observable<any> {
    return this.http.post(this.API_END + '/contrato', contrato, { headers: this.httpHeaders });
  }
  register(usr): Observable<any> {
    return this.http.post(this.API_END + '/user', usr, { headers: this.httpHeaders });
  }
  comentarios(id): Observable<any> {
    return this.http.get(this.API_END + '/comentarios/' + id);
  }
  guardarToken(contrato) {
    return this.http.post(this.API_END + '/token/movil', contrato);
  }
  reestablecer(user) {
    return this.http.post(this.API_END + '/user/reestablecer', user, { headers: this.httpHeaders });
  }

}
