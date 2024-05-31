import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Image from "next/image";

export default function PreviewGameImagePage({ image }: { image: string | null }): JSX.Element | null {
    return image && image.length > 0 ? (
        <Dialog>
            <DialogTrigger className="w-full">
                <Image
                    src={image}
                    alt={"game"}
                    width={20000000}
                    height={20000000}
                    className="w-full md:w-[400px] h-96 object-center object-cover rounded-xl"
                />
            </DialogTrigger>
            <DialogContent>
                <Image src={image} alt="Game image" width={1000} height={1000} className="rounded-xl" />
            </DialogContent>
        </Dialog>
    ) : null;
}
