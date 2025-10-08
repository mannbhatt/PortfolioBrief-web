"use client"
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ResNewsMenu from './ResNewsMenu';
import AllNews from './AllNews';
import StockNews from './StockNews';

export default function ResNews({ userEmail }) {
    const [currentMenu, setCurrentMenu] = useState('stocksnews');
    
    const setAllNews = () => {
        setCurrentMenu('allnews');
    };

    const setStocksNews = () => {
        setCurrentMenu('stocksnews');
    };
    
    const renderMenuComponent = () => {
        switch (currentMenu) {
            case 'allnews':
                console.log(2);
                return <AllNews userEmail={userEmail} />;
            case 'stocksnews':
                return <StockNews userEmail={userEmail} toast={toast} />;
                        default:
                return <ComponentC />;
        }
    }

    return(
        <main className="">
            <ResNewsMenu
                setAllNews={setAllNews}
                setStocksNews={setStocksNews}
                setAllNewsValue={currentMenu === 'allnews' ? true : false}
                setStockNewsValue={currentMenu === 'stocksnews' ? true : false}
            />
            {renderMenuComponent()}
            <ToastContainer />
        </main>
        
    );
    }
