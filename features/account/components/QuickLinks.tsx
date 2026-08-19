import { QUICK_LINKS } from "../config";
import QuickLinkCard from "./QuickLinkCard";

function QuickLinks() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-xl font-semibold">الوصول السريع</h2>

        <div className="bg-primary/20 h-px flex-1" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((link) => (
          <QuickLinkCard key={link.href} {...link} />
        ))}
      </div>
    </section>
  );
}

export default QuickLinks;
