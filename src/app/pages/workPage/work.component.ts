import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-work-experience',
    templateUrl: './work.component.html',
    styleUrls: [ './work.component.css' ]
})
export class WorkComponent {
    @Input() data;
}