import Image from "next/image";

export function Footer() {
  return (
    <footer className="zone-light border-t border-black/[0.05]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm sm:flex-row">
        <a href="#" className="flex items-center">
          <Image
            src="/logo.png"
            alt="OperPath"
            width={480}
            height={204}
            className="h-7 w-auto opacity-40"
            unoptimized
          />
        </a>
        <div className="flex items-center gap-6 text-[#868e96]">
          <a href="https://www.linkedin.com/in/parkernuttall/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#1a1a2e]">LinkedIn</a>
          <a href="mailto:parkernuttall9@gmail.com" className="transition-colors hover:text-[#1a1a2e]">Email</a>
          <span>Madison, WI</span>
        </div>
        <p className="text-[#868e96]">&copy; 2026 OperPath</p>
      </div>
    </footer>
  );
}
