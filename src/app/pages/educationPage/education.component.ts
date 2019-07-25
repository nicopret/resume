import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: [ './education.component.css' ]
})
export class EducationComponent implements OnInit {
    data;
    filterEnable = false;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.dataService.educationSubject.subscribe((result) => this.data = result);
    }

    clearFilter() {
        this.dataService.clearFilter();
        this.filterEnable = false;
    }

    filter(item) {
        this.dataService.filterData(item);
        this.filterEnable = true;
    }

    toggleDisplay(item) {
        item.detail = !item.detail;
    }
}