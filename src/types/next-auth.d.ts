import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            userId: string;
            username: string;
            email: string;
            role: string;
            imageId: string;
            accessToken: string;
            refreshToken: string;
        };
    }
}
