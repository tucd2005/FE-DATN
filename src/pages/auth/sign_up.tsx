import React from "react";

const Signup: React.FC = () => {
    return (
        <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
            <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                <h5>Register</h5>
            </div>

            <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12">
                {/* Facebook */}
                <div className="w-3/12 max-w-full px-1 ml-auto flex-0">
                    <a
                        className="inline-block w-full px-5 py-2.5 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:-translate-y-px leading-pro text-xs ease-in tracking-tight-rem bg-150 bg-x-25 hover:opacity-75"
                        href="#"
                    >
                        <svg
                            width="24px"
                            height="32px"
                            viewBox="0 0 64 64"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g fill="none" fillRule="evenodd">
                                <g transform="translate(3, 3)" fillRule="nonzero">
                                    <circle fill="#3C5A9A" cx="29.5" cy="29.5" r="29.5" />
                                    <path
                                        d="M39.1,9.1H32.6c-3.9,0-8.2,1.6-8.2,7.2v5.2h-4.5v7.1h4.6v20.5h8.5V28.8h5.6l0.5-7.0h-6.6v-4.6c0-2.2,1.4-2.6,2.2-2.6H39.1V9.1z"
                                        fill="#FFFFFF"
                                    />
                                </g>
                            </g>
                        </svg>
                    </a>
                </div>

                {/* Google */}
                <div className="w-3/12 max-w-full px-1 flex-0">
                    <a
                        className="inline-block w-full px-5 py-2.5 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:-translate-y-px leading-pro text-xs ease-in tracking-tight-rem bg-150 bg-x-25 hover:opacity-75"
                        href="#"
                    >
                        {/* Google icon (placeholder) */}
                        <span className="text-sm">Google</span>
                    </a>
                </div>

                {/* Apple */}
                <div className="w-3/12 max-w-full px-1 mr-auto flex-0">
                    <a
                        className="inline-block w-full px-5 py-2.5 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:-translate-y-px leading-pro text-xs ease-in tracking-tight-rem bg-150 bg-x-25 hover:opacity-75"
                        href="#"
                    >
                        {/* Apple icon (placeholder) */}
                        <span className="text-sm">Apple</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
