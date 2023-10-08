import { registerValidator } from '~/features/auth/helpers/validators';
import { createTRPCRouter,publicProcedure } from '../trpc';
import bcrypt from 'bcryptjs';

export const authRouter = createTRPCRouter({
  register : publicProcedure
  .input(registerValidator)
  .mutation(async ({ input, ctx }) => {
    const hashedPassword = await bcrypt.hash(input.password, 12);
    const user = await ctx.prisma.user.create({
      data: {
        ...input,
        password: hashedPassword,
      },
    });
    return user;
  }),
});