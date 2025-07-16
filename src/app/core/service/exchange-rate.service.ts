import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentExchangeRate } from '../models/current-exchange-rate.model';
import { DailyExchangeRateResponse } from '../models/daily-exchange-rate.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly API_KEY = environment.apiKey;

  constructor(private http: HttpClient) {}

  getCurrentExchangeRate(toSymbol: string): Observable<CurrentExchangeRate> {
    const params = new HttpParams()
      .set('apiKey', this.API_KEY)
      .set('from_symbol', 'BRL')
      .set('to_symbol', toSymbol.toUpperCase());

    return this.http.get<CurrentExchangeRate>(`${this.BASE_URL}/currentExchangeRate`, { params });
  }

  getDailyExchangeRate(toSymbol: string): Observable<DailyExchangeRateResponse> {
    const params = new HttpParams()
      .set('apiKey', this.API_KEY)
      .set('from_symbol', 'BRL')
      .set('to_symbol', toSymbol.toUpperCase());

    return this.http.get<DailyExchangeRateResponse>(`${this.BASE_URL}/dailyExchangeRate`, { params });
  }
}
