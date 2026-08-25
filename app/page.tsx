import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#737373] mb-4">
          Travel Smarter
        </span>
        
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          Pack lighter. <br />
          Travel smarter.
        </h1>

        <p className="text-[#737373] text-base md:text-lg mb-10 leading-relaxed">
          Tell us where you&apos;re going, your dates, and your style. 
          We&apos;ll figure out exactly what you need to pack.
        </p>

        <Link
          href="/planner"
          className="bg-charcoal text-white px-8 py-4 rounded-xl font-medium hover:bg-[#3A3A3A] transition-all shadow-sm"
        >
          Plan my trip →
        </Link>
      </main>
    </div>
  );
}