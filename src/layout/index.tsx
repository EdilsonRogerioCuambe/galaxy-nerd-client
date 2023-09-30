import { Footer } from '../components/footer'
import { NavigationBar } from '../components/navbar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationBar />
      {children}
      <Footer />
    </>
  )
}
