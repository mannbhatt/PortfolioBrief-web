
import React from "react";
import { Collapse } from "react-collapse";

export default function Faqitems({ index, open, toggle, title, desc, }) {
    return (
        <div className={`justify-center ${index === 0 ? "" : "border-t-2"}`}>
            <div className="py-4 flex justify-between items-center cursor-pointer rounded-sm" onClick={toggle}>
                <p className="text-lg md:text-xl font-sans font-semibold text-gray-900">{title}</p>
                <div className="text-[30px]">
                    {open ? <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12l7 7 7-7" stroke="#06B6D4"/>
                    </svg>
                        : <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ><path d="M12 5l7 7-7 7" stroke="#06B6D4"/>
                        </svg>}
                </div>
            </div>
            <Collapse isOpened={open}>
                <div className="overflow-hidden transition pb-4 text-gray-600">{desc}</div>
            </Collapse>
        </div>
    );
}