import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroVideo from "@/assets/hero.mp4.asset.json";
import poster from "@/assets/poster.jpg";
import takeaway from "@/assets/takeaway.jpg";
import tandoori from "@/assets/tandoori.jpg";
import { SITE, DAYS, DELIVERY, CATEGORIES, REVIEWS, isOpenNow, lookupPostcode } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Balti Village — Indian Takeaway in Harpenden | Order Online" },
      { name: "description", content: "Hot, fresh Indian food from Balti Village, Harpenden. Curries, biryani, balti and tandoori for delivery or collection. 10% off collection over £10." },
      { property: "og:title", content: "Balti Village — Indian Takeaway in Harpenden" },
      { property: "og:description", content: "Hot. Fresh. Full of flavour. Order delivery or collection online." },
    ],
  }),
  component: Index,
});

const NAV = [["Menu", "#menu"], ["Offers", "#offers"], ["Reviews", "#reviews"], ["About", "#about"], ["Contact", "#contact"]];

function OrderBtn({ children = "Order Online", className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <a href={SITE.orderUrl} target="_blank" rel="noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider text-primary-foreground transition hover:brightness-110 hover:-translate-y-0.5 ${className}`}>
      {children}
    </a>
  );
}

function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${solid ? "bg-background/95 py-3 shadow-lg backdrop-blur" : "py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <a href="#top" className="font-display text-2xl font-black tracking-tight">Balti<span className="text-primary"> Village</span></a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="text-sm font-medium opacity-85 hover:text-primary hover:opacity-100">{l}</a>)}
          <OrderBtn className="!px-5 !py-2.5" />
        </nav>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="md:hidden text-3xl leading-none">{open ? "×" : "≡"}</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 bg-background px-5 py-6 md:hidden">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="text-lg">{l}</a>)}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden">
      <video className="absolute inset-0 h-full w-full object-cover" src={heroVideo.url} poster={poster} autoPlay muted loop playsInline />
      <div className="absolute inset-0 hero-scrim" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-28 md:pb-24">
        <span className="animate-rise mb-6 w-fit rounded-full border border-primary/60 bg-background/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur">{SITE.offer.badge}</span>
        <h1 className="animate-rise text-6xl font-black leading-[0.9] md:text-[9rem]">Balti Village</h1>
        <p className="animate-rise mt-5 font-display text-2xl italic text-primary md:text-4xl" style={{ animationDelay: ".15s" }}>Hot. Fresh. Full of flavour.</p>
        <p className="animate-rise mt-3 max-w-md opacity-85" style={{ animationDelay: ".25s" }}>Order your favourites for delivery or collection.</p>
        <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: ".35s" }}>
          <OrderBtn />
          <a href="#menu" className="inline-flex items-center rounded-full border border-foreground/40 px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider hover:bg-foreground/10">View Menu</a>
        </div>
      </div>
    </section>
  );
}

function PostcodeChecker() {
  const [pc, setPc] = useState("");
  const [res, setRes] = useState<ReturnType<typeof lookupPostcode> | undefined>();
  return (
    <div className="rounded-2xl bg-card p-6 md:p-8">
      <h3 className="text-2xl font-bold">Do we deliver to you?</h3>
      <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); setRes(lookupPostcode(pc)); }}>
        <input value={pc} onChange={(e) => setPc(e.target.value)} placeholder="Enter your postcode" aria-label="Postcode"
          className="min-w-0 flex-1 rounded-full border border-input bg-background px-5 py-3 uppercase outline-none focus:border-primary" />
        <button className="rounded-full bg-primary px-6 font-bold text-primary-foreground">Check</button>
      </form>
      {res !== undefined && (
        <p className="mt-4 text-sm" role="status">
          {res === null && "Please enter a valid UK postcode."}
          {res === false && "This postcode isn't in our listed delivery areas. Please call us or check on the ordering page."}
          {res && <>Yes! We deliver to <b className="text-primary">{res.code}</b>. Minimum order £{res.min.toFixed(2)} · delivery fee £{res.fee.toFixed(2)}. Final charge shows in your basket.</>}
        </p>
      )}
    </div>
  );
}

function OrderSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <p className="eyebrow">Delivery & Collection</p>
      <h2 className="mt-3 text-4xl font-bold md:text-6xl">Made for your next craving</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-8">
          <h3 className="text-2xl font-bold">Delivery</h3>
          <p className="mt-2 text-muted-foreground">Enter your postcode, pick your favourites and we'll bring them to your door.</p>
          <OrderBtn className="mt-6">Order delivery</OrderBtn>
        </div>
        <div className="rounded-2xl bg-accent p-8 text-accent-foreground">
          <h3 className="text-2xl font-bold">Collection</h3>
          <p className="mt-2 opacity-90">10% off collection orders over £10, excluding delivery.</p>
          <OrderBtn className="mt-6">Order collection</OrderBtn>
        </div>
        <PostcodeChecker />
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="menu" className="section-cream py-24">
      <div className="mx-auto max-w-7xl px-5">
        <p className="eyebrow">Our menu</p>
        <h2 className="mt-3 text-4xl font-bold md:text-6xl">Find your favourite</h2>
        <p className="mt-3 opacity-70">Explore our menu and discover something delicious.</p>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <a key={c} href={SITE.orderUrl} target="_blank" rel="noreferrer"
              className="group flex aspect-[4/3] flex-col justify-between rounded-xl bg-charcoal p-5 text-cream transition hover:-translate-y-1 hover:bg-chilli">
              <span className="text-xs font-bold text-primary group-hover:text-cream">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-xl font-bold leading-tight md:text-2xl">{c}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section id="offers" className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-24 md:grid-cols-2">
      <img src={takeaway} alt="Balti Village takeaway dishes ready for collection" loading="lazy" width={1200} height={1200} className="rounded-2xl" />
      <div>
        <p className="eyebrow">Offers worth a look</p>
        <h2 className="mt-3 text-5xl font-black md:text-7xl"><span className="text-primary">10% off</span> collection</h2>
        <ul className="mt-6 space-y-2 text-lg">{SITE.offer.details.map((d) => <li key={d}>— {d}</li>)}</ul>
        <OrderBtn className="mt-8">Order now</OrderBtn>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="bg-card py-24">
      <div className="mx-auto max-w-7xl px-5">
        <p className="eyebrow">Website reviews</p>
        <h2 className="mt-3 text-4xl font-bold md:text-6xl">From our customers</h2>
        <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-4">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="min-w-[280px] max-w-sm snap-start rounded-2xl border bg-background p-7">
              <div className="text-primary">★★★★★</div>
              <blockquote className="mt-4 font-display text-xl leading-snug">"{r.text}"</blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-24 md:grid-cols-2">
      <div>
        <p className="eyebrow">A little about us</p>
        <h2 className="mt-3 text-4xl font-bold md:text-6xl">Welcome to Balti Village</h2>
        <p className="mt-6 text-lg text-muted-foreground">Do you feel like ordering in? Too tired to dress up and go out for dinner? No problem at all — Balti Village is here to cater for you right at home.</p>
        <p className="mt-4 text-lg text-muted-foreground">We offer everything from fast food to proper meals: starters, biryani, rice, korma, lamb dishes and English dishes too.</p>
        <OrderBtn className="mt-8">Explore our menu</OrderBtn>
      </div>
      <img src={tandoori} alt="Sizzling tandoori dishes" loading="lazy" width={1200} height={1200} className="rounded-2xl" />
    </section>
  );
}

