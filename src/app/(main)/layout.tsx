import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { UserDropdown } from '@/components/user-dropdown';
import { NewspaperIcon } from 'lucide-react';
import Link from 'next/link';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="relative">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b backdrop-blur-lg bg-opacity-25 px-4 md:px-6">
        <div className="flex w-full items-center justify-between max-w-5xl mx-auto">
          <Link href="/" className="gap-2 text-xl font-semibold min-w-fit">
            My Blog
          </Link>

          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial"></form>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <Button asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="container max-w-5xl px-4 lg:px-8 py-6 lg:py-8">
        {children}
      </main>
    </div>
  );
}
