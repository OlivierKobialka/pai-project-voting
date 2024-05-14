import { SignUp } from "@clerk/nextjs";
import RegisterLayout from "../../../components/RegisterLayout";

export default function SignIn() {
    return (
        <RegisterLayout>
            <SignUp path="/sign-up" />
        </RegisterLayout>
    );
}
