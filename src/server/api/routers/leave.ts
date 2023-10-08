import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as validators from "~/features/leaves/helpers/validators";
import { TRPCError } from "@trpc/server";

export const leaveRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const leaves = await ctx.db.leave.findMany({
      select: {
        id: true,
        reason: true,
        startLeaveDate: true,
        endLeaveDate: true,
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return leaves;
  }),
  update: publicProcedure
    .input(validators.updateLeaveData)
    .mutation(async ({ ctx, input }) => {
      const leave = await ctx.prisma.leave.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
      return leave;
    }),
  add: publicProcedure.input(validators.addLeaveData).mutation(async ({ ctx, input }) => {
    const leave = await ctx.prisma.leave.create({
      data: {
        ...input,
        userId: 1,
        },
    });
    return leave;
  }),
  byId: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const leave = await ctx.prisma.leave.findUnique({
      where: {
        id: input,
      },
      select: {
        id: true,
        reason: true,
        startLeaveDate: true,
        endLeaveDate: true,
      },
    });
    if (!leave) throw new TRPCError({ code: "NOT_FOUND", message: "Leave not found" })
    return leave;
  }),
});
