import { TestBed, async } from '@angular/core/testing';
import { DataService } from './data.service';

describe('Data service', () => {

    let service: DataService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                DataService
            ]
        }).compileComponents();
    }));

    it('should create the service', () => {
        service = TestBed.get(DataService);
        expect(service).toBeTruthy();
    });

});
