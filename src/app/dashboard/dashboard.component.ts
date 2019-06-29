import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    careers;
    profile;
    stats = [];

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.http.get('assets/resume.json').subscribe((response: any) => {
            let totalMonths = 0;
            this.careers = response.careers;
            this.careers.forEach((item) => {
                item.dateEnd = item.dateEnd ? this._calcDate(item.dateEnd) : new Date();
                item.dateStart = item.dateStart ? this._calcDate(item.dateStart) : new Date();
                item.months = this._calcMonths(item.dateStart, item.dateEnd);
                totalMonths += item.months;
            });
            this.profile = response.profile;
            this.stats.push({
                description: 'Total work experience',
                metric: 'Years',
                type: 'info',
                value: Math.floor(totalMonths / 12)
            });
        });
    }

    private _calcDate(dateString) {
        let dateArray = dateString.split('-');
        return new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]);
    }

    private _calcMonths(start: Date, end: Date) {
        return ((end.getFullYear() - start.getFullYear()) * 12) + (end.getMonth() - start.getMonth()) + 1;
//        return ((end.getFullYear() - start.getFullYear()) * 12) + (start.getMonth() - end.getMonth());
//        return (start.getFullYear() - end.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    }
}