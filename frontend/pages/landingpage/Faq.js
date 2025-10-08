"use client"
import { useState } from 'react';
import Faqitems from './Faqitems';

export default function Faq() {
    const [open, setOpen] = useState(false);

    const toggle = (index) => {
        if (open === index) {
            return setOpen(null);
        }
        setOpen(index);
    };

    const FAQs = [
        {
            title: "How does the personalized newsletter work?",
            desc:
                "The platform allows you to select specific stocks that you are interested in tracking and investing in. Based on your choices, you will receive news updates related to your selected stocks or both news and real-time stock price updates.",
        },
        {
            title: "Can I customize the types of news I receive?",
            desc:
                "Yes, you have the option to customize your news updates. You can choose to receive news articles related only to your selected stocks or opt to receive both news and real-time stock price updates.",
        },
        {
            title: "Can I receive a newsletter at my desired time?",
            desc:
                "Unfortunately, currently news is only sent at 9PM, but we will add this feature soon!",
        },
        {
            title: "Is this service free to use?",
            desc:
                "Currently, this is a 100% free service. I am not joking. Sign Up and try it yourself.",
        },
        {
            title: "Is my personal information and investment data secure on this website?",
            desc:
                "Yes, the website takes user privacy and data security seriously. They use industry-standard security measures to protect your personal information and investment data.",
        },
        {
            title: "How many stocks can I include in the personalized newsletter",
            desc:
                "Currently, the newsletter allows you to select up to 5 specific stocks for personalized news updates. However, if you wish to receive news about more than five stocks, you can conveniently check them on your dashboard.",
        },
    ];

    return (
        <section id='faqs' className="max-w-7xl w-full md:w-1/2 mx-auto mb-10 px-12 py-10 md:px-0">
            <h2 className="mb-10 sm:mt-4 text-3xl md:text-5xl text-center font-bold text-gray-900">Frequently Asked Questions</h2>
            <div>
                <div className="mt-4">
                    {FAQs.map((data, index) => (
                        <Faqitems
                            key={index}
                            index={index}
                            open={index === open}
                            toggle={() => toggle(index)}
                            title={data.title}
                            desc={data.desc}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
