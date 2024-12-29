import {
  PortableText,
  createDataAttribute,
  defineQuery,
  stegaClean,
} from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { getImageAsset, getImageDimensions } from "@sanity/asset-utils";
import { sanityFetch } from "@/sanity/client";
import Link from "next/link";
import { Post, SanityImageAsset } from "@/sanity/sanity.types";
import type { Metadata } from "next";
import Image from "next/image";
import { UrlFor } from "@/app/lib/image-helper";

const POSTS_QUERY = defineQuery(`*[_type == "post"]{ slug }`);
const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]`
);

type PageParams = Promise<{
  slug: string;
}>;

export async function generateStaticParams() {
  const posts: Post[] = (
    await sanityFetch({
      query: POSTS_QUERY,
      stega: false,
      perspective: "published",
    })
  ).data;
  return posts.map((post) => ({
    slug: post.slug?.current ?? "",
  }));
}

export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const params = await props.params;
  const post: Post = (
    await sanityFetch({ query: POST_QUERY, params, stega: false })
  ).data;
  const ogImage = post.mainImage
    ? UrlFor(post.mainImage)?.width(550).height(310).url()
    : null;
  const firstBlock = post.body ? post.body[0] : undefined;
  let description: string | undefined = undefined;
  if (firstBlock && firstBlock._type === "block" && firstBlock.children) {
    description = firstBlock.children.map((child) => child.text).join(" ");
  }

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `/blog/${post.slug}`,
      images: [
        {
          url: ogImage ?? "",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

function dynamicHeight(
  originalHeight: number,
  originalWidth: number,
  isInline: boolean
) {
  const targetWidth = isInline ? 100 : 768;
  return (targetWidth * originalHeight) / originalWidth;
}

import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();

function PortableImage({
  value,
  isInline,
}: {
  value: SanityImageAsset;
  isInline: boolean;
}) {
  const { width, height } = getImageDimensions(value);
  const imageAsset = getImageAsset(value, {
    projectId: projectId ?? "",
    dataset: dataset ?? "",
  });
  const attr = createDataAttribute({
    id: imageAsset._id,
    type: imageAsset._type,
    workspace: "production",
  });

  return (
    <Image
      data-sanity={attr("body")}
      src={imageUrlBuilder()
        .projectId(projectId ?? "")
        .dataset(dataset ?? "")
        .image(value)
        .width(isInline ? 100 : 768)
        .fit("max")
        .auto("format")
        .url()}
      width={
        isInline ? (width >= 100 ? 768 : width) : width >= 768 ? 768 : width
      }
      height={dynamicHeight(height, width, isInline)}
      alt={value.altText || " "}
      loading="lazy"
      className="border rounded-lg shadow-md"
      style={{
        display: isInline ? "inline-block" : "block",
        aspectRatio: width / height,
      }}
    />
  );
}

const components = {
  types: {
    image: PortableImage,
  },
  marks: {
    left: ({ children }: { children: React.ReactNode }) => (
      <span style={{ textAlign: "left", width: "100%", display: "block" }}>
        {children}
      </span>
    ),
    center: ({ children }: { children: React.ReactNode }) => (
      <span style={{ textAlign: "center", width: "100%", display: "block" }}>
        {children}
      </span>
    ),
    right: ({ children }: { children: React.ReactNode }) => (
      <span style={{ textAlign: "right", width: "100%", display: "block" }}>
        {children}
      </span>
    ),
    textColor: ({
      children,
      value = { value: "" },
    }: {
      children: React.ReactNode;
      value?: { value: string };
    }) => <span style={{ color: stegaClean(value.value) }}>{children}</span>,
    highlightColor: ({
      children,
      value = { value: "" },
    }: {
      children: React.ReactNode;
      value?: { value: string };
    }) => (
      <span style={{ background: stegaClean(value.value) }}>{children}</span>
    ),
  },
};

export default async function PostPage(props: { params: Promise<PageParams> }) {
  const params = await props.params;
  const post: Post = (await sanityFetch({ query: POST_QUERY, params })).data;
  const postImageUrl = post.mainImage
    ? UrlFor(post.mainImage)?.width(912).height(576).url()
    : null;
  const attr = createDataAttribute({
    id: post._id,
    type: post._type,
    workspace: "production",
  });

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/blog" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={
            stegaClean(post.title) ?? `Blog Post Banner Image for ${post.title}`
          }
          className="aspect-video rounded-xl w-full"
          width="912"
          height="576"
          data-sanity={attr("mainImage")}
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <p className="text-sm max-w-full">{post.publishedAt?.substring(0, 10)}</p>
      <div
        className="items-start mt-2 mb-8 prose dark:prose-invert text-left"
        style={{ maxWidth: "100%" }}
      >
        {Array.isArray(post.body) && (
          <PortableText value={post.body} components={components} />
        )}
      </div>
    </main>
  );
}
