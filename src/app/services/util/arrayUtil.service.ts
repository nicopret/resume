import { Injectable } from '@angular/core';

@Injectable()
export class ArrayUtilService {

    populateArray(array, skills, value) {
        skills.forEach((skill) => {
            array = this.validItem(array, skill, value);
        });
        return array;
    }

    populateItem(array, skill, value) {
        const item = array.find((obj) => obj.name === skill);
        item ? item.months += value : array.push({ name: skill, months: value });
        return array;
    }

    reduceCategories(array, key) {
        return array.filter((item) => item[key]).map((item) => item[key]).flat().reduce((res, item) => {
            if (res.indexOf(item) < 0) {
                res.push(item);
            }
            return res;
        }, []);
    }

    validArray(array, skills, value) {
        return skills ? this.populateArray(array, skills, value) : array;
    }

    validCategories(array, key) {
        return array ? this.reduceCategories(array, key) : [];
    }

    validItem(array, skill, value) {
        return skill ? this.populateItem(array, skill, value) : array;
    }
}
