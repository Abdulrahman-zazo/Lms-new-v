import { Contact } from "@/types";
interface IProps {
  lang?: string;
  contact: Contact;
}

const FloatingButton = ({ lang = "ar", contact }: IProps) => {
  return (
    <>
      {contact?.whatsapp_num ? (
        <a
          aria-label="تواصل معنا عبر whatsapp"
          title="whatsapp h-platform"
          href={`https://wa.me/${
            contact?.whatsapp_num
          }?text=${encodeURIComponent(
            "،  مرحبًا، أرغب بالانضمام لمنصتكم، اريد المزيد من التفاصيل؟ ما يمكن ان ابدأ به كدورات تدريبة؟ ."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed bottom-4 ${
            lang === "en" ? "right-4" : "left-4"
          } bg-[#25D366] hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-50`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.1.55 4.15 1.6 5.95L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.25-6.2-3.48-8.52zM12 22c-1.88 0-3.7-.52-5.27-1.5l-.38-.22-3.69.97.99-3.59-.25-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.27-7.73c-.28-.14-1.65-.82-1.9-.91-.26-.1-.45-.14-.64.14s-.74.91-.91 1.1c-.17.18-.34.2-.62.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.17-.28-.02-.43.13-.57.14-.14.28-.34.43-.51.14-.17.2-.28.31-.46.1-.17.05-.34 0-.48-.07-.14-.64-1.55-.88-2.13-.23-.56-.47-.49-.64-.49h-.55c-.17 0-.43.07-.65.34-.22.28-.87.85-.87 2.07s.89 2.4 1.02 2.57c.14.17 1.75 2.68 4.26 3.76.6.26 1.07.41 1.43.52.6.19 1.14.17 1.57.1.48-.07 1.48-.6 1.69-1.18.2-.57.2-1.06.14-1.18-.05-.1-.26-.17-.54-.3z" />
          </svg>
        </a>
      ) : (
        ""
      )}
    </>
  );
};

export default FloatingButton;
