import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-6xl font-bold text-fg">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-fg">Page Not Found</h2>
        <p className="mt-4 text-muted-fg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to Portfolio</Link>
        </Button>
      </div>
    </div>
  )
}

