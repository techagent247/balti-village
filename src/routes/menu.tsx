import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import menu from "@/lib/menu.json";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/menu")({
  head: () => ({ meta: [
    { title: "Menu & Prices | Balti Village Harpenden" },
    { name: "description", content: "Browse Balti Village's full Indian takeaway menu with current listed prices, from starters and tandoori to curries, biryani, breads and sides." },
    { property: "og:title", content: "Balti Village Menu & Prices" },
    { property: "og:description", content: "Explore dishes, choices and prices before ordering direct from Balti Village in Harpenden." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: MenuPage,
});

function MenuPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const term = query.trim().toLocaleLowerCase();
  const visible = useMemo(() => menu.categories.map((section) => ({
    ...section,
    items: menu.items.filter((item) => item.category === section.id && (category === "all" || category === section.id) && (!term || `${item.name} ${item.description} ${item.options.map((option) => option.name).join(" ")}`.toLocaleLowerCase().includes(term))),
  })).filter((section) => section.items.length), [category, term]);
  const total = visible.reduce((count, section) => count + section.items.length, 0);

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground md:pb-0">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
          <Link to="/" className="font-display text-xl font-black md:text-2xl">Balti<span className="text-primary"> Village</span></Link>
          <Button asChild size="sm" className="h-10 px-5 font-bold uppercase"><a href={SITE.orderUrl} target="_blank" rel="noreferrer">Order online <ArrowUpRight aria-hidden="true" /></a></Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pt-8 md:pt-14">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={16} /> Back to home</Link>
        <div className="mt-10 border-b border-border pb-9 md:flex md:items-end md:justify-between md:gap-8">
          <div>
            <p className="eyebrow">Balti Village · Harpenden</p>
            <h1 className="mt-3 font-display text-5xl font-black md:text-7xl">The menu<span className="text-primary">.</span></h1>
            <p className="mt-4 text-muted-foreground">Your favourites, all in one place. Browse here, then order direct.</p>
          </div>
          <p className="mt-6 shrink-0 text-sm text-muted-foreground md:mt-0">{menu.items.length} dishes · {menu.categories.length} categories</p>
        </div>

        <div className="sticky top-0 z-20 -mx-5 border-b border-border bg-background/95 px-5 py-4 backdrop-blur md:top-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <Search aria-hidden="true" size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <span className="sr-only">Search dishes</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search dishes or ingredients" className="h-12 w-full rounded-md border border-input bg-card pl-11 pr-11 outline-none focus:border-primary" />
              {query && <Button variant="ghost" size="icon" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-1.5 top-1/2 -translate-y-1/2"><X size={16} /></Button>}
            </label>
            <label className="sr-only" htmlFor="category-select">Choose category</label>
            <select id="category-select" value={category} onChange={(e) => setCategory(e.target.value)} className="h-12 w-full rounded-md border border-input bg-card px-4 outline-none focus:border-primary sm:w-64">
              <option value="all">All categories</option>
              {menu.categories.map((section) => <option key={section.id} value={section.id}>{section.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid gap-8 py-9 lg:grid-cols-[205px_minmax(0,1fr)] lg:gap-14">
          <nav aria-label="Menu categories" className="hidden lg:block">
            <div className="sticky top-24 space-y-1 border-l border-border pl-4">
              {menu.categories.map((section) => <a key={section.id} href={`#${section.id}`} onClick={() => { setCategory("all"); setQuery(""); }} className="block py-1 text-sm text-muted-foreground hover:text-primary">{section.name}</a>)}
            </div>
          </nav>
          <div>
            {total === 0 ? <div className="py-20 text-center"><h2 className="text-2xl font-bold">No dishes found</h2><p className="mt-2 text-muted-foreground">Try a different search or category.</p><Button variant="outline" className="mt-6" onClick={() => { setQuery(""); setCategory("all"); }}>Show all dishes</Button></div> : visible.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-40 pb-14 md:pb-20">
                <div className="mb-4 flex items-end justify-between border-b border-primary/40 pb-4">
                  <h2 className="font-display text-3xl font-bold md:text-4xl">{section.name}</h2>
                  <span className="ml-4 shrink-0 text-sm text-muted-foreground">{section.items.length} dishes</span>
                </div>
                <div className="grid gap-x-10 md:grid-cols-2">
                  {section.items.map((item) => <article key={item.id} className="border-b border-border py-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base font-extrabold leading-snug">{item.name}</h3>
                      {item.options.length === 1 && item.options.filter((option) => !option.name).map((option) => <span key={option.price} className="shrink-0 font-bold text-primary">£{option.price.toFixed(2)}</span>)}
                    </div>
                    {item.description && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>}
                    {(item.options.length > 1 || item.options.some((option) => !!option.name)) && <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                      {item.options.map((option) => <span key={option.name} className="inline-flex gap-2"><span className="text-muted-foreground">{option.name}</span><strong className="text-primary">£{option.price.toFixed(2)}</strong></span>)}
                    </div>}
                  </article>)}
                </div>
              </section>
            ))}
            <div className="border-t border-border py-10 text-sm text-muted-foreground">
              <p>Prices shown are from our online ordering menu. Confirm availability, options and final total when ordering.</p>
              <p className="mt-2">For allergies or intolerances, please call <a href={SITE.phoneHref} className="text-primary underline">{SITE.phone}</a> before ordering. Ingredients may contain allergens; dietary labels are not provided here.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <Button asChild className="h-12 w-full font-bold uppercase"><a href={SITE.orderUrl} target="_blank" rel="noreferrer">Order online <ArrowUpRight aria-hidden="true" /></a></Button>
      </div>
    </main>
  );
}