import type * as z from 'zod';
import { type loginValidator , type registerValidator } from './helpers/validators';

export type LoginInput = z.infer<typeof loginValidator>;

export type RegisterInput = z.infer<typeof registerValidator>;