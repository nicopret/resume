import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordExportService } from '../services/word/word-export.service';
import { DataService } from '../services/data/data.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

    currentSkill = '';
    filterEnable = false;
    original: any;

    category = 'technologies';
    careers = [];
    education = [];
    skills;
    stats = [];

    showWordRenderModal = false;
    wordRenderOptions = {
        hasEducation: true,
        hasExperience: true,
        hasImage: false,
        hasIntroduction: false,
        hasSkills: true,
        hasSummary: false,
    };

    constructor(private dataService: DataService, private http: HttpClient, private wordExport: WordExportService) {}

    ngOnInit() {
        this.loadData();
        this.wordExport.download.subscribe((input) => this.downloadFile(input));
    }

    loadData() {
        this.dataService.init().subscribe((response: any) => {
            this.original = response;
            this.dataService.setOriginalData(response);
        });
    }

    close() {
        this.showWordRenderModal = false;
    }

    downloadFile(input) {
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(input.content);
        anchor.download = input.fileName;
        anchor.click();
    }

    downloadWord() {
        this.showWordRenderModal = true;
    }

    export(input) {
        this.showWordRenderModal = input;
        this.wordExport.createDoc(this.dataService.currentSkill, this.wordRenderOptions);
    }

}
