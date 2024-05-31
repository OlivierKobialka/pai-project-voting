import { NextResponse } from "next/server";
import { Game, Vote } from "@db/schema";
import connect from "@db/index";

export const revalidate = 1;
export async function POST(request: Request) {
    await connect();
    const { name, email, vote } = await request.json();
    const usersVote = new Vote({ name, email, vote });
    await usersVote.save();

    const game = await Game.findOne({ path_name: vote });
    game.votes += 1;

    return NextResponse.json({ success: true });
}
