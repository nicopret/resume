import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from './profile.component';
import { DataService } from 'src/app/services/data/data.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/services/api/api.service';

describe('Profile Component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, HttpClientModule ],
            declarations: [ ProfileComponent ],
            providers: [ ApiService, DataService ]
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(ProfileComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

});