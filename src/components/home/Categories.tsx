import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/services/categories";

export default async function Categories() {
  const categories = (await getAllCategories()) ?? [];

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Shop By <span className="text-primary">Categories</span></h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {categories.map(category => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="flex flex-col items-center gap-3 rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={100}
              height={100}
              className="size-24 rounded-full object-cover"
            />
            <p className="text-center font-medium">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
