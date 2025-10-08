import React from 'react';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import Header from './landingpage/Header';
import Hero from './landingpage/Hero';
import HowItWorks from './landingpage/HowItWorks';
import Testimonial from './landingpage/Testimonial';
import Faq from '../pages/landingpage/Faq';
import Footer from './landingpage/Footer';

export default function Home() {
    const router = useRouter();
    const { data: session } = useSession()

    if (session) {
        router.push('/dashboard');
    } else {
        return (
            <>
                <Header />
                <Hero />
                <HowItWorks />
                <Testimonial />
                <Faq />
                <Footer target='home' />
            </>
        )
    }
}