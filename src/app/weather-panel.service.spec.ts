import { TestBed } from '@angular/core/testing';

import { WeatherPanelService } from './weather-panel.service';

describe('WeatherPanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherPanelService = TestBed.get(WeatherPanelService);
    expect(service).toBeTruthy();
  });
});
