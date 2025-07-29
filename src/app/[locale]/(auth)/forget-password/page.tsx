"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Loader } from "react-feather";
import {
  useChangePasswordMutation,
  useForgetPasswordMutation,
} from "@/lib/Redux/features/User/userApi";
import { useTranslations } from "next-intl";

import { redirect } from "next/navigation";
import Link from "next/link";

export default function ForgetPassword() {
  const t = useTranslations("translation");

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgetPassword, { isLoading: isLoadingResend }] =
    useForgetPasswordMutation();
  const [changePassword, { isLoading: isLoadingChange }] =
    useChangePasswordMutation();

  const handleNext = async () => {
    if (step === 1 && email) {
      const toastId = toast.loading(t("message.forget_message.loading"));

      try {
        const result = await forgetPassword(email);
        if (result.data.status === true) {
          toast.success(t("message.forget_message.send"), { id: toastId });
          setTimeout(() => {
            setStep(2);
          }, 3000);
        } else {
          toast.error(t("message.forget_message.error_code"), {
            id: toastId,
          });
          setStep(1);
        }
      } catch (err) {
        const error = err as { data?: { msg?: string } };
        toast.error(error.data?.msg || t("message.forget_message.error_code"), {
          id: toastId,
        });
      }
    } else if (step === 2) {
      const toastId = toast.loading(t("message.forget_message.code"));
      try {
        const result = await changePassword({ email, code, password });

        if (result.data.status === true) {
          toast.success(t("message.forget_message.success"), { id: toastId });
          const token = result.data.authorization.token;
          await fetch("/api/set-cookie", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          window.location.reload();
          setTimeout(() => {
            redirect("/");
          }, 200);
        } else {
          toast.error(result.data?.msg || "حدث خطأ أثناء التسجيل", {
            id: toastId,
          });
        }
      } catch (err) {
        const error = err as { data?: { msg?: string } };

        toast.error(error.data?.msg || "حدث خطأ أثناء التسجيل", {
          id: toastId,
        });
      }
    } else {
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Toaster
        toastOptions={{
          className: "",
          duration: 3000,
          removeDelay: 1000,
          style: {
            fontSize: "14px",
          },
        }}
      />

      <div className="max-w-md w-full space-y-4 mt-8">
        <div className="text-center">
          <h2 className="text-xl  sm:text-2xl font-semibold text-text">
            {t("auth.forget_password.forget_title")}
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mt-2">
            {step === 1 && t("auth.forget_password.forget_text")}
            {/* {step === 2 && t("auth.forget_password.code")} */}
            {step === 2 && t("auth.forget_password.new_password_text")}
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {step === 1 && (
            <div>
              <label className="text-sm sm:text-base font-medium text-gray-700 block mb-2">
                {t("auth.forget_password.email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="email@domain.com"
              />
            </div>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="text-sm sm:text-base font-medium text-gray-700 block mb-2">
                  {t("auth.forget_password.Verification")}
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter the 6-digit code"
                />
                <span className="text-xs text-neutral-800">
                  {t("auth.forget_password.code_ex")}
                </span>
              </div>
              <div>
                <label className="text-sm sm:text-base font-medium text-gray-700 block mb-2">
                  {t("auth.forget_password.new_password")}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="********"
                />
              </div>

              <div>
                <label className="text-sm sm:text-base font-medium text-gray-700 block mb-2">
                  {t("auth.forget_password.new_password2")}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="********"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoadingResend || isLoadingChange}
            onClick={handleNext}
            className="w-full bg-primary text-sm sm:text-base text-white py-2 rounded-md  hover:bg-primary-dark transition"
          >
            {step === 2 ? (
              isLoadingChange ? (
                <span className=" flex justify-center ">
                  <Loader
                    size={20}
                    className="animate-spin  animate-duration-[1500ms]"
                  />
                </span>
              ) : (
                t("auth.forget_password.confirm")
              )
            ) : isLoadingResend ? (
              <span className=" flex justify-center ">
                <Loader
                  size={20}
                  className="animate-spin  animate-duration-[1500ms]"
                />
              </span>
            ) : (
              t("auth.forget_password.next")
            )}
          </button>
        </form>
        {step === 2 && (
          <div className="space-y-2">
            <p
              className="text-sm sm:text-base text-center text-primary mx-1 cursor-pointer hover:text-primary/80 underline "
              onClick={() => {
                setStep(1);
                setEmail("");
              }}
            >
              {t("auth.forget_password.resend")}
            </p>
          </div>
        )}

        {step < 3 && (
          <div className="space-y-2">
            <p className="text-sm sm:text-base text-center text-gray-600">
              {t("auth.forget_password.Remembered")}
              <Link
                href={"/login"}
                className="text-primary mx-1  hover:underline"
              >
                {t("auth.forget_password.Login")}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
