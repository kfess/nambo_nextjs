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
