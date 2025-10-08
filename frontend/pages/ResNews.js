"use client"
import { useEffect, useState } from 'react';

function NewsComponent() {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {
        async function fetchNews() {

            try {
                const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/fetchnews`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok (status ${response.status})`);
                }

                const data = await response.json();
                // Assuming the data structure is like { news: [{ title: '...', ... }, ...] }

                setNewsData(data.news);
                setLoading(false);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }

        fetchNews();
    }, []);

    return (
        <>
        
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {newsData.map((newsItem, index) => (
                    <div
                        key={index}
                        className="p-4 bg-slate-200 text-black rounded-xl hover:shadow-lg"
                    >
                        <a href={newsItem.href} className="hover:underline">
                            {newsItem.innerText}
                        </a>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default NewsComponent;
