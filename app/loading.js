// 'use client';

import Image from "next/image";

export default function Loading() {
    return (
        <>
            <div className="h-screen w-full flex flex-col gap-4 justify-center items-center">
                <Image src='/imgs/loader.gif' unoptimized alt="loader" width={150} height={150} />
                <h1 className="font-medium text-lg">Loading...</h1>
            </div>
        </>
    )
}