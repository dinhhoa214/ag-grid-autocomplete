import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GridOptions} from 'ag-grid-community';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Ag grid';
    public gridOptions: GridOptions;


    columnDefs = [
        {headerName: 'name', field: 'name', sortable: true, filter: true},
        {headerName: 'age', field: 'age', sortable: true, filter: true},
        {headerName: 'country', field: 'country', sortable: true, filter: true},
        {headerName: 'Sport', field: 'sport', sortable: true, filter: true},
    ];

    rowData: any;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.rowData = this.http.get('https://api.myjson.com/bins/141q3n');
    }
}
