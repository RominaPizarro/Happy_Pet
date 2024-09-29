import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramacionService {
  private basePath = environment.baseUrlBackend + '/programacion';

  constructor(private http: HttpClient) {}

  list(){
    const path = `${this.basePath}/list`;
    return this.http.post(path, null).pipe(map((res) => res));
  }

}
