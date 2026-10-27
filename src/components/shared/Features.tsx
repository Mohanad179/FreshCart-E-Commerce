import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", text: "On orders over 500 EGP", bg: "bg-blue-50", color: "text-blue-500" },
  { icon: ShieldCheck, title: "Secure Payment", text: "100% secure transactions", bg: "bg-emerald-50", color: "text-emerald-500" },
  { icon: RotateCcw, title: "Easy Returns", text: "14-day return policy", bg: "bg-orange-50", color: "text-orange-500" },
  { icon: Headset, title: "24/7 Support", text: "Dedicated support team", bg: "bg-purple-50", color: "text-purple-500" },
];

export default function Features() {
  return (
    <section className="bg-gray-50 px-4 py-10">
      <div className="mx-auto grid max-w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text, bg, color }) => (
          <div
            key={title}
            className="flex items-center gap-5 rounded-xl bg-white p-5 shadow-sm"
          >
            <div className={`flex size-12 shrink-0 items-center justify-center rounded-full ${bg}`}>
              <Icon className={`size-6 ${color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}