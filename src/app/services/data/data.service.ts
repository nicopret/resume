import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable()
export class DataService {

    originalData;
    profileData;

    public profileSubject = new Subject();

    constructor(private api: ApiService, private http: HttpClient) {}

    public init(): Observable<any> {
        return this.api.getJsonFile('resume.json');
    }

    getData() {
        return {
            profile: this.profileData
        };
    }

    setOriginalData(input) {
        this.originalData = input;
        this.setProfile(input.profile);
    }

    setProfile(input) {
        this.profileData = input;
        this.profileSubject.next(this.profileData);
    }
}
