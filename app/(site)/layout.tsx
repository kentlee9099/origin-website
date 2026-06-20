import { Nav }    from '@/components/layout/Nav'
import { Ticker } from '@/components/layout/Ticker'
import { Footer } from '@/components/layout/Footer'
import { RealtimeProvider } from '@/components/RealtimeProvider'
import { getNavItems, getTickerItems } from '@/lib/data'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [navItems, tickerItems] = await Promise.all([getNavItems(), getTickerItems()])
  return (
    <RealtimeProvider>
      <Nav items={navItems} />
      <main>{children}</main>
      <Footer />
      <Ticker items={tickerItems} />
    </RealtimeProvider>
  )
}
