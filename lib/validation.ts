import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name muss mindestens 2 Zeichen lang sein')
    .max(100, 'Name darf maximal 100 Zeichen lang sein'),

  email: z.string()
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),

  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\d\s\+\-\(\)]+$/.test(val), {
      message: 'Bitte geben Sie eine gültige Telefonnummer ein'
    }),

  service: z.string()
    .optional(),

  message: z.string()
    .min(10, 'Nachricht muss mindestens 10 Zeichen lang sein')
    .max(5000, 'Nachricht darf maximal 5000 Zeichen lang sein'),

  privacy: z.boolean()
    .refine((val) => val === true, {
      message: 'Sie müssen die Datenschutzerklärung akzeptieren'
    }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
