"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { BRAND_NAME } from "../lib/utils";
import { CustomJwtPayload } from "../types";
import AdminBtn from "./constants/AdminBtn";
import LoginBtn from "./constants/LoginBtn";

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
        <header className="bg-[#341F6A] text-white w-screen py-4 px-6 lg:py-7 lg:px-14 flex justify-between items-center">
            <div className="flex font-bold uppercase text-2xl items-center">{BRAND_NAME}</div>
            <div>
                {!loggedInUser && <LoginBtn />}
                {loggedInUser?.admin && <AdminBtn />}
            </div>
        </header>
    );
}
