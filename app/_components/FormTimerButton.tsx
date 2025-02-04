"use client";

function FormTimerButton({
  time,
  finished,
  formAction,
}: {
  time: number;
  finished: boolean;
  formAction: () => void;
}) {
  return (
    <div>
      {finished ? (
        <button
          className="text-xs text-primary-default md:text-sm"
          type="button"
          onClick={formAction}
        >
          دریافت مجدد
        </button>
      ) : (
        <p className="text-xs text-gray-800 md:text-sm">
          ارسال مجدد کد تا {time} ثانیه دیگر
        </p>
      )}
    </div>
  );
}

export default FormTimerButton;
