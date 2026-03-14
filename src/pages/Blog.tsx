import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BLOG_ADMIN_ID,
  BLOG_ADMIN_PASSWORD,
  BlogPost,
  createBlogPost,
  getBlogPosts,
  saveBlogPosts,
} from "../data/blogPosts";

const categories = [
  "All",
  "Shlok Meaning",
  "Hindu Knowledge",
  "Temple Project Updates",
  "Cultural Events",
  "News",
  "Dashavatar",
];

const nav = ["Home", "About", "Dashavatar", "Gods", "Events", "Temple Project", "Gallery", "Blog", "Contact"];

const emptyPostForm = {
  title: "",
  category: "News",
  image: "",
  excerpt: "",
  content: "",
};

function formatContent(content: string) {
  return content
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(() => getBlogPosts());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showSupport, setShowSupport] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [postForm, setPostForm] = useState(emptyPostForm);
  const [postMessage, setPostMessage] = useState("");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") {
      return posts;
    }

    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const handleAdminLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (adminId === BLOG_ADMIN_ID && adminPassword === BLOG_ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setAdminError("");
      return;
    }

    setAdminError("Incorrect admin ID or password.");
  };

  const handleAddPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newPost = createBlogPost({
      ...postForm,
      content: formatContent(postForm.content),
      image:
        postForm.image ||
        "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=800&q=80",
    });

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    saveBlogPosts(updatedPosts);
    setPostForm(emptyPostForm);
    setSelectedCategory("All");
    setPostMessage("New post added successfully.");
  };

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

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-700">Blog & Knowledge Center</p>
            <h2 className="mt-3 text-3xl font-black text-stone-900 sm:text-4xl">Latest Updates and Stories</h2>
            <p className="mt-5 text-base leading-8 text-stone-700">
              Stay updated with our latest news, cultural insights, project updates, and deep dives into Hindu knowledge including shlok meanings and spiritual teachings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isAdminAuthenticated && (
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                Admin access enabled
              </span>
            )}
            <button
              onClick={() => {
                setIsAdminPanelOpen((currentValue) => !currentValue);
                setAdminError("");
                setPostMessage("");
              }}
              className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              {isAdminPanelOpen ? "Close Admin" : "Add Post"}
            </button>
          </div>
        </div>

        {isAdminPanelOpen && (
          <div className="mt-8 rounded-[1.75rem] border border-amber-200 bg-white p-6 shadow-sm">
            {!isAdminAuthenticated ? (
              <form onSubmit={handleAdminLogin} className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-stone-900">Admin Login</h3>
                  <p className="mt-2 text-sm text-stone-600">
                    Enter the admin ID and password to unlock blog post publishing.
                  </p>
                </div>

                <label className="text-sm font-medium text-stone-700">
                  Admin ID
                  <input
                    type="text"
                    value={adminId}
                    onChange={(event) => setAdminId(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-amber-200 px-4 py-3 outline-none transition focus:border-orange-500"
                    placeholder="Enter admin ID"
                    required
                  />
                </label>

                <label className="text-sm font-medium text-stone-700">
                  Password
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(event) => setAdminPassword(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-amber-200 px-4 py-3 outline-none transition focus:border-orange-500"
                    placeholder="Enter password"
                    required
                  />
                </label>

                {adminError && (
                  <p className="md:col-span-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {adminError}
                  </p>
                )}

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="rounded-full bg-orange-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-800"
                  >
                    Unlock Admin
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAddPost} className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-stone-900">Create New Blog Post</h3>
                    <p className="mt-2 text-sm text-stone-600">
                      Fill in the details below to publish a new update on the blog page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminAuthenticated(false);
                      setAdminId("");
                      setAdminPassword("");
                      setPostMessage("");
                    }}
                    className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
                  >
                    Log Out
                  </button>
                </div>

                <label className="text-sm font-medium text-stone-700">
                  Title
                  <input
                    type="text"
                    value={postForm.title}
                    onChange={(event) => {
                      setPostForm({ ...postForm, title: event.target.value });
                      setPostMessage("");
                    }}
                    className="mt-2 w-full rounded-2xl border border-amber-200 px-4 py-3 outline-none transition focus:border-orange-500"
                    placeholder="Post title"
                    required
                  />
                </label>

                <label className="text-sm font-medium text-stone-700">
                  Category
                  <select
                    value={postForm.category}
                    onChange={(event) => {
                      setPostForm({ ...postForm, category: event.target.value });
                      setPostMessage("");
                    }}
                    className="mt-2 w-full rounded-2xl border border-amber-200 px-4 py-3 outline-none transition focus:border-orange-500"
                  >
                    {categories
                      .filter((category) => category !== "All")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </label>

                <label className="text-sm font-medium text-stone-700 md:col-span-2">
                  Image URL
                  <input
                    type="url"
                    value={postForm.image}
                    onChange={(event) => {
                      setPostForm({ ...postForm, image: event.target.value });
                      setPostMessage("");
                    }}
                    className="mt-2 w-full rounded-2xl border border-amber-200 px-4 py-3 outline-none transition focus:border-orange-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </label>

                <label className="text-sm font-medium text-stone-700 md:col-span-2">
                  Excerpt
                  <textarea
                    value={postForm.excerpt}
                    onChange={(event) => {
                      setPostForm({ ...postForm, excerpt: event.target.value });
                      setPostMessage("");
                    }}
                    className="mt-2 min-h-28 w-full rounded-2xl border border-amber-200 px-4 py-3 outline-none transition focus:border-orange-500"
                    placeholder="Short summary for the blog card"
                    required
                  />
                </label>

                <label className="text-sm font-medium text-stone-700 md:col-span-2">
                  Content
                  <textarea
                    value={postForm.content}
                    onChange={(event) => {
                      setPostForm({ ...postForm, content: event.target.value });
                      setPostMessage("");
                    }}
                    className="mt-2 min-h-48 w-full rounded-2xl border border-amber-200 px-4 py-3 outline-none transition focus:border-orange-500"
                    placeholder="Write the full post here. Each new line becomes a new paragraph."
                    required
                  />
                </label>

                {postMessage && (
                  <p className="md:col-span-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    {postMessage}
                  </p>
                )}

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="rounded-full bg-orange-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-800"
                  >
                    Publish Post
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

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

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

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
