import { TestBed, async } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '../api/api.service';
import { ArrayUtilService } from '../util/arrayUtil.service';
import { DateUtilService } from '../util/dateUtil.service';
import { Services } from '@angular/core/src/view';

describe('Data service', () => {

    const mockFilterIndustry = {category: 'industries', skill: 'Finance'};
    const mockFilterTechnology = {category: 'technologies', skill: 'JavaScript'};
    const mockResume = {
        careers: [{
            dateEnd: '2017-02-28',
            dateStart: '2014-05-01',
            industry: 'Property',
            projects: [{
                'technologies': [ 'Java', 'JavaScript' ]
            }, {
                'technologies': [ 'JavaScript' ]
            }]
        }, {
            industry: 'Finance',
            projects: [{
                'technologies': [ 'HTML' ]
            }]
        }],
        education: [
            { skills: [{ category: 'industries', skill: 'Finance'}] },
            { skills: [{ category: 'technologies', skill: 'JavaScript'}] }
        ],
        introduction: {},
        profile: { name: 'name' },
        summary: {}
    };

    let dateService: DateUtilService;
    let httpTestingController: HttpTestingController;
    let service: DataService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ ApiService, ArrayUtilService, DataService, DateUtilService ]
        }).compileComponents();

        dateService = TestBed.get(DateUtilService);
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

    it('clearFilter() reset to the original data', () => {
        const careerSpy = spyOn(service, 'setCareer');
        const educationSpy = spyOn(service, 'setEducation');

        service.originalData = mockResume;
        service.clearFilter();

        expect(careerSpy).toHaveBeenCalled();
        expect(educationSpy).toHaveBeenCalled();
    });

    it('getData() must return an object with the elements needed for the export', () => {
        service.carreerData = mockResume.careers;
        service.educationData = mockResume.education;
        service.originalData = mockResume;
        service.profileData = mockResume.profile;

        const result = service.getData();
        expect(result).toBeTruthy();
        expect(typeof result).toBe('object');
        expect(result.profile).toBeTruthy();

    });

    it('set the original data and update the data sections', () => {
        const careerSpy = spyOn(service, 'setCareer');
        const dateSpy = spyOn(dateService, 'calculateDate').and.returnValue(new Date());
        const educationSpy = spyOn(service, 'setEducation');
        const profileSpy = spyOn(service, 'setProfile');

        service.setOriginalData(mockResume);

        expect(service.originalData).toBe(mockResume);
        expect(careerSpy).toHaveBeenCalled();
        expect(dateSpy).toHaveBeenCalled();
        expect(educationSpy).toHaveBeenCalled();
        expect(profileSpy).toHaveBeenCalled();
    });

    it('filterData() must filter the data and populate the subject', () => {
        const careerFilterSpy = spyOn(service, 'filterCareer').and.returnValue([]);
        const educationSpy = spyOn(service.educationSubject, 'next');
        const skillsSpy = spyOn(service, 'filterSkills');
        const statSpy = spyOn(service, 'setStats');
        const validSpy = spyOn(service, 'filterValidArray');

        service.originalData = mockResume;

        service.filterData(mockFilterTechnology);

        expect(careerFilterSpy).toHaveBeenCalled();
        expect(educationSpy).toHaveBeenCalled();
        expect(skillsSpy).toHaveBeenCalled();
        expect(statSpy).toHaveBeenCalled();
        expect(validSpy).toHaveBeenCalled();
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

    it ('filterCareer() with category as industry', () => {
        service.originalData = mockResume;

        const array = service.filterCareer(mockFilterIndustry);

        expect(array).toBeTruthy();
        expect(array.length).toBe(1);
    });

    it ('filterCareer() with category as technology', () => {
        service.originalData = mockResume;

        const array = service.filterCareer(mockFilterTechnology);

        expect(array).toBeTruthy();
        expect(array.length).toBe(1);
    });

    it('filterSkillsArray() should return an array containing only the skills', () => {

        const filteredArray = service.filterSkills(mockResume.education, mockFilterIndustry.category, mockFilterIndustry.skill);

        expect(filteredArray).toBeTruthy();
        expect(filteredArray.length).toBe(1);
    });

    it('filterValidArray() should return an array containing only items with the specified element', () => {
        const rawArray = [{ item: 'one', field: 'one' },
            { item: 'two'}];

        const filteredArray = service.filterValidArray(rawArray, 'field');

        expect(filteredArray).toBeTruthy();
        expect(filteredArray.length).toBe(1);
    });

    it('setSkills() reduce the careers to the skills array', () => {
        service.carreerData = mockResume.careers;

        let array = service.setSkills();

        expect(array).toBeTruthy();
    });
});
