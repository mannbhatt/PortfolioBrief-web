"use client"
import react, { useState } from "react";

export default function Header() {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen);
    };

    return (
        <nav className="max-w-7xl w-full md:w-9/12 mx-auto px-12 md:px-0 py-6 md:py-8 lg:flex lg:items-center lg:justify-between">
            <div className="flex justify-between items-center">
                <h2 className="text-black hover:text-cyan-500 transition-all duration-300 text-2xl font-bold"><a href="#">PortfolioBrief</a></h2>
                {navbarOpen ?
                    <span className="text-3xl cursor-pointer mx-2 lg:hidden block" onClick={handleToggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                            <path d="M7 7L17 17"></path>
                            <path d="M17 7L7 17"></path>
                        </svg>
                    </span> :
                    <span className="text-3xl cursor-pointer mx-2 lg:hidden block" onClick={handleToggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </span>
                }
            </div>
            <ul className={`${navbarOpen ? "h-full lg:opacity-100" : 'hidden lg:flex'} flex flex-col lg:flex-row lg:items-center z-[-1] lg:z-auto lg:static w-full left-0 lg:w-auto pt-8 lg:py-0 top-[-400px] transition-all ease-in duration-300 text-center gap-2 lg:gap-6`}>
                <li>
                    <a href="/recentnews" className="text-base font-semibold text-gray-600 hover:text-cyan-500 duration-150">Recent News</a>
                </li>
                <li>
                    <a href="#howitworks" className="text-base font-semibold text-gray-600 hover:text-cyan-500 duration-150">How it Works</a>
                </li>
                <li>
                    <a href="#faqs" className="text-base font-semibold text-gray-600 hover:text-cyan-500 duration-150">FAQs</a>
                </li>
                <li>
                    <a href="https://forms.gle/1J1oETrWFjXT9LAv7" className="text-base font-semibold text-gray-600 hover:text-cyan-500 duration-150" target="_blank">Contact Us</a>
                </li>
                <a href="/register" className=" text-cyan-500 hover:text-white text-lg font-semibold duration-200 px-6 py-2 hover:bg-cyan-500 active:scale-95 border-2 border-cyan-500 rounded-md">Get Started</a>
            </ul>
        </nav>
    );
}