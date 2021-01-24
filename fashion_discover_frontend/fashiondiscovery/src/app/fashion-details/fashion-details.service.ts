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

  saveDescription(uuid: string, piece: string, text: string) {
    const url = this._backendUrl + '/database/description';
    let obj = {
      uuid: uuid,
      piece: piece,
      description: text
    }
    return this.http.put(url, obj);
  }

}
