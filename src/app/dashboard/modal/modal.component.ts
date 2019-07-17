import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { transition, trigger, style, animate } from '@angular/animations';
import { headersToString } from 'selenium-webdriver/http';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: [ './modal.component.css' ],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({ transform: 'scale3d(.3, .3, .3' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
            ])
        ])
    ]
})
export class ModalComponent implements OnInit {

    @Input() closable = true;
    @Input() heading = '';
    @Input() visible: boolean;
    @Output() visibleChanges: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit() {}

    close() {
        this.visible = false;
        this.visibleChanges.emit(this.visible);
    }
}
