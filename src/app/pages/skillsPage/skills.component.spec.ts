import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SkillsComponent } from './skills.component';
import { DataService } from 'src/app/services/data/data.service';
import { ApiService } from 'src/app/services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ArrayUtilService } from 'src/app/services/util/arrayUtil.service';
import { DateUtilService } from 'src/app/services/util/dateUtil.service';

describe('Skills Component', () => {

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
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(SkillsComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

});