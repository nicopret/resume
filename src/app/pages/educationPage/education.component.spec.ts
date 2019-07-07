import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EducationComponent } from './education.component';

describe('Education Component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                EducationComponent
            ],
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(EducationComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

});