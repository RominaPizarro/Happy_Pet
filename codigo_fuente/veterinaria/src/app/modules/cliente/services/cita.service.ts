import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private basePath = environment.baseUrlBackend + '/cita';

  constructor(private http: HttpClient) {}

  list(clienteId: any){
    const path = `${this.basePath}/list/${clienteId}`;
    return this.http.post(path, null).pipe(map((res) => res));
  }

  listByVeterinario(veterinarioId: any, dato: any){
    const path = `${this.basePath}/listbyveterinario/${veterinarioId}`;
    return this.http.post(path, dato).pipe(map((res) => res));
  }

  add(dato: any){
    const path = `${this.basePath}/add`;
    return this.http.post(path, dato).pipe(map((res) => res));
  }

  edit(dato: any){
    const path = `${this.basePath}/edit`;
    return this.http.post(path, dato).pipe(map((res) => res));
  }

  find(dato: any){
    const path = `${this.basePath}/find`;
    return this.http.post(path, dato).pipe(map((res) => res));
  }

  delete(dato: any){
    const path = `${this.basePath}/delete`;
    return this.http.post(path, dato).pipe(map((res) => res));
  }

}
