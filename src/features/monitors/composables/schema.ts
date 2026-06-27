import { z } from "zod";

export const monitorSchema = z.object({
	name: z.string().min(1, "Name is required"),
	url: z.string().url("Please enter a valid URL"),
});

export type MonitorInput = z.infer<typeof monitorSchema>;
