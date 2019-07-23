import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as jszip from 'jszip';
import * as ImageModule from 'open-docxtemplater-image-module';
import * as templater from 'docxtemplater';
import { DataService } from '../data/data.service';


@Injectable()
export class WordExportService {

    download = new Subject();

    constructor(private dataService: DataService, private http: HttpClient) {}

    async createDoc(data: any, options) {
        const { profile } = this.dataService.getData();

        const fileName = `Resume for ${data.profile.fullName}${data.filter.length ? ' - ' + data.filter + ' experience' : ''}.doc`;

        const document = await this.initDocument(this.http, 'template.docx');
        /*
        const template = await this.getFile('template.docx');
        const zip = new jszip(template);

        const opts: any = {};
        opts.centered = false;
        opts.getImage = async (imageName) => await this.getImage(imageName);
        opts.getSize = () => [120, 120];
        const imageModule = new ImageModule(opts);

        const document = new templater();
        document.attachModule(imageModule);
        document.loadZip(zip);
*/
        document.setData(Object.assign({
            careers: data.careers.map((item) => {
                item.dateEnd = this.formatDate(item.dateEnd);
                item.dateStart = this.formatDate(item.dateStart);
                return item;
            }),
            contact: data.profile.contact,
            education: data.education,
            filter: data.filter.length ? data.filter : '',
            full_name: data.profile.fullName,
            hasFilter: data.filter.length > 0,
            image: 'profile.jpg',
            introduction: data.introduction,
            skills: Object.keys(data.skills).reduce((array, key) => array.concat(data.skills[key]), [])
                .sort((a, b) => a.years > b.years ? -1 : a.years < b.years ? 1 : a.name > b.name ? 1 : -1),
            summary: data.summary
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

    getFile = async (fileName: string) => {
        return new Promise((resolve) => {
            this.http.get(`/assets/${fileName}`, { responseType: 'arraybuffer'}).subscribe((res) => resolve(res));
        });
    }

    getImage = async (fileName: string) => {
        return new Promise((resolve) => {
            this.http.get(`/assets/${fileName}`, { responseType: 'blob'}).subscribe((res) => resolve(res));
        });
    }

    initDocument = async (http: HttpClient, fileName: string) => {
        const template = await this.getFile(fileName);
        const zip = new jszip(template);

        const opts: any = {};
        opts.centered = false;
        opts.getImage = async (imageName) => await this.getImage(imageName);
        opts.getSize = () => [120, 120];
        const imageModule = new ImageModule(opts);

        const document = new templater();
        document.attachModule(imageModule);
        document.loadZip(zip);
        return document;
    }

}