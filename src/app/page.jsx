'use client'

import Category from "@/components/category";
import { ProductSection } from "@/components/product-section";
import SliderBillboard from "@/components/slider-billboard";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Category */}
      <Category />

      {/* Carasoul Slider */}
      <SliderBillboard />

      {/* Latest Collection */}
      <section className="bg-secondary/20 px-4 py-8 rounded-lg">
        <h2 className="text-xl text-rose font-semibold tracking-tight">
          Latest Collections <span className="text-primary">.</span>
        </h2>
        <ProductSection baseUrl="?limit=" />
      </section>

      {/* Home Appliances */}
      <section className="my-8 rounded-lg">
        <h2 className="text-xl font-semibold tracking-tight">
          Home Appliances <span className="text-primary">.</span>
        </h2>
        <ProductSection
          baseUrl="/category?type=appliances&limit="
          showBtn={false}
        />
      </section>

      {/* Home Appliances */}
      <section className="bg-secondary/20 px-4 py-8 my-8 rounded-lg">
        <h2 className="text-rose text-xl font-semibold tracking-tight">
          Gaming Lovers <span className="text-primary">.</span>
        </h2>

        <ProductSection
          baseUrl="/category?type=gaming&limit="
          showBtn={false}
        />
      </section>
    </div>
  );
}
