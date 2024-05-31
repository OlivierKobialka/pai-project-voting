"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "../../../components/ui/use-toast";
import { IGame } from "../../../types";

export default function Page() {
    const [game, setGame] = useState<IGame | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { gname } = useParams();
    const { toast } = useToast();

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/game/single", {
                    data: { name: gname },
                });
                setGame(response.data.games);
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
    }, [game]);

    return <div>{game?.name}</div>;
}
