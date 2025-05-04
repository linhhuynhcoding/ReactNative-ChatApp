import { z } from 'zod';

// === DEFINE SCHEMAS === //

// 1. MessagePacketSchema
export const MessagePacketSchema = z.object({
     roomType: z.union([z.literal('conversation'), z.literal('group')]),
     roomId: z.number(),
     content: z.string(),
});

// === DEFINE TYPES === //

// 1. MessagePacket
export type MessagePacket = z.infer<typeof MessagePacketSchema>;