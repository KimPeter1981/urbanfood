import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FashionService {

  _backendUrl = `${environment.backendUrl}`;
  uploadImageUrl = `${environment.uploadImageUrl}`;
  fashionImageUrl = `${environment.fasionImageUrl}`;

  constructor(private http: HttpClient) { }

  getFashionItems(uuid: string): Observable<any> {
    const endpoint = this._backendUrl + '/database/fashionSetPreview?id=' + uuid;
    return this.http.get(endpoint);
  }

  getUploadedFile (file: string): string {
    const endpoint = this.uploadImageUrl + '/' + file;
    return endpoint;
  }

  getFashionPart (filename: string): string {
    const endpoint = this.fashionImageUrl + '/' + filename;
    return endpoint;
  }

}
