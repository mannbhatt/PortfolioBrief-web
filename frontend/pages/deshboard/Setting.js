"use client"
import React, { useState } from "react";
import Loading from './Loading';

export default function Setting({ userName, userEmail, handleSignOutFun, toast }) {
    const [recieveNewsText, setEecieveNewsText] = useState(true);
    const [newsTypeText, setNewsTypeText] = useState('Only News');
    const [isLoading, setIsLoading] = useState(false);

    const toggleRecieveNews = () => {
        setEecieveNewsText(!recieveNewsText);
    };

    const toggleNewsType = () => {
        if (newsTypeText === 'Only News') {
            setNewsTypeText('News & Price');
        } else {
            setNewsTypeText('Only News');
        }
    };

    const savePreference = async () => {
        try {
            setIsLoading(true);

            const data = {
                recieveNewsText: recieveNewsText,
                newsTypeText: newsTypeText,
                email: userEmail
            };

            const response = await fetch("https://portfoliobrief-backend.vercel.app/api/savepreference", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Preference update successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

            console.log(response);
        } catch (error) {
            console.error('Error:', error);
            toast.error("Something went wrong, try again later!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="mx-2 sm:mx-32 p-4 space-y-3">
                <h3 className="text-2xl font-semibold">Welcome</h3>
                <div className="py-3">
                    <h5 className="text-sm">Username: {userName}</h5>
                    <h5 className="text-sm">Email: {userEmail}</h5>
                </div>
                <hr className="border-1 border-gray-500" />
                <div className="space-y-3">
                    <div className='flex justify-between items-center gap-4'>
                        <h3 className="text-2xl font-semibold">Your Preference</h3>
                        <div className="input-button w-auto">
                            <button onClick={isLoading ? '' : savePreference} className={`w-auto border border-gray-400 hover:bg-gray-100 rounded-md px-8 py-2 text-black text-base font-medium h-12 transition-all duration-300 active:scale-95`}>
                                {isLoading ? <Loading /> : 'Save'}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <h5 className="text-sm pt-2">Receive News</h5>
                        <button onClick={toggleRecieveNews} className="relative w-24 border border-gray-400 hover:bg-gray-100 rounded-md text-black text-base font-medium h-12 transition-all duration-300">
                            <div className={`absolute left-0 top-0 w-full h-full flex justify-center items-center transition-all duration-75 ${recieveNewsText === true ? '' : 'translate-x-[-50%] opacity-0'}`}>Yes</div>
                            <div className={`absolute left-0 top-0 w-full h-full flex justify-center items-center transition-all duration-75 ${recieveNewsText === false ? 'translate-x-0' : 'translate-x-[50%] opacity-0'}`}>No</div>
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <h5 className="text-sm pt-2">News Type</h5>
                        <button onClick={toggleNewsType} className="relative w-40 border border-gray-400 hover:bg-gray-100 rounded-md text-black text-base font-medium h-12 transition-all duration-300">
                            <div className={`absolute left-0 top-0 w-full h-full flex justify-center items-center transition-all duration-75 ${newsTypeText === 'Only News' ? '' : 'translate-x-[-25%] opacity-0'}`}>Only News</div>
                            <div className={`absolute left-0 top-0 w-full h-full flex justify-center items-center transition-all duration-75 ${newsTypeText === 'News & Price' ? 'translate-x-0' : 'translate-x-[25%] opacity-0'}`}>News & Price</div>
                        </button>
                    </div>
                </div>
                <hr className="border-1 border-gray-500" />
                <div className="flex justify-end">
                    <button onClick={handleSignOutFun} className={`w-full sm:w-auto border border-gray-400 hover:bg-gray-100 rounded-md px-8 py-2 text-black text-base font-medium h-12 transition-all duration-300 active:scale-95`}>Sign Out</button>
                </div>
            </div>
        </>
    );
}