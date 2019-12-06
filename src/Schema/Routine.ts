/**
 * stored procedures and stored functions
 */
export type Routine = {
    name: string;
    type: 'PROCEDURE' | 'FUNCTION';
    alertedAt?: string;
    createdAt?: string;
    body: string;
    comment: string;
    returns: string; // DTD_IDENTIFIER
};
