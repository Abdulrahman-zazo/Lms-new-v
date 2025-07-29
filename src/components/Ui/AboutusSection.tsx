import Image from "next/image";

import { getTranslations } from "next-intl/server";

const Image1 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749899212/child-learning-new-information-from-digital-tablet_hzecdn.webp";
const Image2 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749899631/Message_k74jze.png";
const Image3 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749899632/Mission_kcfnql.png";
const Image4 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749899641/Vision_siyeuf.png";

export default async function AboutusSection() {
  const t = await getTranslations("translation");

  return (
    <section>
      <div className="max-w-[1440px] px-2 sm:px-6 py-8 sm:py-16 mx-auto">
        <div className="mx-auto w-[100%] sm:w-[80%]">
          <div className="flex flex-col lg:flex-row justify-around mx-auto sm:gap-14 items-center">
            {/* Left Section */}
            <div className="w-[80%] h-auto lg:w-1/2 mx-6">
              {[1, 2, 3].map((item) => {
                const icon = item === 1 ? Image2 : item === 2 ? Image3 : Image4;
                const title = t(`about.title${item}`);
                const description = t(`about.description${item}`);
                return (
                  <div
                    key={item}
                    className="flex flex-col items-center mb-6 lg:text-start lg:items-start text-center"
                  >
                    <div className="relative w-12 h-12 mb-2">
                      <Image
                        src={icon}
                        alt={`Icon ${item}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 32px, 48px"
                        loading="lazy"
                        quality={90}
                      />
                    </div>
                    <h3 className="font-semibold text-lg md:text-lg my-1">
                      {title}
                    </h3>
                    <p className="text-sm text-paragraph md:text-base">
                      {description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="relative hidden md:flex items-center justify-center mx-auto w-[250px] sm:w-[400px] h-[450px]">
              <Image
                src={Image1}
                alt="About us"
                fill
                priority
                sizes="(max-width: 768px) 250px, 400px"
                className={`object-cover rounded-2xl transition-opacity duration-500 
                  "opacity-100" 
                `}
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
