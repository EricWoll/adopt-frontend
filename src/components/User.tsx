import { UserType } from '@/types/User';
import ImageRequest from './ImageRequest';

export default function User({ user }: { user: UserType }) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap flex items-center">
                <ImageRequest filename={user?.imageId} />
                <p className="text-sm text-gray-500">{user.username}</p>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.role}</div>
            </td>
            <td className="text-right px-6 py-4 whitespace-nowrap">
                <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4"
                >
                    Edit
                </a>
                <a
                    href="#"
                    className=" text-indigo-600 hover:text-indigo-800 hover:cursor-pointer"
                >
                    Delete
                </a>
            </td>
        </tr>
    );
}
