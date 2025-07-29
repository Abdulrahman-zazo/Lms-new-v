"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Logo from "./Logo";

const Imagepin1 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749899635/pin01_tyi7pr.png";
const Imagepin2 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749899636/pin02_nfhujq.png";
const Imagepin3 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749899637/pin03_cc5v1n.png";
const Imagepin4 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749899639/pin04_ro4sw0.png";
const Imagepin5 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749899640/pin05_ko7maa.png";
const ImageMap =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749898319/map_xsfk1d.webp";

const HeroWorldMap = () => {
  const t = useTranslations("translation");

  return (
    <div className="bg-white max-[800px]:hidden max-w-[1440px] mx-auto">
      <div className="flex items-center pt-4 flex-col max-w-[1440px]">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-lg sm:text-2xl lg:text-3xl font-semibold text-center text-text mb-4"
        >
          {t("map.title1")}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-2xl lg:text-3xl font-semibold text-center mb-4 z-10"
        >
          <span className="text-text">{t("map.with")}</span>{" "}
          <span className="text-primary">H-Platform</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-base md:text-lg text-gray-600 text-center max-w-2xl mb-12 z-10"
        >
          {t("map.title2")}
        </motion.p>
      </div>

      <div className="relative flex flex-col items-center justify-center p-20 mb-12 overflow-hidden">
        {/* Background Map */}
        <div className="absolute inset-0">
          <Image
            src={ImageMap}
            alt="World Map"
            fill
            priority
            quality={90}
            className="object-cover opacity-40"
          />
        </div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.6,
            type: "spring",
            stiffness: 120,
          }}
          className="relative top-10 rounded-xl shadow-2xl z-30"
        >
          <Logo type="icon" className="w-40" />
        </motion.div>

        {/* Pins */}
        <Pin src={Imagepin4} top="60%" left="15%" delay={0.8} />
        <Pin src={Imagepin5} top="40%" left="30%" delay={0.9} />
        <Pin src={Imagepin1} top="10%" left="50%" delay={1} size="large" />
        <Pin src={Imagepin3} top="40%" right="30%" delay={1.1} />
        <Pin src={Imagepin2} top="60%" right="20%" delay={1.2} />
      </div>
    </div>
  );
};

// ✅ Reusable Pin Component
const Pin = ({
  src,
  top,
  left,
  right,
  delay,
  size = "medium",
}: {
  src: string;
  top: string;
  left?: string;
  right?: string;
  delay: number;
  size?: "small" | "medium" | "large";
}) => {
  const sizeClasses =
    size === "large"
      ? "w-[140px] h-[80px]"
      : size === "medium"
      ? "w-[100px] h-[60px]"
      : "w-[80px] h-[50px]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: "circOut" }}
      className={`absolute ${top} ${left ? `left-[${left}]` : ""} ${
        right ? `right-[${right}]` : ""
      } z-20`}
      style={{ top, left, right }}
    >
      <div className={`relative ${sizeClasses}`}>
        <Image
          src={src}
          alt="Pin"
          fill
          sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
          className="object-contain"
          quality={90}
        />
      </div>
    </motion.div>
  );
};

export default HeroWorldMap;
