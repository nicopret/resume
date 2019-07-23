import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {}

    async getArrayBuffer(fileName: string) {
        return new Promise((resolve) => {
            this.http.get(`/assets/${fileName}`, { responseType: 'arraybuffer'}).subscribe((res) => resolve(res));
        });
    }

    getJsonFile(fileName: string) {
        return this.http.get(`/assets/${fileName}`);
    }
}
