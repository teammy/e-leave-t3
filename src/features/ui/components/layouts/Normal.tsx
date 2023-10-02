import { type ReactNode } from "react";


export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
  <>
  <main>{children}</main>
  </>
  );
}

export default Layout;