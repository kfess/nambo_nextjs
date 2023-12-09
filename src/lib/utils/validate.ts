import { ZodSchema, ZodError } from "zod";

// zod を用いて validation を行うための汎用的な関数
export const validate = async <T>(
  schema: ZodSchema<T>,
  data: unknown
): Promise<T> => {
  try {
    return await schema.parseAsync(data);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      // 要修正
      const errorMessages = error.issues.map((issue) => issue.message);
      throw new Error(errorMessages.join("\n"));
    }
    throw new Error("Unexpected error occurred.");
  }
};

// uuid の形式の検証
// このアプリ内では、特に eventId, paymentId の形式の検証に使用
export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = new RegExp(
    "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[89aAbB][0-9a-f]{3}-[0-9a-f]{12}$"
  );
  return uuidRegex.test(uuid);
};
