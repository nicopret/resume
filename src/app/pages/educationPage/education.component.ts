import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: [ './education.component.css' ]
})
export class EducationComponent {
    data;
    @Input() filterEnable: boolean = false;
    @Output() clear = new EventEmitter<any>();
    @Output() filterData = new EventEmitter<any>();

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