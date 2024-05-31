import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Image from "next/image";

export default function PreviewGameImageAdmin({ image }: { image: string }): JSX.Element | null {
    return image && image.length > 0 ? (
        <Dialog>
            <DialogTrigger>
                <Button className="vote__button w-10 p-0 cursor-pointer">
                    <Eye size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Image src={image} alt="Game image" width={1000} height={1000} className="rounded-xl" />
            </DialogContent>
        </Dialog>
    ) : null;
}
