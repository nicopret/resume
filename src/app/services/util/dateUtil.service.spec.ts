import { TestBed } from '@angular/core/testing';
import { DateUtilService } from './dateUtil.service';

describe('dateUtil tests', () => {

    let service: DateUtilService;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            providers: [ DateUtilService ]
        }).compileComponents();

        service = TestBed.get(DateUtilService);
    });

    it('calculateDate()', () => {
        let date = service.calculateDate('2017-02-28');

        expect(date).toBeTruthy();
    });

    it('calculateMonths()', () => {
        let months = service.calculateMonths(new Date('February 28, 2017 00:00:00'), new Date('February 28, 2018 00:00:00'));

        expect(months).toBeTruthy();
        expect(months).toBe(13);
    });

    it('displayYearString() with two years and filter disable', () => {
        const obj = service.displayYearString(2, false, 'Skill');

        expect(obj).toBeTruthy();
        expect(JSON.stringify(obj)).toBe(JSON.stringify({description: 'Total work experience', metric: 'Years', type: 'info', value: 2}));
    });

    it('displayYearString() with one years and filter disable', () => {
        const obj = service.displayYearString(1, false, 'Skill');

        expect(obj).toBeTruthy();
        expect(JSON.stringify(obj)).toBe(JSON.stringify({description: 'Total work experience', metric: 'Year', type: 'info', value: 1}));
    });

    it('displayYearString() without a year count and filter disable', () => {
        const obj = service.displayYearString(0, false, 'Skill');

        expect(obj).toBeTruthy();
        expect(JSON.stringify(obj)).toBe(JSON.stringify({description: 'Total work experience', metric: '', type: 'info', value: 'No'}));
    });

    it('displayYearString() with two years and filter enable', () => {
        const obj = service.displayYearString(2, true, 'Skill');

        expect(obj).toBeTruthy();
        expect(JSON.stringify(obj)).toBe(JSON.stringify({description: 'Skill experience', metric: 'Years', type: 'info', value: 2}));
    });

    it('displayYearString() with one years and filter enable', () => {
        const obj = service.displayYearString(1, true, 'Skill');

        expect(obj).toBeTruthy();
        expect(JSON.stringify(obj)).toBe(JSON.stringify({description: 'Skill experience', metric: 'Year', type: 'info', value: 1}));
    });

    it('displayYearString() without a year count and filter enable', () => {
        const obj = service.displayYearString(0, true, 'Skill');

        expect(obj).toBeTruthy();
        expect(JSON.stringify(obj)).toBe(JSON.stringify({description: 'Skill experience', metric: '', type: 'info', value: 'No'}));
    });
});
