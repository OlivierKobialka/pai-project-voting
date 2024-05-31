import Link from "next/link";
import { Button } from "../ui/button";

export default function GamePageDescriptionSection({
    name,
    description,
    category,
    date,
    website,
    voteCount,
    user,
    hasVoted,
    handleVote,
}: {
    name: string;
    description: string;
    category: string;
    date: string;
    website: string;
    voteCount: number | undefined;
    user: string | undefined;
    hasVoted: boolean;
    handleVote: (gameName: string) => Promise<void>;
}) {
    return (
        <section className="h-full flex flex-col items-start justify-between w-full">
            <section>
                <h1 className="text-3xl font-bold">{name}</h1>
                <p className="text-lg text-zinc-700">{description}</p>
                <p className="text-lg">
                    Kategoria: <span className="font-bold">{category}</span>
                </p>
                <Link href={website ?? ""} className="text-blue-500 hover:text-blue-700">
                    Strona gry
                </Link>
                <p className="text-sm sm:text-base text-gray-500">
                    Data premiery: <span className="font-semibold">{new Date(date ?? "").toLocaleDateString()}</span>
                </p>
                <p>
                    Głosy: <span className="font-semibold">{voteCount ?? 0}</span>
                </p>
            </section>

            <section className="w-full pt-10">
                {user && !hasVoted ? (
                    <Button onClick={() => handleVote(name)} className="vote__button">
                        Oddaj głos
                    </Button>
                ) : hasVoted ? (
                    <Button className="bg-[#0CC38B] w-full flex items-center justify-center text-center hover:opacity-80 duration-500 transition-all ease-in-out text-white font-bold py-1 sm:py-2 md:py-3 px-3 sm:px-4 rounded-2xl mr-2 hover:shadow-lg">
                        Dziękujemy za oddanie głosu!
                    </Button>
                ) : (
                    <Link className="vote__button" href="/sign-in">
                        Zaloguj się, aby oddać głos
                    </Link>
                )}
            </section>
        </section>
    );
}
