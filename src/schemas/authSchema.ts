import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, 'Username deve ter no mínimo 3 caracteres')
      .max(50, 'Username deve ter no máximo 50 caracteres'),
    password: z
      .string()
      .min(6, 'Password deve ter no mínimo 6 caracteres')
      .max(100, 'Password deve ter no máximo 100 caracteres'),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
