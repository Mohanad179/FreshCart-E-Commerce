import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over 500 EGP" },
  { icon: RotateCcw, title: "Easy Returns", desc: "14-day return policy" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
  { icon: Headphones, title: "24/7 Support", desc: "Contact us anytime" },
];

export default function FeaturesStrip() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 border-t border-green-100 bg-green-50 mt-5">
      <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center justify-center gap-3">
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
