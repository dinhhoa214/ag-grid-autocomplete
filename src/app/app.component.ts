import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GridOptions} from 'ag-grid-community';
import RefData from './data/refData';
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'Ag grid';
    public gridOptions: GridOptions;
    public rowData: any[];
    public columnDefs: any[];
    createColumnDefs() {
        this.columnDefs = [
            {headerName: 'name', field: 'name', sortable: true, filter: true},
            {headerName: 'continent', field: 'continent', sortable: true, filter: true},
            {headerName: 'country', field: 'country', sortable: true, filter: true},
            {headerName: 'language', field: 'language', sortable: true, filter: true},
        ];
    }
    createRowData() {
        const rowData: any[] = [];

        for (let i = 0; i < 200; i++) {
            const countryData = RefData.countries[i % RefData.countries.length];
            rowData.push({
                name: RefData.firstNames[i % RefData.firstNames.length] + ' ' + RefData.lastNames[i % RefData.lastNames.length],
                skills: {
                    android: Math.random() < 0.4,
                    html5: Math.random() < 0.4,
                    mac: Math.random() < 0.4,
                    windows: Math.random() < 0.4,
                    css: Math.random() < 0.4
                },
                dob: RefData.DOBs[i % RefData.DOBs.length],
                address: RefData.addresses[i % RefData.addresses.length],
                years: Math.round(Math.random() * 100),
                proficiency: Math.round(Math.random() * 100),
                country: countryData.country,
                continent: countryData.continent,
                language: countryData.language
            });
        }

        this.rowData = rowData;
    }
    constructor(private http: HttpClient) {
        this.gridOptions = {} as GridOptions;
        this.createRowData();
        this.createColumnDefs();

    }

    ngOnInit() {
        $('.flexdatalist').flexdatalist({
            limitOfValues: 2,
            minLength: 1,
            valueProperty: '*',
            visibleProperties: ['name', 'language', 'continent', 'country'],
            searchByWord: true,
            searchIn: ['name', 'language', 'continent', 'country'],
            data: this.rowData
       });
    }

    onQuickFilterChanged($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    }

}
