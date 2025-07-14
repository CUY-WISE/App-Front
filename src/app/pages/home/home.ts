import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatBadgeModule,
    MatDividerModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  currentPage = 'Inicio';
  activeMenuItem: string = 'inicio';
  isHandset: boolean = false;

  menuItems = [
    { id: 'inicio', icon: 'home', label: 'Inicio', route: '/home/diagramas' },
    { id: 'imagenes', icon: 'image', label: 'Imágenes', route: '/home/imagenes' },
    { id: 'animales', icon: 'pets', label: 'Animales', route: '/home/animales' },
    { id: 'mediciones', icon: 'straighten', label: 'Mediciones', route: '/home/mediciones' },
    { id: 'logs', icon: 'assignment', label: 'Logs', route: '/home/logs' }
  ];

  bottomItems = [
    { id: 'documentacion', icon: 'description', label: 'Documentación', route: 'https://github.com/BryanSagbay/Project-CuyWise.git' },
    { id: 'acerca', icon: 'info', label: 'Acerca del proyecto', route: 'https://github.com/BryanSagbay/Project-CuyWise/blob/master/acerca-del-proyecto/acerca-del-proyecto.md' }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isHandset = result.matches;
        if (!this.isHandset && this.sidenav) {
          this.sidenav.open();
        }
      });

    // Suscribirse a cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateCurrentPage();
      });

    // Inicializar currentPage
    this.updateCurrentPage();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  selectMenuItem(itemId: string) {
    this.activeMenuItem = itemId;
    if (this.isHandset) {
      this.sidenav.close();
    }
  }

  updateCurrentPage() {
    const currentRoute = this.router.url;
    const match = this.menuItems.find(item => currentRoute.startsWith(item.route));
    this.currentPage = match ? match.label : 'CUYWISE';
  }
}
