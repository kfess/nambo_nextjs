import React from "react";
import { TermsLink } from "../../features/Terms/components/TermsLink";
import { EventPageHeader } from "../../features/Form/components/Header";

export default function NewPage() {
  return (
    <form>
      <EventPageHeader formPageType="new" />
      <div className="text-center text-sm">
        <TermsLink inFooter={false} />
        に同意のうえ
      </div>
      <button
        type="submit"
        // disabled={isSubmitting}
        className="btn bg-primary hover:bg-primary-hover text-white w-full mt-1"
      >
        イベント作成
      </button>
    </form>
  );
}
