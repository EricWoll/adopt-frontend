import serverAuthRedirect from '@/utils/serverAuthRedirect';

export default async function Page() {
    await serverAuthRedirect(['CUSTOMER', 'ADMIN'], '/login');
    return <div>User Profile Page</div>;
}
