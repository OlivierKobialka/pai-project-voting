"use server";

import connect from "..";
import { Game } from "../schema";

export async function vote(id: string): Promise<void> {
    try {
        await connect();

        await Game.findByIdAndUpdate(id, { $inc: { voteCount: 1 } });
    } catch (error) {
        console.log(error);
    }
}
