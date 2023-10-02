import * as z from 'zod';

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
});

