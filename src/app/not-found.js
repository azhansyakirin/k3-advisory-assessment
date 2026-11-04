import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">404 Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link href="/" className="underline">Back to home</Link>
    </main>
  );
}

export default NotFound;