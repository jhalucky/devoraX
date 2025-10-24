import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { bodyFont, headingFont } from "@/lib/fonts";

export default async function DocPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "docs", `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className={`min-h-screen flex items-center justify-center text-gray-400 ${bodyFont.className}`}>
        ❌ Documentation not found.
      </div>
    );
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);

  return (
    <div className={`min-h-screen bg-black text-gray-200 p-8 ${bodyFont.className}`}>
      <article className="prose prose-invert max-w-3xl mx-auto">
        <h1 className={`text-3xl mb-6 font-bold ${headingFont.className}`}>{data.title}</h1>
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
