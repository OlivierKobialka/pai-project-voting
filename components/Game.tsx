"use client";

import Link from "next/link";
import { IExtendedGame, IGame } from "../types";
import Image from "next/image";
import { Button } from "./ui/button";

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
        <main>
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-6 my-8 bg-white rounded-xl shadow-lg overflow-hidden">
                <Image width={100000} height={100000000} className="w-full mx-auto" src={baner} alt={nazwa} />
                <div className="p-4 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold">{nazwa}</h2>
                    <p className="text-sm sm:text-base text-gray-500">{opis}</p>
                    <Link
                        href={strona}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Strona gry
                    </Link>
                    <p className="text-sm sm:text-base text-gray-500">{typ}</p>
                    <p className="text-sm sm:text-base text-gray-500">
                        Data premiery: {new Date(data).toLocaleDateString()}
                    </p>
                </div>

                {user && !hasVoted && onVote ? (
                    <Button
                        onClick={() => onVote(nazwa)}
                        className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mb-4 mx-auto block"
                    >
                        Oddaj głos
                    </Button>
                ) : hasVoted ? (
                    <p>Dziękujemy za oddanie głosu!</p>
                ) : (
                    <Link href="/sign-in">Zaloguj się, aby oddać głos</Link>
                )}
            </div>
        </main>
    );
}
