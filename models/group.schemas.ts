import { z } from "zod";

export const CreateGroupBodySchema = z.object({
     name: z.string().min(1),
     description: z.string().default('New Group'),
     avatarUrl: z
          .string()
          .default(
               'https://i.pinimg.com/736x/9c/17/6f/9c176f461b01c2e6396d25e7107719ce.jpg',
          ),
     members: z.number().array(),
});

export type CreateGroupBodyDTO = z.infer<typeof CreateGroupBodySchema>;
