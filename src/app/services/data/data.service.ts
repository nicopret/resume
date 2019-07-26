import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ApiService } from '../api/api.service';
import { ArrayUtilService } from '../util/arrayUtil.service';
import { DateUtilService } from '../util/dateUtil.service';

@Injectable()
export class DataService {

    currentSkill = '';
    filterEnable = false;

    carreerData;
    educationData;
    originalData;
    profileData;
    skillsData;
    statsData;

    careerSubject = new Subject();
    educationSubject = new Subject();
    profileSubject = new Subject();
    skillsSubject = new Subject();
    statsSubject = new Subject();
    workSubject = new Subject();

    constructor(private api: ApiService, private arrayUtil: ArrayUtilService, private dateUtil: DateUtilService ) {}

    clearFilter() {
        this.setEducation(this.originalData.education);
        this.setCareer(this.originalData.careers);
        this.currentSkill = '';
        this.filterEnable = false;
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
        this.setEducation(this.filterSkills(this.filterValidArray(this.originalData.education, 'skills'), filter.category, filter.skill));
        this.setCareer(this.filterCareer(filter));
        this.currentSkill = filter.skill;
        this.filterEnable = true;
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
        this.statsData = this.setStats();
        console.log(this.statsData);
        this.statsSubject.next(this.statsData);
    }

    setEducation(input) {
        this.educationData = input;
        this.educationSubject.next(this.educationData);
    }

    setOriginalData(input) {
        this.originalData = input;
        this.setEducation(input.education);
        this.setProfile(input.profile);
        this.setCareer(input.careers.map((item) => {
            item.dateEnd = item.dateEnd ? this.dateUtil.calculateDate(item.dateEnd) : new Date();
            item.dateStart = item.dateStart ? this.dateUtil.calculateDate(item.dateStart) : new Date();
            item.months = this.dateUtil.calculateMonths(item.dateStart, item.dateEnd);
            return item;
        }));
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

    setStats() {
        return [
            this.dateUtil.displayYearString(this.carreerData ? Math.floor(this.carreerData.reduce((sum, item) => {
                sum += item.months;
                return sum;
            }, 0) / 12) : 0, this.filterEnable, this.currentSkill),
            this.arrayUtil.displayCourseStats(this.educationData),
            this.displayProjectString(this.carreerData ? this.carreerData.reduce((sum, item) => {
                sum += item.projects ? item.projects.length : 0;
                return sum;
            }, 0) : 0)
        ];
    }

    displayProjectString(years) {
        return {
            description: years > 0 ? 'Successfully delivered' : 'But hopefully soon',
            metric: years === 0 ? 'No projects yet' : years > 1 ? 'Projects' : 'Project',
            type: 'success',
            value: years > 0 ? years : ''
        };
    };
}
