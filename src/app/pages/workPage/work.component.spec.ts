import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkComponent } from './work.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/services/api/api.service';
import { DataService } from 'src/app/services/data/data.service';
import { ArrayUtilService } from 'src/app/services/util/arrayUtil.service';
import { DateUtilService } from 'src/app/services/util/dateUtil.service';

describe('Work Component', () => {

    let component: WorkComponent;
    let dataService: DataService;
    let fixture;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, HttpClientModule ],
            declarations: [ WorkComponent ],
            providers: [ ApiService, ArrayUtilService, DataService, DateUtilService ]
        }).compileComponents();

        component = TestBed.createComponent(WorkComponent).componentInstance;
        dataService = TestBed.get(DataService);
        fixture = TestBed.createComponent(WorkComponent);
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit() should call data service and populate data', () => {
        const serviceSpy = spyOn(dataService.careerSubject, 'next');
        const skillSpy = spyOn(dataService, 'setSkills').and.returnValue([]);
        const statSpy = spyOn(dataService, 'setStats');

        fixture.detectChanges();
        dataService.setCareer({});
        fixture.whenStable().then(() => {
            expect(serviceSpy).toHaveBeenCalled();
            expect(skillSpy).toHaveBeenCalled();
            expect(statSpy).toHaveBeenCalled();
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

        component.filter('', '');

        expect(dataSpy).toHaveBeenCalled();
        expect(component.filterEnable).toBeTruthy();
    });

    it('toggleDisplay()', () => {
        const item = { detail: true };

        component.toggleDisplay(item);

        expect(item.detail).toBeFalsy();
    });

});
