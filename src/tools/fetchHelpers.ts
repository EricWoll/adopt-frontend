export async function apiGet(url: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Origin: `${process.env.NEXT_PUBLIC_ORIGIN_URL}`,
        },
    });
    return await response.json();
}

export async function apiPost(url: string, bodyContent: any) {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
        method: 'POST',
        body: JSON.stringify(bodyContent),
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function apiRefreshToken(refreshToken: string) {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
}
