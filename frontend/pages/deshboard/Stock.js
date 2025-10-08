"use client"
import { useEffect, useState } from 'react';
import stockList from '../../lib/stockList';
import Loading from './Loading';

export default function Stock({ userEmail, toast }) {
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState(stockList);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;
    const handleStateToggle = (index) => {
        const updatedData = data.map((stock) => {
            return stock.id === index ? { ...stock, state: !stock.state } : stock
        });
        setData(updatedData);
	//console.log(Data)
    };
    
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredStockNames = data.filter((item) => {
        if (item) {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase())
        }
    });

    useEffect(() => {
        modifyStocks()
    }, [])

    const modifyStocks = async () => {
        try {
            setIsFetching(true);
            const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/updatestocks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail }),
            });
            const dataResponse = await response.json();

            if (response.ok) {
                if (dataResponse.status) {
                    const listedStocks = dataResponse.stocks;

                    const newData = data;
                    for (let i = 0; i <= newData.length - 1; i++) {
                        for (let j = 0; j < listedStocks.length; j++) {
                            if (newData[i].name == listedStocks[j]) {
                                newData[i].state = true;
                            }
                        }
                    }

                    setData(newData);
                } else {
                    console.log('No stocks found for the user');
                }

                setIsFetching(false);
            } else {
                console.error('Failed to fetch stocks:', data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const saveStockInDB = async () => {
        try {
            setIsLoading(true);
           
            const selectedStockNamesArray = data
                .filter(data => data.state)
                .map(selectedStock => selectedStock.name);
              
            const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/addstocks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stocks: selectedStockNamesArray, userEmail: userEmail }),
            })

            if (response.ok) {
                await modifyStocks();

                toast.success("Stocks update successfully!", {
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
        } catch (error) {
            console.error('An error occurred:', error);
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
            <div>
                <div className='m-4 sm: md:m-6 p-4 flex flex-col lg:flex-row justify-between gap-4 py-4 sm:py-auto'>
                    <h2 className='text-2xl md:text-3xl font-bold flex items-center'>Select Stock</h2>
                    <div className="flex gap-4 flex-col sm:flex-row">
                        <div className={`relative flex border border-gray-400 rounded-lg h-12 cursor-pointer`}>
                            <span className='icon flex items-center px-4 text-xs'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="10" cy="10" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </span>
                            <input
                                type="email"
                                name='email'
                                placeholder='Search a stock'
                                className='w-full py-4 px-6 border rounded-lg bg-slate-50 focus:outline-none border-none text-gray-600 focus:text-black'
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="input-button w-full sm:w-auto">
                            <button type='submit' className={`w-full sm:w-auto border border-gray-400 hover:bg-gray-100 rounded-md px-8 py-2 text-lg font-semibold h-12 transition-all duration-300 active:scale-95`} onClick={isLoading ? '' : saveStockInDB}>
                                {isLoading ? <Loading /> : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>

                {isFetching ?
                    <div className='flex justify-center items-center gap-4 h-64'>
                        <Loading /> Loading...
                    </div>
                    :
                    <div>
                        <div className='m-4 md:m-6 px-4'>
                            <p>{data.filter((e) => {
                                return e.state == true
                            }).length} stocks selected out of {data.length}</p>
                        </div>
                        <div className='flex flex-wrap justify-start gap-2 sm:gap-4 lg:gap-5 m-4 md:m-6 px-4'>
                            {filteredStockNames.map((item) => (
                                <button key={item.id} onClick={() => handleStateToggle(item.id)} type="button" className={`text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 ${item.state ? 'bg-gray-100' : ''} font-medium rounded-lg text-base px-5 py-3 transition-all duration-300 active:scale-95 outline-none`}>{item.name}</button>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
    );
};