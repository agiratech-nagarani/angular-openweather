import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherPanelComponent } from './weather-panel/weather-panel.component';

import { NgHttpLoaderModule } from 'ng-http-loader';
import { HttpClientModule } from '@angular/common/http'; 
import { WeatherPanelService } from './weather-panel.service';


@NgModule({
  declarations: [
    AppComponent,
    WeatherPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [
    WeatherPanelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
