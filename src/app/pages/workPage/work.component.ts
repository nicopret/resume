import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
    selector: 'app-work-experience',
    templateUrl: './work.component.html',
    styleUrls: [ './work.component.css' ]
})
export class WorkComponent implements OnInit {
    data;
    filterEnable = false;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.dataService.careerSubject.subscribe((result) => this.data = result);
    }

    clearFilter() {
        this.dataService.clearFilter();
        this.filterEnable = false;
    }

    filter(category, skill) {
        this.dataService.filterData({ category, skill });
        this.filterEnable = true;
    }

    toggleDisplay(item) {
        item.detail = !item.detail;
    }
}