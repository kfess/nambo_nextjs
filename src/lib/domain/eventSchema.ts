import { z } from "zod";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

// event 作成用のスキーマ
export const createEventSchema = z
  .object({
    eventId: z.string().length(0), // 作成時は eventId は空文字列
    eventName: z
      .string()
      .min(1, "入力必須項目です。")
      .max(20, "20文字以内で入力してください。"),
    memo: z.string().max(200, "最大200文字以内で入力してください.").optional(),
    fromDate: z
      .string()
      .refine((val) => dayjs(val, "YYYY-MM-DD").isValid(), {
        message: "日付の形式が正しくありません。",
      })
      .transform((val) => dayjs(val).format("YYYY-MM-DDT00:00:00.000Z")),
    toDate: z
      .string()
      .refine((val) => dayjs(val, "YYYY-MM-DD").isValid(), {
        message: "日付の形式が正しくありません。",
      })
      .transform((val) => dayjs(val).format("YYYY-MM-DDT00:00:00.000Z")),
    members: z
      .array(
        z.object({
          memberId: z.string().optional(),
          name: z
            .string()
            .min(1, "入力必須項目です。")
            .max(20, "20文字以内で入力してください。")
            .transform((str) => str.trim()),
          ratio: z.number().min(1, "1以上の数字を入力してください."),
        })
      )
      .refine(
        (data) => {
          const validNames = data.filter((item) => item.name.trim().length > 0);
          return validNames.length >= 2;
        },
        { message: "2 人以上のユーザーを指定してください。" }
      )
      .refine(
        (data) => {
          const names = data.map((item) => item.name.trim().toLowerCase());
          return new Set(names).size === names.length;
        },
        { message: "重複したユーザー名を使用することはできません。" }
      ),
    moneyUnit: z.union([
      z.literal("1"),
      z.literal("10"),
      z.literal("100"),
      z.literal("1000"),
    ]),
  })
  .refine(
    ({ fromDate, toDate }) => dayjs(toDate).isSameOrAfter(dayjs(fromDate)),
    {
      message: "終了日は開始日より後の日付を指定してください。",
      path: ["toDate"],
    }
  );

export type CreateEventType = z.infer<typeof createEventSchema>;

// 作成した event のスキーマ
export const eventSchema = z
  .object({
    eventId: z.string().min(1, "入力必須項目です。"),
    eventName: z
      .string()
      .min(1, "入力必須項目です。")
      .max(20, "20文字以内で入力してください。"),
    memo: z.string().max(200, "最大200文字以内で入力してください.").optional(),
    fromDate: z.string().refine((val) => dayjs(val).isValid(), {
      message: "日付の形式が正しくありません。",
    }),
    toDate: z.string().refine((val) => dayjs(val).isValid(), {
      message: "日付の形式が正しくありません。",
    }),
    members: z
      .array(
        z.object({
          memberId: z.string().optional(),
          name: z
            .string()
            .min(1, "入力必須項目です。")
            .max(20, "20文字以内で入力してください。")
            .transform((str) => str.trim()),
          ratio: z.number().min(1, "1以上の数字を入力してください."),
        })
      )
      .refine(
        (data) => {
          const validNames = data.filter((item) => item.name.trim().length > 0);
          return validNames.length >= 2;
        },
        { message: "2 人以上のユーザーを指定してください。" }
      )
      .refine(
        (data) => {
          const names = data.map((item) => item.name.trim().toLowerCase());
          return new Set(names).size === names.length;
        },
        { message: "重複したユーザー名を使用することはできません。" }
      ),
    moneyUnit: z.union([
      z.literal("1"),
      z.literal("10"),
      z.literal("100"),
      z.literal("1000"),
    ]),
  })
  .refine(
    ({ fromDate, toDate }) => dayjs(toDate).isSameOrAfter(dayjs(fromDate)),
    {
      message: "終了日は開始日より後の日付を指定してください。",
      path: ["toDate"],
    }
  );

export type EventType = z.infer<typeof eventSchema>;

export type Member = Pick<EventType, "members">["members"][number];
export type MoneyUnit = Pick<EventType, "moneyUnit">["moneyUnit"];

// 修正用の event のスキーマ
export const generateEditEventSchema = (unEditableMembers: string[]) =>
  z
    .object({
      eventId: z.string().min(1, "入力必須項目です。"),
      eventName: z
        .string()
        .min(1, "入力必須項目です。")
        .max(20, "20文字以内で入力してください。"),
      memo: z
        .string()
        .max(200, "最大200文字以内で入力してください.")
        .optional(),
      fromDate: z.string().refine((val) => dayjs(val).isValid(), {
        message: "日付の形式が正しくありません。",
      }),
      toDate: z.string().refine((val) => dayjs(val).isValid(), {
        message: "日付の形式が正しくありません。",
      }),
      members: z
        .array(
          z.object({
            memberId: z.string().optional(), // 新規追加のメンバーの memberId は空のため、optional
            name: z
              .string()
              .min(1, "入力必須項目です。")
              .max(20, "20文字以内で入力してください。")
              .transform((str) => str.trim()),
            ratio: z.number().min(1, "1以上の数字を入力してください."),
          })
        )
        .refine(
          (data) => {
            const validNames = data.filter(
              (item) => item.name.trim().length > 0
            );
            return validNames.length >= 2;
          },
          { message: "2 人以上のユーザーを指定してください。" }
        )
        .refine(
          (data) => {
            const names = data.map((item) => item.name.trim().toLowerCase());
            return new Set(names).size === names.length;
          },
          { message: "重複したユーザー名を使用することはできません。" }
        )
        .refine(
          (data) =>
            unEditableMembers.every((memberId) =>
              data.map((item) => item.memberId).includes(memberId)
            ),
          {
            message: "支払いに関与しているユーザーを削除することはできません。",
          }
        ),
      moneyUnit: z.union([
        z.literal("1"),
        z.literal("10"),
        z.literal("100"),
        z.literal("1000"),
      ]),
    })
    .refine(
      ({ fromDate, toDate }) => dayjs(toDate).isSameOrAfter(dayjs(fromDate)),
      {
        message: "終了日は開始日より後の日付を指定してください。",
        path: ["toDate"],
      }
    );

export type EditEventType = z.infer<ReturnType<typeof generateEditEventSchema>>;
