import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { handleSocialSignIn } from '@/features/auth/actions';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{' '}
            <Link
              href="#"
              className="font-medium text-primary hover:text-primary/80"
              prefetch={false}
            >
              sign up for a new account
            </Link>
          </p>
        </div>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground"
            >
              Email address
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-muted-foreground"
            >
              Password
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                name="remember-me"
                className="h-4 w-4 rounded"
              />
              <Label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-muted-foreground"
              >
                Remember me
              </Label>
            </div>
            <div className="text-sm">
              <Link
                href="#"
                className="font-medium text-primary hover:text-primary/80"
                prefetch={false}
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Sign in
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <form action={handleSocialSignIn}>
          <Button
            name="provider"
            value="google"
            type="submit"
            variant="outline"
            className="flex w-full justify-center rounded-md border border-muted py-2 px-4 text-sm font-medium shadow-sm hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <ChromeIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  );
}

function ChromeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
