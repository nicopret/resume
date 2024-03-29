import { Injectable } from "@angular/core";

@Injectable()
export class DateUtilService {

    calculateDate(dateString) {
        const dateArray = dateString.split('-');
        return new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]);
    }

    calculateMonths(start: Date, end: Date) {
        return ((end.getFullYear() - start.getFullYear()) * 12) + (end.getMonth() - start.getMonth()) + 1;
    }

    displayYearString(years, filterEnable, currentSkill) {
        return {
            description: filterEnable ? `${currentSkill} experience` : 'Total work experience',
            metric: years === 0 ? '' : years > 1 ? 'Years' : 'Year',
            type: 'info',
            value: years > 0 ? years : 'No'
        };
    };
}
