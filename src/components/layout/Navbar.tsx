import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Gift,
  Headphones,
  Heart,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/images/navlogo.png";
import NavbarAuthActions from "@/components/layout/NavbarAuthActions";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Brands", href: "/brands" },
];

const categories = [
  { label: "All Categories", href: "/shop" },
  { label: "Electronics", href: "/shop?category=electronics" },
  { label: "Women's Fashion", href: "/shop?category=womens-fashion" },
  { label: "Men's Fashion", href: "/shop?category=mens-fashion" },
  { label: "Beauty & Health", href: "/shop?category=beauty-health" },
];

export default function Navbar() {
  return (
    <>
      <header className="w-full bg-background">
      {/* Top bar (desktop only) */}
      <div className="hidden border-b text-sm text-muted-foreground lg:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <Truck className="size-4 text-primary" /> Free Shipping on Orders 500 EGP
            </span>
            <span className="flex items-center gap-2">
              <Gift className="size-4 text-primary" /> New Arrivals Daily
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="size-4 text-primary" /> +1 (800) 123-4567
            </span>
            <span className="flex items-center gap-2">
              <Mail className="size-4 text-primary" /> support@freshcart.com
            </span>
            <NavbarAuthActions variant="header" />
          </div>
        </div>
      </div>
      </header>

      {/* Main bar: wraps so the search drops to its own row on mobile */}
      <div className="sticky top-0 z-50 bg-background">
        <div className="container mx-auto flex flex-wrap items-center gap-4 px-4 py-4 lg:flex-nowrap lg:gap-8">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger
            render={
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent lg:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>FreshCart</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-md px-3 py-2"
                >
                  {l.label}
                </Link>
              ))}
              <p className="mt-4 px-3 text-xs font-semibold text-muted-foreground">
                Categories
              </p>
              {categories.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className="rounded-md px-3 py-2 text-sm"
                >
                  {c.label}
                </Link>
              ))}
              <NavbarAuthActions variant="mobile" />
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="FreshCart logo" width={165} height={35} />
        </Link>

        {/* Search: one form for all screens */}
        <form className="order-last flex w-full items-center rounded-full border py-1 pl-5 pr-1 lg:order-0 lg:w-auto lg:max-w-xl lg:flex-1">
          <input
            type="search"
            placeholder="Search for products, brands and more..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
          <Button
            type="submit"
            size="icon"
            aria-label="Search"
            className={`size-9 rounded-full bg-primary cursor-pointer`}
          >
            <Search className="size-4 " />
          </Button>
        </form>

        {/* Desktop links */}
        <nav className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
          <Link className="hover:text-primary" href="/">Home</Link>
          <Link className="hover:text-primary" href="/shop">Shop</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="group flex items-center gap-1 outline-none cursor-pointer hover:text-primary">
              Categories
              <ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 p-2">
              {categories.map((c) => (
                <DropdownMenuItem key={c.label} className="py-2.5">
                  <Link href={c.href}>{c.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link className="hover:text-primary" href="/brands">Brands</Link>
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:gap-3">
          <div className="hidden items-center gap-3 border-r pr-5 xl:flex">
            <Headphones className="size-6" />
            <div className="leading-tight">
              <p className="text-xs text-muted-foreground">Support</p>
              <p className="text-sm font-semibold">24/7 Help</p>
            </div>
          </div>
          <Button
            className="hover:text-primary"
            nativeButton={false}
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            render={<Link href="/wishlist" />}
          >
            <Heart className="size-6" />
          </Button>
          <Button
            className="hover:text-primary"
            nativeButton={false}
            variant="ghost"
            size="icon"
            aria-label="Cart"
            render={<Link href="/cart" />}
          >
            <ShoppingCart className="size-6" />
          </Button>
          <NavbarAuthActions variant="desktop" />
        </div>
      </div>
      </div>
    </>
  );
}
