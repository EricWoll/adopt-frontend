import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import { TokenSet } from 'next-auth';

async function refreshAccessToken(token) {
    console.log('refreshing token');
    console.log(token);
    try {
        const res = await fetch('http://localhost:8080/api/v1/auth/refresh', {
            headers: {
                Authorization: `Bearer ${token?.refreshToken}`,
            },
        });

        const newTokens = await JSON.parse(await res.text());
        console.log(newTokens);

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

export const authOptions = {
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
                const res = await fetch(
                    'http://localhost:8080/api/v1/auth/login',
                    {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
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
        async jwt({ token, account, user }) {
            if (token?.accessToken) {
                const decodedToken = jwtDecode(token.accessToken);
                console.log(decodedToken);

                token.accessTokenExpires = decodedToken?.exp * 1000;
            }

            if (account && user) {
                console.log(token);
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    ...user,
                };
            }

            if (Date.now() < token.accessTokenExpires) {
                console.log(token);
                return token;
            }

            console.log('updating token');
            return refreshAccessToken(token);
        },
        async session({ session, token, user }) {
            session.user = token;
            return session;
        },
    },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
