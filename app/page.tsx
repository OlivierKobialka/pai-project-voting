"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import CategorySection from "../components/game/CategorySection";
import { CustomJwtPayload, IVote } from "../types";

export default function Home(): JSX.Element {
    const { isSignedIn, user } = useUser();
    const name = user?.firstName || user?.username || `user_${Math.floor(Math.random() * 1000)}`;
    const email = user?.primaryEmailAddress?.emailAddress;
    const [votes, setVotes] = useState([]);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<CustomJwtPayload | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchGameCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/get-game-categories");
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Nie udało się pobrać kategorii gier", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode<CustomJwtPayload>(token);
            setLoggedInUser(decoded);
        }

        fetchGameCategories();
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

    return (
        <main className="w-screen py-10 flex flex-col items-center justify-between">
            {loading && (
                <div className="w-screen flex items-center justify-center text-center font-semibold text-3x pt-40">
                    Loading...
                </div>
            )}
            {categories.map((category: string) => (
                <CategorySection
                    key={category}
                    category={category}
                    isSignedIn={isSignedIn}
                    name={name}
                    email={email}
                    loggedInUser={loggedInUser}
                />
            ))}
        </main>
    );
}
