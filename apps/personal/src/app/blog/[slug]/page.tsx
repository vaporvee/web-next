import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const POST_QUERY = defineQuery(`*[
    _type == "post" &&
    slug.current == $slug
  ][0]{
  ...,
  "publishedAt": coalesce(publishedAt, now()),
}`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: await params,
  });
  if (!post) {
    notFound();
  }
  const { title, publishedAt, mainImage, body } = post;
  const postImageUrl = mainImage
    ? urlFor(mainImage)?.width(550).height(310).url()
    : null;
  const postDate = new Date(publishedAt).toDateString();
  const postTime = new Date(publishedAt).toLocaleTimeString();

  return (
    <main>
      <div className="mb-4">
        <Link href="/">← Back to Home</Link>
        <Link href="/blog">← Back to Blog</Link>
      </div>
      <div>
        {postImageUrl && (
          <Image
            src={postImageUrl}
            alt={title || "Blog post image"}
            height="310"
            width="550"
          />
        )}
        <div>
          <div>
            {title ? (
              <h1 className="text-4xl font-bold tracking-tighter mb-8">
                {title}
              </h1>
            ) : null}
            <dl>
              <dd className="font-semibold">Date</dd>
              <div>
                {postDate && <dt>{postDate}</dt>}
                {postTime && <dt>{postTime}</dt>}
              </div>
            </dl>
          </div>
          {body && body.length > 0 && (
            <div className="prose max-w-none">
              <PortableText value={body} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
