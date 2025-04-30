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

  return (
    <>
      {isMobile ? (
        <div className="bg-black fixed w-full h-[45px] top-0 left-0 z-[1000] text-white overflow-hidden py-2">
          <div className="flex w-full">
            {/* First set of items */}
            <div className="flex animate-scroll-left">
              {announcements.map((announcement, index) => (
                <div
                  key={`first-${index}`}
                  className="flex items-center whitespace-nowrap mx-8"
                >
                  <div className="relative w-5 h-5 mr-2">
                    <Image
                      src={announcement.icon?.trimEnd() || "/placeholder.svg"}
                      overrideSrc={
                        announcement.icon?.trimEnd() || "/placeholder.svg"
                      }
                      alt={announcement.icon}
                      fill
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                  <span className="font-semibold text-sm">
                    {announcement.text}
                  </span>
                  {announcement.highlight && (
                    <span className="ml-1 text-sm text-white">
                      {announcement.highlight}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black text-white overflow-hidden py-2">
          <div className="relative flex">
            {/* First set of items */}
            <div className="flex animate-scroll-left">
              {announcements.map((announcement, index) => (
                <div
                  key={`first-${index}`}
                  className="flex items-center whitespace-nowrap mx-8"
                >
                  <div className="relative w-5 h-5 mr-2">
                    <Image
                      src={announcement.icon?.trimEnd() || "/placeholder.svg"}
                      overrideSrc={
                        announcement.icon?.trimEnd() || "/placeholder.svg"
                      }
                      alt={announcement.icon}
                      fill
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                  <span className="font-semibold text-sm">
                    {announcement.text}
                  </span>
                  {announcement.highlight && (
                    <span className="ml-1 text-sm text-white">
                      {announcement.highlight}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
