import { TestBed, async } from '@angular/core/testing';
import { WordExportService } from './word-export.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../data/data.service';
import { ApiService } from '../api/api.service';
import { ArrayUtilService } from '../util/arrayUtil.service';
import { DateUtilService } from '../util/dateUtil.service';

describe('Word export service', () => {

    let dataService: DataService;
    let service: WordExportService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ ApiService, ArrayUtilService, DataService, DateUtilService, WordExportService ]
        }).compileComponents();

        dataService = TestBed.get(DataService);
        service = TestBed.get(WordExportService);
    }));

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('getFile() test', () => {
        
    });

});
