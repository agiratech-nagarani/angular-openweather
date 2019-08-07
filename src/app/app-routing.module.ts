import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherPanelComponent } from './weather-panel/weather-panel.component';

const routes: Routes = [
  {
    path: 'wheather', component: WeatherPanelComponent,
  },
  {
    path: '', redirectTo: 'wheather', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
