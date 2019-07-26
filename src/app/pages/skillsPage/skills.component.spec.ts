import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SkillsComponent } from './skills.component';
import { DataService } from 'src/app/services/data/data.service';
import { ApiService } from 'src/app/services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ArrayUtilService } from 'src/app/services/util/arrayUtil.service';
import { DateUtilService } from 'src/app/services/util/dateUtil.service';

describe('Skills Component', () => {

    let component: SkillsComponent;
    let dataService: DataService;
    let fixture;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule, HttpClientModule
            ],
            declarations: [
                SkillsComponent
            ],
            providers: [ ApiService, ArrayUtilService, DataService, DateUtilService ]
        }).compileComponents();

        component = TestBed.createComponent(SkillsComponent).componentInstance;
        dataService = TestBed.get(DataService);
        fixture = TestBed.createComponent(SkillsComponent);
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('ngOninit() should call data service and populate data', () => {
        const careerSkill = spyOn(dataService.careerSubject, 'next');
        const skillSpy = spyOn(dataService.skillsSubject, 'next');
        const spy = spyOn(dataService, 'setSkills');

        fixture.detectChanges();
        dataService.setCareer({ careers: '' });
        fixture.whenStable().then(() => {
            expect(careerSkill).toHaveBeenCalled();
            expect(skillSpy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalled();
        });
    });

    it('clearFilter()', () => {
        const dataSpy = spyOn(dataService, 'clearFilter');

        component.clearFilter();

        expect(dataSpy).toHaveBeenCalled();
        expect(component.filterEnable).toBeFalsy();
    });

    it('filter()', () => {
        const dataSpy = spyOn(dataService, 'filterData');

        component.filter({});

        expect(dataSpy).toHaveBeenCalled();
        expect(component.filterEnable).toBeTruthy();
    });

});