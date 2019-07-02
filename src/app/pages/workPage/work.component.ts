import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-work-experience',
    templateUrl: './work.component.html',
    styleUrls: [ './work.component.css' ]
})
export class WorkComponent {
    @Input() data;
    @Input() filterEnable: boolean = false;
    @Output() clear = new EventEmitter<any>();
    @Output() filterData = new EventEmitter<any>();

    clearFilter() {
        this.clear.next();
    }

    filter(category, skill) {
        this.filterData.next({ category, skill });
    }

    toggleDisplay(item) {
        item.detail = !item.detail;
    }
}