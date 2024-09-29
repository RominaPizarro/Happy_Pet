import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private basePath = environment.baseUrlBackend + '/api/files';

  constructor(private http: HttpClient) {}

  upload = (file: File) => {
    const path = `${this.basePath}/upload`;

    const formData = new FormData();
    formData.append('document', file);

    return this.http.post(path, formData).pipe(map((res) => res));
  };

  viewFile(codigo: any){
    const path = `${this.basePath}/read-file`;
    return this.http.post(path, codigo).pipe(map((res) => res));
  }

  getImageBase64(path: string){
    return this.http.get(path, { responseType: 'blob' }).pipe(map((res) => res));
  }
}
