export declare const auth: import("better-auth").Auth<{
    baseURL: string | undefined;
    secret: string | undefined;
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    defaultCookieAttributes: {
        sameSite: string;
        secure: boolean;
    } | {
        sameSite: string;
        secure?: never;
    };
    user: {
        additionalFields: {
            role: {
                type: "string";
                defaultValue: string;
                input: false;
            };
        };
    };
    trustedOrigins: string[];
    emailAndPassword: {
        enabled: true;
        autoSignIn: true;
    };
}>;
//# sourceMappingURL=auth.d.ts.map