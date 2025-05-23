import { z } from 'zod';

// === DEFINE SCHEMAS === //

// 1. MessagePacketSchema
export const MessagePacketSchema = z.object({
     roomType: z.union([z.literal('conversation'), z.literal('group')]),
     roomId: z.number(),
     content: z.string(),
});

// 2. MessageSchema
export const MessageSchema = z.object({
     id: z.number(),
     content: z.string(),
     senderId: z.number(),
     createdAt: z.string().datetime(), 
     updatedAt: z.string().datetime(),
     groupId: z.number().nullable(),
     conversationId: z.number(),
     sender: z.object({
          id: z.number(),
          name: z.string(),
          avatarUrl: z.string().nullable(),
     }),
});

// 3. MessageBlockSchema
export const MessageBlockSchema = z.object({
     senderId: z.number(),
     senderName: z.string(),
     senderAvt: z.string().nullable(),
     sentTime: z.string().datetime(), 
     messages: MessageSchema.array().nullable(),
})

// 4. MessageResSchema
export const MessageResSchema = MessageSchema.extend({
     senderName: z.string(),
});

// === DEFINE TYPES === //

// 1. MessagePacket
export type MessagePacket = z.infer<typeof MessagePacketSchema>;
// 2. Message
export type Message = z.infer<typeof MessageSchema>;
// 3. MessageBlock
export type MessageBlock = z.infer<typeof MessageBlockSchema>;
// 4. MessageRes
export type MessageRes = z.infer<typeof MessageResSchema>;
