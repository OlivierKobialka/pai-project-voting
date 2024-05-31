"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CustomJwtPayload, IExtendedGame, IGame } from "../../types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Game from "./Game";
import { useToast } from "../ui/use-toast";

export default function CategorySection({
    category,
    isSignedIn,
    loggedInUser,
    name,
    email,
}: {
    category: string;
    isSignedIn: boolean | undefined;
    loggedInUser: CustomJwtPayload | null;
    name: string;
    email: string | undefined;
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
        } catch (error) {
            console.error("Nie udało się oddać głosu", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full mb-10 px-0">
            <h1 className="text-2xl font-bold pb-3 px-5 sm:px-10">{category.toUpperCase()}</h1>
            <ScrollArea className="flex flex-row overflow-x-auto scrollbar-hide">
                <div className="flex w-max space-x-7 py-3 mx-3">
                    {isSignedIn && !loading
                        ? games
                              .filter((game: IGame) => game.category === category)
                              .map(
                                  (game: IExtendedGame): JSX.Element => (
                                      <Game
                                          key={game.name}
                                          {...game}
                                          hasVoted={hasVoted}
                                          onVote={handleVote}
                                          user={loggedInUser}
                                      />
                                  ),
                              )
                        : games.map((game: IGame): JSX.Element => <Game key={game.name} {...game} />)}
                </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </main>
    );
}
