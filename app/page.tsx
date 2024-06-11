import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="m-6 flex min-h-screen items-center justify-center">
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
      <Link href="/about">Click here</Link>
    </main>
  );
}
