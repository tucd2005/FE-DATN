import React from 'react'

const SidebarAdmin = () => {
    return (
        <>
            <div className="absolute w-full bg-blue-500 dark:hidden min-h-75" />
            {/* sidenav  */}
            <aside className="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0" aria-expanded="false">
                <div className="h-19">
                    <i className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times dark:text-white text-slate-400 xl:hidden" sidenav-close />
                    <a className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700" href="" target="_blank">

                        <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">SHOP QUẦN ÁO THỂ THAO</span>
                    </a>
                </div>
                <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />
                <div className="items-center block w-auto h-full overflow-y-auto">
                    <ul className="flex flex-col pl-0 mb-0">
                        <li className="mt-0.5 w-full">
                            <a className=" dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="/admin/home">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <i className="relative top-0 text-sm leading-normal text-blue-500 ni ni-tv-2" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">home</span>
                            </a>
                        </li>


                        <li className="mt-0.5 w-full">
                            <a className=" dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="/admin/quan-ly-san-pham">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <i className="relative top-0 text-sm leading-normal text-orange-500 ni ni-calendar-grid-58" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Quản lý sản phẩm</span>
                            </a>
                        </li>
                        <li className="mt-0.5 w-full">
                            <a className=" dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="/admin/quan-ly-banner">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <i className="relative top-0 text-sm leading-normal text-orange-500 ni ni-calendar-grid-58" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Quản lý banner</span>
                            </a>
                        </li>
                        <li className="mt-0.5 w-full">
                            <a className=" dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="/admin/quan-ly-danh-muc">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <i className="relative top-0 text-sm leading-normal text-orange-500 ni ni-bullet-list-67" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Quản lý danh mục </span>
                            </a>
                        </li>
                        <li className="mt-0.5 w-full">
                            <a className=" dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="/admin/size">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <i className="relative top-0 text-sm leading-normal text-cyan-500 ni ni-ruler-pencil" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Quản lý kích thước</span>
                            </a>
                        </li>

                        <li className="mt-0.5 w-full">
                            <a className=" dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="/admin/quan-ly-binh-luan">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <i className="relative top-0 text-sm leading-normal text-pink-500 ni ni-chat-round" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Quản lý bình luận</span>
                            </a>
                        </li>
                        <li className="mt-0.5 w-full">
                            <a
                                className="dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
                                href="/admin/Voucher"
                            >
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <i className="relative top-0 text-sm leading-normal text-green-500 ni ni-tag" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Quản lý mã giảm giá</span>
                            </a>
                        </li>
                        <li className="mt-0.5 w-full">
                            <a className=" dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="./pages/billing.html">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center fill-current stroke-0 text-center xl:p-2.5">
                                    <i className="relative top-0 text-sm leading-normal text-emerald-500 ni ni-credit-card" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Billing</span>
                            </a>
                        </li>

                        <li className="mt-0.5 w-full">
                            <a className=" dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <i className="relative top-0 text-sm leading-normal text-red-600 ni ni-world-2" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">RTL</span>
                            </a>
                        </li>
                        <li className="w-full mt-4">
                            <h6 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase dark:text-white opacity-60">Account pages</h6>
                        </li>
                        <li className="mt-0.5 w-full">
                            <a className=" dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <i className="relative top-0 text-sm leading-normal text-slate-700 ni ni-single-02" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Profile</span>
                            </a>
                        </li>
                        <li className="mt-0.5 w-full">
                            <a className=" dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <i className="relative top-0 text-sm leading-normal text-orange-500 ni ni-single-copy-04" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Sign In</span>
                            </a>
                        </li>
                        {/* <li className="mt-0.5 w-full">
                            <a className=" dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <i className="relative top-0 text-sm leading-normal text-cyan-500 ni ni-collection" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Sign Up</span>
                            </a>
                        </li> */}
                    </ul>
                </div>


            </aside>
        </>
    )
}

export default SidebarAdmin
{/* <div className="mx-4">
                    <p className="invisible hidden text-gray-800 text-red-500 text-red-600 text-blue-500 bg-gray-500/30 bg-cyan-500/30 bg-emerald-500/30 bg-orange-500/30 bg-red-500/30 after:bg-gradient-to-tl after:from-zinc-800 after:to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 after:from-blue-700 after:to-cyan-500 after:from-orange-500 after:to-yellow-500 after:from-green-600 after:to-lime-400 after:from-red-600 after:to-orange-600 after:from-slate-600 after:to-slate-300 text-emerald-500 text-cyan-500 text-slate-400" />
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border" sidenav-card>
                        <img className="w-1/2 mx-auto" src="../assets/img/illustrations/icon-documentation.svg" alt="sidebar illustrations" />
                        <div className="flex-auto w-full p-4 pt-0 text-center">
                            <div className="transition-all duration-200 ease-nav-brand">
                                <h6 className="mb-0 dark:text-white text-slate-700">Need help?</h6>
                                <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">Please check our docs</p>
                            </div>
                        </div>
                    </div>
                    <a href="https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/argon-dashboard/" target="_blank" className="inline-block w-full px-8 py-2 mb-4 text-xs font-bold leading-normal text-center text-white capitalize transition-all ease-in rounded-lg shadow-md bg-slate-700 bg-150 hover:shadow-xs hover:-translate-y-px">Documentation</a>
                    <a className="inline-block w-full px-8 py-2 text-xs font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md select-none bg-150 bg-x-25 hover:shadow-xs hover:-translate-y-px" href="https://www.creative-tim.com/product/argon-dashboard-pro-tailwind?ref=sidebarfree" target="_blank">Upgrade to pro</a>
                </div> */}