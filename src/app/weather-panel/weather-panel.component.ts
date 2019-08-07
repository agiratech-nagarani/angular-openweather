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
  locationError = '';
  city = '';
  currentWeatherSearch: any;
  constructor(private weatherService: WeatherPanelService) { }
  
  ngOnInit() {
    const sourceTime = timer(2000, 5000);
    this.getLocalStorageData()
    console.log(this.weathersInfo.slice(0, 30));
    // const subscribe = sourceTime.subscribe(val => console.log(val, 'sadasd'));
    this.refreshWeatherDetails();
  }

  refreshWeatherDetails(){
    this.weathersInfo = this.weathersInfo.map((weather) => {
      this.weatherService.findwheatherByLocation(weather.name).subscribe(weatherInfo => {
        weather = weatherInfo;
        // console.log('this res weatther info', weather,weatherInfo);
      });
      return weather;
      console.log('beforeReturn', weather);
      setTimeout(() => {
      }, 100)

    });
    console.log('weathers info', this.weathersInfo);
  }
  getLocalStorageData(){
    // console.log('weather details', localStorage.getItem('weatherDetails'));
    this.weathersInfo = JSON.parse(localStorage.getItem('weatherDetails'));
  }
  weatherIcon(weather){
    return 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png';
  }
  onLocationChange(cityName, index = 0, weather:any) {
    console.log(cityName, 'event target value');
    this.weatherService.findwheatherByLocation(cityName).subscribe(res => {
      if (weather === '' ){
        this.currentWeatherSearch = res;
      }
      console.log('current weather details ', this.currentWeatherSearch);
      const filterbyCityName = this.weathersInfo.filter(weather => weather.name.toLowerCase() === res.name.toLowerCase());
      this.city = '';
      if (filterbyCityName.length === 0) {
        this.weathersInfo = [res, ...this.weathersInfo];
      } else {
        this.weathersInfo = this.weathersInfo.map((weather: any) => {
          if (weather.name.toLowerCase() === res.name.toLowerCase()) {
            weather = res;
            weather.edit = false;
          }
          return weather;
        });
      }
      this.weatherService.setToLocalStorage(this.weathersInfo.slice(0, 9));
      console.log(this.weathersInfo, 'eddsd');
    }, err => {
      if (weather === '' ) {
        this.locationError = err.error.message;
      }
      weather['errorMsg'] = err.error.message;
      console.log(this.locationError, 'errr');
    });

  }

  getDayAndTime(weather){
    const weatherdate = new Date(weather.dt * 1000);
    const options = { weekday: 'long', hour: 'numeric',  minute: 'numeric', hour12: true  };
    const dayName = weatherdate.toLocaleDateString('en-IN', options);
    return dayName;
  }

  removeWeatherSearch(weather, index){
    this.weathersInfo.splice(index, 1);
  }
}
