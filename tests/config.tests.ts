import ConfigParser from "../src/Configurator/ConfigParser";
import { join } from "path";

test('два плюс два равно четыре', () => {
    expect(2 + 2).toBe(4);
});

describe('Configuration create and parse', () => {

    test('Configuration parser', () => {
        const configPath = join(__dirname, '.', 'schema-docs.example.json');

        const configurator = new ConfigParser(configPath);

        const config = configurator.parse();
        if(!config) {
            throw new Error('Config is empty or null');
        }
    });
});