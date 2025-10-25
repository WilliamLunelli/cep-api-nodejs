import { z } from 'zod';

export const consultarCepSchema = z.object({
  body: z.object({
    cep: z
      .string()
      .min(8, 'CEP deve ter no mínimo 8 caracteres')
      .max(10, 'CEP deve ter no máximo 10 caracteres')
      .regex(/^[0-9-]+$/, 'CEP deve conter apenas números e traço'),
  }),
});

export type ConsultarCepInput = z.infer<typeof consultarCepSchema>;
