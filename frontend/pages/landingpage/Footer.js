export default function Footer({ target }) {
    return (
        <footer className="px-12 py-6 md:px-0 md:py-8 flex flex-col gap-4 border-t bg-cyan-500 text-white">
            <div className='max-w-7xl w-full md:w-9/12 mx-auto flex flex-col gap-4 sm:flex-row justify-center sm:justify-between'>
                <h2 className='relative group text-2xl text-center font-bold'>
                    <a href={`${target === 'home' ? '#' : '/'}`}>PortfolioBrief</a>
                    <span className='absolute origin-left ml-1 scale-x-0 transform transition-transform ease-out  group-hover:scale-x-100'>📰</span>
                </h2>
                <ul className='flex justify-center gap-4 '>
                    <li className='relative group inline-block leading-[200%]'>
                        <a href="https://forms.gle/1J1oETrWFjXT9LAv7" target="_blank">Contact</a>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-bottom-left transform scale-x-0 transition-transform ease-out group-hover:scale-x-100"></span>
                    </li>
                    <li className='relative group inline-block leading-[200%]'>
                        <a href="/termsnconditions">Terms</a>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-bottom-left transform scale-x-0 transition-transform ease-out group-hover:scale-x-100"></span>
                    </li>
                    <li className='relative group inline-block leading-[200%]'>
                        <a href="/privacypolicy">Privacy</a>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-bottom-left transform scale-x-0 transition-transform ease-out group-hover:scale-x-100"></span>
                    </li>
                </ul>
            </div>
            <div>
               {/* <p className='text-center'>Made with ☕ by
                    <span className='relative group inline-block leading-[200%] mx-1'>
                        <a href="https://www.linkedin.com/in/iamsatyajit/" target='_blank'>Satyajit</a>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-bottom-left transform scale-x-0 transition-transform ease-out group-hover:scale-x-100"></span>
                    </span>
                    &
                    <span className='relative group inline-block leading-[200%] mx-1'>
                        <a href="https://www.linkedin.com/in/mann-bhatt-04930a241/" target='_blank'>Mann</a>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-bottom-left transform scale-x-0 transition-transform ease-out group-hover:scale-x-100"></span>
                    </span>
                </p>*/}
            </div>
        </footer>
    );
};