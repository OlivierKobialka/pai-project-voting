import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import RegisterLayout from "../../../components/RegisterLayout";

export default function SignInPage() {
    return (
        <RegisterLayout>
            <SignIn path="/sign-in" routing="path" />
        </RegisterLayout>
    );
}
