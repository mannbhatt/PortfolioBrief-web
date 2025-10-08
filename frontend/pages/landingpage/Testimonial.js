import Script from "next/script"

export default function Testimonial() {
    return (
        <section className="max-w-7xl w-full md:w-9/12 mx-auto py-10">
            <Script src="https://static.senja.io/dist/platform.js"></Script>
            <h2 className="mb-10 sm:mt-4 text-3xl md:text-5xl text-center font-bold text-gray-900">What Our Readers Says</h2>
            <div class="senja-embed" data-id="424fae03-cd2c-4346-a270-3592af686fb9" data-lazyload="false"></div>
        </section>
    )
}