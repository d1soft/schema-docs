/**
 * Configuration builders config
 */
export interface IBuilderConfig {
    /**
     * Path to third-party config (.json, .env file)
     */
    path: string;

    /**
     * Connection template with keys from third-party config
     */
    connection: string;
}
