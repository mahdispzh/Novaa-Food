import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import Main from "@/src/shared/ui/main/main";
import BloggerCard from "../_components/blogger-card/blogger-card";
import { getBloggers } from "../_services/bloggers.service";

export default async function BloggersPage() {
  const bloggers = await getBloggers();

  return (
    <html lang="fa" dir="rtl">
      <body>
        <Main>
          <div className="min-h-screen bg-white pt-6 sm:pt-8">
            <div className="mx-auto flex w-[95%] max-w-[1024px] flex-col gap-6">
              <SectionHeading
                title="بلاگرها"
                subtitle="انتخاب‌های واقعی, تجربه‌های واقعی"
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
      </body>
    </html>
  );
}