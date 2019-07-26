import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StatsComponent } from './stats.component';
import { DataService } from 'src/app/services/data/data.service';
import { ApiService } from 'src/app/services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ArrayUtilService } from 'src/app/services/util/arrayUtil.service';
import { DateUtilService } from 'src/app/services/util/dateUtil.service';

describe('Stats Component', () => {

    let component: StatsComponent;
    let fixture;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule, HttpClientModule
            ],
            declarations: [
                StatsComponent
            ],
            providers: [ ApiService, ArrayUtilService, DataService, DateUtilService ]
        }).compileComponents();

        component = TestBed.createComponent(StatsComponent).componentInstance;
        fixture = TestBed.createComponent(StatsComponent);
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

});
