import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogBySlug, relatedBlogs } from "@/server/repositories/blogs.repository";
import { getSeo } from "@/server/repositories/seo.repository";
import { getSiteContext } from "@/server/services/site";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { formatDate, siteUrl } from "@/lib/utils/cn";
import { sanitizeHtml } from "@/lib/utils/sanitize";
import { CmsImage } from "@/components/website/CmsImage";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  PhoneCall,
  ShieldCheck,
  UserCheck,
  Wrench,
} from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const [post, site] = await Promise.all([getBlogBySlug(slug), getSiteContext()]);
  if (!post) return { title: "Blog" };
  const seo = await getSeo("blog", post.id).catch(() => null);
  return buildMetadata({
    seo,
    fallbackTitle: `${post.title} | India LED TV Repair Service`,
    fallbackDescription: post.excerpt || "Expert advice on LED TV repair, diagnostics and doorstep solutions.",
    path: `/blog/${post.slug}`,
    settings: site.settings,
    image: post.image_url,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const [post, site] = await Promise.all([getBlogBySlug(slug), getSiteContext()]);
  if (!post) notFound();

  const related = await relatedBlogs(post.id, post.category_id, 3);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  const phone = site.settings["business.phone"] || "+918800000000";

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt || "",
          url: siteUrl(`/blog/${post.slug}`),
          image: post.image_url,
          datePublished: post.published_at,
          dateModified: post.updated_at,
          author: post.author_name || "Site Admin",
          settings: site.settings,
        })}
      />

      <Breadcrumb items={crumbs} />

      <main className="bg-paper pb-20 pt-6">
        <article className="container-narrow">
          {/* Back link */}
          <div className="mb-6">
            <Link
              prefetch={true}
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-copper transition-colors"
            >
              <ArrowLeft size={14} /> Back to all articles
            </Link>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-copper/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-copper">
              {post.category_name || "Repair Guides"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-line/60 px-3 py-1 text-xs font-medium text-muted">
              <Calendar size={13} className="text-copper" />
              {formatDate(post.published_at)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-line/60 px-3 py-1 text-xs font-medium text-muted">
              <Clock size={13} className="text-copper" />
              4 min read
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
              <CheckCircle2 size={13} className="text-emerald-600" />
              Verified Technician Guide
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {/* Author info pill */}
          <div className="mt-4 flex items-center gap-3 border-y border-line/60 py-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/10 text-copper font-bold text-sm">
              <UserCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">
                {post.author_name || "Site Admin"}{" "}
                <span className="text-xs font-normal text-muted">• Senior TV Diagnostic Specialist</span>
              </p>
              <p className="text-xs text-muted">India LED TV Repair Technical Team • Noida & Delhi NCR</p>
            </div>
          </div>

          {/* Excerpt summary card */}
          {post.excerpt && (
            <div className="mt-6 rounded-2xl border-l-4 border-copper bg-cream/50 p-5 shadow-2xs">
              <p className="text-base font-medium leading-relaxed text-ink/90 italic">
                &ldquo;{post.excerpt}&rdquo;
              </p>
            </div>
          )}

          {/* Quick Doorstep CTA Bar right below excerpt */}
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-copper/10 via-amber-500/10 to-transparent p-5 border border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-copper">Doorstep TV Service in Noida</p>
              <p className="text-sm font-semibold text-ink mt-0.5">Need instant repair assistance at home?</p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                prefetch={true}
                href="/book-service"
                className="inline-flex items-center gap-1.5 rounded-xl bg-copper px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-copper-dark transition-all"
              >
                <Wrench size={13} /> Book Technician
              </Link>
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-ink border border-line shadow-2xs hover:bg-paper transition-all"
              >
                <PhoneCall size={13} className="text-copper" /> Call Now
              </a>
            </div>
          </div>

          {/* Featured Image */}
          {post.image_url ? (
            <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-line shadow-md bg-cream">
              <CmsImage
                src={post.image_url}
                alt={post.title}
                sizes="(max-width: 768px) 100vw, 760px"
                priority={true}
              />
              <div className="absolute bottom-3 right-3 z-10 rounded-lg bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white shadow-sm">
                Doorstep TV Repair & Diagnostic Service
              </div>
            </div>
          ) : null}

          {/* Quick Table of Contents / Highlights Box */}
          <div className="mt-8 rounded-2xl border border-line bg-white p-5 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-copper">In This Article (Quick Navigation)</p>
            <ul className="mt-3 grid gap-2 text-sm text-ink sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                <a href="#why-noida" className="hover:text-copper transition-colors">Why LED TV Repair in Noida?</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                <a href="#common-problems" className="hover:text-copper transition-colors">1. TV Not Turning On</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                <a href="#common-problems" className="hover:text-copper transition-colors">2. Black Screen with Sound</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                <a href="#common-problems" className="hover:text-copper transition-colors">3. Flickering & Vertical Lines</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                <a href="#common-problems" className="hover:text-copper transition-colors">4. No Sound Issues</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                <a href="#common-problems" className="hover:text-copper transition-colors">5. Smart TV & Wi-Fi Problems</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                <a href="#common-problems" className="hover:text-copper transition-colors">6. TV Automatically Switching Off</a>
              </li>
            </ul>
          </div>

          {/* Article Body Content */}
          <div
            className="prose-site mt-10"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content || "") }}
          />

          {/* Technician Guarantee Footer Box */}
          <div className="mt-12 rounded-2xl border border-line bg-white p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-copper/10 text-copper">
                <ShieldCheck size={28} />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-base font-bold text-ink">90-Day Guarantee on All TV Repairs</h4>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Every LED, OLED, and Smart TV repair handled by India LED TV Repair Service includes a 90-day warranty on replaced parts and service labor. Doorstep visits available across all sectors of Noida.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  prefetch={true}
                  href="/book-service"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-copper px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-copper-dark transition-all"
                >
                  Book Service Now <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles Section */}
        {related.length ? (
          <section className="container-wide mt-16 border-t border-line/60 pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-copper">Related Articles</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-1">Recommended Reading</h2>
              </div>
              <Link
                prefetch={true}
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-copper hover:underline"
              >
                View all articles <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <article
                  key={item.id}
                  className="group relative card-surface overflow-hidden rounded-2xl bg-white border border-line shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-[0.99] flex flex-col justify-between"
                >
                  {/* Instant Click Full Overlay */}
                  <Link
                    prefetch={true}
                    href={`/blog/${item.slug}`}
                    className="absolute inset-0 z-20 cursor-pointer"
                    aria-label={`Read article: ${item.title}`}
                  />

                  <div>
                    <div className="relative aspect-video w-full overflow-hidden bg-cream">
                      <CmsImage
                        src={item.image_url}
                        alt={item.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-copper">
                        {item.category_name || "Repair Guide"}
                      </span>
                      <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink transition-colors group-hover:text-copper">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="flex items-center justify-between border-t border-line/60 pt-3">
                      <span className="text-xs text-muted">{formatDate(item.published_at)}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-copper group-hover:translate-x-0.5 transition-transform">
                        Read article <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
