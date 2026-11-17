import { useState } from 'react';
import {
  CloudSun,
  Search,
  Menu,
  X
} from 'lucide-react';

type TemperatureUnit = 'C' | 'F';

const Navbar = () => {
  const [unit, setUnit] = useState<TemperatureUnit>('C');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Search cities function for moblie UI
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selected, setSelected] = useState("overview");
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <a href="#" className="flex shrink-0 items-center gap-2">
          <CloudSun className="h-5 w-5 text-sky-700" />
          <span className="font-serif text-xl text-slate-500">
            aether
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <a 
            href="#overview"
            onClick={() => setSelected("overview")}
            className={`${selected === "overview" ? "border-b-2 border-sky-600 font-medium text-sky-700" : "text-slate-500"} py-5 text-xs font-medium hover:text-sky-700`}
          >
            Overview
          </a>

          <a 
            href="#maps"
            onClick={() => setSelected("maps")}
            className={`${selected === "maps" ? "border-b-2 border-sky-600 font-medium text-sky-700" : "text-slate-500"} py-5 text-xs font-medium hover:text-sky-700`}
          >
            Weather maps
          </a>

          <a 
            href="#saved"
            onClick={() => setSelected("saved")}
            className={`${selected === "saved" ? "border-b-2 border-sky-600 font-medium text-sky-700" : "text-slate-500"} py-5 text-xs font-medium hover:text-sky-700`}
          >
            Saved maps
          </a>
        </nav>

        {/* Search and temperatue selector */}
        <div className="flex min-w-0 items-center gap-2">

          {/* Search */}
          <label className="hidden w-40 items-center gap-2 rounded-full bg-slate-100 px-3 py-2 sm:flex lg:w-48">
            <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />

            <input 
              type="search"
              placeholder="Search city or ZIP code"
              className="w-full min-w-0 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>

          {/* Mobile Search icon */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search cities"
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 sm:hidden"
          >
            {isSearchOpen ? (
              <X size={17} />
            ) : (
              <Search size={17} />
            )}
          </button>

          {/* Temperature Units */}
          <div className="flex shrink-0 items-center rounded-full border border-slate-200 p-0.5">
            <button
              type="button"
              onClick={() => setUnit('C')}
              aria-pressed={unit === 'C'}
              className={`rounded-full px-2 py-1 text-xs transition ${
                  unit === 'C'
                    ? 'bg-slate-100 font-semibold text-slate-800'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => setUnit('F')}
              aria-pressed={unit === 'F'}
              className={`rounded-full px-2 py-1 text-xs transition ${
                  unit === 'F'
                    ? 'bg-slate-100 font-semibold text-slate-800'
                    : 'text-slate-400 hover:text-slate-800'
                }`}
            >
              °F
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          >
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-slate-100 mb-2 bg-white px-5 py-4 md:hidden"
        >
          <div className="flex flex-col gap-4 text-sm">
            <a href="#overview" onClick={() => setIsMenuOpen(false)}>
              Overview
            </a>

            <a href="#maps" onClick={() => setIsMenuOpen(false)}>
              Maps
            </a>

            <a href="#saved" onClick={() => setIsMenuOpen(false)}>
              Saved places
            </a>
          </div>
        </nav>
      )}

      {/* For Mobile Search Field */}
        {isSearchOpen && (
          <div className="px-4 pb-3 sm:hidden">
            <input 
              type="search" 
              placeholder="Search city or ZIP code"
              className="w-full rounded-full bg-slate-100 px-4 py-3  text-sm outline-none"
            />
          </div>
        )}
    </header>
  )
}

export default Navbar