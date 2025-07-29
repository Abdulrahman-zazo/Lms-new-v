"use client";

import { motion } from "framer-motion";
import { IconBeaker, IconBook, IconComputer, IconMonitorChart } from "./Icons";
import { useGetContactQuery } from "@/lib/Redux/features/Contacts/contactApi";

// The component receives all its data and functions as props
const HeroHeaderClient = ({
  title,
  description,
  buttonText,

  onButtonClick,
}: {
  title: string;
  description: string;
  buttonText: string;

  onButtonClick?: () => void;
}) => {
  const { data } = useGetContactQuery();

  return (
    <div className="bg-primary p-8 md:p-16 rounded-3xl shadow-xl text-white relative overflow-hidden max-w-[90%] xl:max-w-[1240px] mx-auto mb-6 mt-20 sm:mt-24">
      {/* Background Icons */}
      <motion.div
        className="absolute -left-5 bottom-6 opacity-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <IconBook className="w-14 h-14 md:w-28 md:h-28 text-bg-icon transform -rotate-4" />
      </motion.div>

      <motion.div
        className="absolute right-1 top-4 opacity-20"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <IconComputer className="w-14 h-14 md:w-20 md:h-20 text-bg-icon transform rotate-6" />
      </motion.div>

      <motion.div
        className="absolute -right-5 bottom-6 opacity-20"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 0.1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <IconBeaker className="w-14 h-14 md:w-24 md:h-24 text-bg-icon transform -rotate-12" />
      </motion.div>

      <motion.div
        className="absolute left-1 top-4 opacity-15"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <IconMonitorChart className="w-14 h-14 md:w-20 md:h-20 text-purple-300" />
      </motion.div>

      {/* ... other background icons */}

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-lg sm:text-3xl md:text-3xl lg:text-4xl max-w-xl mx-auto font-semibold mb-4 md:mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-xs md:text-base mb-4 md:mb-8 max-w-xl mx-auto hidden sm:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          {description}
        </motion.p>
        <motion.a
          title={buttonText}
          href={
            !onButtonClick
              ? `https://wa.me/${data?.Contact[0]?.whatsapp_num}`
              : undefined
          }
          target={!onButtonClick ? "_blank" : undefined}
          rel={!onButtonClick ? "noopener noreferrer" : undefined}
          onClick={onButtonClick}
          className="bg-white text-primary font-medium md:font-semibold px-4 md:px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300 text-sm md:text-base cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {buttonText} 🚀!
        </motion.a>
      </div>
    </div>
  );
};

export default HeroHeaderClient;
