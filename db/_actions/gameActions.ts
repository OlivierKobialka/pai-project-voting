"use server";

import connect from "..";
import { Game } from "../schema";
import { IGame } from "../../types";

export async function getGames(): Promise<IGame[] | void> {
    try {
        await connect();

        return await Game.find();
    } catch (error) {
        console.log(error);
    }
}

export async function getGamesByCategory(category: string): Promise<IGame[] | void> {
    try {
        await connect();

        return await Game.find({ category });
    } catch (error) {
        console.log(error);
    }
}

export async function getGameById(id: string) {
    try {
        await connect();

        return await Game.findById(id);
    } catch (error) {
        console.log(error);
    }
}

export async function createGame(game: IGame) {
    try {
        await connect();

        return await Game.create(game);
    } catch (error) {
        console.log(error);
    }
}
