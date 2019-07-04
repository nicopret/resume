import { Component, Input, OnChanges, ViewChild, Output, EventEmitter } from "@angular/core";

import { Chart } from 'chart.js';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: [ './skills.component.css' ]
})
export class SkillsComponent implements OnChanges {
    @ViewChild('lineChart') private chartRef;
    @Input() data;
    @Input() filterEnable: boolean = false;
    @Output() clear = new EventEmitter<any>();
    @Output() select = new EventEmitter<any>();

    category;
    chart: any;
    list: [];

    ngOnChanges() {
        if (this.data) {
            Object.keys(this.data).forEach((key) => {
                this.data[key].forEach((item) => {
                    item.years = Math.ceil(item.months / 12);
                });
            });
            this.setList('technologies');
        }
    }

    clearFilter() {
        this.clear.emit();
    }

    selectSkill(skill) {
        this.select.next({ category: this.category, skill });
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
                    data: this.list.map((item: any) => item.years),
                }],
                labels: this.list.map((item: any) => item.name)
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