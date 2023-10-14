import { z } from "zod";

export const createNewEventFormSchema = z.object({
  eventName: z
    .string()
    .min(1, "入力必須項目です。")
    .max(20, "20文字以内で入力してください。"),
  memo: z.string().max(200, "最大200文字以内で入力してください."),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  members: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, "入力必須項目です。")
          .max(20, "20文字以内で入力してください。"),
        ratio: z.number().min(1, "1以上の数字を入力してください."),
      })
    )
    .min(2, "ユーザー数は合計2人以上を指定してください.")
    .refine(
      (data) => {
        const names = data.map((item) => item.name);
        return new Set(names).size === names.length;
      },
      {
        message: "重複したユーザー名を使用することはできません。",
      }
    ),
  moneyUnit: z.union([
    z.literal("1"),
    z.literal("10"),
    z.literal("100"),
    z.literal("1000"),
  ]),
});

export type CreateNewEventFormSchemaType = z.infer<
  typeof createNewEventFormSchema
>;

export const newEventFormSchema = createNewEventFormSchema.extend({
  eventId: z.string().min(1, "入力必須項目です。"),
});