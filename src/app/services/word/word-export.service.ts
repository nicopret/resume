import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as jszip from 'jszip';
import * as ImageModule from 'open-docxtemplater-image-module';
import * as templater from 'docxtemplater';
import { DataService } from '../data/data.service';
import { ApiService } from '../api/api.service';


@Injectable()
export class WordExportService {

    download = new Subject();

    constructor(private apiService: ApiService, private dataService: DataService, private http: HttpClient) {}

    async createDoc(filter, options) {
        const { careers, education, introduction, profile, skills, summary } = this.dataService.getData();

        const fileName = `Resume for ${profile.fullName}${filter.length ? ' - ' + filter + ' experience' : ''}.doc`;

        const document = await this.initDocument(this.http, 'template.docx');

        document.setData(Object.assign({
            careers: careers.map((item) => {
                item.dateEnd = this.formatDate(item.dateEnd);
                item.dateStart = this.formatDate(item.dateStart);
                return item;
            }),
            contact: profile.contact,
            education,
            filter: filter.length ? filter : '',
            full_name: profile.fullName,
            hasFilter: filter.length > 0,
            image: 'profile.jpg',
            introduction: introduction,
            skills: Object.keys(skills).reduce((array, key) => array.concat(skills[key]), [])
                .sort((a, b) => a.years > b.years ? -1 : a.years < b.years ? 1 : a.name > b.name ? 1 : -1),
            summary: summary
        }, options));
        document.render();

        const buffer = document.getZip().generate({
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            type: 'blob'
        });

        this.download.next({ content: buffer, fileName });
    }

    formatDate(date) {
        if (!date) {
            return 'Current';
        }
        const dateArray = new Date(date).toDateString().split(' ');
        return `${dateArray[1]} ${dateArray[3]}`;
    }

    getImage = async (fileName: string) => {
        return new Promise((resolve) => {
            this.http.get(`/assets/${fileName}`, { responseType: 'blob'}).subscribe((res) => resolve(res));
        });
    }

    initDocument = async (http: HttpClient, fileName: string) => {
        const template = await this.apiService.getArrayBuffer(fileName);
        const zip = new jszip(template);

        const opts: any = {};
        opts.centered = false;
        opts.getImage = async (imageName) => {
            return await this.getImage(imageName);
        };
        opts.getSize = () => [120, 120];
        const imageModule = new ImageModule(opts);

        const document = new templater();
        document.attachModule(imageModule);
        document.loadZip(zip);
        return document;
    }

}
