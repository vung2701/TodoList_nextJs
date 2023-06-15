import Header from "./Header"

interface LayoutProps {
    children: React.ReactNode
  }
  
  export default function DefaultLayout({ children }: LayoutProps) {
    return (
      <>
        <Header />
        <main>{children}</main>
      </>
    )
  }