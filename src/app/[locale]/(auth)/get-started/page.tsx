"use client";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "react-feather";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  useForgetPasswordMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
} from "@/lib/Redux/features/User/userApi";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Registration() {
  const t = useTranslations("translation");
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [register, { isLoading }] = useRegisterMutation();

  const [forgetPassword, { isLoading: isLoadingResend }] =
    useForgetPasswordMutation();
  const [VerifyEmail, { isLoading: isLoadingVerifyEmail }] =
    useVerifyEmailMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const emailEntry = formData.get("email") as string;
    const passwordEntry = formData.get("password") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    if (typeof emailEntry !== "string" || typeof passwordEntry !== "string") {
      toast.error(t("message.registration.error"));
      return;
    }
    const email = emailEntry;
    const password = passwordEntry;
    setEmail(email);
    setPassword(password);
    const toastId = toast.loading(t("message.registration.loading"));

    try {
      const result = await register({ email, password, name, phone }).unwrap();

      if (result?.status === true) {
        toast.success(t("message.registration.send"), { id: toastId });
        setStep(2);
      } else {
        return toast.error(`${result?.data.error}`, {
          id: toastId,
        });
      }
    } catch (err) {
      const error = err as { data?: { error?: string } };

      toast.error(error.data?.error || "حدث خطأ أثناء التسجيل", {
        id: toastId,
      });
    }
  };
  const handleVerifyEmail = async () => {
    const toastId = toast.loading(t("message.registration.code"));

    try {
      const result = await VerifyEmail({ email, password, code }).unwrap();
      if (result.status === true) {
        toast.success(t("message.registration.success"), { id: toastId });

        const token = result.authorization.token;
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
        toast.error("الكود الذي أدخلته غير صالح", {
          id: toastId,
        });
      }
    } catch (err) {
      const error = err as { msg?: string };
      toast.error(error?.msg || "حدث خطأ أثناء التسجيل", {
        id: toastId,
      });
    }
  };
  const handleResendCode = async () => {
    const toastId = toast.loading(t("message.registration.resend"));
    try {
      const result = await forgetPassword(email);

      if (result.data.status) {
        toast.success(t("message.registration.done_send"), { id: toastId });
      } else {
        toast.error(t("message.forget_message.error_code"), {
          id: toastId,
        });
      }
    } catch (err) {
      const error = err as { data?: { msg?: string } };

      toast.error(error.data?.msg || "حدث خطأ أثناء التسجيل", {
        id: toastId,
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Toaster
        toastOptions={{
          className: "",
          duration: 2000,
          removeDelay: 1000,
          style: {
            fontSize: "14px",
          },
        }}
      />

      <div className="max-w-md w-full space-y-6 mt-10">
        <div className="text-center">
          <h2 className=" text-xl sm:text-2xl font-semibold text-neutral-800">
            {t("auth.create_account.Create_title")}
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mt-2">
            {t("auth.create_account.create_text")}
          </p>
        </div>

        {step === 1 && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm sm:text-base font-medium text-neutral-700 block mb-2">
                {t("auth.create_account.Name")}
              </label>
              <input
                name="name"
                type="text"
                className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="text-sm sm:text-base font-medium text-neutral-700 block mb-2">
                {t("auth.create_account.email")}
              </label>
              <input
                name="email"
                type="email"
                className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="email@domain.com"
              />
            </div>
            <div>
              <label className="text-sm sm:text-base font-medium text-neutral-700 block mb-2">
                {t("auth.create_account.phone")}
              </label>

              <div className="w-full" dir="ltr">
                <PhoneInput
                  defaultCountry="sy"
                  name="phone"
                  inputStyle={{ width: "100%" }}
                  flags={[
                    {
                      iso2: "sy",
                      src: "https://res.cloudinary.com/dmn6uzy82/image/upload/v1751981403/syria-flag_fiz83y.svg",
                    },
                  ]}
                />
              </div>
            </div>
            <div>
              <label className="text-sm sm:text-base font-medium text-neutral-700 block mb-2">
                {t("auth.create_account.Password")}
              </label>
              <input
                name="password"
                type="password"
                className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="********"
              />
            </div>
            <button
              aria-label={t("auth.Login_account.Register")}
              title={t("auth.Login_account.Register")}
              disabled={isLoading}
              type="submit"
              className={`w-full text-sm sm:text-base  text-white py-2 rounded-md font-semibold hover:bg-primary-dark transition ${
                isLoading
                  ? "bg-primary/50 cursor-not-allowed"
                  : "bg-primary cursor-pointer hover:bg-primary/80"
              }`}
            >
              {isLoading ? (
                <span className=" flex justify-center ">
                  <Loader
                    size={20}
                    className="animate-spin  animate-duration-[1500ms]"
                  />
                </span>
              ) : (
                <>{t("auth.Login_account.Register")}</>
              )}
            </button>
          </form>
        )}
        {step === 2 && (
          <div>
            <label className="text-sm sm:text-base font-medium text-neutral-700 block mb-2">
              {t("auth.forget_password.Verification")}
            </label>

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter the 6-digit code"
            />
            <span className="text-xs text-neutral-800">
              {t("auth.forget_password.code_ex")}
            </span>

            <button
              title={t("auth.Login_account.Register")}
              aria-label={t("auth.Login_account.Register")}
              disabled={isLoadingVerifyEmail}
              type="submit"
              className={`w-full text-sm sm:text-base text-white py-2 mt-4 rounded-md font-semibold transition ${
                isLoadingVerifyEmail
                  ? "bg-primary/50 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80 cursor-pointer"
              }`}
              onClick={handleVerifyEmail}
            >
              {isLoadingVerifyEmail ? (
                <span className="flex justify-center">
                  <Loader
                    size={20}
                    className="animate-spin animate-duration-[1500ms]"
                  />
                </span>
              ) : (
                <>{t("auth.Login_account.Register")}</>
              )}
            </button>

            <div className="mt-4 text-center text-sm sm:text-base text-neutral-600">
              <button
                type="button"
                aria-label={t("auth.forget_password.resend")}
                onClick={handleResendCode}
                className="text-primary hover:underline font-medium"
                disabled={isLoadingResend}
              >
                {isLoadingResend
                  ? t("auth.forget_password.resending")
                  : t("auth.forget_password.resend")}
              </button>
            </div>
          </div>
        )}
        <p className="text-sm sm:text-base text-center text-neutral-600">
          {t("auth.create_account.Already")}
          <Link href={"/login"} className="text-primary mx-1  hover:underline">
            {t("auth.create_account.Login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
