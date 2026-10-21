import { execute, query, queryOne, transaction } from "@/lib/db/query";
import { pagination, slugify } from "@/lib/utils/cn";
import { NotFoundError } from "@/lib/utils/errors";
import type { Blog, BlogCategory, BlogTag } from "@/models";
import type { PaginatedResult } from "@/types";
import { upsertSeo } from "@/server/repositories/seo.repository";

export async function listCategories() {
  return query<BlogCategory>("SELECT * FROM blog_categories ORDER BY name ASC");
}

export async function saveCategory(input: {
  id?: number;
  name: string;
  slug: string;
  description?: string | null;
}) {
  if (input.id) {
    await execute(
      "UPDATE blog_categories SET name=?, slug=?, description=? WHERE id=?",
      [input.name, input.slug, input.description ?? null, input.id],
    );
    return input.id;
  }
  return (
    await execute(
      "INSERT INTO blog_categories (name, slug, description) VALUES (?,?,?)",
      [input.name, input.slug, input.description ?? null],
    )
  ).insertId;
}

export async function deleteCategory(id: number) {
  await execute("DELETE FROM blog_categories WHERE id = ?", [id]);
}

const NOIDA_BLOG_CONTENT = `
<p class="text-lg leading-relaxed text-ink/90 font-medium">Are you looking for reliable <strong>Best LED TV repair in Noida</strong>? If your television is not turning on, showing a black screen, producing no sound or experiencing display problems, you may need professional repair assistance. A faulty television can interrupt your daily entertainment, especially when you want to watch movies, news, sports or your favourite shows.</p>

<p>LED TVs are widely used in homes, offices, shops, hotels and other commercial spaces across Noida. Like other electronic devices, they can develop technical problems over time. The good news is that many TV faults can be diagnosed and repaired by an experienced technician.</p>

<p><strong>India LED TV Repair Service</strong> helps customers explore suitable TV repair solutions based on their television model, technical problem and service location. In this blog, we will discuss common LED TV problems, repair services, estimated costs and tips for finding a suitable TV repair technician in Noida.</p>

<div class="my-8 rounded-2xl bg-gradient-to-r from-copper/10 via-amber-500/10 to-transparent p-6 border-l-4 border-copper shadow-xs">
  <div class="flex items-center gap-2 text-copper font-bold text-xs uppercase tracking-wider">
    <span>⚡ Doorstep TV Repair in Noida</span>
  </div>
  <h3 class="mt-1 text-xl font-bold text-ink">Urgent TV Repair? Technician at Doorstep in 90 Mins</h3>
  <p class="mt-2 text-sm text-muted">Doorstep diagnosis across all sectors of Noida with genuine spare parts, transparent estimates, and a 90-day warranty.</p>
  <div class="mt-4 flex flex-wrap gap-3">
    <a href="/book-service" class="inline-flex items-center gap-2 rounded-xl bg-copper px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-copper-dark transition-all">
      Book Repair Technician
    </a>
    <a href="tel:+918800000000" class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-ink border border-line shadow-2xs hover:bg-paper transition-all">
      Call Now for Inspection
    </a>
  </div>
</div>

<h2 id="why-noida">Why Do You Need LED TV Repair in Noida?</h2>
<p>Noida is a growing residential and commercial city with many apartments, offices, shops and businesses that depend on televisions for entertainment and information.</p>
<p>When your LED TV stops working, finding a suitable local repair service can make the process more convenient. Depending on your location and the provider, you may be able to arrange doorstep inspection and repair.</p>
<p>Searching for LED TV repair services in Noida can help you find technicians who work with different television brands and models.</p>
<p>Whether you live in Sector 18, Sector 62, Sector 76, Sector 137, Sector 150 or another part of Noida, confirm that the technician covers your specific sector before scheduling an appointment.</p>

<div class="my-6 rounded-2xl border border-line bg-cream/40 p-5">
  <p class="text-xs font-bold uppercase tracking-wider text-copper">Covered Noida Sectors</p>
  <div class="mt-3 flex flex-wrap gap-2 text-xs">
    <span class="rounded-lg bg-white px-3 py-1.5 border border-line font-medium text-ink shadow-2xs">Sector 18 (Atta Market)</span>
    <span class="rounded-lg bg-white px-3 py-1.5 border border-line font-medium text-ink shadow-2xs">Sector 62 (IT Hub)</span>
    <span class="rounded-lg bg-white px-3 py-1.5 border border-line font-medium text-ink shadow-2xs">Sector 76, 75 & 78</span>
    <span class="rounded-lg bg-white px-3 py-1.5 border border-line font-medium text-ink shadow-2xs">Sector 137 (Expressway)</span>
    <span class="rounded-lg bg-white px-3 py-1.5 border border-line font-medium text-ink shadow-2xs">Sector 150</span>
    <span class="rounded-lg bg-white px-3 py-1.5 border border-line font-medium text-ink shadow-2xs">Sector 50 & 51</span>
    <span class="rounded-lg bg-white px-3 py-1.5 border border-line font-medium text-ink shadow-2xs">Sector 120, 121 & 122</span>
    <span class="rounded-lg bg-white px-3 py-1.5 border border-line font-medium text-ink shadow-2xs">Greater Noida & Greater Noida West</span>
  </div>
</div>

<h2 id="common-problems">Common LED TV Problems and Their Solutions</h2>

<div class="my-6 space-y-5">
  <div class="rounded-2xl border border-line bg-white p-6 shadow-xs">
    <div class="flex items-center gap-3">
      <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100 text-red-600 font-black text-sm">1</span>
      <h3 class="text-xl font-bold text-ink m-0">LED TV Not Turning On</h3>
    </div>
    <p class="mt-3 text-sm text-muted leading-relaxed">One of the most common television problems is a TV that does not start. The power indicator may remain off, or the TV may blink without displaying a picture. Possible causes include a damaged power cable, faulty power supply board, loose connection or another internal electronic fault.</p>
    <div class="mt-4 rounded-xl bg-emerald-50/80 p-4 border-l-4 border-emerald-600 text-xs text-emerald-950">
      <strong class="font-semibold text-emerald-800 uppercase tracking-wide block mb-1">Solution</strong>
      Check the electrical socket and make sure the power cable is properly connected. You can also try restarting the TV according to the manufacturer's instructions. If the problem continues, contact a professional LED TV repair technician in Noida.
    </div>
  </div>

  <div class="rounded-2xl border border-line bg-white p-6 shadow-xs">
    <div class="flex items-center gap-3">
      <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100 text-red-600 font-black text-sm">2</span>
      <h3 class="text-xl font-bold text-ink m-0">LED TV Screen Black but Sound Working</h3>
    </div>
    <p class="mt-3 text-sm text-muted leading-relaxed">Sometimes a television produces sound, but the screen remains completely black. This problem may be caused by a faulty LED backlight, display circuit or another internal component.</p>
    <div class="mt-4 rounded-xl bg-emerald-50/80 p-4 border-l-4 border-emerald-600 text-xs text-emerald-950">
      <strong class="font-semibold text-emerald-800 uppercase tracking-wide block mb-1">Solution</strong>
      A technician can inspect the backlight and display system to identify the actual fault. If the display panel is physically damaged, replacement may be required. A proper diagnosis is important because a black screen does not always mean that the entire display panel needs replacement.
    </div>
  </div>

  <div class="rounded-2xl border border-line bg-white p-6 shadow-xs">
    <div class="flex items-center gap-3">
      <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100 text-red-600 font-black text-sm">3</span>
      <h3 class="text-xl font-bold text-ink m-0">LED TV Screen Flickering or Showing Lines</h3>
    </div>
    <p class="mt-3 text-sm text-muted leading-relaxed">Screen flickering, horizontal lines, vertical lines and unusual colours can make watching television difficult. These problems may result from loose connections, display circuit faults, backlight issues or panel damage.</p>
    <div class="mt-4 rounded-xl bg-emerald-50/80 p-4 border-l-4 border-emerald-600 text-xs text-emerald-950">
      <strong class="font-semibold text-emerald-800 uppercase tracking-wide block mb-1">Solution</strong>
      Check whether the problem occurs with different channels and input sources. If it continues, arrange a professional inspection. Avoid pressing or hitting the screen because this may cause further damage.
    </div>
  </div>

  <div class="rounded-2xl border border-line bg-white p-6 shadow-xs">
    <div class="flex items-center gap-3">
      <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100 text-red-600 font-black text-sm">4</span>
      <h3 class="text-xl font-bold text-ink m-0">LED TV Has No Sound</h3>
    </div>
    <p class="mt-3 text-sm text-muted leading-relaxed">If your TV displays pictures but produces no sound, the problem may be related to audio settings, speakers, connected devices or the internal audio circuit.</p>
    <div class="mt-4 rounded-xl bg-emerald-50/80 p-4 border-l-4 border-emerald-600 text-xs text-emerald-950">
      <strong class="font-semibold text-emerald-800 uppercase tracking-wide block mb-1">Solution</strong>
      Check the volume, mute settings and audio output options. If you use a set-top box or external speaker, inspect its connections. If the issue remains unresolved, a technician can examine the audio system.
    </div>
  </div>

  <div class="rounded-2xl border border-line bg-white p-6 shadow-xs">
    <div class="flex items-center gap-3">
      <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100 text-red-600 font-black text-sm">5</span>
      <h3 class="text-xl font-bold text-ink m-0">Smart TV Wi-Fi and Software Problems</h3>
    </div>
    <p class="mt-3 text-sm text-muted leading-relaxed">Smart TVs allow users to access streaming platforms, online videos and internet-based applications. However, Wi-Fi connection failures, application errors and software problems can affect performance.</p>
    <div class="mt-4 rounded-xl bg-emerald-50/80 p-4 border-l-4 border-emerald-600 text-xs text-emerald-950">
      <strong class="font-semibold text-emerald-800 uppercase tracking-wide block mb-1">Solution</strong>
      Restart the router and TV, check the internet connection and install manufacturer-recommended software updates where available. If the problem continues, professional troubleshooting may be necessary.
    </div>
  </div>

  <div class="rounded-2xl border border-line bg-white p-6 shadow-xs">
    <div class="flex items-center gap-3">
      <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100 text-red-600 font-black text-sm">6</span>
      <h3 class="text-xl font-bold text-ink m-0">LED TV Automatically Switching Off</h3>
    </div>
    <p class="mt-3 text-sm text-muted leading-relaxed">If your television switches off while watching a programme, possible causes include overheating, power supply issues, incorrect timer settings or internal component faults.</p>
    <div class="mt-4 rounded-xl bg-emerald-50/80 p-4 border-l-4 border-emerald-600 text-xs text-emerald-950">
      <strong class="font-semibold text-emerald-800 uppercase tracking-wide block mb-1">Solution</strong>
      Check the sleep timer and ensure that the ventilation openings are not blocked. If the television continues to switch off unexpectedly, contact an experienced technician for diagnosis.
    </div>
  </div>
</div>
`;

