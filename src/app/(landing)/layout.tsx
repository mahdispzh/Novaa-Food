// src/app/layout.tsx


export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <NavbarLanding /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}
