import { NextResponse } from "next/server";
import connect from "@db/index";
import { Game } from "@db/schema";
import { IGame } from "../../../../types";

export const revalidate = 1;

export async function GET(request: Request): Promise<
    NextResponse<{
        success: boolean;
        game: IGame | null;
        error: string | null;
    }>
> {
    await connect();

    const url = new URL(request.url);
    const name = url.searchParams.get("path_name");

    if (!name) {
        return NextResponse.json({ success: false, game: null, error: "Failed req due to params" }, { status: 400 });
    }

    const game: IGame | null = await Game.findOne({ path_name: name });
    if (!game) {
        return NextResponse.json({ success: false, game: null, error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, game: game, error: null });
}
