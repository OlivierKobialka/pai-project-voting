import Image from "next/image";
import { DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";
import { IExtendedGame } from "../../types";

export default function GameModal({
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
        <DialogContent>
            <div className="rounded-xl w-full h-full shadow-md cursor-pointer p-0 m-0 bg-white">
                <Image width={100000} height={100000000} className="game__card__modal__image" src={image} alt={name} />
                <div className="w-full p-3 flex flex-col items-start justify-between">
                    <div className="pb-3">
                        <Link href={`/g/${name}`} className="text-xl sm:text-2xl font-bold hover:underline text-left">
                            {name}
                        </Link>
                        <p className="text-sm md:text-base text-gray-500 hover:underline text-left">{description}</p>
                        <Link href={website} className="text-blue-500 hover:text-blue-700">
                            Strona gry
                        </Link>
                        <p className="text-sm sm:text-base text-gray-500">
                            Kategoria: <span className="font-semibold">{category.toUpperCase()}</span>
                        </p>
                        <p className="text-sm sm:text-base text-gray-500">
                            Data premiery: <span className="font-semibold">{new Date(data).toLocaleDateString()}</span>
                        </p>
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
            </div>
        </DialogContent>
    );
}
