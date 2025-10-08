"use client"
import react, { useEffect, useState } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Setting from "./deshboard/Setting";
import Stock from "./deshboard/Stock";
import ResNews from "./deshboard/ResNews";
import Menu from "./deshboard/Menu";

export default function Dashboard() {
    const { data: session } = useSession()
    const [currentMenu, setCurrentMenu] = useState('news');
    const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {
        async function adduser(email) {
            try {
                const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/adduser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                });
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }

        adduser(session.user.email);
    }, []);

    const setRecentNews = () => {
        setCurrentMenu('news');
    };

    const setStock = () => {
        setCurrentMenu('stock');
    };

    const setSetting = () => {
        setCurrentMenu('setting');
    };

    const handleSignOut = async () => {
        await signOut();
    };

    const renderMenuComponent = () => {
        switch (currentMenu) {
            case 'news':
                return <ResNews userEmail={session.user.email} />;
            case 'stock':
                return <Stock userEmail={session.user.email} toast={toast} />;
            case 'setting':
                return <Setting userName={session.user.name} userEmail={session.user.email} handleSignOutFun={handleSignOut} toast={toast} />;
            default:
                return <ComponentC />;
        }
    }

    return (
        <main className="max-w-7xl lg:w-4/5 w-full md:w-9/12 mx-auto">
            <Menu
                setRecentNews={setRecentNews}
                setStock={setStock}
                setSetting={setSetting}
                setNewsValue={currentMenu === 'news' ? true : false}
                setStockValue={currentMenu === 'stock' ? true : false}
                setSettingValue={currentMenu === 'setting' ? true : false}
            />
            {renderMenuComponent()}
            <ToastContainer />
        </main>
    )
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                premanent: false
            }
        }
    }

    return {
        props: { session }
    }
}