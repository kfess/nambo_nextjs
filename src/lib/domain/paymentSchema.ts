import { z } from "zod";

export const createPaymentSchema = z.object({
  eventId: z.string().min(1, "入力必須事項です。"),
  paymentId: z.string().length(0), // DB で自動生成されるので、ここでは指定しない
  purpose: z.string().trim().min(1, "入力必須事項です。"),
  payer: z.string().trim().min(1, "入力必須事項です。"),
  payees: z.array(z.string()).min(1, "少なくとも誰か一人を指定してください。"),
  cost: z
    .number()
    .int("整数値を入力してください。")
    .min(1, "0より大きい数を入力してください。")
    .max(1000000000, "入力された金額が大き過ぎます。"),
});

export type CreatePaymentType = z.infer<typeof createPaymentSchema>;

export const paymentSchema = createPaymentSchema.extend({
  paymentId: z.string().min(1, "入力必須事項です。"),
});

export type PaymentType = z.infer<typeof paymentSchema>;
