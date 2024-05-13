import { NextResponse } from "next/server";
import connect from "../../../db";
import Vote from "../../../db/schema/Vote";

export const revalidate = 1;
export async function GET() {
    await connect();
    const votes = await Vote.find({});
    return NextResponse.json({ success: true, votes });
}
