import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {}

    getJsonFile(fileName: string) {
        return this.http.get(`/assets/${fileName}`);
    }
}
