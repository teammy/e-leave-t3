import { type RouterOutput } from "~/server/api/root";
import type * as z from "zod";
import { type addLeaveData,type updateLeaveData } from "~/features/leaves/helpers/validators";

export type LeaveItem = RouterOutput["leave"]["list"]["number"];
export type LeaveDetail = RouterOutput["leave"]["byId"];

export type AddLeaveInput = z.infer<typeof addLeaveData>;
export type UpdateLeaveInput = z.infer<typeof updateLeaveData>;
