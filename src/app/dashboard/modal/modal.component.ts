import { Component, Input, Output, EventEmitter } from '@angular/core';
import { transition, trigger, style, animate } from '@angular/animations';

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
export class ModalComponent {

    @Input() closable = true;
    @Input() heading = '';
    @Input() visible = true;
    @Output() valid = new EventEmitter();
    @Output() visibleChanges: EventEmitter<boolean> = new EventEmitter<boolean>();

    close() {
        this.visible = false;
        this.visibleChanges.emit(this.visible);
    }

    export() {
        this.visible = false;
        this.valid.emit(this.visible);
    }
}
