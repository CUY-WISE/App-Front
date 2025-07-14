import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DbService } from '../../service/db-service';
import { CommonModule } from '@angular/common';
import { Mediciones } from '../../models/Mediciones';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-imagenes',
  imports: [CommonModule, MatCardModule, MatPaginatorModule],
  templateUrl: './imagenes.html',
  styleUrls: ['./imagenes.css']
})
export class Imagenes  implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Mediciones>();

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