import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { isNgTemplate } from '@angular/compiler';

@Injectable()
export class DataService {

    educationData;
    originalData;
    profileData;

    educationSubject = new Subject();
    profileSubject = new Subject();

    constructor(private api: ApiService, private http: HttpClient) {}

    init(): Observable<any> {
        return this.api.getJsonFile('resume.json');
    }

    filterData(filter) {
        this.setEducation(this.filterSkills(this.filterValidArray(this.originalData.education, 'skills'), filter.category, filter.skill));
    }

    filterSkills(array, category, skill) {
        return array.reduce((result, entry) => {
            if (entry.skills.some((item) => item.category === category && item.skill === skill)) {
                result.push(entry);
            }
            return result;
        }, []);
    }

    filterValidArray(array, element) {
        return array.filter((item) => item[element]);
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
