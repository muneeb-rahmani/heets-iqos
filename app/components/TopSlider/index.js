"use client";

import { useIsMobile } from "@/app/utils/common";
import Image from "next/image";

export default function InfiniteSlider({ reviewLength, totalSales }) {
  const isMobile = useIsMobile();

  const announcements = [
    {
      icon: "/imgs/one_hour_instant_delivery_brand.webp",
      text: "Instant 1 Hour Delivery",
      highlight: "in UAE",
    },
    {
      icon: "/imgs/free_delivery_brand.webp",
      text: "Free UAE Delivery",
      highlight: "on order 201 AED",
    },
    {
      icon: "/imgs/user_experience_brand.webp",
      text: "96% Positive experience",
      highlight: `from over ${reviewLength} reviews`,
    },
    {
      icon: "/imgs/shipped_orders_brand.webp",
      text: "Celebrating 8 years",
      highlight: `${totalSales} Orders Shipped`,
    },
  ];

  const animationClass = isMobile ? "animate-scrollLeftMobile" : "animate-scrollLeftDesktop";

  return (
    <div className={`bg-black text-white overflow-hidden ${isMobile ? "flex fixed top-0 w-full h-[45px] z-[1000]" : "py-2"}`}>
      <div className={`relative flex w-max ${animationClass}`}>
        {(isMobile ? [...announcements, ...announcements] : announcements).map((announcement, index) => (
          <div
            key={`announcement-${index}`}
            className="flex items-center whitespace-nowrap mx-8"
          >
            <div className="relative w-5 h-5 mr-2">
              <Image
                src={announcement.icon?.trimEnd() || "/placeholder.svg"}
                overrideSrc={announcement.icon?.trimEnd() || "/placeholder.svg"}
                alt={announcement.icon}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
            <span className="font-semibold text-sm">{announcement.text}</span>
            {announcement.highlight && (
              <span className="ml-1 text-sm text-white">
                {announcement.highlight}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
