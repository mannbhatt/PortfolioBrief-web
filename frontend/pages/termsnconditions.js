import Footer from './landingpage/Footer';

export default function Home() {
    return (
        <>
            <h2 className="text-black hover:text-cyan-500 transition-all duration-300 text-2xl font-bold mx-auto px-12 md:px-0 py-6 md:py-8  text-center"><a href="/">PortfolioBrief</a></h2>
            <div className="max-w-7xl w-auto md:w-9/12 mx-auto px-12 pb-12 md:px-0">
                <h2 className='text-xl font-semibold pb-4'>Terms and Conditions</h2>
                <p className="pt-4">1. Introduction <br />
                    By using PortfolioBrief you confirm your acceptance of, and agree to be bound by, these terms and conditions.</p>
                <p className="pt-4">2. Agreement to Terms and Conditions <br />
                    This Agreement takes effect on the date on which you first use the PortfolioBrief application.</p>
                <p className="pt-4">3. Unlimited Access Software License with Termination Rights <br />
                    The PortfolioBrief Software License facilitates the acquisition of PortfolioBrief software through a single purchase, granting users unrestricted and perpetual access to its comprehensive functionalities. Tailored for independent creators, entrepreneurs, and small businesses, PortfolioBrief empowers users to create compelling web pages and online portfolios.This license entails a straightforward and flexible arrangement, exempting users from recurring fees or subscriptions. However, it is important to acknowledge that the licensor retains the right to terminate the license without conditions or prerequisites. This termination provision enables the licensor to exercise control over software distribution and utilization.Opting for the MakeLanding Software License enables users to enjoy the benefits of the software while recognizing the licensor's unrestricted termination rights, which provide adaptability and address potential unforeseen circumstances.</p>
                <p className="pt-4">4. Disclaimer <br />
                    It is not warranted that MakeLanding will meet your requirements or that its operation will be uninterrupted or error free. All express and implied warranties or conditions not stated in this Agreement (including without limitation, loss of profits, loss or corruption of data, business interruption or loss of contracts), so far as such exclusion or disclaimer is permitted under the applicable law are excluded and expressly disclaimed. This Agreement does not affect your statutory rights.</p>
                <p className="pt-4">5. Warranties and Limitation of Liability <br />
                    PortfolioBrief does not give any warranty, guarantee or other term as to the quality, fitness for purpose or otherwise of the software. PortfolioBrief shall not be liable to you by reason of any representation (unless fraudulent), or any implied warranty, condition or other term, or any duty at common law, for any loss of profit or any indirect, special or consequential loss, damage, costs, expenses or other claims (whether caused by PortfolioBrief’s negligence or the negligence of its servants or agents or otherwise) which arise out of or in connection with the provision of any goods or services by PortfolioBrief. PortfolioBrief shall not be liable or deemed to be in breach of contract by reason of any delay in performing, or failure to perform, any of its obligations if the delay or failure was due to any cause beyond its reasonable control. Notwithstanding contrary clauses in this Agreement, in the event that PortfolioBrief are deemed liable to you for breach of this Agreement, you agree that PortfolioBrief’s liability is limited to the amount actually paid by you for your services or software, which amount calculated in reliance upon this clause. You hereby release PortfolioBrief from any and all obligations, liabilities and claims in excess of this limitation.</p>
                <p className="pt-4">6. Responsibilities <br />
                    PortfolioBrief is not responsible for what the user does with the news.</p>
                <p className="pt-4">
                    7. General Terms and Law <br />
                    This Agreement is governed by the laws of India. You acknowledge that no joint venture, partnership, employment, or agency relationship exists between you and PortfolioBrief as a result of your use of these services. You agree not to hold yourself out as a representative, agent or employee of PortfolioBrief. You agree that PortfolioBrief will not be liable by reason of any representation, act or omission to act by you.</p>
                <p className="pt-4">Last updated: 28 July 2023</p>
            </div>
            <Footer target='terms' />
        </>
    )
}