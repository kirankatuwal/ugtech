import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type Testimonial = {
    name: string;
    position: string;
    view: string;
    image: string;
};

const TESTIMONIALS: Testimonial[] = [
    {
        name: "Ramesh Shrestha",
        position: "Owner, Shrestha Departmental Store",
        view:
            "UG Technology installed a full CCTV system in our store. The picture quality is excellent and their team is very professional. Highly recommended in Hetauda!",
        image: "https://i.pravatar.cc/200?img=12",
    },
    {
        name: "Sita Karki",
        position: "Principal, Bright Future School",
        view:
            "From cameras to smart door locks, they handled everything for our school. Quick service, fair pricing, and reliable after-sales support.",
        image: "https://i.pravatar.cc/200?img=47",
    },
    {
        name: "Bikash Thapa",
        position: "Manager, Thapa Hotel & Resort",
        view:
            "Networking and surveillance setup was completed on time and within budget. Our guests feel safer and our operations run smoother. Great team!",
        image: "https://i.pravatar.cc/200?img=33",
    },
    {
        name: "Kiran Adhikari",
        position: "IT Head, Everest Construction",
        view:
            "We needed a complete office networking overhaul. UG Technology delivered a robust solution with fiber cabling and managed switches. Zero downtime since installation.",
        image: "https://i.pravatar.cc/200?img=11",
    },
    {
        name: "Manju Sharma",
        position: "Director, Hetauda Nursing Home",
        view:
            "The biometric attendance and access control system they installed has made our hospital much more secure. Staff management is now effortless.",
        image: "https://i.pravatar.cc/200?img=5",
    },
];

export function ClientVoices() {
    return (
        <section className="bg-background py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Client Voices</h2>
                    <p className="mt-3 text-muted-foreground">
                        What people across Nepal say about working with UG Technology Store.
                    </p>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="!pb-12"
                    style={
                        {
                            "--swiper-pagination-color": "var(--brand-orange)",
                            "--swiper-pagination-bullet-inactive-color": "var(--brand-navy)",
                            "--swiper-pagination-bullet-inactive-opacity": "0.3",
                        } as React.CSSProperties
                    }
                >
                    {TESTIMONIALS.map((t) => (
                        <SwiperSlide key={t.name}>
                            <figure className="relative flex h-full flex-col items-center rounded-xl border bg-card p-8 text-center shadow-[var(--shadow-card)]">
                                <Quote className="absolute right-5 top-5 h-6 w-6 text-[var(--brand-orange)]/30" />
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    loading="lazy"
                                    className="h-20 w-20 rounded-full object-cover ring-4 ring-[var(--brand-orange)]/20"
                                />
                                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                                    “{t.view}”
                                </blockquote>
                                <figcaption className="mt-5">
                                    <div className="font-semibold text-foreground">{t.name}</div>
                                    <div className="text-xs text-muted-foreground">{t.position}</div>
                                </figcaption>
                            </figure>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
