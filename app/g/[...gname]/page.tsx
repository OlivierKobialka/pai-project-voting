"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "../../../components/ui/use-toast";
import { IGame } from "../../../types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { useUser } from "@clerk/nextjs";
import CategorySection from "../../../components/game/CategorySection";
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog";
import PreviewGameImagePage from "../../../components/constants/PreviewGameImagePage";
import GamePageDescriptionSection from "../../../components/constants/GamePageDescriptionSection";

export default function Page() {
    const { isSignedIn, user } = useUser();
    const [game, setGame] = useState<IGame | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [vote, setVote] = useState<string | null>(null);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const { gname } = useParams();
    const { toast } = useToast();
    const path_name: string = gname.toString();
    const name = user?.firstName || user?.username || `user_${Math.floor(Math.random() * 1000)}`;
    const email = user?.primaryEmailAddress?.emailAddress;

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/game/single?path_name=${path_name}`);
                setGame(response.data.game);
                toast({
                    title: "Success",
                    description: "Game fetched successfully",
                });
            } catch (error) {
                toast({
                    title: "Error",
                    description: `Failed to fetch game (${path_name})`,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [path_name, toast]);

    const handleVote = async (gameName: string): Promise<void> => {
        setVote(gameName);
        try {
            setLoading(true);
            await axios.post("/api/vote", {
                name,
                email,
                vote: game?.path_name,
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

    return (
        <div>
            {loading ? (
                <div className="w-screen h-96 flex items-center justify-center font-bold text-2xl">Loading...</div>
            ) : (
                <main className="p-10 flex-col h-full flex md:flex-row gap-y-5 md:gap-y-0 md:gap-x-5 w-screen md:items-start">
                    <PreviewGameImagePage image={game?.image ?? null} />
                    <GamePageDescriptionSection
                        name={game?.name ?? ""}
                        description={game?.description ?? ""}
                        category={game?.category ?? ""}
                        date={game?.date ?? ""}
                        website={game?.website ?? ""}
                        voteCount={game?.voteCount ?? 0}
                        user={email ?? ""}
                        hasVoted={hasVoted}
                        handleVote={handleVote}
                    />
                </main>
            )}

            <section className="hidden md:block w-screen h-full">
                <CategorySection
                    category={game?.category ?? ""}
                    isSignedIn={isSignedIn}
                    loggedInUser={user || null}
                    email={email}
                    name={name}
                    without={game?.path_name}
                    titlePrefix={true}
                />
            </section>
        </div>
    );
}
