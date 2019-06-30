import { Component, Input, OnInit, AfterContentInit, OnChanges, ViewChild } from "@angular/core";

import { Chart } from 'chart.js';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: [ './skills.component.css' ]
})
export class SkillsComponent implements OnChanges {
    @ViewChild('lineChart') private chartRef;
    @Input() data;

    chart: any;
    list: [];

    ngOnChanges() {
        this.setList('technologies');
    }

    setList(item) {
        this.list = this.data ? this.data[item] : [];
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