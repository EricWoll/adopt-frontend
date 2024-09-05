'use client';

import { useEffect, useState } from 'react';
import User from './User';
import { UserType } from '@/types/User';
import { apiGet } from '@/utils/fetchHelpers';
import LoadingCircle from './LoadingCircle';

export default function UserList() {
    const [users, setUsers] = useState<Array<UserType> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                setUsers(await (await apiGet('users')).json());
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchUsers();
    }, []);

    return (
        <div className=" container mx-auto my-8">
            <div className="flex flex-col shadow border-b">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                User
                            </th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                Email
                            </th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                Roles
                            </th>
                            <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody className="bg-white">
                            {!users ? (
                                <tr>No User Found</tr>
                            ) : (
                                users.map((user) => {
                                    return (
                                        <User key={user.username} user={user} />
                                    );
                                })
                            )}
                        </tbody>
                    )}
                </table>
                {loading && (
                    <div className="flex justify-center items-center">
                        <LoadingCircle />
                    </div>
                )}
            </div>
        </div>
    );
}
