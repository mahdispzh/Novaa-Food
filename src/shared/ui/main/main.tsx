import AppFooter from "@/src/shared/components/footer/AppFooter";

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export default function Main({ children, className }: MainProps) {
  return (
    <main
      className={[
        "pb-[calc(5.25rem+env(safe-area-inset-bottom))] sm:pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-[calc(6.5rem+env(safe-area-inset-bottom))]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      <AppFooter />
    </main>
  );
}
