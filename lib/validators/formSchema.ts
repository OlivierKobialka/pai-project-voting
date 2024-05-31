import { z } from "zod";

export const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Game name must be at least 2 characters.",
    }),
    description: z.string().min(20, {
        message: "Description must be at least 20 characters.",
    }),
    category: z.string().min(2, {
        message: "Category must be at least 2 characters.",
    }),
    date: z.string().date(),
    website: z.string().url({
        message: "Invalid URL format.",
    }),
    image: z.string().url({
        message: "Invalid URL format.",
    }),
});
