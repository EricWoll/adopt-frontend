import AddUser from '@/components/AddUser';
import UserList from '@/components/UserList';

export default function Home() {
    return (
        <div>
            <main>
                <AddUser />
                <UserList />
            </main>
        </div>
    );
}
