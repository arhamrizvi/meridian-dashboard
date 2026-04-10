import DemoShell from '@/components/demo/DemoShell'

export const metadata = { title: 'White Space — Meridian Demo' }

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <DemoShell>{children}</DemoShell>
}
