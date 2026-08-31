import Main from "@/src/shared/ui/main/main";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import { BloggerCard } from "../_components/blogger-card/blogger-card";
import { getBloggers } from "../_services/bloggers.server";

export default async function BloggersPage() {
  const bloggers = await getBloggers();

  return (
    <Main>
      <div className="min-h-screen bg-light-beige pt-6 sm:pt-8">
        <div className="mx-auto flex w-[95%] max-w-5xl flex-col gap-6">
          <SectionHeading
            subtitle="انتخاب‌های واقعی, تجربه‌های واقعی"
            title="بلاگرها"
          />

          <div className="flex flex-col gap-4">
            {bloggers.map((blogger, index) => (
              <BloggerCard
                key={blogger.id}
                blogger={blogger}
                reversed={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
}
