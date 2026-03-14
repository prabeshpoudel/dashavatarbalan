import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { blogPosts, BlogPost } from "../data/blogPosts";

const categories = ["All", "Shlok Meaning", "Hindu Knowledge", "Temple Project Updates", "Cultural Events", "News"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return blogPosts;
    return blogPosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-amber-200/70 bg-amber-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center space-x-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">Rampur, Palpa, Nepal</p>
              <h1 className="text-lg font-bold text-stone-900 sm:text-xl">धर्मोदय दशावतार बालन समूह</h1>
            </div>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link to="/" className="text-sm font-medium text-stone-700 transition hover:text-orange-700">Home</Link>
            <Link to="/blog" className="text-sm font-medium text-stone-700 transition hover:text-orange-700">Blog</Link>
          </nav>
          <button className="rounded-full bg-orange-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-800">
            Support Project
          </button>
        </div>
      </header>

      {/* Blog Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-700">Blog & Knowledge Center</p>
          <h2 className="mt-3 text-3xl font-black text-stone-900 sm:text-4xl">Latest Updates and Stories</h2>
          <p className="mt-5 text-base leading-8 text-stone-700">
            Stay updated with our latest news, cultural insights, project updates, and deep dives into Hindu knowledge including shlok meanings and spiritual teachings.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-orange-700 text-white"
                  : "bg-white text-stone-700 hover:bg-orange-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-200 bg-amber-100/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-stone-700 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-bold text-stone-900">धर्मोदय दशावतार बालन समूह</p>
            <p>Preserving Hindu culture through devotion, performance, and public education.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/" className="transition hover:text-orange-700">Home</Link>
            <Link to="/blog" className="transition hover:text-orange-700">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="rounded-[1.75rem] border border-amber-200 bg-white p-6 shadow-sm transition hover:shadow-xl">
      <img src={post.image} alt={post.title} className="h-48 w-full rounded-lg object-cover" />
      <div className="mt-4">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">{post.category}</span>
        <h3 className="mt-3 text-xl font-bold text-stone-900">{post.title}</h3>
        <p className="mt-2 text-sm text-stone-500">{new Date(post.date).toLocaleDateString()}</p>
        <p className="mt-3 text-sm leading-7 text-stone-700">{post.excerpt}</p>
        <Link
          to={`/blog/${post.id}`}
          className="mt-4 inline-block text-sm font-semibold text-orange-700 hover:text-orange-800"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}