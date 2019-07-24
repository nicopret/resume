import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable()
export class DataService {

    educationData;
    originalData;
    profileData;

    public educationSubject = new Subject();
    public profileSubject = new Subject();

    constructor(private api: ApiService, private http: HttpClient) {}

    public init(): Observable<any> {
        return this.api.getJsonFile('resume.json');
    }

    getData() {
        return {
            education: this.educationData,
            profile: this.profileData
        };
    }

    setEducation(input) {
        this.educationData = input;
        this.educationSubject.next(this.educationData);
    }

    setOriginalData(input) {
        this.originalData = input;
        this.setEducation(input.education);
        this.setProfile(input.profile);
    }

    setProfile(input) {
        this.profileData = input;
        this.profileSubject.next(this.profileData);
    }
}
