import AddUser from '@/components/AddUser';
import UserList from '@/components/UserList';
import serverAuthRedirect from '@/utils/serverAuthRedirect';

export default async function Page() {
    await serverAuthRedirect(['ADMIN']);

    return (
        <div>
            <AddUser />
            <UserList />
        </div>
    );
}
