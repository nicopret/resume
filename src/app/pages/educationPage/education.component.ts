import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html'
})
export class EducationComponent {
    @Input() data;
}