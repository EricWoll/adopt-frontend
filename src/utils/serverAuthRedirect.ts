import { authOptions } from './authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function serverAuthRedirect(
    requiredRole: Array<string>,
    redirectUrl: string = '/'
) {
    const session = await getServerSession(authOptions);
    if (!requiredRole.includes(session?.user.role ?? '')) {
        redirect(redirectUrl);
    }
}
