import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center border-b border-[#DAD8D2]">
      <Link href="/" className="font-semibold text-lg tracking-wide text-charcoal">
        PackSmart
      </Link>
      <nav className="flex gap-6 items-center text-sm font-medium">
        <Link href="/planner" className="text-charcoal hover:text-sage transition-colors">
          Plan a trip
        </Link>
        <Link href="/trips" className="text-[#737373] hover:text-charcoal transition-colors">
          My Trips
        </Link>
      </nav>
    </header>
  );
}