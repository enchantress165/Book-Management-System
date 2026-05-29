// export class CreateBookDto {
//     title! : string;
//     author!: string;
//     category! :string;
// }

import { z } from 'zod';

export const CreateBookSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters'),

  author: z
    .string()
    .min(3, 'Author name is required'),

  category: z
    .string()
    .min(2, 'Category is required'),
});

export type CreateBookDto = z.infer<
  typeof CreateBookSchema
>;