import { Component, OnInit } from '@angular/core';
import { WeatherPanelService } from '../weather-panel.service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.scss']
})

export class WeatherPanelComponent implements OnInit {
  weathersInfo = [];
  weatherArr = [];
  locationError = '';
  city = '';
  currentWeatherSearch: any;
  constructor(private weatherService: WeatherPanelService) { }
  
  ngOnInit() {
    const sourceTime = timer(2000, 3600000);
    this.getLocalStorageData();
    const subscribe = sourceTime.subscribe(val => this.refreshWeatherDetails());
  }

  // auto refresh weather details
  private refreshWeatherDetails() {
    this.weatherArr = [];
    this.weathersInfo.map((weather) => {
      return this.recentWeather(weather.name);
    });
    setTimeout(() => {
      this.weathersInfo = this.weatherArr;
    }, 10000);
  }

  async recentWeather(weatherName){
    const weather = await this.weatherService.getWeather(weatherName);
    this.weatherArr = [weather, ...this.weatherArr];
    return weather;
  }

  // featching data weathers info from localStorage
  private getLocalStorageData() {
    this.weathersInfo = JSON.parse(localStorage.getItem('weatherDetails'));
  }

  // getting weather icon
  public weatherIcon(weather) {
    return 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png';
  }

  // getting weather detaisl for city
  public onLocationChange(cityName, index = 0, weather: any) {
    this.weatherService.getWeather(cityName).then((res: any) => {
      if (weather === '' ) {
        this.currentWeatherSearch = res;
      }
      const filterbyCityName = this.weathersInfo ? this.weathersInfo.filter(wt => wt.name.toLowerCase() ===
      res.name.toLowerCase()) : [];
      this.city = '';
      if (filterbyCityName.length === 0) {
        this.weathersInfo = this.weathersInfo ? [res, ...this.weathersInfo] : [res];
      } else {
        this.weathersInfo = this.weathersInfo.map((wt: any) => {
          if (wt.name.toLowerCase() === res.name.toLowerCase()) {
            wt = res;
            wt.edit = false;
          }
          return wt;
        });
      }
      this.storeInLocalStorage(this.weathersInfo);
    }).catch((err) => {
      if (weather === '' ) {
        this.locationError = err.error.message;
      }
      weather['errorMsg'] = err.error.message;
    });
  }

  // storing weather details to localStonage
  private storeInLocalStorage(weatherDetails) {
    if (weatherDetails && weatherDetails.length > 10) {
      this.weatherService.setToLocalStorage(weatherDetails.slice(0, 10));
    } else {
      this.weatherService.setToLocalStorage(weatherDetails);
    }
  }

  // formatting day and time from weather response
  public getDayAndTime(weather) {
    const weatherdate = new Date(weather.dt * 1000);
    const options = { weekday: 'short', hour: 'numeric',  minute: 'numeric', hour12: true  };
    const dayName = weatherdate.toLocaleDateString('en-IN', options);
    return dayName;
  }

  // removing from past search and localstorage 
  public removeWeatherSearch(weather, index) {
    this.weathersInfo.splice(index, 1);
    this.storeInLocalStorage(this.weathersInfo);
  }
}
