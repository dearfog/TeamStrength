import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HomeDataSource } from './home-datasource';
import { fadeAnimation } from '../../shared/animations/animations';

@Component({
  selector: 'app-pages/home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[fadeAnimation]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: HomeDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new HomeDataSource(this.paginator, this.sort);
  }
}
