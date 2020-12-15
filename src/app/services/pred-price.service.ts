import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredPriceService {

  constructor(private http:HttpClient) { }

  getPredPrices(): Observable<any>{
    return this.http.get('../assets/GRPredictedPrices.csv', { responseType: 'text' });
  }
}
