import { writeFileSync } from 'fs';
import { Schema } from '../Schema';

export default class JsonTemplator {
    public build(schema: Schema, outputPath: string): string {
        writeFileSync(outputPath + '/docs.json', JSON.stringify(schema));

        return '';
    }
}
