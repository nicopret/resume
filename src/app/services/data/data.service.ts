import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ApiService } from '../api/api.service';
import { ArrayUtilService } from '../util/arrayUtil.service';
import { DateUtilService } from '../util/dateUtil.service';

@Injectable()
export class DataService {

    carreerData;
    educationData;
    originalData;
    profileData;
    skillsData;

    careerSubject = new Subject();
    educationSubject = new Subject();
    profileSubject = new Subject();
    skillsSubject = new Subject();
    workSubject = new Subject();

    constructor(private api: ApiService, private arrayUtil: ArrayUtilService, private dateUtil: DateUtilService ) {}

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
        this.skillsData = this.setSkills();
        this.skillsSubject.next(this.skillsData);
    }

    setEducation(input) {
        this.educationData = input;
        this.educationSubject.next(this.educationData);
    }

    setOriginalData(input) {
        this.originalData = input;
        this.setCareer(input.careers.map((item) => {
            item.dateEnd = item.dateEnd ? this.dateUtil.calculateDate(item.dateEnd) : new Date();
            item.dateStart = item.dateStart ? this.dateUtil.calculateDate(item.dateStart) : new Date();
            item.months = this.dateUtil.calculateMonths(item.dateStart, item.dateEnd);
            return item;
        }));
        this.setEducation(input.education);
        this.setProfile(input.profile);
    }

    setProfile(input) {
        this.profileData = input;
        this.profileSubject.next(this.profileData);
    }

    setSkills() {
        return this.carreerData.reduce((res, item) => {
            res.industries = this.arrayUtil.validItem(res.industries, item.industry, item.months);
            res.project = this.arrayUtil.populateArray(res.project, this.arrayUtil.validCategories(item.projects, 'project'), item.months);
            res.services = this.arrayUtil.populateArray(res.services,
                this.arrayUtil.validCategories(item.projects, 'services'), item.months);
            res.technologies = this.arrayUtil.populateArray(res.technologies,
                this.arrayUtil.validCategories(item.projects, 'technologies'), item.months);
            return res;
        }, { industries: [], project: [], services: [], technologies: []});
    }
}
