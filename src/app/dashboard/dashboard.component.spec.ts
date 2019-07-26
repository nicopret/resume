import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from '../pages/profilePage/profile.component';
import { EducationComponent } from '../pages/educationPage/education.component';
import { SkillsComponent } from '../pages/skillsPage/skills.component';
import { StatsComponent } from '../pages/statsPage/stats.component';
import { WorkComponent } from '../pages/workPage/work.component';
import { ModalComponent } from './modal/modal.component';
import { DataService } from '../services/data/data.service';
import { WordExportService } from '../services/word/word-export.service';
import { ApiService } from '../services/api/api.service';
import { ArrayUtilService } from '../services/util/arrayUtil.service';

describe('Dashboard Component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule
            ],
            declarations: [
                DashboardComponent,
                ModalComponent,
                EducationComponent,
                ProfileComponent,
                SkillsComponent,
                StatsComponent,
                WorkComponent
            ],
            providers: [ ApiService, ArrayUtilService, DataService, WordExportService ]
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(DashboardComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

});