"use client";

import { motion } from "framer-motion";
import {
  HomewithBack,
  Certifications,
  SendMonitor,
  IconBook,
  IconComputer,
  IconBeaker,
  IconMonitorChart,
} from "../Icons"; // Adjust path to your icons
import { Contact } from "@/types";
import ImageWithSkeleton from "./ImageHome";

const ImageHome =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749898317/home_as9ple.webp";

// This component receives all its data as props
const HeroHomeClient = ({
  contact,
  texts,
  isRTL,
}: {
  contact: Contact;
  texts: { title: string; text2: string; button: string; text1: string };
  isRTL: boolean;
}) => {
  const MotionLink = motion.a;

  return (
    <div className="bg-primary py-12 px-8 md:p-12 rounded-3xl shadow-xl text-white relative overflow-hidden w-[90%] max-w-[1240px] mx-auto mt-20 sm:mt-24 mb-2 sm:mb-8">
      {/* Background Icons with motion */}
      <div className="inline lg:hidden">
        <motion.div
          className={`absolute ${
            !isRTL ? "-left-8" : "-right-8"
          } bottom-8 opacity-20 `}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <IconBook className="w-18 h-18 md:w-28 md:h-28 text-bg-icon transform -rotate-4" />
        </motion.div>
        <motion.div
          className={`absolute   ${
            isRTL ? "left-8" : "right-8"
          }  top-10 opacity-20 `}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        >
          <IconComputer className="w-18 h-18 md:w-20 md:h-20 text-bg-icon transform rotate-6" />
        </motion.div>
        <motion.div
          className={`absolute  ${
            isRTL ? "-left-5" : "-right-5"
          } bottom-10 opacity-20 `}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        >
          <IconBeaker className="w-18 h-18 md:w-24 md:h-24 text-bg-icon transform -rotate-12" />
        </motion.div>
        <motion.div
          className={`absolute ${
            isRTL ? "right-8" : " left-8"
          } top-10 opacity-15 `}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
        >
          <IconMonitorChart className="w-18 h-18 md:w-20 md:h-20 text-purple-300" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-around text-center md:text-start items-center mx-auto">
        {/* Text Side */}
        <div className="relative z-10">
          <motion.h1
            className="text-xl sm:text-3xl lg:text-4xl max-w-xl mx-auto font-semibold mt-8 mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {texts.title}
          </motion.h1>
          <motion.p
            className="text-base md:text-lg mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            {texts.text1}
          </motion.p>
          <motion.p
            className="text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-8 max-w-lg md:max-w-xl mx-auto leading-7 max-[500px]:hidden"
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {texts.text2}
          </motion.p>
          <MotionLink
            href={`https://wa.me/${contact?.whatsapp_num}`}
            target="_blank"
            rel="noopener noreferrer"
            title={texts.button}
            className="bg-white text-primary font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {texts.button}!
          </MotionLink>
        </div>

        {/* Image Side */}
        <div className="hidden xl:inline">
          <>
            <motion.div
              className={`   absolute ${
                !isRTL ? "right-24" : "left-[35%]"
              }  bottom-20`}
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeIn" }}
            >
              <HomewithBack className="w-12 h-12 md:w-20 md:h-20 text-purple-300" />
            </motion.div>
            <motion.div
              className={`absolute  ${
                !isRTL ? "right-16" : "left-[35%]"
              }  top-5 z-10`}
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{
                x: [0, 10, 0, -10, 0],
                y: [0, 10, 20, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            >
              <Certifications className="w-12 h-12 md:w-32 md:h-32 text-purple-300" />
            </motion.div>
            <ImageWithSkeleton src={ImageHome} alt="h-platform home" />
            <motion.div
              className={`absolute  ${
                !isRTL ? "right-[30%]" : "left-[12%]"
              }  bottom-20`}
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeIn" }}
            >
              <SendMonitor className="w-12 h-12 md:w-20 md:h-20 text-purple-300" />
            </motion.div>
          </>
        </div>
      </div>
    </div>
  );
};

export default HeroHomeClient;
