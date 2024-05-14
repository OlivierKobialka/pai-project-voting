"use client";

import Link from "next/link";
import { IExtendedGame, IGame } from "../types";
import Image from "next/image";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function Game({
    nazwa,
    opis,
    baner,
    strona,
    typ,
    data,
    hasVoted,
    onVote,
    user,
}: IExtendedGame): JSX.Element {
    return (
        <Dialog>
            <DialogTrigger className="rounded-xl shadow-md cursor-pointer">
                <Image
                    width={100000}
                    height={100000000}
                    className="w-full rounded-xl rounded-b-none duration-500 transition-all ease-in-out object-cover object-center "
                    src={baner}
                    alt={nazwa}
                />
                <div className="w-full p-3 flex flex-col items-start justify-between">
                    <div className="pb-3">
                        <h2 className="text-xl sm:text-2xl font-bold hover:underline text-left">{nazwa}</h2>
                        <p className="text-sm md:text-base text-gray-500 hover:underline text-left">
                            {opis.substring(0, 200) + "... kliknij aby zobaczyć więcej!"}
                        </p>
                        {/* <Link href={strona} className="text-blue-500 hover:text-blue-700">
                        Strona gry
                    </Link>
                    <p className="text-sm sm:text-base text-gray-500">
                        Kategoria: <span className="font-semibold">{typ.toUpperCase()}</span>
                    </p>
                    <p className="text-sm sm:text-base text-gray-500">
                        Data premiery: <span className="font-semibold">{new Date(data).toLocaleDateString()}</span>
                    </p> */}
                    </div>

                    {user && !hasVoted && onVote ? (
                        <Button
                            onClick={() => onVote(nazwa)}
                            className="bg-[#0CC38B] w-full flex items-center justify-center text-center hover:opacity-80 duration-500 transition-all ease-in-out text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded mr-2"
                        >
                            Oddaj głos
                        </Button>
                    ) : hasVoted ? (
                        <p>Dziękujemy za oddanie głosu!</p>
                    ) : (
                        <Link
                            className="bg-[#0CC38B] w-full flex items-center justify-center text-center hover:opacity-80 duration-500 transition-all ease-in-out text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded mr-2"
                            href="/sign-in"
                        >
                            Zaloguj się, aby oddać głos
                        </Link>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent>
                <div className="rounded-xl w-full h-full shadow-md cursor-pointer p-0 m-0 bg-white">
                    <Image
                        width={100000}
                        height={100000000}
                        className="w-full rounded-xl rounded-b-none duration-500 transition-all ease-in-out object-cover object-center "
                        src={baner}
                        alt={nazwa}
                    />
                    <div className="w-full p-3 flex flex-col items-start justify-between">
                        <div className="pb-3">
                            <h2 className="text-xl sm:text-2xl font-bold hover:underline text-left">{nazwa}</h2>
                            <p className="text-sm md:text-base text-gray-500 hover:underline text-left">{opis}</p>
                            <Link href={strona} className="text-blue-500 hover:text-blue-700">
                                Strona gry
                            </Link>
                            <p className="text-sm sm:text-base text-gray-500">
                                Kategoria: <span className="font-semibold">{typ.toUpperCase()}</span>
                            </p>
                            <p className="text-sm sm:text-base text-gray-500">
                                Data premiery:{" "}
                                <span className="font-semibold">{new Date(data).toLocaleDateString()}</span>
                            </p>
                        </div>

                        {user && !hasVoted && onVote ? (
                            <Button
                                onClick={() => onVote(nazwa)}
                                className="bg-[#0CC38B] w-full flex items-center justify-center text-center hover:opacity-80 duration-500 transition-all ease-in-out text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded mr-2"
                            >
                                Oddaj głos
                            </Button>
                        ) : hasVoted ? (
                            <p>Dziękujemy za oddanie głosu!</p>
                        ) : (
                            <Link
                                className="bg-[#0CC38B] w-full flex items-center justify-center text-center hover:opacity-80 duration-500 transition-all ease-in-out text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded mr-2"
                                href="/sign-in"
                            >
                                Zaloguj się, aby oddać głos
                            </Link>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
