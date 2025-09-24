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
                console.log(data);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        }

        fetchNews();
    }, []);

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
        setEditedRecord(null); // Clear edited record when moving to the next one
    };

    const handleBackClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length);
        setEditedRecord(null); // Clear edited record when moving backwards
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
                    alert("You didn't change any field, so failed to save changes");
                    console.error('Failed to save changes');
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
                console.log("Record deleted successfully");
            } else {
                console.error('Failed to delete record');
            }
        } catch (error) {
            alert("Record didn't delete");
            console.error('Error deleting record:', error);
        }
    };

    const currentNewsItem = newsData[currentIndex];

    return (
        <div className="container sm:mt-0 lg:mt-[150px] mx-auto p-4 bg-white">
            <h1 className="text-3xl font-bold mb-4">Fetched News Data</h1>
            <div className="bg-white p-4 shadow-md rounded-lg">
                {currentNewsItem && (
                    <div className="news-card">
                        {editedRecord === null ? (
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{currentNewsItem.title}</h2>
                                <p className='text-sm'>{currentNewsItem.summary}</p>
                                {currentNewsItem.imageUrl && (
                                    <img src={currentNewsItem.imageUrl} alt={currentNewsItem.tag} />
                                )}
                                <p><strong>Article URL:</strong> {currentNewsItem.articleUrl}</p>
                                <p><strong>Category:</strong> {currentNewsItem.category}</p>
                                <p><strong>Company:</strong> {currentNewsItem.company}</p>
                                <p><strong>Tags:</strong> {currentNewsItem.tags.join(', ')}</p>
                            </div>
                        ) : (
                            <div>
                                <label>Title</label>
                                <input
                                    className="w-full p-2 mb-2 rounded-md border"
                                    type="text"
                                    name="title"
                                    value={editedRecord.title}
                                    onChange={handleInputChange}
                                />
                                <label>Brief News</label>
                                <textarea
                                    className="w-full p-2 rounded-md border"
                                    name="summary"
                                    value={editedRecord.summary}
                                    onChange={handleInputChange}
                                />
                                <label>Image URL</label>
                                <input
                                    className="w-full p-2 rounded-md border"
                                    type="text"
                                    name="imageUrl"
                                    value={editedRecord.imageUrl}
                                    onChange={handleInputChange}
                                />
                                <label>Article URL</label>
                                <input
                                    className="w-full p-2 rounded-md border"
                                    type="text"
                                    name="articleUrl"
                                    value={editedRecord.articleUrl}
                                    onChange={handleInputChange}
                                />
                                <label>Category</label>
                                <input
                                    className="w-full p-2 rounded-md border"
                                    type="text"
                                    name="category"
                                    value={editedRecord.category}
                                    onChange={handleInputChange}
                                />
                                <label>Company</label>
                                <input
                                    className="w-full p-2 rounded-md border"
                                    type="text"
                                    name="company"
                                    value={editedRecord.company}
                                    onChange={handleInputChange}
                                />
                                <label>Tags</label>
                                <input
                                    className="w-full p-2 rounded-md border"
                                    type="text"
                                    name="tags"
                                    value={editedRecord.tags.join(', ')}
                                    onChange={(event) =>
                                        setEditedRecord((prevRecord) => ({
                                            ...prevRecord,
                                            tags: event.target.value.split(',').map(tag => tag.trim()),
                                        }))
                                    }
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
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
                {editedRecord !== null && (
                    <button
                        className="bg-green-500 hover:bg-green-800 cursor-pointer text-white font-semibold px-4 py-2 rounded mr-2"
                        onClick={handleSaveClick}
                    >
                        Save
                    </button>
                )}
                {editedRecord === null && (
                    <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded mr-2"
                        onClick={() => handleEditClick(currentIndex)}
                    >
                        Edit
                    </button>
                )}
                {editedRecord === null && (
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
                        onClick={() => handleDeleteClick(currentNewsItem._id)}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}
