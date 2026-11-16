
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

interface ApiResponse {
  data: {
    objects: Country[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private endpoint: string =
    '/api/countries/v5';

  private apiKey: string = 'rc_live_247cc55c892841e28bb15fb68c559a40';

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.apiKey}`
  });

  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]> {

    const url = `${this.endpoint}/name?q=${encodeURIComponent(termino)}`;

    return this.http.get<ApiResponse>(url, {
      headers: this.headers,
      params: new HttpParams().set('api-key', this.apiKey)
    }).pipe(
      map(resp => resp.data.objects)
    );
  }

  buscarCapital(termino: string): Observable<Country[]> {

    const url = `${this.endpoint}/capitals?q=${encodeURIComponent(termino)}`;

    return this.http.get<ApiResponse>(url, {
      headers: this.headers,
      params: new HttpParams().set('api-key', this.apiKey)
    }).pipe(
      map(resp => resp.data.objects)
    );
  }

  ObtenerPaisPorCodigo(id: string): Observable<Country> {

    const url = `${this.endpoint}/codes.alpha_2/${encodeURIComponent(id)}`;

    return this.http.get<ApiResponse>(url, {
      headers: this.headers,
      params: new HttpParams().set('api-key', this.apiKey)
    }).pipe(
      map(resp => resp.data.objects[0])
    );
  }
}