/**
 * Templaters configuration
 */
export type ConfigFileTemplater = {
    /**
     * Templater name
     */
    [name: string]: {
        /**
         * Path to template file
         */
        template: string;
    };
};
