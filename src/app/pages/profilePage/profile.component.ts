import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
    data;

    @Output() wordDownload = new EventEmitter();

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.dataService.profileSubject.subscribe((result) => {
            this.data = result;
        });
    }

    downloadWord() {
        this.wordDownload.next();
    }
}
