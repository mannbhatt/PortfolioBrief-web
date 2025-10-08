"use client"

function OptionButton({ selectValue, onClickFunction, text }) {
    return <button onClick={onClickFunction} className={`${selectValue === true ? 'bg-white shadow' : ''}  text-black font-medium duration-200 px-4 sm:px-2 md:px-4 py-2 hover:bg-white active:scale-9 rounded-lg`}>{text}</button>
}

export default function Menu({ setAllNews, setStocksNews, setAllNewsValue, setStockNewsValue }) {
    return (
        <div className="m-4 sm: md:m-6 p-4 flex flex-col lg:flex-row justify-between gap-4 py-4 sm:py-auto">
            <h2 className='text-2xl md:text-3xl font-bold flex  items-center'>Select News Type</h2>
            <div className="m-2 md:m-2 p-2 gap-2 flex bg-gray-100 text-black rounded-xl">
                <OptionButton selectValue={setAllNewsValue} onClickFunction={setAllNews} text={'All News'} />
                <OptionButton selectValue={setStockNewsValue} onClickFunction={setStocksNews} text={'Your News'} />
            </div>
        </div>
    );
};