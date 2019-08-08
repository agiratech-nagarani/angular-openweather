import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class WeatherPanelService {
  public weathersInfo = new BehaviorSubject([]);
  constructor(private httpClient: HttpClient) { }

  // getting city weather
  public getWeather(weatherName) {
    return this.httpClient.get('https://api.openweathermap.org/data/2.5/weather?q=' + weatherName +
    '&APPID=6bbf443902edb231c80944448b878a54' + '&units=metric').toPromise();
  }

  // storing into local storage
  public setToLocalStorage(weatherData) {
    localStorage.setItem('weatherDetails', JSON.stringify(weatherData));
    this.weathersInfo.next(weatherData);
  }

}
