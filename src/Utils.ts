import { readFileSync, exists, mkdir, stat } from 'fs';
import { resolve } from 'path';
import moment from 'moment';

export type GroupedArrayList<T> = {
    [key: string]: T[];
};

export type StringIndexObject = {
    [name: string]: any;
};

export function groupBy<T>(key: string, array: any[]): GroupedArrayList<T> {
    return array.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}

export function mkDirIfNotExists(path: string) {
    return new Promise((res, rej) => {
        exists(path, isExists => {
            if (!isExists) {
                mkdir(path, err => {
                    if (err) {
                        throw new Error(`Can't create directory: ${path}`);
                    }
                    res(true);
                });
            }
            res(true);
        });
    });
}

/**
 * Compare two semvers string
 *
 * 1.2.3 > 1.2.2 //-1
 * 1.2.3 > 1.1.4 //-1
 * 1.2.3 = 1.2.3 //0
 * 4.2.19 < 4.2.20 //1
 *
 * @param {string} version1
 * @param {string} version2
 */
export function semverCompare(
    version1: string,
    version2: string
): 0 | -1 | 1 {
    const [major1, minor1, patch1] = version1.split('.');
    const [major2, minor2, patch2] = version2.split('.');

    if (major1 > major2) {
        return -1;
    } else if (major1 < major2) {
        return 1;
    } else {
        if (minor1 > minor2) {
            return -1;
        } else if (minor1 < minor2) {
            return 1;
        } else {
            if (patch1 > patch2) {
                return -1;
            } else if (patch1 < patch2) {
                return 1;
            } else {
                return 0;
            }
        }
    }
}

export function parseJsonSync<T>(file: string): T {
    const filePath = resolve(file);
    let result;
    try {
        const content = readFileSync(filePath);
        result = JSON.parse(content.toString());
    } catch (e) {
        throw new Error(`Cannot parse json file: ${filePath}`);
    }

    return result;
}

export type FormatterCallback = (date: Date) => string; 

export function dateFormatter(format: string = 'DD.MM.YYYY HH:mm:ss.SSS'): FormatterCallback {
    return (date: Date): string => { 
        return moment(date).format(format);
    };
}
