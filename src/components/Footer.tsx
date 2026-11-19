
const Footer = () => {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-[#f5f7f8]">

        <div className="mx-auto flex flex-col items-center max-w-[1440px] gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:justify-between lg:px-8">

            {/* Brand */}
            <a 
                href="#overview"
                className="font-serif text-lg text-[#294454] transition hover:text-sky-600"
                aria-label="Aether home"
            >
                aether
            </a>

            {/* Copyright and tagline */}
            <p className="text-[10px] text-slate-400">
                A little clarity, whatever the weather. © 2026 Aether
            </p>

            {/* FOoter navigation */}
            <nav aria-label="Footer navigation">

                <ul className="flex items-center gap-5">

                    <li>
                        <a 
                            href="#about"
                            className="inline-flex text-[10px] text-slate-500 transition hover:text-sky-600"
                        >
                            About
                        </a>
                    </li>

                    <li>
                        <a 
                            href="#privacy"
                            className="inline-flex text-[10px] text-slate-500 transition hover:text-sky-600"
                        >
                            Privacy
                        </a>
                    </li>

                    <li>
                        <a 
                            href="mailto:feedback@example.com"
                            className="inline-flex flex items-center gap-1 text-[10px] text-slate-500 transition hover:text-sky-600"
                        >
                            Feedback
                            <span aria-hidden="true">›</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </footer>
  )
}
export default Footer