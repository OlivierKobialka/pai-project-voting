import { NextResponse } from "next/server";
import connect from "../../../db";
import { Game } from "../../../db/schema";

export async function GET(request: Request) {
    await connect();

    const categories = await Game.distinct("category");

    return NextResponse.json({ success: true, categories });
}
