import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import { apiPost, apiRefreshToken } from './fetchHelpers';
import { NextAuthOptions } from 'next-auth';

async function refreshAccessToken(token: any) {
    try {
        const res = await apiRefreshToken(token?.refreshToken);
        const newTokens = await JSON.parse(await res.text());

        if (!res.ok) {
            throw new Error('Refresh Token error');
        }

        return {
            ...token,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken ?? token.refreshToken,
        };
    } catch (e: any) {
        return {
            ...token,
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'jsmith',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const res = await apiPost('auth/login', credentials);
                const user = await JSON.parse(await res.text());

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user;
                }
                // Return null if user data could not be retrieved
                return null;
            },
        }),
    ],
    //86400
    callbacks: {
        async jwt({
            token,
            account,
            user,
        }: {
            token: any;
            account: any;
            user: any;
        }) {
            if (token?.accessToken) {
                const decodedToken = jwtDecode(token.accessToken);
                token.accessTokenExpires = decodedToken?.exp! * 1000;
            }

            if (account && user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    ...user,
                };
            }

            if (Date.now() < token.accessTokenExpires) {
                return { ...token };
            }

            return refreshAccessToken(token);
        },
        async session({
            session,
            token,
            user,
        }: {
            session: any;
            token: any;
            user: any;
        }) {
            session.user = token;
            return session;
        },
    },
};
