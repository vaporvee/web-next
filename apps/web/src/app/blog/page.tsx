import Link from "next/link";

import { sanityFetch } from "@/sanity/client";
import { Post } from "@/sanity/sanity.types";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

export default async function IndexPage() {
  try {
    const result = await sanityFetch({
      query: POSTS_QUERY,
      perspective: "published",
    });
    console.log("Fetched posts data:", result);
    const posts: Post[] = Array.isArray(result) ? result : [];

    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <Link href="/">Home</Link>
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <ul className="flex flex-col gap-y-4">
          {posts.map((post) => (
            <li className="hover:underline" key={post._id}>
              <Link href={`blog/${post.slug?.current}`}>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p>{new Date(post.publishedAt ?? "").toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    );
  } catch (error) {
    console.error("Error fetching posts data:", error);
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <Link href="/">Home</Link>
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p>Error fetching posts data.</p>
      </main>
    );
  }
}
