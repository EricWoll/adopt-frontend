'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
    const { data: session } = useSession();

    if (session?.user) {
        return <button onClick={() => signOut()}>Sign Out</button>;
    }

    return <button onClick={() => signIn()}>Sign In</button>;
}
