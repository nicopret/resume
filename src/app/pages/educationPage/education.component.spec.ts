import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EducationComponent } from './education.component';
import { DataService } from 'src/app/services/data/data.service';
import { ApiService } from 'src/app/services/api/api.service';
import { HttpClientModule } from '@angular/common/http';

describe('Education Component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, HttpClientModule ],
            declarations: [ EducationComponent ],
            providers: [ ApiService, DataService ]
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(EducationComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

});