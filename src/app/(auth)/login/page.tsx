import Image from "next/image";
import { Truck, ShieldCheck, Clock } from "lucide-react";
import LoginForm from "@/components/authForms/LoginForm";
import FeaturesStrip from "@/components/shared/FeaturesStrip";
import cartImage from "@/images/loginCartImage.png"


const badges = [
  { icon: Truck, label: "Free Delivery" },
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: Clock, label: "24/7 Support" },
];


export default function Login() {
  return (
    <>
      <section className="container mx-auto px-4 py-10 sm:py-14 lg:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          {/* Left side: desktop only */}
          <div className="hidden flex-col items-center text-center lg:flex">
            <div className="relative h-90 w-full overflow-hidden rounded-2xl bg-white shadow-lg">
              <Image src={cartImage} alt="FreshCart" fill className="object-contain" priority />
            </div>

            <h2 className="mt-6 text-3xl font-bold leading-tight text-gray-900">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of happy customers who trust FreshCart for their
              daily grocery needs
            </p>

            <div className="mt-5 flex items-center justify-center gap-6">
              {badges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <Icon className="size-4 text-green-600" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right side: form card */}
          <LoginForm />
        </div>
      </section>

      <FeaturesStrip/>
    </>
  );
}