import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private basePath = environment.baseUrlBackend + 'auth/';

  constructor(private http: HttpClient) {}

  login(dato: any): Observable<any> {
    const data = { dato: dato };
    const path = this.basePath + `login`;
    return this.http.post<any>(path, data).pipe(map((res) => res));
  }
}
