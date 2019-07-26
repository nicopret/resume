import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from './profile.component';
import { DataService } from 'src/app/services/data/data.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/services/api/api.service';
import { ArrayUtilService } from 'src/app/services/util/arrayUtil.service';

describe('Profile Component', () => {

    let component: ProfileComponent;
    let dataService: DataService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, HttpClientModule ],
            declarations: [ ProfileComponent ],
            providers: [ ApiService, ArrayUtilService, DataService ]
        }).compileComponents();

        component = TestBed.createComponent(ProfileComponent).componentInstance;
        dataService = TestBed.get(DataService);
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit() should call data service and populate the data', () => {
        const fixture = TestBed.createComponent(ProfileComponent);
        const serviceSpy = spyOn(dataService.profileSubject, 'next').and.returnValue({ profile: ''});

        fixture.detectChanges();
        dataService.setProfile({ profile: ''});
        fixture.whenStable().then(() => {
            expect(serviceSpy).toHaveBeenCalled();
        });
    });
});
