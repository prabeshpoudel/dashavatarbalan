export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export interface NewBlogPostInput {
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
}

export const BLOG_ADMIN_ID = "admin";
export const BLOG_ADMIN_PASSWORD = "balan123";
export const DEFAULT_BLOG_IMAGE =
  "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=800&q=80";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function getApiUrl(path: string) {
  return `${apiBaseUrl}${path}`;
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error || "Request failed.");
  }

  return payload as T;
}

export async function fetchBlogPosts() {
  const response = await fetch(getApiUrl("/api/posts"));
  return parseApiResponse<BlogPost[]>(response);
}

export async function fetchBlogPost(id: string) {
  const response = await fetch(getApiUrl(`/api/posts/${encodeURIComponent(id)}`));
  return parseApiResponse<BlogPost>(response);
}

export async function createBlogPost(input: NewBlogPostInput) {
  const response = await fetch(getApiUrl("/api/posts"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseApiResponse<BlogPost>(response);
}
