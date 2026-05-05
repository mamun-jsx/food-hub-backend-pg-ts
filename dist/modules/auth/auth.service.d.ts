export declare const AuthService: {
    register: (userData: any) => Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            image: string | null;
        };
        token: string;
    }>;
    login: (credentials: any) => Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            image: string | null;
        };
        token: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map