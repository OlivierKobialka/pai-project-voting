import { NextResponse } from "next/server";
import connect from "@db/index";
import { Game } from "@db/schema";

export const revalidate = 1;
export async function GET(request: Request) {
    await connect();
    const games = await Game.find({});
    return NextResponse.json({ success: true, games });
}
