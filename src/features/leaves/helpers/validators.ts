import * as z from 'zod';

export const addLeaveData = z.object({
  startLeaveDate: z.string(),
  endLeaveDate: z.string(),
  reason: z.string(),
}); 

export const updateLeaveForm = addLeaveData.partial();

export const updateLeaveData = z.object({
  id: z.number(),
  data: updateLeaveForm,
});