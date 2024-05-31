import { NextResponse } from "next/server";
import connect from "@db/index";
import { Game } from "@db/schema";

export const revalidate = 1;
export async function GET(request: Request) {
    await connect();
    const requestBody = await request.text();
    if (!requestBody) {
        return NextResponse.json({ error: "Failed req due to params" }, { status: 400 });
    }

    const { name } = JSON.parse(requestBody);
    const game = await Game.findOne({ name });
    if (!game) {
        return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, game });
}
