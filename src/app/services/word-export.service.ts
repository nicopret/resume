import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WordExportService {

    download = new Subject();

    constructor(private http: HttpClient) {}

    async createDoc(data: any) {
        console.log(data);
        const fileName = `Resume for ${data.profile.fullName}${data.filter.length ? ' - ' + data.filter + ' experience' : ''}.doc`;
        let template = await this.getFile();

        this.download.next({ content: template, fileName });
    }

    async getFile() {
        return new Promise((resolve) => {
            this.http.get('/assets/template.docx', { responseType: 'arraybuffer'}).subscribe((res) => resolve(res));
        });
    }
}
