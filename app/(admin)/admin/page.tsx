"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PreviewGameImage from "../../../components/constants/PreviewGameImage";
import { Button } from "../../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { FormSchema } from "../../../lib/validators/formSchema";
import { Undo2 } from "lucide-react";
import { CustomJwtPayload } from "../../../types";

export default function Admin(): JSX.Element {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const token: string | null = localStorage.getItem("token");

        if (token) {
            const decoded: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);

            if (decoded.admin) {
                setIsAdmin(true);
            }
        }
    }, []);

    const onSubmit = async (): Promise<void> => {
        try {
            await axios.post("/api/add-game", {
                name: form.getValues("name"),
                description: form.getValues("description"),
                category: form.getValues("category"),
                date: form.getValues("date"),
                website: form.getValues("website"),
                image: form.getValues("image"),
            });

            form.reset();
        } catch (error) {
            console.error(error);
        }
    };
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            category: "",
            description: "",
            date: "",
            website: "",
            image: "",
        },
    });

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <p className="text-3xl font-bold mb-4 text-black px-20 text-center">
                    Please log in as an admin to access this page
                </p>
                <Button onClick={() => window.history.back()} className="vote__button w-32 gap-x-2">
                    Go back <Undo2 size={20} />
                </Button>
            </div>
        );
    }

    return (
        <main className="w-screen flex flex-col p-10">
            <h1 className="text-3xl font-bold">Add your own game!</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col space-y-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        autoCorrect="off"
                                        type="text"
                                        placeholder="Your game name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Your game description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        autoCorrect="off"
                                        type="text"
                                        placeholder="Your game description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        autoCorrect="off"
                                        type="date"
                                        placeholder="Your game description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        autoCorrect="off"
                                        type="link"
                                        placeholder="Your game website link"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <section>
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <section className="w-full flex items-center justify-between gap-x-1">
                                        <FormControl>
                                            <Input
                                                autoComplete="off"
                                                autoCorrect="off"
                                                type="link"
                                                placeholder="Your game image link"
                                                {...field}
                                            />
                                        </FormControl>
                                        <PreviewGameImage image={form.getValues("image")} />
                                    </section>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>

                    <Button type="submit" className="vote__button duration-300 ease-in-out transition-all transform">
                        Add game
                    </Button>
                </form>
            </Form>
        </main>
    );
}
