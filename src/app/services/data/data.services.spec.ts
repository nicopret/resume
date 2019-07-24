import { TestBed, async } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '../api/api.service';
import { ExpectedConditions } from 'protractor';

describe('Data service', () => {

    const mockResume = {
        education: { test: 'test' },
        profile: { name: 'name' }
    };

    let httpTestingController: HttpTestingController;
    let service: DataService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ ApiService, DataService ]
        }).compileComponents();

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(DataService);
    }));

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should load the data file', () => {

        service.init().subscribe((result) => {

            expect(result['profile']).toBeTruthy();

        });

        const req = httpTestingController.expectOne('/assets/resume.json');

        req.flush(mockResume);
    });

    it('getData() must return an object with the elements needed for the export', () => {
        spyOn(service, 'getData').and.returnValue(mockResume);

        const result = service.getData();
        expect(result).toBeTruthy();
        expect(typeof result).toBe('object');
        expect(result.profile).toBeTruthy();

    });

    it('set the original data and update the data sections', () => {
        const educationSpy = spyOn(service, 'setEducation');
        const profileSpy = spyOn(service, 'setProfile');

        service.setOriginalData(mockResume);

        expect(service.originalData).toBe(mockResume);
        expect(educationSpy).toHaveBeenCalled();
        expect(profileSpy).toHaveBeenCalled();
    });

    it('set the education with the setEducation() function', () => {
        const subjectSpy = spyOn(service.educationSubject, 'next');

        service.setEducation(mockResume.education);

        expect(service.educationData).toBe(mockResume.education);
        expect(subjectSpy).toHaveBeenCalled();
    });

    it('set the profile with the setProfile() function', () => {
        const subjectSpy = spyOn(service.profileSubject, 'next');

        service.setProfile(mockResume.profile);

        expect(service.profileData).toBe(mockResume.profile);
        expect(subjectSpy).toHaveBeenCalled();
    });

});
