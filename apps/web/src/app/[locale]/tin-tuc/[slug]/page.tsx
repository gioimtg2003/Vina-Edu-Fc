import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { BLOG_POSTS } from "@/lib/blog";
import BlogDetailView from "@/components/blog/BlogDetailView";

export const runtime = 'edge';

interface BlogPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.id === slug);

  if (!post) {
    return {
      title: "Bài viết không tồn tại - VinaUAV",
    };
  }

  return {
    title: `${post.title} | VinaUAV Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.id,
    }));
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = BLOG_POSTS.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== slug).slice(0, 3);

  // Article Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.coverImage],
    "datePublished": post.date,
    "dateModified": post.updatedAt || post.date,
    "author": [{
      "@type": "Person",
      "name": post.author,
      "url": "https://vinauav.com" 
    }],
    "publisher": {
      "@type": "Organization",
      "name": "VinaUAV",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vinauav.com/logo.png"
      }
    },
    "description": post.excerpt
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailView post={post} relatedPosts={relatedPosts} />
    </>
  );
}
