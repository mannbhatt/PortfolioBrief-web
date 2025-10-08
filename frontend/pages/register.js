"use client"
import React from 'react';
import Image from 'next/image';
import emailValidate from '../lib/validate';
import { useFormik } from 'formik';
import { getSession, signIn } from 'next-auth/react';
import Footer from './landingpage/Footer';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: emailValidate,
        onSubmit
    })

    async function onSubmit(values) {
        console.log('Register Form Submit');
        const status = await signIn('email', {
            redirect: false,
            email: values.email,
            callbackUrl: "/"
        })

        if(status.ok) router.push(status.url); 
    }

    async function handleGoogleSignup() {
        console.log('Register Google Click');
        signIn('google',{callbackUrl: `${NEXT_PUBLIC_API_URL}/dashboard`})
    }

    return (
        <>
            <section className="h-screen flex items-center">
                <div className='w-96 mx-auto flex flex-col gap-10 text-center px-8 md:p-0'>
                    <h2 className='text-4xl font-black'>Register to PortfolioBrief</h2>
                    <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                        <div className="input-button">
                            <button type='button' onClick={handleGoogleSignup} className={`w-full border py-3 flex justify-center items-center gap-2 hover:bg-gray-200 rounded-lg h-14 transition-all duration-300 active:scale-95`}>
                                <Image src={'/google.svg'} width="20" height={20} alt='Google Icon' /> <span>Continue with Google</span>
                            </button>
                        </div>
                        <div className='relative'>
                            <span className='absolute left-0 right-0 top-2/4 h-[1px] -z-10 bg-gray-600'></span>
                            <span className='text-gray-600 bg-white px-2 z-10'>or Register with Email</span>
                        </div>
                        <div className={`${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''} relative flex border rounded-lg h-14 cursor-pointer`}>
                            <input
                                type="email"
                                name='email'
                                placeholder='Email'
                                className='w-full py-4 px-6 border rounded-lg bg-slate-50 focus:outline-none border-none text-gray-600 focus:text-black'
                                {...formik.getFieldProps('email')}
                            />
                            <span className='icon flex items-center px-4 text-xl'>
                                @
                            </span>
                        </div>
                        <div className="input-button">
                            <button type='submit' className={`w-full bg-cyan-500 hover:bg-cyan-600 rounded-md py-3 text-gray-50 text-lg font-semibold h-14 transition-all duration-300 active:scale-95`}>Register</button>
                        </div>
                    </form>
                    <p className='text-center text-gray-400 '>
                        have an account?
                        <span className='relative group inline-block leading-[200%] mx-1'>
                            <a href='/login' className='font-semibold text-cyan-500'>Log In</a>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500 origin-bottom-left transform scale-x-0 transition-transform ease-out group-hover:scale-x-100"></span>
                        </span>
                    </p>
                </div>
            </section>
            <Footer target='login' />
        </>
    );
}

export async function getServerSideProps({ req }){
    const session = await getSession({ req })
    
    if(session){
        return {
            redirect : {
                destination : "/dashboard",
                premanent: false
            }
        }
    }
    
    return {
        props: { session }
    }
}