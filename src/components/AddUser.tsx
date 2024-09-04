'use client';
import {
    Dialog,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function AddUser() {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div className="container mx-auto my-8">
                <div className="h-12">
                    <button
                        onClick={openModal}
                        className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
                    >
                        Add User
                    </button>
                </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-y-auto text-left align-middle transition-all transform bg-white shadow-xl rounded">
                                <DialogTitle
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Add New User
                                </DialogTitle>
                                <div className="flex max-w-md">
                                    <form className="py-2">
                                        <div className="h-auto my-4">
                                            <label className="block text-gray-600 text-sm font-normal">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                className="h-10 w-96 border mt-2 px-2 py2"
                                            />
                                            <label className="block text-gray-600 text-sm font-normal">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="h-10 w-96 border mt-2 px-2 py2"
                                            />
                                            <label className="block text-gray-600 text-sm font-normal">
                                                Roles
                                            </label>
                                            <input
                                                type="text"
                                                name="roles"
                                                className="h-10 w-96 border mt-2 px-2 py2"
                                            />
                                            <label className="block text-gray-600 text-sm font-normal">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="h-10 w-96 border mt-2 px-2 py2"
                                            />
                                        </div>
                                        <div className="h-14 my-4 space-x-4 pt-4">
                                            <button className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
