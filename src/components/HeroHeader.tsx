"use client";
import HeroHeaderClient from "./HeroHeaderClient";

interface HeroHeaderProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export default function HeroHeader({
  title,
  description,
  buttonText,
  onButtonClick,
}: HeroHeaderProps) {
  return (
    <HeroHeaderClient
      title={title}
      description={description}
      buttonText={buttonText}
      onButtonClick={onButtonClick}
    />
  );
}
