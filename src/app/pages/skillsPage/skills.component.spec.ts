import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SkillsComponent } from './skills.component';

describe('Skills Component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                SkillsComponent
            ],
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(SkillsComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

});