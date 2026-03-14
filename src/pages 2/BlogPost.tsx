import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-amber-50 text-stone-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-stone-900">Post Not Found</h1>
          <Link to="/blog" className="mt-4 inline-block text-orange-700 hover:text-orange-800">Back to Blog</Link>
        </div>
      </div>
    );
  }

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

      {/* Blog Post Content */}
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">{post.category}</span>
          <h1 className="mt-4 text-4xl font-black text-stone-900 sm:text-5xl">{post.title}</h1>
          <p className="mt-2 text-lg text-stone-600">By धर्मोदय दशावतार बालन समूह</p>
          <p className="mt-1 text-sm text-stone-500">{new Date(post.date).toLocaleDateString()}</p>
        </div>

        <img src={post.image} alt={post.title} className="w-full rounded-lg shadow-lg" />

        <div className="mt-8 prose prose-lg max-w-none text-stone-700" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

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