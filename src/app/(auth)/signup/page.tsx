import SignupForm from '@/components/authForms/SignupForm'
import { Star, Truck, ShieldCheck } from "lucide-react";


const features = [
  { icon: Star, title: "Premium Quality", desc: "Premium quality products sourced from trusted suppliers." },
  { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery available in most areas" },
  { icon: ShieldCheck, title: "Secure Shopping", desc: "Your data and payments are completely secure" },
];

export default function SignupPage() {
  return (
    <section className="container mx-auto px-4 py-10 sm:py-14 lg:py-12">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
        {/* Left side: desktop only */}
        <div className="hidden lg:block">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to <span className="text-green-600">FreshCart</span>
          </h1>
          <p className="mt-3 text-lg text-gray-700">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>

          <ul className="mt-8 space-y-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <Icon className="size-5 fill-green-600 text-green-600" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: form card */}
        <SignupForm />
      </div>
    </section>
  );
}