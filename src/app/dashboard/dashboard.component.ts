import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

    currentSkill: string = '';
    filterEnable: boolean = false;
    original: any;

    category: string = "technologies";
    careers;
    education;
    profile;
    skills;
    stats = [];

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.http.get('assets/resume.json').subscribe((response: any) => {
            this.original = response;
            this.populateData(response);
        });
    }

    clearFilter() {
        this.currentSkill = '';
        this.filterEnable = false;
        this.original.careers.forEach((item) => item.detail = false);
        this.original.education.forEach((item) => item.detail = false);
        this.populateData(this.original);
    }

    filter(item) {
        this.category = item.category;
        this.currentSkill = item.skill;
        this.filterEnable = true;
        let careers = JSON.parse(JSON.stringify(this.original.careers)).reduce((array, career) => {
            if (this._validItem(career, item.category, item.skill)) {
                career.detail = true;
                array.push(career);
            }
            return array;
        }, []);
        let education = JSON.parse(JSON.stringify(this.original.education)).reduce((array, course) => {
            let valid = false;
            if (course.skills) {
                course.skills.forEach((it) => {
                    if (it.skill === item.skill) {
                        valid = true;
                    }
                });
            }
            if (valid) {
                course.detail = true;
                array.push(course);
            }
            return array;
        }, []);
        this.populateData({ careers, education, profile: this.profile });
    }

    async populateData(data) {
        this.careers = await this._populateCareers(data.careers);
        this.skills = this.careers.reduce((res, item) => {
            res.industries = this._populateItem(res.industries, item.industry, item.months);
            res.project = this._populateArray(res.project, this._reduceCategories(item.projects, 'project'), item.months);
            res.services = this._populateArray(res.services, this._reduceCategories(item.projects, 'services'), item.months);
            res.technologies = this._populateArray(res.technologies, this._reduceCategories(item.projects, 'technologies'), item.months);
            return res;
        }, { industries: [], project: [], services: [], technologies: []});
        this.education = data.education.map((course) => {
            course.detail = course.detail ? course.detail : false;
            return course;
        });
        this.profile = data.profile;
        this.stats = [
            this._statsYears(this.careers ? Math.floor(this.careers.reduce((sum, item) => {
                sum += item.months;
                return sum;
            }, 0) / 12) : 0),
            this._statsCourses(this.education),
            this._statsProjects(this.careers ? this.careers.reduce((sum, item) => {
                sum += item.projects ? item.projects.length : 0;
                return sum;
            }, 0) : 0)
        ];
    }

    private _calcDate(dateString) {
        let dateArray = dateString.split('-');
        return new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]);
    }

    private _calcMonths(start: Date, end: Date) {
        return ((end.getFullYear() - start.getFullYear()) * 12) + (end.getMonth() - start.getMonth()) + 1;
    }

    private _populateArray(array, skills, value) {
        if (!skills) {
            return array;
        }
        skills.forEach((skill) => {
            array = this._populateItem(array, skill, value);
        });
        return array;
    }

    private async _populateCareers(array) {
        return array ? array.map((item) => {
            if (!item.months) {
                item.dateEnd = item.dateEnd ? this._calcDate(item.dateEnd) : new Date();
                item.dateStart = item.dateStart ? this._calcDate(item.dateStart) : new Date();
                item.months = this._calcMonths(item.dateStart, item.dateEnd);
            }
            item.detail = item.detail ? item.detail : false;
            return item;
        }) : [];
    }

    private _populateItem(array: any[], skill, value) {
        if (!skill) {
            return array;
        }
        let item: any = array.find((item: any) => item.name === skill);
        item ? item.months += value : array.push({ name: skill, months: value });
        return array;
    }

    private _reduceCategories(array, key) {
        if (!array) {
            return [];
        }
        return array.reduce((res, item) => {
            if (item[key]) {
                item[key].forEach((value) => {
                    if (res.indexOf(value) < 0) {
                        res.push(value);
                    }
                });
            }
            return res;
        }, []);
    }

    private _statsCourses(array) {
        return {
            description: array.length === 0 ? 'Maybe soon.' : array.length > 1 ? 'Distance learning' : `Through ${array[0].institution}`,
            metric: array.length === 0 ? 'No formal courses' : array.length > 1 ? 'Courses' : 'Course',
            type: 'secondary',
            value: array.length > 0 ? array.length : ''
        };
    };

    private _statsProjects(years) {
        return {
            description: years > 0 ? 'Successfully delivered' : 'But hopefully soon',
            metric: years === 0 ? 'No projects yet' : years > 1 ? 'Projects' : 'Project',
            type: 'success',
            value: years > 0 ? years : ''
        };
    };

    private _statsYears(years) {
        return {
            description: this.filterEnable ? `${this.currentSkill} experience` : 'Total work experience',
            metric: years === 0 ? '' : years > 1 ? 'Years' : 'Year',
            type: 'info',
            value: years > 0 ? years : 'No'
        };
    };

    private _validItem(item, category, skill) {
        if (category === 'industries') {
            return item.industry === skill;
        }
        let result = false;
        if (item.projects) {
            item.projects.forEach((project) => {
                if (project[category] && project[category].indexOf(skill) > -1) {
                    result = true;
                }
            })
        }
        return result;
    }
}