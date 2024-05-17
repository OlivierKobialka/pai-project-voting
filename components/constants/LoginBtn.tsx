import Link from "next/link";
import { Button } from "../ui/button";

export default function LoginBtn() {
    return (
        <Button className="bg-[#0CC38B] w-full flex items-center justify-center text-center hover:opacity-80 duration-500 transition-all ease-in-out text-white font-bold py-1 sm:py-2 md:py-3 px-3 sm:px-4 rounded-2xl mr-2 hover:bg-white hover:text-[#0CC38B] hover:shadow-lg">
            <Link href={"/sign-in"}>Sign In</Link>
        </Button>
    );
}
