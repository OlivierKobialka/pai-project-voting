"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import GameModal from "./GameModal";
import { IExtendedGame } from "../../types";

export default function Game({
    name,
    description,
    image,
    website,
    category,
    data,
    hasVoted,
    onVote,
    user,
    voteCount,
}: IExtendedGame): JSX.Element {
    return (
        <Dialog>
            <DialogTrigger className="rounded-xl shadow-md cursor-pointer w-screen sm:w-96">
                <Image width={100000} height={100000000} className="game__card__modal__image" src={image} alt={name} />
                <div className="w-full p-3 flex flex-col items-start justify-between">
                    <div className="pb-3">
                        <h2 className="text-xl sm:text-2xl font-bold hover:underline text-left">{name}</h2>
                        <p className="text-sm md:text-base text-gray-500 hover:underline text-left">
                            {description.substring(0, 200)}{" "}
                            <span className="font-bold">... kliknij aby zobaczyć więcej!</span>
                        </p>
                        {/* <Link href={website} className="text-blue-500 hover:text-blue-700">
                        website gry
                    </Link>
                    <p className="text-sm sm:text-base text-gray-500">
                        Kategoria: <span className="font-semibold">{category.toUpperCase()}</span>
                    </p>
                    <p className="text-sm sm:text-base text-gray-500">
                        Data premiery: <span className="font-semibold">{new Date(data).toLocaleDateString()}</span>
                    </p> */}
                    </div>

                    {user && !hasVoted && onVote ? (
                        <Button onClick={() => onVote(name)} className="vote__button">
                            Oddaj głos
                        </Button>
                    ) : hasVoted ? (
                        <p>Dziękujemy za oddanie głosu!</p>
                    ) : (
                        <Link className="vote__button" href="/sign-in">
                            Zaloguj się, aby oddać głos
                        </Link>
                    )}
                </div>
            </DialogTrigger>
            <GameModal
                name={name}
                description={description}
                image={image}
                website={website}
                category={category}
                data={data}
                hasVoted={hasVoted}
                onVote={onVote}
                user={user}
                voteCount={voteCount}
            />
        </Dialog>
    );
}
