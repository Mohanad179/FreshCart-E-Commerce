import Link from "next/link";
import {
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  CreditCard,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";


const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      { label: "Electronics", href: "/categories/electronics" },
      { label: "Men's Fashion", href: "/categories/mens-fashion" },
      { label: "Women's Fashion", href: "/categories/womens-fashion" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Order History", href: "/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/signup" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const socials = [
  { label: "Facebook", href: "#", Icon: FaFacebook },
  { label: "Twitter", href: "#", Icon: FaTwitter },
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "YouTube", href: "#", Icon: FaYoutube },
];

const payments = ["Visa", "Mastercard", "PayPal"];

const linkHover = "transition-colors hover:text-primary";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-sm text-slate-400">
      <div className="mx-auto max-w-full px-5 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5"
            >
              <ShoppingCart className="size-6 text-primary" />
              <span className="text-2xl font-bold text-slate-900">FreshCart</span>
            </Link>

            <p className="max-w-md leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <ul className="flex flex-col gap-3">
              <li>
                <a href="tel:+18001234567" className={`flex items-center gap-3 ${linkHover}`}>
                  <Phone className="size-4 text-primary" />
                  +1 (800) 123-4567
                </a>
              </li>
              <li>
                <a href="mailto:support@freshcart.com" className={`flex items-center gap-3 ${linkHover}`}>
                  <Mail className="size-4 text-primary" />
                  support@freshcart.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" />
                123 Commerce Street, New York, NY 10001
              </li>
            </ul>

            <div className="flex gap-4">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`flex size-10 items-center justify-center rounded-full bg-slate-800 ${linkHover}`}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h3 className="mb-5 text-base font-semibold text-white">{title}</h3>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={linkHover}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
          <ul className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            {payments.map((name) => (
              <li key={name} className="flex items-center gap-2">
                <CreditCard className="size-4" />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
