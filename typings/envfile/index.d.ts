declare module 'envfile' {

    type ObjectErrback = (error?: Error, result?: object) => void;
    type ObjectErrbackT<T> = (error?: Error, result?: T) => void;
    type StringErrback = (error?: Error, result?: string) => void;

    function parse(src: string, next: ObjectErrback): void;
    function parse<T>(src: string, next: ObjectErrbackT<T>): void;
    function parseSync(src: string): object;
    function parseSync<T>(src: string): T;
    
    function parseFile(filePath: string, next: ObjectErrback): void;
    function parseFile<T>(filePath: string, next: ObjectErrbackT<T>): void;
    function parseFileSync(filePath: string): object;
    function parseFileSync<T>(filePath: string): T;

    function stringify(obj: object, next: StringErrback): void;
    function stringifySync(obj: object): string;

    export {
        parse,
        parseSync,
        parseFile,
        parseFileSync,
        stringify,
        stringifySync
    }
}