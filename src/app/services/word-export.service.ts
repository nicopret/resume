import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as jszip from 'jszip';
import * as ImageModule from 'open-docxtemplater-image-module';
import * as templater from 'docxtemplater';

@Injectable()
export class WordExportService {

    download = new Subject();

    constructor(private http: HttpClient) {}

    async createDoc(data: any) {
        console.log(data);
        const fileName = `Resume for ${data.profile.fullName}${data.filter.length ? ' - ' + data.filter + ' experience' : ''}.doc`;

        const template = await this.getFile('template.docx');
        const zip = new jszip(template);

        const opts:any = {};
        opts.centered = false;
        opts.getImage = async (imageName) => await this.getImage(imageName);
        opts.getSize = () => [120, 120];
        const imageModule = new ImageModule(opts);

        const document = new templater();
        document.attachModule(imageModule);
        document.loadZip(zip);

        document.setData({
            contact: data.profile.contact,
            filter: 'Pleb',
            full_name: data.profile.fullName,
            hasEducation: false,
            hasExperience: false,
            hasFilter: true,
            hasImage: false,
            hasIntroduction: false,
            hasSkills: false,
            hasSummary: false,
            image: 'profile.jpg'
        });
        document.render();

        const buffer = document.getZip().generate({
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            type: 'blob'
        });

        this.download.next({ content: buffer, fileName });
    }

    async getFile(fileName) {
        return new Promise((resolve) => {
            this.http.get(`/assets/${fileName}`, { responseType: 'arraybuffer'}).subscribe((res) => resolve(res));
        });
    }

    async getImage(fileName) {
        return new Promise((resolve) => {
            this.http.get(`/assets/${fileName}`).subscribe((res) => resolve(res));
        });
    }
}
