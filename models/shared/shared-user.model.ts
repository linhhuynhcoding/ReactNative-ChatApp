import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(6).max(100),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserResDTO = UserSchema.omit({ password: true });

export const FindProfileResDTO = UserSchema.extend({
  friendOf: z.unknown().array().optional(),
  friends: z.unknown().array().optional(),
});

export type UserType = z.infer<typeof UserSchema>;
export type UserResDTOType = z.infer<typeof UserResDTO>;
export type FindProfileResDTOType = z.infer<typeof FindProfileResDTO>;