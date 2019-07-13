import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent {
    @Input() data;
    @Output() wordDownload = new EventEmitter();

    downloadWord() {
        this.wordDownload.next();
    }
}
