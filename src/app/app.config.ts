import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    importProvidersFrom(MatTableModule, MatIconModule, HttpClientModule),
    provideHttpClient(withFetch()),
    provideEchartsCore({ echarts })
  ]
};
