"use client"
import { useEffect, useState } from 'react';

export default function Home() {
    const [newsData, setNewsData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [editedRecord, setEditedRecord] = useState(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetch('http://localhost:5000/api/adminfetchnews');
                const data = await response.json();
                setNewsData(data);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        }

        fetchNews();
    }, []);

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 20, newsData.length - 1));
        setEditedRecord(null); // Clear edited record when moving to the next set
    };

    const handleBackClick = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 20, 0));
        setEditedRecord(null); // Clear edited record when moving to the previous set
    };

    const handleEditClick = (recordIndex) => {
        setEditedRecord({ ...newsData[recordIndex] });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedRecord((prevRecord) => ({
            ...prevRecord,
            [name]: value,
        }));
    };

    const handleSaveClick = async () => {
        if (editedRecord !== null) {
            try {
                const response = await fetch('http://localhost:5000/api/editnews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedRecord),
                });

                if (response.ok) {
                    alert("Record saved successfully");
                    const updatedNewsData = [...newsData];
                    updatedNewsData[currentIndex] = editedRecord;
                    setNewsData(updatedNewsData);
                    setEditedRecord(null);
                } else {
                    alert("No changes made or failed to save changes");
                }
            } catch (error) {
                console.error('Error saving changes:', error);
            }
        }
    };

    const handleDeleteClick = async (recordId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/deletenews/${recordId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedNewsData = newsData.filter((record) => record._id !== recordId);
                setNewsData(updatedNewsData);
                alert("Record deleted successfully");
            } else {
                console.error('Failed to delete record');
            }
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const currentNewsItems = newsData.slice(currentIndex, currentIndex + 20);

    return (
        <div className="container sm:mt-0 lg:mt-[150px] mx-auto p-4 bg-white">
            <h1 className="text-3xl font-bold mb-4">Fetched News Data</h1>
            {currentNewsItems.map((currentNewsItem) => (
                <div key={currentNewsItem._id} className="bg-white p-4 shadow-md rounded-lg mb-4">
                    <div className="news-card">
                        {editedRecord === null ? (
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{currentNewsItem.tag}</h2>
                                <p>{currentNewsItem.innerText}</p>
                            </div>
                        ) : (
                            <div>
                                <label>Tag</label>
                                <input
                                    className="w-full p-2 mb-2 rounded-md border"
                                    type="text"
                                    name="tag"
                                    value={editedRecord.tag}
                                    onChange={handleInputChange}
                                />
                                <label>BriefNews</label>
                                <textarea
                                    className="w-full p-2 rounded-md border"
                                    name="innerText"
                                    value={editedRecord.innerText}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center mt-2">
                        {editedRecord === null ? (
                            <button
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded mr-2"
                                onClick={() => handleEditClick(currentNewsItem._id)}
                            >
                                Edit
                            </button>
                        ) : (
                            <button
                                className="bg-green-500 hover:bg-green-800 cursor-pointer text-white font-semibold px-4 py-2 rounded mr-2"
                                onClick={handleSaveClick}
                            >
                                Save
                            </button>
                        )}
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
                            onClick={() => handleDeleteClick(currentNewsItem._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mr-2"
                    onClick={handleBackClick}
                >
                    Back
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mr-2"
                    onClick={handleNextClick}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
