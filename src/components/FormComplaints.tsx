"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "react-feather";
import {
  type IComplaintsdata,
  useAddComplaintsMutation,
} from "@/lib/Redux/features/Complaints/ComplaintsApi";
import { useTranslations } from "next-intl";

const FormComplaints = ({ token }: { token: string }) => {
  const t = useTranslations("translation");
  const [addComplaints, { isLoading }] = useAddComplaintsMutation();

  const [formData, setFormData] = useState<IComplaintsdata>({
    name: "",
    email: "",
    phone: "",
    text: "",
    token: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addComplaints({
        ...formData,
        token,
      }).unwrap();

      toast.success(t("message.Complaints.add"));
      setFormData({
        name: "",
        email: "",
        phone: "",
        text: "",
        token: "",
      });
    } catch (error) {
      toast.error(t("message.Complaints.error"));
      console.error("Error sending complaint:", error);
    }
  };

  return (
    <section className="bg-white sm:rounded-4xl sm:shadow-md py-12 px-6 sm:px-4 sm:py-0   xl:max-w-[1240px] mx-auto">
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

      <div className="sm:py-6 lg:py-12 px-4 sm:mx-auto w-full">
        <h2 className="mb-4  text-lg sm:text-2xl lg:text-3xl font-semibold text-center text-text tracking-tight">
          {t("complaints_system.title")}
        </h2>
        <p className="mb-8 lg:mb-8 font-light text-center w-[90%] md:w-[70%] mx-auto text-gray-500 dark:text-paragraph text-sm  sm:text-base">
          {t("complaints_system.description")}
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col items-center"
        >
          <div className="w-full">
            <label
              htmlFor="name"
              className="block mb-2  text-sm  sm:text-base font-medium text-paragraph"
            >
              {t("complaints_system.label1")}
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-white border border-neutral-200 text-paragraph  text-sm  sm:text-base rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="block mb-2  text-sm  sm:text-base font-medium text-paragraph"
            >
              {t("complaints_system.label2")}
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white border border-neutral-200 text-paragraph  text-sm  sm:text-base rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-paragraph"
            >
              {t("complaints_system.label3")}
            </label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-white border border-neutral-200 text-paragraph text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div className="sm:col-span-2 w-full">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-paragraph"
            >
              {t("complaints_system.label4")}
            </label>
            <textarea
              id="text"
              rows={3}
              value={formData.text}
              onChange={handleChange}
              className="bg-white border border-neutral-200 text-paragraph text-sm rounded-lg block w-full p-2.5"
              required
            ></textarea>
          </div>
          <button
            aria-label={t("complaints_system.label5")}
            disabled={isLoading}
            title={t("complaints_system.label5")}
            type="submit"
            className="bg-primary w-full sm:w-1/2 mt-4 py-4 sm:py-4 px-2 sm:px-6  text-sm  sm:text-base  font-medium text-center text-white rounded-lg hover:bg-primary/80 cursor-pointer"
          >
            {isLoading ? (
              <span className="flex justify-center">
                <Loader
                  size={20}
                  className="animate-spin animate-duration-[1500ms]"
                />
              </span>
            ) : (
              t("complaints_system.label5")
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormComplaints;
