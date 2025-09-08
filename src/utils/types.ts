import { z } from "zod";

export const furiousSchema = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  ordinal: z.number().min(0).nullable(),
});

export type Furious = z.infer<typeof furiousSchema>;

export type DateRange = {
  start: Date;
  end: Date;
};

export const appConfigSchema = z
  .object({
    start_date: z.coerce.date(),
    meeting_url: z.url(),
    weeks_size: z.number(),
  })
  .transform((data) => ({
    startDate: data.start_date,
    meetingUrl: data.meeting_url,
    weeksSize: data.weeks_size,
  }));

export type AppConfig = z.infer<typeof appConfigSchema>;

export const authCredentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type AuthCredentials = z.infer<typeof authCredentialsSchema>;
