import { z } from "zod";

export const FriendRequestSchema = z.object({
     id: z.number(),
     requesterId: z.number(),
     recipientId: z.number(),
     status: z.enum(['pending', 'accepted', 'rejected']),
     createdAt: z.date(),
     updatedAt: z.date(),
   });

export const CreateFriendRequestBodySchema = z.object({
     recipientEmail: z.string(),
});

export const UpdateFriendRequestBodySchema = z.object({
     status: z.enum(['accepted', 'rejected']),
});

export const FriendRequestResSchema = FriendRequestSchema.extend({
     requesterName: z.string(),
     requesterAvatarUrl: z.string().nullable(),
});

export type CreateFriendRequestBodyType = z.infer<
     typeof CreateFriendRequestBodySchema
>;
export type UpdateFriendRequestBodyType = z.infer<
     typeof UpdateFriendRequestBodySchema
>;
export type FriendRequestResType = z.infer<typeof FriendRequestResSchema>;