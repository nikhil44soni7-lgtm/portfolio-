'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
    Home, 
    User, 
    Cpu, 
    Briefcase, 
    Mail, 
    Menu, 
    X, 
    ChevronDown,
    Sparkles
} from 'lucide-react'
import { useTheme, themes, ThemeName } from './ThemeProvider'
import Logo from './Logo'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)
    const pickerRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setShowPicker(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const navLinks = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'About', path: '/about', icon: <User size={18} /> },
        { name: 'Skills', path: '/skills', icon: <Cpu size={18} /> },
        { name: 'Works', path: '/work', icon: <Briefcase size={18} /> },
    ]

    const currentTheme = themes[theme]

    return (
        <nav id="nav" className={`${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {/* Logo Section */}
            <Link href="/" className="logo-container">
                <Logo size={isScrolled ? 34 : 42} />
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-center">
                <ul className="nav-links">
                    {navLinks.map((link) => (
                        <li 
                            key={link.path}
                            onMouseEnter={() => setHoveredLink(link.path)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <Link 
                                href={link.path}
                                className={`nav-link-item ${pathname === link.path ? 'active' : ''}`}
                            >
                                <span className="link-icon">{link.icon}</span>
                                <span className="link-text">{link.name}</span>
                                {(hoveredLink === link.path || pathname === link.path) && (
                                    <span className="link-indicator" />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Desktop Actions */}
            <div className="nav-actions">
                <div className="theme-switcher-wrap" ref={pickerRef}>
                    <button
                        className="theme-toggle-btn"
                        onClick={() => setShowPicker(p => !p)}
                        aria-label="Change theme"
                    >
                        <span className="theme-indicator-swatch" style={{ background: currentTheme.vars['--gradient-main'] }} />
                        <span className="theme-label">{currentTheme.label}</span>
                        <ChevronDown className={`theme-chevron ${showPicker ? 'open' : ''}`} size={14} />
                    </button>

                    {showPicker && (
                        <div className="theme-picker">
                            {(Object.keys(themes) as ThemeName[]).map((key) => {
                                const t = themes[key]
                                const isActive = key === theme
                                return (
                                    <button
                                        key={key}
                                        className={`theme-option ${isActive ? 'active' : ''}`}
                                        onClick={() => { setTheme(key); setShowPicker(false) }}
                                    >
                                        <span className="theme-option-preview" style={{ background: t.vars['--gradient-main'] }} />
                                        <span className="theme-option-name">{t.label}</span>
                                        <span className="theme-option-icon">{t.icon}</span>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>

                <Link href="/contact" className="contact-btn">
                    <Mail size={18} />
                    <span>Contact</span>
                </Link>

                <button 
                    className="mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-links">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link 
                                href={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`mobile-link-item ${pathname === link.path ? 'active' : ''}`}
                            >
                                <span className="link-icon">{link.icon}</span>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link 
                            href="/contact" 
                            className="mobile-contact-btn"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Mail size={20} />
                            Let's Talk
                        </Link>
                    </li>
                </ul>
            </div>

            <style>{`
                nav {
                    position: fixed;
                    top: 1.5rem;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 90%;
                    max-width: 1400px;
                    height: 4.5rem;
                    padding: 0 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 1000;
                    background: rgba(var(--bg-rgb, 2, 4, 8), 0.6);
                    backdrop-filter: blur(20px) saturate(180%);
                    -webkit-backdrop-filter: blur(20px) saturate(180%);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                nav.scrolled {
                    top: 0.75rem;
                    width: 95%;
                    height: 4rem;
                    background: rgba(var(--bg-rgb, 2, 4, 8), 0.85);
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
                }

                /* Logo Style */
                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    text-decoration: none;
                    position: relative;
                }

                .logo-text {
                    font-family: 'Playfair Display', serif;
                    font-weight: 800;
                    font-size: 1.6rem;
                    background: var(--gradient-main);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: 0.1rem;
                }

                .logo-text .dot {
                    display: inline-block;
                    animation: logoPulse 2s infinite;
                }

                .logo-sparkle {
                    color: var(--primary);
                    opacity: 0.8;
                    filter: drop-shadow(0 0 5px var(--primary-glow));
                }

                @keyframes logoPulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.4); opacity: 0.6; }
                }

                /* Nav Center */
                .nav-center {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .nav-links {
                    display: flex;
                    gap: 1rem;
                    list-style: none;
                    padding: 0.4rem;
                    background: rgba(255,255,255,0.03);
                    border-radius: 100px;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .nav-link-item {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.6rem 1.2rem;
                    text-decoration: none;
                    color: var(--text-main);
                    font-size: 0.9rem;
                    font-weight: 500;
                    border-radius: 100px;
                    transition: all 0.3s ease;
                    position: relative;
                    opacity: 0.7;
                }

                .nav-link-item:hover, .nav-link-item.active {
                    opacity: 1;
                    color: var(--primary);
                }

                .link-indicator {
                    position: absolute;
                    bottom: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 4px;
                    height: 4px;
                    background: var(--primary);
                    border-radius: 50%;
                    box-shadow: 0 0 10px var(--primary);
                }

                /* Actions Area */
                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                }

                .theme-toggle-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.6rem 1rem;
                    background: var(--glass);
                    border: 1px solid var(--glass-border);
                    border-radius: 14px;
                    color: var(--text-main);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .theme-toggle-btn:hover {
                    border-color: var(--primary);
                    background: var(--glass-highlight);
                }

                .theme-indicator-swatch {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.2);
                }

                .theme-label {
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .theme-chevron {
                    opacity: 0.5;
                    transition: transform 0.3s ease;
                }

                .theme-chevron.open { transform: rotate(180deg); }

                /* Theme Picker */
                .theme-picker {
                    position: absolute;
                    top: calc(100% + 1rem);
                    right: 0;
                    width: 200px;
                    background: rgba(10, 15, 25, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--glass-border);
                    border-radius: 18px;
                    padding: 0.6rem;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    animation: slideUp 0.3s ease;
                    z-index: 1100;
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .theme-option {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    width: 100%;
                    padding: 0.7rem 1rem;
                    border: none;
                    background: transparent;
                    color: var(--text-main);
                    cursor: pointer;
                    border-radius: 12px;
                    transition: all 0.2s ease;
                }

                .theme-option:hover, .theme-option.active {
                    background: rgba(255,255,255,0.06);
                    color: var(--primary);
                }

                .theme-option-preview {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                }

                .theme-option-name {
                    flex: 1;
                    font-size: 0.85rem;
                    text-align: left;
                }

                /* Contact Button */
                .contact-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    background: var(--gradient-main);
                    color: white;
                    padding: 0.8rem 1.6rem;
                    border-radius: 16px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.9rem;
                    box-shadow: 0 4px 15px var(--primary-glow);
                    transition: all 0.3s ease;
                }

                .contact-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px var(--primary-glow);
                }

                /* Mobile Stuff */
                .mobile-toggle {
                    display: none;
                    background: transparent;
                    border: none;
                    color: var(--text-main);
                    cursor: pointer;
                }

                .mobile-menu {
                    position: fixed;
                    top: -100%;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: var(--bg);
                    z-index: 2000;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
                    opacity: 0;
                    pointer-events: none;
                }

                .mobile-menu.open {
                    top: 0;
                    opacity: 1;
                    pointer-events: all;
                }

                @media (max-width: 1024px) {
                    .nav-center, .nav-actions .contact-btn, .nav-actions .theme-switcher-wrap {
                        display: none;
                    }
                    .mobile-toggle {
                        display: block;
                    }
                    nav {
                        padding: 0 1.5rem;
                    }
                }

                /* Mobile Menu Specifics */
                .mobile-nav-links {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    width: 80%;
                    max-width: 300px;
                }

                .mobile-link-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-main);
                    text-decoration: none;
                    padding: 1rem;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                }

                .mobile-link-item.active {
                    background: rgba(255,255,255,0.05);
                    color: var(--primary);
                }

                .mobile-contact-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    background: var(--gradient-main);
                    color: white;
                    padding: 1.2rem;
                    border-radius: 16px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 1.2rem;
                    margin-top: 1rem;
                    box-shadow: 0 10px 30px var(--primary-glow);
                }
            `}</style>
        </nav>
    )
}

export default Header
