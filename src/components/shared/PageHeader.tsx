import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  gradient?: string;
  title: string;
  description: string;
  icon: LucideIcon;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHeader({
  gradient = "from-green-600 to-green-400",
  title,
  description,
  icon: Icon,
  breadcrumbs = [],
}: PageHeaderProps) {
  return (
    <section className={`bg-linear-to-r ${gradient} text-white`}>
      <div className="container mx-auto px-5 py-6 md:py-8">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm md:text-base">
          <Link href="/" className="opacity-90 hover:opacity-100">
            Home
          </Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-2">
              <span className="opacity-70">/</span>
              {crumb.href ? (
                <Link href={crumb.href} className="opacity-90 hover:opacity-100">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm md:size-20">
            <Icon className="size-6 md:size-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-4xl">{title}</h1>
            <p className="mt-1 text-xs opacity-90 sm:text-sm md:text-base">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
