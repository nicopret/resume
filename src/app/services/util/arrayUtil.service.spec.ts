import { TestBed } from '@angular/core/testing';
import { ArrayUtilService } from './arrayUtil.service';

describe('arrayUtil service for single level arrays', () => {

    const mockArray = [{ name: 'valid', months: 3 }];
    let service: ArrayUtilService;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            providers: [ ArrayUtilService ]
        }).compileComponents();

        service = TestBed.get(ArrayUtilService);
    });

    it('validItem() should return the same array if the item is null', () => {
        const array = service.validItem(mockArray, null, 0);

        expect(array).toBeTruthy();
        expect(array).toBe(mockArray);
    });

    it('validItem() should return the same array if the item is not found', () => {
        const array = service.validItem(mockArray, 'notValid', 0);

        expect(array).toBeTruthy();
        expect(array).toBe(mockArray);
    });

    it('validItem() should return a new array if the item is found', () => {
        const array = service.validItem(mockArray, 'valid', 3);

        expect(array).toBeTruthy();
        expect(array[0].months).toBe(6);
    });

});

describe('arrayUtil service for multi level arrays', () => {

    const mockArray = [
        [{ name: 'valid1', months: 2 }],
        [{ name: 'valid2', months: 4}]
    ];
    let service: ArrayUtilService;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            providers: [ ArrayUtilService ]
        });

        service = TestBed.get(ArrayUtilService);
    });

    it('validArray() should return the same array if the item is null', () => {
        const array = service.validArray(mockArray, null, 0);

        expect(array).toBeTruthy();
        expect(array).toBe(mockArray);
    });

    it('validArray() should return a different array if the item is not null', () => {
        const spy = spyOn(service, 'populateArray').and.returnValue([]);

        const array = service.validArray(mockArray, [], 0);

        expect(spy).toHaveBeenCalled();
        expect(array).toBeTruthy();
        expect(array).not.toBe(mockArray);
    });

    it('populateArray() should return original array on no skills data', () => {
        const array = service.populateArray(mockArray, [], 0);

        expect(array).toBeTruthy();
        expect(array).toBe(mockArray);
    });

    it('populateArray() should return a new array on skills data', () => {
        const spy = spyOn(service, 'validItem').and.returnValue(mockArray);

        const array = service.populateArray(mockArray, [1], 0);

        expect(spy).toHaveBeenCalled();
        expect(array).toBeTruthy();
        expect(array).toBe(mockArray);
    });

});

describe('arrayUtil service for category reduction', () => {
    const mockArray = [{
        project: [ 'Agile', 'Scrum' ],
        services: [ 'Architecture', 'Maps', 'SQL Server', 'Tomcat' ],
        technologies: [ 'Angular', 'CSS', 'HTML', 'Java', 'JavaScript' ]
    }, {
        project: [ 'Agile', 'Scrum' ],
        services: [ 'Architecture', 'AWS', 'SQL Server', 'Tomcat', 'Virtualization' ],
        technologies: [ 'Angular', 'CSS', 'HTML', 'Java', 'JavaScript' ]
    }, {
        project: [ 'Agile', 'Scrum' ],
        services: [ 'Architecture', 'J2EE', 'Tomcat' ],
        technologies: [ 'Java' ]
    }];
    let service: ArrayUtilService;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            providers: [ ArrayUtilService ]
        }).compileComponents();

        service = TestBed.get(ArrayUtilService);
    });

    it('validCategories() should return empty array on invalid array', () => {
        const array = service.validCategories(null, 'key');

        expect(array).toBeTruthy();
        expect(array.length).toBe(0);
    });

    it('validateCategories() should return array and call reduceCategories when valid array', () => {
        const spy = spyOn(service, 'reduceCategories').and.returnValue([1]);

        const array = service.validCategories([], 'key');

        expect(spy).toHaveBeenCalled();
        expect(array).toBeTruthy();
        expect(array.length).toBe(1);
    });

    it('reduceCategories() return a flat array of skills', () => {
        const array = service.reduceCategories(mockArray, 'services');

        expect(array).toBeTruthy();
        expect(array.length).toBe(7);
    });
});

describe('display stat strings', () => {

    let service: ArrayUtilService;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            providers: [ ArrayUtilService ]
        }).compileComponents();

        service = TestBed.get(ArrayUtilService);
    });

    it('displayCourseStats() with empty array', () => {
        const obj = service.displayCourseStats([]);
        
        expect(obj).toBeTruthy();
        expect(JSON.stringify(obj)).toBe(JSON.stringify({description: 'Maybe soon.', metric: 'No formal courses', type: 'secondary', value: ''}));
    });

    it('displayCourseStats() with single item array', () => {
        const obj = service.displayCourseStats([1]);

        expect(obj).toBeTruthy();
        expect(JSON.stringify(obj)).toBe(JSON.stringify({description: 'Through undefined', metric: 'Course', type: 'secondary', value: 1}));
    });

    it('displayCourseStats() with three item array', () => {
        const obj = service.displayCourseStats([1, 2, 3]);

        expect(obj).toBeTruthy();
        expect(JSON.stringify(obj)).toBe(JSON.stringify({description: 'Distance learning', metric: 'Courses', type: 'secondary', value: 3}));
    });
});
