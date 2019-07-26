import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: [ './stats.component.css' ]
})
export class StatsComponent implements OnInit {
    data;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.dataService.statsSubject.subscribe((result) => {
            this.data = result;
        });
    }
}
