import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-between max-w-3xl gap-12">
        <Link href="/blog" className="underline">
          Blog
        </Link>
        <h1 className="text-4xl">Home</h1>
      </div>cn
    </main>
  );
}
