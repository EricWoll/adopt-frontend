'use client';

import { useEffect, useState } from 'react';
import User from './User';
import { UserInterface } from '@/interfaces/User';

export default function UserList() {
    const USER_API_BASE_URL = 'http://localhost:8080/api/v1/users';
    const [users, setUsers] = useState<Array<UserInterface> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(USER_API_BASE_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Origin: 'http://localhost:3000',
                    },
                });
                const users = await response.json();
                setUsers(users);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className=" container mx-auto my-8">
            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                Username
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
                                users.map((user) => (
                                    <User key={user.userId} user={user} />
                                ))
                            )}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
