import { Header } from "@/components/header";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return <div>
    <Header/>
    {children}
    </div>;
}
