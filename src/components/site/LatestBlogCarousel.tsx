import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { fetchLatestPosts } from "@/lib/blog";

export function LatestBlogCarousel() {
    const { data: posts, isLoading } = useQuery({
        queryKey: ["posts", "latest", 5],
        queryFn: () => fetchLatestPosts(5),
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading || !posts || posts.length === 0) return null;

    return (
        <section className="bg-muted/30 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">From Our Blog</h2>
                        <p className="mt-3 text-muted-foreground">Latest installations, devices, and updates.</p>
                    </div>
                    <Link
                        to="/blog"
                        className="hidden text-sm font-semibold text-[var(--brand-orange)] hover:underline sm:inline"
                    >
                        View all →
                    </Link>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    loop={posts.length > 2}
                    autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="!pb-12"
                >
                    {posts.map((p) => (
                        <SwiperSlide key={p.id}>
                            <Link
                                to="/blog/$slug"
                                params={{ slug: p.slug }}
                                className="group block h-full overflow-hidden rounded-lg border border-border bg-card transition hover:shadow-lg"
                            >
                                {p.cover_image_url ? (
                                    <div className="overflow-hidden">
                                        <img
                                            src={p.cover_image_url}
                                            alt={p.title}
                                            className="aspect-video w-full object-cover transition duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video w-full bg-muted" />
                                )}
                                <div className="p-4">
                                    {p.tags?.length > 0 && (
                                        <div className="mb-2 flex flex-wrap gap-1">
                                            {p.tags.slice(0, 3).map((t) => (
                                                <span
                                                    key={t}
                                                    className="rounded-full bg-[var(--brand-orange)]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--brand-orange)]"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <h3 className="text-lg font-semibold text-foreground group-hover:text-[var(--brand-orange)]">
                                        {p.title}
                                    </h3>
                                    {p.excerpt && (
                                        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
                                    )}
                                    {p.published_at && (
                                        <p className="mt-3 text-xs text-muted-foreground">
                                            {new Date(p.published_at).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
