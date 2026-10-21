import type { Metadata } from "next";
import Link from "next/link";
import { listBlogs } from "@/server/repositories/blogs.repository";
import { getPublishedPageBySlug } from "@/server/repositories/pages.repository";
import { getSiteContext } from "@/server/services/site";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { PageHero } from "@/components/website/PageHero";
import { CmsImage } from "@/components/website/CmsImage";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils/cn";
import { pageBanner } from "@/lib/page-banner";
import { ArrowRight, Calendar, Clock, UserCheck } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContext();
  return buildMetadata({
    seo: null,
    fallbackTitle: "LED TV Repair Blog & Troubleshooting Guides",
    fallbackDescription: "Guides, troubleshooting tips and expert advice on LED, OLED and Smart TV repair in Noida & Delhi NCR.",
    path: "/blog",
    settings: site.settings,
  });
}

export default async function BlogIndexPage() {
  const [{ data }, page] = await Promise.all([
    listBlogs({ publishedOnly: true, pageSize: 12 }),
    getPublishedPageBySlug("blog"),
  ]);

  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />
      <PageHero
        eyebrow="Technical Journal & Guides"
        title="LED TV Repair Guides & Expert Advice"
        description="Practical diagnostic solutions and troubleshooting advice from certified technicians who fix TVs every day."
        image={pageBanner(page)}
      />

      <section className="section-pad bg-paper">
        <div className="container-wide">
          {/* Quick Filter / Highlights header */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-line/60 pb-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">Latest Repair Articles</h2>
              <p className="text-sm text-muted mt-1">Detailed guides for power faults, screen issues, audio problems & smart TV setups.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-copper/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-copper">
              <span>⚡ Same-Day Noida Doorstep Visits</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((post) => (
              <article
                key={post.id}
                className="group relative card-surface overflow-hidden rounded-2xl bg-white border border-line shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-[0.99] flex flex-col justify-between"
              >
                {/* Full-card instant overlay link for immediate click response */}
                <Link
                  prefetch={true}
                  href={`/blog/${post.slug}`}
                  className="absolute inset-0 z-20 cursor-pointer"
                  aria-label={`Read article: ${post.title}`}
                />

                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-cream">
                    <CmsImage
                      src={post.image_url}
                      alt={post.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                    {/* Category pill on image */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                        {post.category_name || "Repair Guide"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={13} className="text-copper" />
                        {formatDate(post.published_at)}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 font-medium">
                        <UserCheck size={13} className="text-copper" />
                        {post.author_name || "Site Admin"}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-lg sm:text-xl font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-copper">
                      {post.title}
                    </h3>

                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 sm:p-6 sm:pt-0">
                  <div className="flex items-center justify-between border-t border-line/60 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                      <Clock size={13} className="text-copper" /> 4 min read
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-copper/10 px-3.5 py-1.5 text-xs font-bold text-copper group-hover:bg-copper group-hover:text-white transition-all duration-200 shadow-2xs">
                      Read article <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
