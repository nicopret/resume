import { Component, Input, OnChanges, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { DataService } from 'src/app/services/data/data.service';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: [ './skills.component.css' ]
})
export class SkillsComponent implements OnInit {
    @ViewChild('lineChart') private chartRef;
    category = 'technologies';
    data;
    filterEnable = false;
    @Output() clear = new EventEmitter<any>();
    @Output() select = new EventEmitter<any>();

    chart: any;
    heading = {
        industries: 'Industry related skills',
        project: 'Project management skills',
        services: 'Services and product skills',
        technologies: 'Technology skills'
    };
    list: [];

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.dataService.filterEnableSubject.subscribe((result: boolean) => this.filterEnable = result);
        this.dataService.skillsSubject.subscribe((result) => {
            this.data = result;
            Object.keys(this.data).forEach((key) => {
                this.data[key].forEach((item) => {
                    item.years = Math.ceil(item.months / 12);
                });
            });
            this.setList(this.category);
        });
    }

    clearFilter() {
        this.dataService.clearFilter();
        this.filterEnable = false;
    }

    filter(skill) {
        this.dataService.filterData({ category: this.category, skill });
        this.filterEnable = true;
    }

    setList(item) {
        this.category = item;
        this.list = this.data ? this.data[item] : [];
        if (this.chart) {
            this.chart.reset();
        }
        this.chart = new Chart(this.chartRef.nativeElement, {
            type: 'bar',
            data: {
                datasets: [{
                    backgroundColor: 'rgba(255, 193, 7, 1)',
                    borderColor: 'rgba(211, 158, 0, 1)',
                    borderWidth: 2,
                    data: this.list.map((dataItem: any) => dataItem.years),
                }],
                labels: this.list.map((labelItem: any) => labelItem.name)
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        display: true,
                        labelString: 'years',
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}
