import connect from "@db/index";
import { Game } from "@db/schema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await connect();

    const categories = await Game.distinct("category");

    return NextResponse.json({ success: true, categories });
}
