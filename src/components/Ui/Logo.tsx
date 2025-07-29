import Image from "next/image";
import type { ImageProps } from "next/image";

const LogoHorizontal =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1750334993/logo-h_tw2neb.png";
const LogoIcon =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1750512158/icon-site_pfgwf0.png";

interface IProps extends Omit<ImageProps, "src" | "alt"> {
  type?: "h" | "icon";
  altText?: string;
}

const Logo = ({
  type = "h",
  className,
  altText = "H-Platform Logo",
  ...props
}: IProps) => {
  const src = type === "h" ? LogoHorizontal : LogoIcon;
  const dimensions =
    type === "h" ? { width: 160, height: 50 } : { width: 48, height: 48 };

  return (
    <Image
      src={src}
      alt={altText}
      width={dimensions.width}
      height={dimensions.height}
      quality={90}
      className={className}
      priority
      sizes="(max-width: 768px) 120px, 160px"
      {...props}
    />
  );
};

export default Logo;
