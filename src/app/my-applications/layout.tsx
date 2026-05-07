import PageLayout from "../layout/page-layout";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <PageLayout>{children}</PageLayout>
    </>
  );
}
