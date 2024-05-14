"use client";

import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomJwtPayload } from "../types";
import { Button } from "./ui/button";

export default function Header() {
    const [loggedInUser, setLoggedInUser] = useState<CustomJwtPayload | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode<CustomJwtPayload>(token);
            setLoggedInUser(decoded);
        }
    }, []);

    return (
        <header className="bg-[#341F6A] text-white py-2 sm:py-4 px-3 sm:px-6 flex justify-between items-center">
            <div className="flex font-bold uppercase text-2xl items-center">Poller</div>
            <div>
                {!loggedInUser && (
                    <Button className="bg-[#0CC38B] hover:opacity-80 duration-500 transition-all ease-in-out text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded mr-2">
                        <Link href={"/sign-in"}>Sign In</Link>
                    </Button>
                )}
                {loggedInUser?.admin && (
                    <Button className="bg-[#0CC38B] hover:opacity-80 duration-500 transition-all ease-in-out text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded mr-2">
                        <Link href={"/admin"}>Admin</Link>
                    </Button>
                )}
            </div>
        </header>
    );
}