function HoursAreas() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => setOpen(isOpenNow()), []);
  return (
    <section className="section-cream py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2">
        <div>
          <p className="eyebrow">Find your time</p>
          <h2 className="mt-3 text-4xl font-bold">Opening hours</h2>
          {open !== null && (
            <p className={`mt-4 inline-block rounded-full px-4 py-1 text-sm font-bold ${open ? "bg-primary text-primary-foreground" : "bg-chilli text-cream"}`}>
              {open ? "Open now" : `Closed now · opens ${SITE.hours.open}`}
            </p>
          )}
          <ul className="mt-6 divide-y divide-charcoal/15">
            {DAYS.map((d) => <li key={d} className="flex justify-between py-3"><span>{d}</span><span className="font-bold">{SITE.hours.open} – {SITE.hours.close}</span></li>)}
          </ul>
          <p className="mt-3 text-sm opacity-70">Delivery & collection follow these hours.</p>
        </div>
        <div>
          <p className="eyebrow">Delivery areas</p>
          <h2 className="mt-3 text-4xl font-bold">Where we deliver</h2>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {DELIVERY.map((a) => (
              <div key={a.code} className="rounded-xl bg-charcoal p-5 text-cream">
                <div className="font-display text-3xl font-black text-primary">{a.code}</div>
                <div className="mt-2 text-sm">Min order £{a.min.toFixed(2)}</div>
                <div className="text-sm opacity-75">Delivery £{a.fee.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm opacity-70">Charges are confirmed by postcode; the final charge appears in your basket.</p>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-5 py-24 md:grid-cols-2">
      <div className="rounded-2xl border border-primary/50 p-8">
        <p className="eyebrow">Food allergy advice</p>
        <h3 className="mt-3 text-2xl font-bold">Please advise staff of any allergies before ordering.</h3>
        <p className="mt-3 text-muted-foreground">If you have a food allergy or intolerance, call us on <a className="text-primary underline" href={SITE.phoneHref}>{SITE.phone}</a> before placing your order.</p>
      </div>
      <div className="rounded-2xl bg-card p-8">
        <p className="eyebrow">Food hygiene rating</p>
        <div className="mt-3 flex items-center gap-5">
          <span className="font-display text-7xl font-black text-primary">5</span>
          <span className="text-2xl font-bold">Very Good</span>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-card py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-4xl font-bold md:text-6xl">Come & collect</h2>
          <p className="mt-6 text-lg">{SITE.address}</p>
          <a href={SITE.phoneHref} className="mt-2 block font-display text-3xl font-bold text-primary">{SITE.phone}</a>
          <div className="mt-8 flex flex-wrap gap-3">
            <OrderBtn />
            <a href={SITE.phoneHref} className="rounded-full border px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider hover:bg-foreground/10">Call us</a>
          </div>
        </div>
        <iframe title="Balti Village location" loading="lazy" className="h-80 w-full rounded-2xl border-0 grayscale-[40%]"
          src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-5 pb-28 pt-16 text-sm text-muted-foreground md:pb-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div><div className="font-display text-2xl font-black text-foreground">Balti Village</div><p className="mt-2">Indian food & takeaway, Harpenden.</p></div>
        <div className="flex flex-col gap-1">{NAV.map(([l, h]) => <a key={h} href={h} className="hover:text-primary">{l}</a>)}</div>
        <div><p>{SITE.address}</p><a href={SITE.phoneHref} className="hover:text-primary">{SITE.phone}</a></div>
        <div><p>Every day {SITE.hours.open} – {SITE.hours.close}</p><p className="mt-2">Food hygiene: {SITE.hygiene}</p></div>
      </div>
      <p className="mt-10 border-t pt-6">© {new Date().getFullYear()} Balti Village</p>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t bg-background/95 p-3 backdrop-blur md:hidden">
      <a href="#menu" className="rounded-full border py-3 text-center text-xs font-bold uppercase">Menu</a>
      <a href={SITE.orderUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary py-3 text-center text-xs font-extrabold uppercase text-primary-foreground">Order</a>
      <a href={SITE.phoneHref} className="rounded-full border py-3 text-center text-xs font-bold uppercase">Call</a>
    </div>
  );
}

function Index() {
  return (
    <main>
      <Header />
      <Hero />
      <OrderSection />
      <Categories />
      <Offer />
      <Reviews />
      <About />
      <HoursAreas />
      <Trust />
      <Contact />
      <Footer />
      <MobileBar />
    </main>
  );
}
