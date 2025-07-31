"use client";

import { motion } from "framer-motion";
import { IconBeaker, IconBook, IconComputer, IconMonitorChart } from "./Icons";
import { useGetContactQuery } from "@/lib/Redux/features/Contacts/contactApi";

const HeaderCourseClient = ({
  title,
  description,
  hours,
  type,
  isRTL,
  whatsappMessage,
  enrollText,
}: {
  title: string;
  description: string;
  hours?: string;
  type: string;

  isRTL: boolean;
  whatsappMessage: string;
  enrollText: string;
}) => {
  const { data } = useGetContactQuery();
  return (
    <div className="bg-primary mb-6 p-8 md:p-16 rounded-3xl shadow-xl text-white relative overflow-hidden max-w-[90%] xl:max-w-[1240px] mx-auto mt-20 sm:mt-24">
      <motion.div
        className={`hidden sm:block absolute ${
          !isRTL ? "right-28" : "left-25"
        } bottom-16 opacity-100`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <IconBook className="w-14 h-14 md:w-28 md:h-28 text-bg-icon transform -rotate-4" />
      </motion.div>
      <motion.div
        className={`hidden sm:block absolute ${
          !isRTL ? "-right-5" : "-left-5"
        } bottom-15 opacity-20`}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <IconBeaker className="w-14 h-14 md:w-24 md:h-24 text-bg-icon transform -rotate-12" />
      </motion.div>
      <motion.div
        className={`hidden sm:block absolute ${
          !isRTL ? "right-16" : "left-10"
        } top-10 opacity-15`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <IconMonitorChart className="w-12 h-12 md:w-25 md:h-25 text-purple-300" />
      </motion.div>{" "}
      {/* Mobile Icons */}
      <motion.div
        className="absolute -left-8 bottom-8 opacity-20 sm:hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <IconBook className="w-14 h-14 md:w-28 md:h-28 text-bg-icon transform -rotate-4" />
      </motion.div>
      <motion.div
        className="absolute right-8 top-10 opacity-20 sm:hidden"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <IconComputer className="w-12 h-12 md:w-20 md:h-20 text-bg-icon transform rotate-6" />
      </motion.div>
      <motion.div
        className="absolute -right-5 bottom-10 opacity-20 sm:hidden"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <IconBeaker className="w-14 h-14 md:w-24 md:h-24 text-bg-icon transform -rotate-12" />
      </motion.div>
      <motion.div
        className="absolute left-8 top-10 opacity-20 sm:hidden"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <IconMonitorChart className="w-12 h-12 md:w-20 md:h-20 text-purple-300" />
      </motion.div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center sm:items-start">
        <motion.h1
          className="text-xl text-center sm:text-start sm:text-2xl md:text-3xl lg:text-3xl max-w-2xl font-medium md:font-semibold mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-sm leading-6 text-center sm:text-start sm:text-base mb-8 max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          {description}
        </motion.p>
        <motion.p
          className="text-sm sm:text-base mb-8 max-w-xl hidden sm:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          - {hours && `${hours} ساعة ,`} {type}
        </motion.p>
        <motion.a
          href={`https://wa.me/${data?.Contact[0]?.whatsapp_num}?text=${whatsappMessage}`}
          title={enrollText}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-primary font-medium sm:font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {enrollText}
        </motion.a>
      </div>
    </div>
  );
};

export default HeaderCourseClient;
