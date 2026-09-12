import AppFooter from "@/src/shared/components/footer/AppFooter";

interface MainProps {
  children: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
}

export default function Main({ children, className, hideFooter = false }: MainProps) {
  return (
    <main
      className={[
        "px-3",
        "pb-[calc(5.25rem+env(safe-area-inset-bottom))]",
        "sm:pb-[calc(6rem+env(safe-area-inset-bottom))]",
        "md:pb-[calc(6.5rem+env(safe-area-inset-bottom))]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      {!hideFooter && <AppFooter />}
    </main>
  );
}