import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Eventos } from '../../models/Eventos';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DbService } from '../../service/db-service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-logs',
  imports: [CommonModule, MatTableModule, MatIconModule, MatPaginatorModule],
  templateUrl: './logs.html',
  styleUrls: ['./logs.css']
})
export class LogsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'animal_id', 'tipo_evento', 'descripcion', 'fecha_evento'];
  dataSource = new MatTableDataSource<Eventos>();
  clickedRows = new Set<Eventos>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.dbService.getEvent().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error('Error al cargar eventos', err)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}