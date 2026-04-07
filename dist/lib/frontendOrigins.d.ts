/**
 * Browsers send Origin without a trailing slash. CORS / Better Auth require an exact match,
 * so strip trailing slashes and support comma-separated FRONTEND_URL values.
 */
export declare function parseFrontendOrigins(): string[];
//# sourceMappingURL=frontendOrigins.d.ts.map