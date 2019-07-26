import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EducationComponent } from './education.component';
import { DataService } from 'src/app/services/data/data.service';
import { ApiService } from 'src/app/services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ArrayUtilService } from 'src/app/services/util/arrayUtil.service';

describe('Education Component', () => {

    let component: EducationComponent;
    let dataService: DataService;
    let fixture;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, HttpClientModule ],
            declarations: [ EducationComponent ],
            providers: [ ApiService, ArrayUtilService, DataService ]
        }).compileComponents();

        component = TestBed.createComponent(EducationComponent).componentInstance;
        dataService = TestBed.get(DataService);
        fixture = TestBed.createComponent(EducationComponent);
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('ngOninit() should call data service and populate data', () => {
        const serviceSpy = spyOn(dataService.educationSubject, 'next');

        fixture.detectChanges();
        dataService.setEducation({ education: '' });
        fixture.whenStable().then(() => {
            expect(serviceSpy).toHaveBeenCalled();
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

    it('toggleDisplay()', () => {
        const item = {
            detail: true
        };

        component.toggleDisplay(item);

        expect(item.detail).toBeFalsy();
    });

});
