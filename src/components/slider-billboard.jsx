import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Images Array
const images = [
  {
    url: "/banner/banner-1.webp",
    title: "New Year, New Deals!",
    description:
      "Kickstart the year with exclusive discounts on your favorite products. Shop now and save big on every purchase!",
  },
  {
    url: "/banner/banner-2.webp",
    title: "Limited Time Sale: Up to 70% Off!",
    description:
      "Don’t miss out on massive savings! Your dream products are just a click away. Offer ends soon!",
  },
  {
    url: "/banner/banner-3.webp",
    title: "Shop More, Save More!",
    description:
      "Unbeatable offers across all categories. The more you shop, the bigger the rewards. Grab your deal now!",
  },
  {
    url: "/banner/banner-4.webp",
    title: "Shop More, Save More!",
    description:
      "Unbeatable offers across all categories. The more you shop, the bigger the rewards. Grab your deal now!",
  },
];

const SliderBillboard = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2500,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[250px] my-5 rounded-lg overflow-hidden">
              <Image
                src={img.url}
                height={500}
                width={1000}
                className="w-full h-full object-cover"
                alt="home-banner-image"
              />
              <div className="absolute hidden top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                <p className="font-bold text-center text-xl md:text-4xl">
                  {img.title}
                </p>
                <p className="text-center text-lg mt-2">{img.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="max-md:hidden" />
      <CarouselNext className="max-md:hidden" />
    </Carousel>
  );
};

export default SliderBillboard;
