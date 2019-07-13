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
            careers: data.careers.map((item) => {
                item.dateEnd = this.formatDate(item.dateEnd);
                item.dateStart = this.formatDate(item.dateStart);
                return item;
            }),
            contact: data.profile.contact,
            education: data.education,
            filter: '',
            full_name: data.profile.fullName,
            hasEducation: true,
            hasExperience: true,
            hasFilter: true,
            hasImage: false,
            hasIntroduction: true,
            hasSkills: true,
            hasSummary: true,
            image: 'profile.jpg',
            introduction: data.introduction,
            skills: Object.keys(data.skills).reduce((array, key) => { return array.concat(data.skills[key]); }, [])
                .sort((a, b) => a.years > b.years ? -1 : a.years < b.years ? 1 : a.name > b.name ? 1 : -1),
            summary: data.summary
        });
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
        let dateArray = new Date(date).toDateString().split(' ');
        return `${dateArray[1]} ${dateArray[3]}`;
    }

    async getFile(fileName) {
        return new Promise((resolve) => {
            this.http.get(`/assets/${fileName}`, { responseType: 'arraybuffer'}).subscribe((res) => resolve(res));
        });
    }

    async getImage(fileName) {
        return new Promise((resolve) => {
            this.http.get(`/assets/${fileName}`, { responseType: 'blob'}).subscribe((res) => resolve(res));
        });
    }
}
