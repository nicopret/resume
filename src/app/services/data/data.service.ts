import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable()
export class DataService {

    carreerData;
    educationData;
    originalData;
    profileData;

    careerSubject = new Subject();
    educationSubject = new Subject();
    profileSubject = new Subject();
    workSubject = new Subject();

    constructor(private api: ApiService, private http: HttpClient) {}

    clearFilter() {
        this.setCareer(this.originalData.careers);
        this.setEducation(this.originalData.education);
    }

    init(): Observable<any> {
        return this.api.getJsonFile('resume.json');
    }

    filterCareer(filter) {
        return filter.category === 'industries'
            ? this.originalData.careers.filter((item) => item.industry === filter.skill)
            : this.originalData.careers.reduce((array, career) => {
                let alreadyPushed = false;
                career.projects.forEach((item) => {
                    if (item[filter.category] && item[filter.category].indexOf(filter.skill) > -1 && !alreadyPushed) {
                        array.push(career);
                        alreadyPushed = true;
                    }
                });
                return array;
            }, []);
    }

    filterData(filter) {
        this.setCareer(this.filterCareer(filter));
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
            careers: this.carreerData,
            education: this.educationData,
            profile: this.profileData
        };
    }

    setCareer(input) {
        this.carreerData = input;
        this.careerSubject.next(this.carreerData);
    }

    setEducation(input) {
        this.educationData = input;
        this.educationSubject.next(this.educationData);
    }

    setOriginalData(input) {
        this.originalData = input;
        this.setCareer(input.careers);
        this.setEducation(input.education);
        this.setProfile(input.profile);
    }

    setProfile(input) {
        this.profileData = input;
        this.profileSubject.next(this.profileData);
    }
}
