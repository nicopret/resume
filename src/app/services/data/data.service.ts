import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {}

    public init(): Observable<any> {
        return this.http.get('/assets/resume.json');
    }
}
