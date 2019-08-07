import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class WeatherPanelService {
  public weathersInfo = new BehaviorSubject([]);
  constructor(private httpClient: HttpClient) { }

  public findwheatherByLocation(location): Observable<any>{
    return this.httpClient.get('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=' + environment.whetherMapApiKey + '&units=metric');
  }

  public setToLocalStorage(weatherData) {
    localStorage.setItem('weatherDetails', JSON.stringify(weatherData));
    this.weathersInfo.next(weatherData);
  }

  public getFromLocalStorage(): Observable<any> {
    return this.weathersInfo.asObservable();
  }
}
