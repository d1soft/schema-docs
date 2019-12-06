import { readFileSync, writeFile, exists, mkdir } from 'fs';
import * as Mustache from 'mustache';
import { resolve } from 'path';
import { TemplaterConfig } from './TemplaterConfig';

export default class TemplateFiller {
    public build(config: TemplaterConfig): string {
        const pageTemplate = readFileSync(config.templatePath).toString();

        Mustache.parse(pageTemplate);

        const result = Mustache.render(pageTemplate, {
            tocItems: config.schema,
        });

        const output = resolve(
            config.outputPath,
            `docs.${config.templaterName}`
        );

        writeFile(output, result, err => {
            if (err) {
                throw new Error(
                    `Can't write file: docs.${config.templaterName}`
                );
            }
        });

        return result;
    }
}
