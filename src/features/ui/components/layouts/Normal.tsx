import { Link } from "@nextui-org/react";
import { type ReactNode } from "react";


export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
  <>
  <header>
    <ul>
    <li><Link href='/articles'>Articldddes</Link></li>
    <li><Link href='/articles'>Articles</Link></li>
    <li><Link href='/articles'>Articles</Link></li>
    <li><Link href='/articles'>Articles</Link></li>
    </ul></header>
  <main>{children}</main>
  <footer>Footer</footer>
  </>
  );
}

export default Layout;