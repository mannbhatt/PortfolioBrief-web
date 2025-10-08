export default function Hero() {
    return (
        <section className="max-w-7xl w-full md:w-9/12 mx-auto py-10">
            <div className="container flex flex-col lg:flex-row gap-10 items-center justify-center">
                <div className="lg:w-3/5">
                    <h2 className="max-w-xl text-5xl sm:text-5xl xl:text-6xl font-extrabold text-center lg:text-left">You Select Stocks <br /> We Select News <br /> Simple!</h2>
                    <div className="flex justify-center mt-14 gap-4 lg:justify-start">
                        <a href="/register" className="text-white bg-cyan-500 font-medium rounded-full px-8 sm:px-12 py-4 text-center hover:bg-cyan-600 active:scale-95 transition duration-300 ease-in-out">Join Now</a>
                        <a href="/login" className=" text-white bg-cyan-500 font-medium rounded-full px-8 sm:px-12 py-4 text-center hover:bg-cyan-600 active:scale-95 transition duration-300 ease-in-out">LogIn</a>
                    </div>
                </div>
                <div className="lg:w-2/5">
                    <img className="w-full" src="./heroimg.png" alt="Hero Image"></img>
                </div>
            </div>
        </section>
    );
}