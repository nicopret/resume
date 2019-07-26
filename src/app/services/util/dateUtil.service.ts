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

}
