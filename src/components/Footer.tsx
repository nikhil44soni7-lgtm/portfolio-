'use client'

import React from 'react'
import Logo from './Logo'

const Github = ({ size = 24, ...props }: { size?: number; style?: React.CSSProperties }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
)

const Twitter = ({ size = 24, ...props }: { size?: number; style?: React.CSSProperties }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
)

const Instagram = ({ size = 24, ...props }: { size?: number; style?: React.CSSProperties }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
)

const Footer = () => {
    return (
        <footer style={{ padding: '8rem 10% 4rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
                <div>
                    <Logo size={40} className="footer-logo" />
                    <div style={{ height: '1.5rem' }}></div>
                    <p style={{ opacity: 0.6 }}>Redefining the digital frontier with immersive 3D experiences and pixel-level precision design.</p>
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
                        <Github style={{ cursor: 'pointer', opacity: 0.6 }} />
                        <Twitter style={{ cursor: 'pointer', opacity: 0.6 }} />
                        <Instagram style={{ cursor: 'pointer', opacity: 0.6 }} />
                    </div>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Navigation</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.7 }}>
                        <li><a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a></li>
                        <li><a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a></li>
                        <li><a href="/skills" style={{ color: 'inherit', textDecoration: 'none' }}>Skills</a></li>
                        <li><a href="/work" style={{ color: 'inherit', textDecoration: 'none' }}>Archive</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Contact</h4>
                    <p style={{ opacity: 0.7 }}>hello@aura.design</p>
                    <p style={{ opacity: 0.7, marginTop: '0.5rem' }}>London, UK. Global Remote.</p>
                </div>
            </div>

            <div style={{ padding: '2rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.6, fontSize: '0.8rem' }}>
                <p>&copy; 2025 Code By Harshita. All rights reserved.</p>
                <p>Designed for the digital age.</p>
            </div>
        </footer>
    )
}

export default Footer
