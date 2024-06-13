import Link from "next/link";

export default function About() {
  return (
    <main className="m-6 flex min-h-screen items-center justify-center">
      <h1>About</h1>, click to go<Link href="/">Home</Link>
    </main>
  );
}
