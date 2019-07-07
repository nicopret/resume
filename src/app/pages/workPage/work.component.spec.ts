import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkComponent } from './work.component';

describe('Work Component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                WorkComponent
            ],
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(WorkComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

});
