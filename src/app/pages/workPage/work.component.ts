import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-work-experience',
    templateUrl: './work.component.html',
    styleUrls: [ './work.component.css' ]
})
export class WorkComponent {
    @Input() data;
    @Output() filterData = new EventEmitter<any>();

    filter(category, skill) {
        this.filterData.next({ category, skill });
    }

    toggleDisplay(item) {
        item.detail = !item.detail;
    }
}