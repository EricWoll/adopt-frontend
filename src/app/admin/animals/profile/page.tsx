import serverAuthRedirect from '@/utils/serverAuthRedirect';

export default async function Page() {
    await serverAuthRedirect(['ADMIN']);
    return <div>Admin Single Animal Page</div>;
}
