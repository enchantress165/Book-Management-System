// export class PlaceBidDto {
//     bidderName!: string;
//     amount!: number;
// }

import { z } from 'zod';

export const PlaceBidSchema = z.object({
  bidderName: z
    .string()
    .min(3),

  amount: z
    .number()
    .positive(),
});

export type PlaceBidDto = z.infer<
  typeof PlaceBidSchema
>;