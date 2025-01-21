import Link from "next/link";

const categories = ["TV", "audio", "laptop", "mobile", "gaming", "appliances"];

const Category = () => {
  return (
    <section className="my-2">
      <ul className="flex items-center justify-center flex-wrap gap-4">
        {categories.map((cat, i) => (
          <li key={cat} className="capitalize">
            <Link href={`/search/${cat.toLocaleLowerCase()}`}>{cat}</Link>
            {i !== categories.length - 1 && (
              <span className="ml-4 text-foreground/50">|</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Category;
