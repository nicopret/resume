import { Component, Input, OnInit, AfterContentInit } from "@angular/core";

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: [ './skills.component.css' ]
})
export class SkillsComponent implements AfterContentInit {
    @Input() data;

    list: [];

    ngAfterContentInit() {
        this.setList('technologies');
    }

    setList(item) {
        this.list = this.data[item];
    }
}