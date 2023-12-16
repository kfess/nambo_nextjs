export const ERROR_MESSAGES: Record<string, string> = {
  "400": "URL が間違っているか、リクエストが正しくありません。",
  "401": "認証が必要です。",
  "403": "アクセスが禁止されています。",
  "404": "リソースが見つかりません。",
  "500": "サーバーでエラーが発生しました。",
  "502": "サーバーがダウンしています。",
  "503": "サーバーが混雑しています。",
  "504": "サーバーがダウンしています。",
  UNKNOWN_ERROR: "予期しないエラーが発生しました。",
};

// 予期しないエラーを表すカスタムエラークラス
export class UnknownError extends Error {
  static {
    this.prototype.name = "UnknownError";
  }
  constructor(message: string = ERROR_MESSAGES.UNKNOWN_ERROR) {
    super(message);
  }
}
