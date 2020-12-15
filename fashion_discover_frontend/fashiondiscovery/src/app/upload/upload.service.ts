import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  _backendUrl = `${environment.backendUrl}`;
  uploadImageUrl = `${environment.uploadImageUrl}`;
  fashionImageUrl = `${environment.fasionImageUrl}`;

  constructor(private http: HttpClient) { }

  fashionDiscover(fashionImage: File): Observable<any> {
    const endpoint = this._backendUrl + '/fashion/discovery';
    const formData: FormData = new FormData();
    formData.append('file', fashionImage, fashionImage.name);
    return this.http.post(endpoint, formData);
  }

  // getUploadedFile (file: string): string {
  //  const endpoint = this.uploadImageUrl + '/' + file;
  //  return endpoint;
  //}

  // getFashionPart (filename: string): string {
  //  const endpoint = this.fashionImageUrl + '/' + filename;
  //  return endpoint;
  //}

}
