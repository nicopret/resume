import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: [ './education.component.css' ]
})
export class EducationComponent implements OnInit {
    data;
    @Input() filterEnable = false;
    @Output() clear = new EventEmitter<any>();
    @Output() filterData = new EventEmitter<any>();

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.dataService.educationSubject.subscribe((result) => this.data = result);
    }

    clearFilter() {
        this.clear.emit();
    }

    filter(item) {
        this.filterData.next(item);
    }

    toggleDisplay(item) {
        item.detail = !item.detail;
    }
}