import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Diagramas } from './pages/diagramas/diagramas';
import { Imagenes } from './pages/imagenes/imagenes';
import { AnimalesComponent } from './pages/animales/animales';
import { MedicionesComponent } from './pages/mediciones/mediciones';
import { LogsComponent } from './pages/logs/logs';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: Home,
        children: [
            {
                path: 'diagramas',
                component: Diagramas,
            },
            {
                path: 'imagenes',
                component: Imagenes,
            },
            {
                path: 'animales',
                component: AnimalesComponent,
            },
            {
                path: 'mediciones',
                component: MedicionesComponent,
            },
            {
                path: 'logs',
                component: LogsComponent,
            },
            {
                path: '',
                redirectTo: 'diagramas',
                pathMatch: 'full',
            },
    ],
    },
];