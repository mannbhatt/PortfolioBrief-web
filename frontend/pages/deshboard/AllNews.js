"use client"
import { useEffect, useState } from 'react';
import Loading from './Loading';
function NewsComponent() {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isStockList, setIsStockList] = useState(false);
    const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;
    function sortNews(newsArray) {
        newsArray.forEach(news => {
            const dateObj = new Date(news.newsTime);

            if (dateObj == "Invalid Date" && typeof news.newsTime !== "undefined") {
                const parts = news.newsTime.split(" ");

                const month = parts[0];
                const day = parseInt(parts[1], 10);
                const year = parseInt(parts[2], 10);

                const formattedDate = `${day} ${month.slice(0, 3)} '${year.toString().substr(-2)}`;
                
                news.newsTime = new Date(formattedDate);
            }

            console.log(news.newsTime);
        });

        return newsArray;
    }

    useEffect(() => {
        async function fetchNews() {

            setIsLoading(true);
            try {
                const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/fetchnews`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });

                if (!response.ok) {
                    if (data.message === "Empty news") {
                        setIsEmpty(true);
                    } else if (data.message === "User not found") {
                        setIsStockList(true);
                    } else {
                        throw new Error(`Network response was not ok (status ${response.status})`);
                    }
                    return;
                }
                const data = await response.json();
                if (response.ok) {
                    setIsEmpty(false);
                    setIsStockList(false);
                    setIsError(false);
                    const dateUpdated = sortNews(data.news);
                    const sortNewsArray = dateUpdated.sort((a, b) => new Date(b.newsTime) - new Date(a.newsTime));
                    setNewsData(sortNewsArray);
                }
            } catch (error) {
                console.error('An error occurred:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchNews();
    }, []);

    function formatTime(timeString) {
        if (typeof timeString === "undefined") {
            return;
        }

        const dateObj = new Date(timeString);

        const monthAbbreviations = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const formattedDate = `${dateObj.getDate()} ${monthAbbreviations[dateObj.getMonth()]} '${dateObj.getFullYear().toString().substr(-2)}`;

        return formattedDate;
    }


    return (
        <div className="container px-8">

            {isLoading ?
                <div className='flex justify-center items-center gap-4 h-64'>
                    <Loading /> Loading...
                </div>
                : <p></p>
            }
            {isEmpty ?
                <div className='flex justify-center items-center gap-4 h-64'>
                    Nothing to see here!
                </div>
                :
                <p></p>
            }


            {isError ?
                <div className='flex justify-center items-center gap-4 h-64'>
                    Something went wrong, try again later!
                </div>
                : <p></p>
            }
            {!isLoading && !isEmpty && !isStockList && !isError ?
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {newsData.map((newsItem, index) => {
                        let sourceContent = null;

                        if (newsItem.href && newsItem.href.includes("https://www.livemint.com")) {
                            sourceContent = (
                                <span className='text-gray-500 text-sm mt-2'>LiveMint</span>
                            );
                        }
                        else if (newsItem.href && newsItem.href.includes("https://www.moneycontrol.com")) {
                            sourceContent = (
                                <span className='text-gray-500 text-sm mt-2'>MoneyControl</span>
                            );
                        }

                        return (
                            <div key={index} className="group p-4 shadow-md rounded-2xl border flex justify-between gap-4">
                                <div>
                                    <a href={newsItem.href} className="group-hover:underline">{newsItem.innerText}</a>
                                    <p className='text-gray-500 text-sm mt-3'>
                                        <span>{formatTime(newsItem.newsTime)}</span>
                                        <span className={`${newsItem.tag ? "" : "hidden"}`}> • {newsItem.tag}</span>
                                        <span> • {sourceContent}</span>
                                    </p>
                                </div>
                                <div>
                                    <img className="max-h-[78px] max-w-[78px] rounded-md" src={newsItem.imageUrl} alt={newsItem.tag} />
                                </div>
                            </div>
                        );
                    })}
                </div>
                : <p></p>
            }
        </div>
    );
}

export default NewsComponent;
