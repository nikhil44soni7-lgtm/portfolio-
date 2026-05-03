import React from 'react'

const Logo = ({ size = 40, showText = true, className = "" }: { size?: number, showText?: boolean, className?: string }) => {
    return (
        <div className={`logo-wrap ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="logo-icon" style={{ width: size, height: size, position: 'relative' }}>
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    {/* Stylized 'CH' Geometric Emblem */}
                    <path 
                        d="M20 30L50 15L80 30V70L50 85L20 70V30Z" 
                        stroke="var(--primary)" 
                        strokeWidth="4" 
                        strokeLinejoin="round" 
                        style={{ opacity: 0.3 }}
                    />
                    <path 
                        d="M20 30L50 45V85M50 45L80 30V70L50 85M20 30V70L50 85M20 30L50 15L80 30" 
                        stroke="var(--primary)" 
                        strokeWidth="6" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="logo-path-main"
                    />
                    <circle cx="50" cy="50" r="8" fill="var(--primary)" />
                </svg>
            </div>
            
            {showText && (
                <div className="logo-info" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <span 
                        className="logo-main-text" 
                        style={{ 
                            fontFamily: 'Playfair Display, serif', 
                            fontWeight: 900, 
                            fontSize: size * 0.45, 
                            letterSpacing: '1px',
                            background: 'var(--gradient-main)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textTransform: 'uppercase'
                        }}
                    >
                        Code By Harshita
                    </span>
                    <span 
                        className="logo-sub-text" 
                        style={{ 
                            fontSize: size * 0.22, 
                            opacity: 0.5, 
                            letterSpacing: '2px', 
                            textTransform: 'uppercase',
                            marginTop: '2px'
                        }}
                    >
                        Software Developer
                    </span>
                </div>
            )}

            <style>{`
                .logo-path-main {
                    filter: drop-shadow(0 0 8px var(--primary-glow));
                    stroke-dasharray: 400;
                    stroke-dashoffset: 400;
                    animation: logoDraw 3s ease forwards;
                }
                @keyframes logoDraw {
                    to { stroke-dashoffset: 0; }
                }
                .logo-wrap:hover .logo-icon {
                    transform: scale(1.1) rotate(5deg);
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
            `}</style>
        </div>
    )
}

export default Logo
