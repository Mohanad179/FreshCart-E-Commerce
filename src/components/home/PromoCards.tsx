import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const promos = [
    // promo card 1
  {
    badge: "🔥 Deal of the Day",
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    cta: "Shop Now",
    href: "/shop",
    gradient: "from-orange-500 to-rose-500",
    btnText: "text-orange-600",
  },
  // promo card 2  
  {
    badge: "✨ New Arrivals",
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    cta: "Explore Now",
    href: "/shop",
    gradient: "from-emerald-500 to-emerald-700",
    btnText: "text-emerald-600",
  },
];

export default function PromoCards() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2">
        {promos.map((p) => (
          <div
            key={p.code}
            className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${p.gradient} p-6 text-white`}
          >
            {/* decorative circles */}
            <span className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10" />
            <span className="pointer-events-none absolute -bottom-10 -left-10 size-32 rounded-full bg-white/10" />

            <div className="relative">
              <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium">
                {p.badge}
              </span>
              <h3 className="mt-5 text-3xl font-bold">{p.title}</h3>
              <p className="mt-2 text-white/90">{p.description}</p>

              <div className="mt-5 flex items-baseline gap-4">
                <span className="text-xl font-extrabold">{p.discount}</span>
                <span className="text-sm text-white/90">
                  Use code: <strong className="text-white">{p.code}</strong>
                </span>
              </div>

              <Link
                href={p.href}
                className={`mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm md-text-base font-semibold whitespace-nowrap transition hover:bg-white/90 ${p.btnText}`}
              >
                {p.cta}
                <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
