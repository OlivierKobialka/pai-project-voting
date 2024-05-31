import connect from "@db/index";
import { Game } from "@db/schema";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export const revalidate = 1;
export async function POST(request: Request) {
    await connect();

    const requestBody = await request.text();
    if (!requestBody) {
        return NextResponse.json({ error: "Failed req due to params" }, { status: 400 });
    }

    const { name, description, image, website, category, date } = JSON.parse(requestBody);
    const game = new Game({ name, description, image, website, category, date });

    await game.save();
    return NextResponse.json({ message: `Game ${name} was added at ${format(new Date(date), "dd/MM/yyyy")}` });
}
