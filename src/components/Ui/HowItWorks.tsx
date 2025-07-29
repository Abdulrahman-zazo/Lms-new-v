"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Image1 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749898784/search_xjyqbb.webp";
const Image2 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749898785/login_a1zfil.webp";
const Image3 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749898786/connections_ey8amd.webp";

const HowItWorksSection = () => {
  const t = useTranslations("translation");

  const steps = [
    {
      id: 1,
      title: t("how-work.feature2"),
      description: t("how-work.content2"),
      button: t("how-work.button2"),
      image: Image2,
    },
    {
      id: 2,
      title: t("how-work.feature1"),
      description: t("how-work.content1"),
      button: t("how-work.button1"),
      image: Image1,
    },
    {
      id: 3,
      title: t("how-work.feature3"),
      description: t("how-work.content3"),
      button: t("how-work.button3"),
      image: Image3,
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16">
      {/* Title */}
      <h2 className="text-lg sm:text-xl lg:text-3xl font-semibold text-center mb-12">
        {t("how-work.title")} <span className="text-primary">H-Platform؟</span>
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-[90%] mx-auto">
        {steps.map(({ id, title, description, button, image }) => (
          <div
            key={id}
            className="border border-neutral-400 rounded-xl p-6 text-center hover:shadow-lg transition"
          >
            <div className="relative w-full h-56 mb-6">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                quality={90}
              />
            </div>

            <h3 className="text-lg sm:text-xl font-semibold mb-4">{title}</h3>
            <p className="text-paragraph text-sm sm:text-base mb-4">
              {description}
            </p>

            <Link
              href="/login"
              title={`HeroHome ${button}`}
              className="bg-primary w-full text-white text-sm sm:text-base px-5 py-2 rounded hover:bg-primary/80 transition"
            >
              {button}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
