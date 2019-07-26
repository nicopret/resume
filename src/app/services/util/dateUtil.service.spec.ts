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
});
