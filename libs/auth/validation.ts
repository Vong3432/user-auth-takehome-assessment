import z from 'zod';

export const authSignUpSchema = z.object({
  name: z.string({ error: 'Name is required.' }),
  email: z.email({ error: 'Invalid email address.' }),
  password: z
    .string({ error: 'Password is required.' })
    .min(6, { error: 'Password must be at least 6 characters.' }),
});

export const authLoginSchema = authSignUpSchema.omit({ name: true });