export const DEFAULT_BLOGS: Blog[] = [
  {
    id: 100,
    title: "Best LED TV Repair in Noida",
    slug: "best-led-tv-repair-in-noida",
    excerpt: "Are you looking for reliable Best LED TV repair in Noida? Professional doorstep repair assistance for power, display, sound, and Smart TV issues across Noida.",
    content: NOIDA_BLOG_CONTENT,
    featured_image_id: null,
    author_id: 1,
    category_id: 1,
    status: "published",
    published_at: "2026-10-21 12:00:00",
    scheduled_at: null,
    created_at: "2026-10-21 12:00:00",
    updated_at: "2026-10-21 12:00:00",
    image_url: "/images/site/tv-hero.jpg",
    author_name: "Site Admin",
    category_name: "Repair Guides",
    tags: [
      { id: 1, name: "LED TV Repair", slug: "led-tv-repair" },
      { id: 2, name: "Noida", slug: "noida" },
      { id: 3, name: "Doorstep Service", slug: "doorstep-service" },
    ],
  },
  {
    id: 101,
    title: "LED TV Repair Near Me: Doorstep Diagnostic Guide",
    slug: "led-tv-repair-near-me",
    excerpt: "How to quickly find certified, verified TV repair technicians near you for same-day home visits across Noida and Delhi NCR.",
    content: "<p>How to quickly find certified, verified TV repair technicians near you for same-day home visits across Noida and Delhi NCR.</p><p>Book a doorstep diagnosis for fast same-day repair with 90-day warranty.</p>",
    featured_image_id: null,
    author_id: 1,
    category_id: 1,
    status: "published",
    published_at: "2026-10-18 10:00:00",
    scheduled_at: null,
    created_at: "2026-10-18 10:00:00",
    updated_at: "2026-10-18 10:00:00",
    image_url: "/images/site/tv-bench.jpg",
    author_name: "Site Admin",
    category_name: "Repair Guides",
  },
  {
    id: 1,
    title: "When a TV has sound but no picture",
    slug: "tv-sound-no-picture",
    excerpt: "Usually a backlight, T-con or panel issue — here is how we tell them apart.",
    content: "<p>Usually a backlight, T-con or panel issue — here is how we tell them apart.</p><p>Book a diagnosis if the fault persists after a power cycle and cable check.</p>",
    featured_image_id: null,
    author_id: 1,
    category_id: 1,
    status: "published",
    published_at: "2026-10-11 22:56:30",
    scheduled_at: null,
    created_at: "2026-10-11 22:56:30",
    updated_at: "2026-10-11 22:56:30",
    image_url: "/images/site/tv-screen.jpg",
    author_name: "Site Admin",
    category_name: "Repair Guides",
  },
  {
    id: 2,
    title: "Is OLED panel replacement worth it?",
    slug: "oled-panel-replacement",
    excerpt: "Honest guidance on cost versus a new set.",
    content: "<p>Honest guidance on cost versus a new set.</p><p>Book a diagnosis if the fault persists after a power cycle and cable check.</p>",
    featured_image_id: null,
    author_id: 1,
    category_id: 1,
    status: "published",
    published_at: "2026-10-11 22:56:30",
    scheduled_at: null,
    created_at: "2026-10-11 22:56:30",
    updated_at: "2026-10-11 22:56:30",
    image_url: "/images/site/tv-wall.jpg",
    author_name: "Site Admin",
    category_name: "Repair Guides",
  },
  {
    id: 3,
    title: "Smart TV software faults we see every week",
    slug: "smart-tv-software-faults",
    excerpt: "Boot loops, missing apps and Wi-Fi dropouts.",
    content: "<p>Boot loops, missing apps and Wi-Fi dropouts.</p><p>Book a diagnosis if the fault persists after a power cycle and cable check.</p>",
    featured_image_id: null,
    author_id: 1,
    category_id: 1,
    status: "published",
    published_at: "2026-10-11 22:56:30",
    scheduled_at: null,
    created_at: "2026-10-11 22:56:30",
    updated_at: "2026-10-11 22:56:30",
    image_url: "/images/site/tv-smart.jpg",
    author_name: "Site Admin",
    category_name: "Repair Guides",
  },
];

