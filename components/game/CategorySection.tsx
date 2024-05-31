"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CustomJwtPayload, GameCategory, IExtendedGame, IGame } from "../../types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Game from "./Game";
import { useToast } from "../ui/use-toast";

export default function CategorySection({
    category,
    isSignedIn,
    loggedInUser,
    name,
    email,
    without,
    titlePrefix,
}: {
    category: GameCategory | string;
    isSignedIn: boolean | undefined;
    loggedInUser: CustomJwtPayload | null;
    name: string;
    email: string | undefined;
    without?: IGame["path_name"];
    titlePrefix?: boolean;
}): JSX.Element {
    const [games, setGames] = useState<IGame[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const [vote, setVote] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/get-game");
                setGames(response.data.games);
                toast({
                    title: "Success",
                    description: "Games fetched successfully",
                });
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch games",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [category]);

    const handleVote = async (gameName: string): Promise<void> => {
        setVote(gameName);
        try {
            setLoading(true);
            await axios.post("/api/vote", {
                name,
                email,
                vote: gameName,
            });
            setHasVoted(true);
            toast({
                title: "Zagłosowano!",
                description: "Dziękujemy za oddanie głosu!",
            });
        } catch (error) {
            toast({
                title: "Błąd",
                description: "Nie udało się oddać głosu",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };
    const filteredGames = isSignedIn
        ? games.filter((game: IGame) => game.category === category && game.path_name !== without)
        : games;

    return (
        <main className="w-full mb-10 px-10">
            <h1 className="text-2xl font-bold pb-3">
                {titlePrefix && <span>Podobne</span>} {category.toUpperCase()}&apos;S
            </h1>
            <ScrollArea className="flex flex-row overflow-x-auto scrollbar-hide">
                <div className="flex w-max space-x-4 py-3">
                    {loading ? (
                        <p>Loading...</p>
                    ) : filteredGames.length === 0 ? (
                        <div className="font-bold w-screen flex items-center justify-center pt-20">
                            Brak gier w tej kategorii
                        </div>
                    ) : (
                        filteredGames.map(
                            (game: IExtendedGame): JSX.Element => (
                                <Game
                                    key={game.path_name}
                                    {...game}
                                    hasVoted={hasVoted}
                                    onVote={handleVote}
                                    user={loggedInUser}
                                />
                            ),
                        )
                    )}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </main>
    );
}
