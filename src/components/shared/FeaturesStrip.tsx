import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over 500 EGP" },
  { icon: RotateCcw, title: "Easy Returns", desc: "14-day return policy" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
  { icon: Headphones, title: "24/7 Support", desc: "Contact us anytime" },
];

export default function FeaturesStrip() {
  return (
    <section className="border-t border-green-100 bg-green-50">
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-100">
              <Icon className="size-5 text-green-600" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}