import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Mediciones } from '../../models/Mediciones';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DbService } from '../../service/db-service';

@Component({
  selector: 'app-mediciones',
  imports: [CommonModule, MatTableModule, MatIconModule, MatPaginatorModule],
  templateUrl: './mediciones.html',
  styleUrls: ['./mediciones.css']
})
export class MedicionesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'animal_id', 'peso', 'fecha_medicion'];
  dataSource = new MatTableDataSource<Mediciones>();
  clickedRows = new Set<Mediciones>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.dbService.getMedicion().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error('Error al cargar mediciones', err)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}