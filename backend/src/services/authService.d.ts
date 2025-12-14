export declare function registerUser(email: string, password: string, name?: string): Promise<{
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
    };
}>;
export declare function loginUser(email: string, password: string): Promise<{
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
    };
}>;
//# sourceMappingURL=authService.d.ts.map