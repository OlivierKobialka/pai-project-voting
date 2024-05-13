"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Game } from "../components";
import { CustomJwtPayload, IGame, IVote } from "../types";

export default function Home() {
    const { isSignedIn, user } = useUser();
    const name = user?.firstName || user?.username || `user_${Math.floor(Math.random() * 1000)}`;
    const email = user?.primaryEmailAddress?.emailAddress;
    const [votes, setVotes] = useState([]);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const [games, setGames] = useState<IGame[]>([]);
    const [vote, setVote] = useState("");
    const [loggedInUser, setLoggedInUser] = useState<CustomJwtPayload | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode<CustomJwtPayload>(token);
            setLoggedInUser(decoded);
        }
        const fetchGames = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/get-game");
                setGames(response.data.games);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/get-vote");
                setVotes(response.data.votes);
                const voted = response.data.votes.some((vote: IVote) => vote.email === email);
                setHasVoted(voted);
            } catch (error) {
                console.error("Nie udało się pobrać danych o głosach", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVotes();
    }, [email]);

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
        <div className="main-container">
            <main className="flex flex-wrap justify-center">
                {isSignedIn
                    ? games.map((game) => (
                          <Game
                              key={game.nazwa}
                              {...game}
                              hasVoted={hasVoted}
                              onVote={handleVote}
                              user={loggedInUser}
                          />
                      ))
                    : games.map((game: IGame) => <Game key={game.nazwa} {...game} />)}
            </main>
        </div>
    );
}