export async function listBlogs(opts: {
  page?: number;
  pageSize?: number;
  q?: string;
  status?: string;
  category?: string;
  publishedOnly?: boolean;
}) {
  const { page, pageSize, offset } = pagination(opts.page, opts.pageSize);
  try {
    const filters: string[] = [];
    const params: unknown[] = [];
    if (opts.q) {
      filters.push("(b.title LIKE ? OR b.slug LIKE ? OR b.excerpt LIKE ?)");
      params.push(`%${opts.q}%`, `%${opts.q}%`, `%${opts.q}%`);
    }
    if (opts.status) {
      filters.push("b.status = ?");
      params.push(opts.status);
    }
    if (opts.publishedOnly) {
      filters.push("b.status = 'published' AND (b.published_at IS NULL OR b.published_at <= NOW())");
    }
    if (opts.category) {
      filters.push("c.slug = ?");
      params.push(opts.category);
    }
    const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const totalRow = await queryOne<{ count: number }>(
      `SELECT COUNT(*) AS count FROM blogs b LEFT JOIN blog_categories c ON c.id = b.category_id ${where}`,
      params,
    );
    const dbRows = await query<Blog>(
      `SELECT b.*, m.url AS image_url, u.name AS author_name, c.name AS category_name
       FROM blogs b
       LEFT JOIN media m ON m.id = b.featured_image_id
       LEFT JOIN users u ON u.id = b.author_id
       LEFT JOIN blog_categories c ON c.id = b.category_id
       ${where}
       ORDER BY COALESCE(b.published_at, b.created_at) DESC
       LIMIT ? OFFSET ?`,
      [...params, pageSize, offset],
    );

    // Merge curated posts if not present in DB
    const existingSlugs = new Set(dbRows.map((b) => b.slug));
    const merged = [...dbRows];
    for (const fb of DEFAULT_BLOGS) {
      if (!existingSlugs.has(fb.slug)) {
        if (!opts.q || fb.title.toLowerCase().includes(opts.q.toLowerCase())) {
          if (fb.slug === "best-led-tv-repair-in-noida") {
            merged.unshift(fb);
          } else {
            merged.push(fb);
          }
        }
      }
    }

    return {
      data: merged.slice(0, pageSize),
      total: Math.max(totalRow?.count || 0, merged.length),
      page,
      pageSize,
      totalPages: Math.ceil(Math.max(totalRow?.count || 0, merged.length) / pageSize),
    } satisfies PaginatedResult<Blog>;
  } catch (error) {
    console.warn("[blogs] Database unavailable, using default blogs:", (error as Error).message);
    const filtered = DEFAULT_BLOGS.filter((b) => {
      if (opts.q && !b.title.toLowerCase().includes(opts.q.toLowerCase())) return false;
      return true;
    });
    return {
      data: filtered.slice(offset, offset + pageSize),
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize),
    } satisfies PaginatedResult<Blog>;
  }
}

