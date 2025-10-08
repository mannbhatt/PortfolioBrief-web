export default function HowItWorks() {
    return (
        <section id="howitworks" className="max-w-7xl w-full md:w-9/12 mx-auto py-10">
            <h2 className="md:mt-8 text-3xl md:text-5xl text-center font-bold text-gray-900">How It Works</h2>
            <div className="flex flex-col md:flex-row gap-10 justify-center py-10 md:py-20">
                <div className="w-4/5 sm:w-1/2 flex flex-col justify-center text-center md:text-left mx-auto">
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 pb-2">Choose Your Stocks</h3>
                    <p className="text-lg text-gray-600">Select the specific stocks you're interested in tracking and investing in. Our platform allows you to customize your preferences and focus on the companies that matter most to you.</p>
                </div>
                <div className="w-4/5 sm:w-1/2 mx-auto">
                    <img className="h-64 mx-auto" src="./1.png" alt="My Image" />
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-10 justify-center py-10 md:py-20">
                <div className="w-4/5 sm:w-1/2 mx-auto">
                    <img className="h-64 mx-auto" src="./2.jpg" alt="My Image" />
                </div>
                <div className="w-4/5 sm:w-1/2 flex flex-col justify-center text-center md:text-left mx-auto">
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 pb-2">Customized News Updates</h3>
                    <p className="text-lg text-gray-600">Decide if you want to receive news articles related to your selected stocks, or both news and real-time stock price updates. Information that aligns with your investment strategy.</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-10 justify-center py-10 md:py-20">
                <div className="w-4/5 sm:w-1/2 flex flex-col justify-center text-center md:text-left mx-auto">
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 pb-2">Start Your Day Right!</h3>
                    <p className="text-lg text-gray-600"> Your personalized newsletter will be delivered promptly at 9 AM, allowing you to enjoy your morning routine while staying up-to-date with the latest market insights.</p>
                </div>
                <div className="w-4/5 sm:w-1/2 mx-auto">
                    <img className="h-64 mx-auto" src="./3.jpg" alt="My Image" />
                </div>
            </div>
        </section>
    );
}