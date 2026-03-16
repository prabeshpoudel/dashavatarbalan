import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogPost as BlogPostType, fetchBlogPost } from "../data/blogPosts";

const nav = ["Home", "About", "Dashavatar", "Gods", "Events", "Temple Project", "Gallery", "Blog", "Contact"];

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [showSupport, setShowSupport] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setIsLoadingPost(false);
      setLoadError("Post not found.");
      return;
    }

    let isMounted = true;

    const loadPost = async () => {
      try {
        const currentPost = await fetchBlogPost(id);

        if (!isMounted) {
          return;
        }

        setPost(currentPost);
        setLoadError("");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setPost(null);
        setLoadError(error instanceof Error ? error.message : "Unable to load post.");
      } finally {
        if (isMounted) {
          setIsLoadingPost(false);
        }
      }
    };

    loadPost();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoadingPost) {
    return (
      <div className="min-h-screen bg-amber-50 text-stone-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-stone-900">Loading Post</h1>
          <p className="mt-4 text-stone-600">Fetching the latest version from the shared database.</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-amber-50 text-stone-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-stone-900">Post Not Found</h1>
          {loadError && <p className="mt-4 text-sm text-stone-600">{loadError}</p>}
          <Link to="/blog" className="mt-4 inline-block text-orange-700 hover:text-orange-800">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800">
      {showSupport && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
            <button
              onClick={() => setShowSupport(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              Close
            </button>
            <div className="p-6">
              <h3 className="mb-4 text-2xl font-bold text-stone-900">Support Our Project</h3>
              <div className="mb-4 flex justify-center">
                <img src="https://via.placeholder.com/300x300.png?text=Scan+to+Donate" alt="QR Code for donation" className="h-48 w-48 rounded-lg" />
              </div>
              <div className="space-y-2 text-center">
                <p className="text-sm text-stone-700"><strong>Bank Name:</strong> Global IME Bank</p>
                <p className="text-sm text-stone-700"><strong>Account Name:</strong> Dharmodaya Dashavatar Balan Samuh</p>
                <p className="text-sm text-stone-700"><strong>Account Number:</strong> 1234567890</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-amber-200/70 bg-amber-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center space-x-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">Rampur, Palpa, Nepal</p>
              <h1 className="text-lg font-bold text-stone-900 sm:text-xl">धर्मोदय दशावतार बालन समूह</h1>
            </div>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {nav.map((item) => (
              item === "Blog" ? (
                <Link key={item} to="/blog" className="text-sm font-medium text-stone-700 transition hover:text-orange-700">
                  {item}
                </Link>
              ) : (
                <a key={item} href={`/#${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm font-medium text-stone-700 transition hover:text-orange-700">
                  {item}
                </a>
              )
            ))}
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              <div className="flex flex-col space-y-1">
                <div className="h-0.5 w-6 bg-stone-700"></div>
                <div className="h-0.5 w-6 bg-stone-700"></div>
                <div className="h-0.5 w-6 bg-stone-700"></div>
              </div>
            </button>
          </div>
          <button onClick={() => setShowSupport(true)} className="rounded-full bg-orange-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-800">
            Support Project
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden">
          <div className="fixed left-0 top-0 w-full bg-amber-50 p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">Rampur, Palpa, Nepal</p>
                <h1 className="text-lg font-bold text-stone-900">धर्मोदय दशावतार बालन समूह</h1>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-xl text-stone-700">✕</button>
            </div>
            <nav className="flex flex-col space-y-4">
              {nav.map((item) => (
                item === "Blog" ? (
                  <Link key={item} to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-amber-200 py-2 text-lg font-medium text-stone-700 transition hover:text-orange-700 last:border-b-0">
                    {item}
                  </Link>
                ) : (
                  <a key={item} href={`/#${item.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => setIsMobileMenuOpen(false)} className="border-b border-amber-200 py-2 text-lg font-medium text-stone-700 transition hover:text-orange-700 last:border-b-0">
                    {item}
                  </a>
                )
              ))}
            </nav>
          </div>
        </div>
      )}

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
