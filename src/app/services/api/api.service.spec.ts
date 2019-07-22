import { TestBed, async } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('API service', () => {

    let httpMock: HttpTestingController;
    let service: ApiService;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ ApiService ]
        }).compileComponents();

        httpMock = TestBed.get(HttpTestingController);
        service = TestBed.get(ApiService);
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('json object return', () => {

        service.getJsonFile('resume.json').subscribe((result) => {
            expect(result).toBeTruthy();
            expect(typeof result).toBe('object');
        });

        const req = httpMock.expectOne('/assets/resume.json');
        req.flush({ test: 'test' });
    });
});
