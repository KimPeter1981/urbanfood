import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FashionDetailsService {

  _backendUrl = `${environment.backendUrl}`;

  constructor(private http: HttpClient) { }

  getFashionPiece (uuid: string, piece: string) {
    const url = this._backendUrl + '/database/fashionPiece?id=' + uuid + '&piece=' + piece;
    return this.http.get(url);
  }

}