async function attachTags(blog: Blog): Promise<Blog> {
  try {
    const tags = await query<BlogTag>(
      `SELECT t.* FROM blog_tags t
       JOIN blog_tag_map m ON m.tag_id = t.id
       WHERE m.blog_id = ?`,
      [blog.id],
    );
    return { ...blog, tags };
  } catch {
    return blog;
  }
}

export async function getBlogById(id: number) {
  try {
    const row = await queryOne<Blog>(
      `SELECT b.*, m.url AS image_url, u.name AS author_name, c.name AS category_name
       FROM blogs b
       LEFT JOIN media m ON m.id = b.featured_image_id
       LEFT JOIN users u ON u.id = b.author_id
       LEFT JOIN blog_categories c ON c.id = b.category_id
       WHERE b.id = ?`,
      [id],
    );
    if (row) return attachTags(row);
  } catch {
    // fallback below
  }
  const fallback = DEFAULT_BLOGS.find((b) => b.id === id);
  if (!fallback) throw new NotFoundError("Blog not found");
  return fallback;
}

export async function getBlogBySlug(slug: string) {
  try {
    const row = await queryOne<Blog>(
      `SELECT b.*, m.url AS image_url, u.name AS author_name, c.name AS category_name
       FROM blogs b
       LEFT JOIN media m ON m.id = b.featured_image_id
       LEFT JOIN users u ON u.id = b.author_id
       LEFT JOIN blog_categories c ON c.id = b.category_id
       WHERE b.slug = ? AND b.status = 'published' AND (b.published_at IS NULL OR b.published_at <= NOW())`,
      [slug],
    );
    if (row) return attachTags(row);
  } catch {
    // fallback below
  }
  const fallback = DEFAULT_BLOGS.find((b) => b.slug === slug);
  return fallback || null;
}

