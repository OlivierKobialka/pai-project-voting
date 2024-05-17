import connect from "@db/index";
import { Vote } from "@db/schema";
import { NextResponse } from "next/server";

export const revalidate = 1;
export async function GET() {
    await connect();
    const votes = await Vote.find({});
    return NextResponse.json({ success: true, votes });
}
