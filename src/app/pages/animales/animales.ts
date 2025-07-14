import { Component, OnInit } from '@angular/core';
import { DbService } from '../../service/db-service';
import { Animales } from '../../models/Animales';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-animales',
  imports: [CommonModule, MatTableModule, MatIconModule, MatPaginatorModule],
  templateUrl: './animales.html',
  styleUrls: ['./animales.css']
})
export class AnimalesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'raza', 'criadero', 'fecha_registro', 'activo'];
  dataSource = new MatTableDataSource<Animales>();

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.dbService.getAnimales().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error('Error al cargar animales', err)
    });
  }

// Funciones para cambiar el estado de los animales
getBadgeClass(isActive: boolean): string {
  return isActive ? 'badge badge-sm bg-success text-white' : 'badge badge-sm bg-danger text-white';
}

// Funciones para cambiar el estado de los animales
getStatusText(isActive: boolean): string {
  return isActive ? 'Activo' : 'Inactivo';
}
}
