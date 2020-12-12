import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FashionService {

  _backendUrl = `${environment.backendUrl}`;

  constructor(private http: HttpClient) { }

  getFashionItems(uuid: string): Observable<any> {
    const endpoint = this._backendUrl + '/database/fashion?id=' + uuid;
    return this.http.get(endpoint);
  }

}
