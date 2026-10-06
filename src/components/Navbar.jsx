import { Plus, ShieldAlert, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Dashboard', path: '/' },
    { label: 'Add Mistake', path: '/add-mistake' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Logo + title */}
        <Link to="/" onClick={closeMenu} className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm sm:h-11 sm:w-11">
            <ShieldAlert size={20} className="sm:hidden" />
            <ShieldAlert size={22} className="hidden sm:block" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg md:text-xl">
              Penalty Board
            </h1>
            <p className="hidden text-xs text-slate-500 md:block">
              Employee mistake tracking &amp; performance overview
            </p>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 md:flex md:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`group relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
                  isActive
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {link.label === 'Add Mistake' && (
                    <Plus
                      size={16}
                      className={`transition-colors ${
                        isActive ? 'text-slate-700' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                  )}
                  {link.label}
                </span>
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-slate-900" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-4 py-2 sm:px-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.label === 'Add Mistake' && (
                  <Plus size={16} className={isActive ? 'text-slate-700' : 'text-slate-400'} />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
