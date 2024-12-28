"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  pendingText,
  notPendinText,
  className,
}) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={className}>
      {pending ? pendingText : notPendinText}
    </button>
  );
}
