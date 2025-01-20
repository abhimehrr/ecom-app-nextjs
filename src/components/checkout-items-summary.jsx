import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatIndianRupee } from "@/lib/utils";
import Image from "next/image";

export function CheckoutItemsSummary({ items }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem className='border-none' value="order-summary">
        <AccordionTrigger>Order summary</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-5">
            {items?.map((item) => (
              <li key={item.id} className="grid grid-cols-8 border-t pt-3">
                <div className="col-span-2 size-20 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    height={200}
                    width={200}
                    alt={item.title}
                    className="size-full object-cover"
                  />
                </div>
                <div className="space-y-2 col-span-6">
                  <h2 className="text-primary/90 line-clamp-2">{item.title}</h2>
                  <div className="flex items-center gap-5">
                    <p className="font-medium text-lg">
                      {formatIndianRupee(item.price * item.quantity)}
                    </p>
                    <p className="flex items-center gap-3">
                      <span>QTY:</span>
                      <span>{item.quantity}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
