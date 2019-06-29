import { Component, Input, OnInit, AfterContentInit, OnChanges } from "@angular/core";

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: [ './skills.component.css' ]
})
export class SkillsComponent implements OnChanges {
    @Input() data;

    list: [];

    ngOnChanges() {
        this.setList('technologies');
    }

    setList(item) {
        this.list = this.data[item];
    }
}