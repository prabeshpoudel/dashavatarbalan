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

const BLOG_POSTS_STORAGE_KEY = "balanadmin.blogPosts";

export const blogPosts: BlogPost[] = [
  {
    id: "gita-4-8",
    title: "Meaning of Bhagavad Gita 4.8",
    category: "Shlok Meaning",
    date: "2026-03-13",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    excerpt: "Explanation of the famous shlok from Bhagavad Gita Chapter 4, Verse 8.",
    content: `
      <h2>Shlok</h2>
      <p>परित्राणाय साधूनां विनाशाय च दुष्कृताम् ।<br>धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥</p>
      
      <h2>Transliteration</h2>
      <p>Paritrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām<br>Dharmasaṁsthāpanārthāya sambhavāmi yuge yuge</p>
      
      <h2>Meaning</h2>
      <p>For the protection of the righteous, for the destruction of the wicked, and for the establishment of dharma, I am born in every age.</p>
      
      <h2>Explanation</h2>
      <p>This shlok from Bhagavad Gita explains Lord Krishna's purpose in incarnating as avatars. He appears to protect the good, eliminate evil, and restore righteousness whenever dharma is threatened.</p>
      
      <h2>Conclusion</h2>
      <p>This verse reminds us of the divine intervention in maintaining cosmic order and encourages us to uphold dharma in our lives.</p>
    `,
  },
  {
    id: "temple-update-2026",
    title: "Temple Project Progress Update",
    category: "Temple Project Updates",
    date: "2026-03-10",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80",
    excerpt: "Latest updates on the construction and community involvement in the Rampur temple project.",
    content: `
      <h2>Current Progress</h2>
      <p>The temple foundation has been completed, and construction of the main structure is underway. Community donations have exceeded our initial goals.</p>
      
      <h2>Community Involvement</h2>
      <p>Volunteers from Rampur and surrounding areas have been actively participating in the construction work and fundraising events.</p>
      
      <h2>Upcoming Events</h2>
      <p>We have planned several cultural programs and bhajans to celebrate the progress and raise awareness.</p>
    `,
  },
  {
    id: "dashavatar-significance",
    title: "The Significance of Dashavatar in Modern Times",
    category: "Hindu Knowledge",
    date: "2026-03-08",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
    excerpt: "Exploring how the ten avatars of Vishnu continue to inspire and guide us in contemporary life.",
    content: `
      <h2>Introduction</h2>
      <p>The Dashavatar represents the ten incarnations of Lord Vishnu, each appearing at different times to restore balance and righteousness.</p>
      
      <h2>Relevance Today</h2>
      <p>In today's fast-paced world, these stories teach us about courage, wisdom, and devotion that are timeless.</p>
      
      <h2>Conclusion</h2>
      <p>By understanding these avatars, we can draw inspiration for our daily lives and spiritual growth.</p>
    `,
  },
  {
    id: "cultural-event-report",
    title: "Dashavatar Balan Performance Report",
    category: "Cultural Events",
    date: "2026-03-05",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    excerpt: "A detailed report on the recent Dashavatar Balan performance held in Rampur.",
    content: `
      <h2>Event Overview</h2>
      <p>The performance showcased traditional storytelling through dance and music, attracting over 200 attendees.</p>
      
      <h2>Highlights</h2>
      <p>Young performers brought the stories of Vishnu's avatars to life with authentic costumes and narration.</p>
      
      <h2>Impact</h2>
      <p>This event strengthened community bonds and educated the audience about Hindu mythology.</p>
    `,
  },{
  id: "matsya-avatar-story",
  title: "The Story of Matsya Avatar – The First Incarnation of Vishnu",
  category: "Dashavatar",
  date: "2026-03-14",
  image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80",
  excerpt: "Exploring the story of Matsya Avatar and how Lord Vishnu saved the sacred knowledge and humanity from the great flood.",
  content: `
    <h2>Introduction</h2>
    <p>Matsya Avatar is the first incarnation of Lord Vishnu in the Dashavatar tradition. In this form, Vishnu appeared as a giant fish to protect life and sacred knowledge during a great cosmic flood.</p>

    <h2>The Story</h2>
    <p>According to Hindu scriptures, King Manu once discovered a small fish asking for protection. As the king cared for it, the fish grew larger and revealed itself as Lord Vishnu. Matsya warned Manu about a great flood that would soon cover the earth.</p>

    <h2>The Great Flood</h2>
    <p>Lord Vishnu instructed King Manu to build a large boat and gather sages, seeds of plants, and important knowledge to preserve life. When the flood arrived, Matsya Avatar guided the boat safely through the waters.</p>

    <h2>Importance in Hindu Tradition</h2>
    <p>The Matsya Avatar symbolizes protection, preservation of knowledge, and divine guidance during times of crisis. It teaches that faith, wisdom, and righteousness help humanity survive difficult times.</p>
  `,
}
];

export function getBlogPosts(): BlogPost[] {
  if (typeof window === "undefined") {
    return blogPosts;
  }

  const storedPosts = window.localStorage.getItem(BLOG_POSTS_STORAGE_KEY);

  if (!storedPosts) {
    return blogPosts;
  }

  try {
    const parsedPosts = JSON.parse(storedPosts) as BlogPost[];
    return Array.isArray(parsedPosts) ? parsedPosts : blogPosts;
  } catch {
    return blogPosts;
  }
}

export function saveBlogPosts(posts: BlogPost[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(BLOG_POSTS_STORAGE_KEY, JSON.stringify(posts));
}

export function createBlogPost(input: NewBlogPostInput): BlogPost {
  const slug = input.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return {
    id: `${slug || "post"}-${Date.now()}`,
    title: input.title,
    category: input.category,
    date: new Date().toISOString().split("T")[0],
    image: input.image,
    excerpt: input.excerpt,
    content: input.content,
  };
}
