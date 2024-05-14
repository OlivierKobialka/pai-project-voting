"use client";

import ReactPlayer from "react-player/youtube";

export default function RegisterLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <>
            <ReactPlayer
                url="https://www.youtube.com/watch?v=fAxOoWkcrJo"
                playing
                loop
                controls={false}
                volume={0}
                pip={false}
                muted
                width="100%"
                height="100%"
                className="absolute top-0 w-screen h-screen z-10 object-center object-cover"
            />
            <main className="flex items-center justify-center w-screen h-screen absolute top-0 z-50 bg-transparent bg-opacity-60">
                {children}
            </main>
        </>
    );
}
