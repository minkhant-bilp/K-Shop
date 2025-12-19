// import { z } from "zod";

// export const SignUpFormSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   dob: z.date().refine((date) => date <= new Date(), {
//     message: "Date of birth must be in the past",
//   }),
//   email: z.string().trim().pipe(z.string().email("Invalid email format")),
//   phoneNumber: z.string().pipe(z.string().min(1, "Phone number is required")),
//   gender: z.enum(["Male", "Female"], {
//     message: "Gender is required",
//   }),
//   city: z.string().min(1, "City is required"),
//   township: z.string().min(1, "Township is required"),
// });

// export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;