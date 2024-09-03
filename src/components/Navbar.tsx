import Link from 'next/link';
import AuthButton from './AuthButton';

export default function Navbar() {
    return (
        <div className="bg-gray-800">
            <div className="h-16 px-8 flex items-center">
                <p className="text-white font-bold flex-auto">
                    <Link href="/">Adopt</Link>
                </p>
                <nav>
                    <ul className="flex">
                        <li>
                            <Link className="mx-3" href="/users/profile">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link className="mx-3" href="/animals">
                                Animals
                            </Link>
                        </li>
                        <li>
                            <Link className="mx-3" href="/admin">
                                Admin
                            </Link>
                        </li>
                        <li>
                            <AuthButton />
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
