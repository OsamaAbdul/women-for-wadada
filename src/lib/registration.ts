import * as z from "zod";

export const OCCUPATIONS = [
  "Student",
  "Civil Servant",
  "Entrepreneur",
  "Artisan",
  "Farmer",
  "Unemployed",
  "Other",
] as const;

export const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const imageFile = (label: string) =>
  z
    .instanceof(File, { message: `${label} is required` })
    .refine((file) => file.size <= MAX_UPLOAD_BYTES, `${label} must be 2MB or smaller`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      `${label} must be a JPG, PNG or WebP image`,
    );

export const registrationFormSchema = z
  .object({
    fullname: z.string().trim().min(2, "Full name must be at least 2 characters").max(120),
    gender: z.literal("Female", { errorMap: () => ({ message: "Gender must be Female" }) }),
    phone: z.string().regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
    age: z.coerce
      .number()
      .min(18, "You must be at least 18 years old")
      .max(40, "You must be at most 40 years old"),
    lga: z.string().min(1, "LGA is required"),
    ward: z.string().min(1, "Ward is required"),
    pollingUnit: z.string().min(1, "Polling Unit is required"),
    votersCardNumber: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z0-9]{19}$/, "Voter's Card Number must be exactly 19 letters or numbers"),
    occupation: z
      .string()
      .refine((value) => (OCCUPATIONS as readonly string[]).includes(value), {
        message: "Occupation is required",
      }),
    otherOccupation: z.string().max(100).optional(),
    votersCardFile: imageFile("Voter's Card Image"),
    pictureFile: imageFile("Passport Picture"),
  })
  .refine((data) => data.occupation !== "Other" || !!data.otherOccupation?.trim(), {
    message: "Please specify your occupation",
    path: ["otherOccupation"],
  });

export type RegistrationFormInput = z.input<typeof registrationFormSchema>;
export type RegistrationFormValues = z.output<typeof registrationFormSchema>;
