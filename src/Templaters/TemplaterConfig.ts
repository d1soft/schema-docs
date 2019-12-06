import { Schema } from '../Schema';

export type TemplaterConfig = {
    schema: Schema;
    templaterName: string;
    templatePath: string;
    outputPath: string;
};
