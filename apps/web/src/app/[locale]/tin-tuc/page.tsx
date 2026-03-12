import { setRequestLocale } from "next-intl/server";
import { BLOG_POSTS } from "@/lib/blog";
import BlogListingView from "@/components/blog/BlogListingView";

export const runtime = 'edge';

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BlogListingView initialPosts={BLOG_POSTS} />;
}
