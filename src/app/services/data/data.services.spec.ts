import { TestBed, async } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Data service', () => {

    const mockResume = {
        profile: {}
    };

    let httpTestingController: HttpTestingController;
    let service: DataService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ DataService ]
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
});