async function ensureTag(name: string) {
  const slug = slugify(name);
  const existing = await queryOne<BlogTag>("SELECT * FROM blog_tags WHERE slug = ?", [slug]);
  if (existing) return existing.id;
  return (
    await execute("INSERT INTO blog_tags (name, slug) VALUES (?,?)", [name, slug])
  ).insertId;
}

export async function saveBlog(input: {
  id?: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  featured_image_id?: number | null;
  author_id?: number | null;
  category_id?: number | null;
  status?: "draft" | "published" | "scheduled";
  published_at?: string | null;
  scheduled_at?: string | null;
  tags?: string[];
  seo?: Record<string, unknown>;
}) {
  const id = await transaction(async (tx) => {
    let blogId = input.id;
    const status = input.status || "draft";
    const publishedAt =
      input.published_at || (status === "published" ? new Date().toISOString().slice(0, 19).replace("T", " ") : null);
    const values = [
      input.title,
      input.slug,
      input.excerpt ?? null,
      input.content ?? null,
      input.featured_image_id ?? null,
      input.author_id ?? null,
      input.category_id ?? null,
      status,
      publishedAt,
      input.scheduled_at ?? null,
    ];
    if (blogId) {
      await tx.execute(
        `UPDATE blogs SET title=?, slug=?, excerpt=?, content=?, featured_image_id=?, author_id=?, category_id=?, status=?, published_at=?, scheduled_at=? WHERE id=?`,
        [...values, blogId],
      );
    } else {
      blogId = (
        await tx.execute(
          `INSERT INTO blogs (title, slug, excerpt, content, featured_image_id, author_id, category_id, status, published_at, scheduled_at)
           VALUES (?,?,?,?,?,?,?,?,?,?)`,
          values,
        )
      ).insertId;
    }
    return blogId!;
  });

  if (input.tags) {
    await execute("DELETE FROM blog_tag_map WHERE blog_id = ?", [id]);
    for (const tag of input.tags) {
      const tagId = await ensureTag(tag);
      await execute("INSERT IGNORE INTO blog_tag_map (blog_id, tag_id) VALUES (?,?)", [id, tagId]);
    }
  }
  if (input.seo) await upsertSeo("blog", id, input.seo);
  return getBlogById(id);
}

export async function deleteBlog(id: number) {
  await execute("DELETE FROM blogs WHERE id = ?", [id]);
}

export async function relatedBlogs(excludeId: number, categoryId?: number | null, limit = 3) {
  try {
    const rows = await query<Blog>(
      `SELECT b.*, m.url AS image_url FROM blogs b
       LEFT JOIN media m ON m.id = b.featured_image_id
       WHERE b.id <> ? AND b.status = 'published'
       ORDER BY CASE WHEN b.category_id = ? THEN 0 ELSE 1 END, b.published_at DESC
       LIMIT ?`,
      [excludeId, categoryId || 0, limit],
    );
    if (rows && rows.length > 0) return rows;
  } catch {
    // fallback below
  }
  return DEFAULT_BLOGS.filter((b) => b.id !== excludeId).slice(0, limit);
}
