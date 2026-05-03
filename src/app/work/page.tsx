'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, ArrowRight, Layers, Palette, Video } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const WorkPage = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [filter, setFilter] = useState('All')
    const [projects, setProjects] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Icon mapping
    const iconMap: Record<string, any> = {
        Layers, Palette, Video
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin')
                const data = await res.json()
                setProjects(data.work)
                setIsLoading(false)
            } catch (error) {
                console.error('Failed to fetch work')
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter)

    useEffect(() => {
        if (!containerRef.current || isLoading) return

        const ctx = gsap.context(() => {
            const reveals = gsap.utils.toArray('.reveal-up')
            reveals.forEach((reveal: any) => {
                gsap.from(reveal, {
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: reveal,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                })
            })

            const items = gsap.utils.toArray('.portfolio-item')
            items.forEach((item: any) => {
                const img = item.querySelector('img')
                const content = item.querySelector('.portfolio-content')
                item.addEventListener('mouseenter', () => {
                    gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'power2.out' })
                    gsap.to(content, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' })
                })
                item.addEventListener('mouseleave', () => {
                    gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' })
                    gsap.to(content, { y: 20, opacity: 0, duration: 0.4, ease: 'power2.out' })
                })
            })
            ScrollTrigger.refresh()
        }, containerRef)
        return () => ctx.revert()
    }, [isLoading, filter])

    return (
        <div ref={containerRef}>
            {/* Work Hero */}
            <section className="hero">
                <div className="hero-inner" style={{ textAlign: 'center' }}>
                    <h3 style={{ textTransform: 'uppercase', letterSpacing: '8px', color: 'var(--primary)', marginBottom: '1.5rem', opacity: 0.6 }}>Portfolio</h3>
                    <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '-0.04em' }}>Creative Pulse.</h1>
                </div>
            </section>

            {/* Portfolio Controls */}
            <section style={{ padding: '0 10% 10rem' }}>
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '6rem' }}>
                    {['All', 'UI/UX', 'Graphic', 'Video'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                background: filter === cat ? 'var(--gradient-main)' : 'rgba(255,255,255,0.03)',
                                color: 'white',
                                border: '1px solid var(--glass-border)',
                                padding: '1rem 2.8rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                    {isLoading ? (
                        <div style={{ textAlign: 'center', width: '100%', padding: '5rem', opacity: 0.3 }}>Syncing Records...</div>
                    ) : filteredProjects.map(proj => {
                        const Icon = iconMap[proj.icon] || Layers
                        return (
                            <div key={proj.id} className="portfolio-item reveal-up" style={{
                                position: 'relative',
                                borderRadius: '32px',
                                overflow: 'hidden',
                                aspectRatio: '16/11',
                                background: 'var(--card-bg)',
                                border: '1px solid var(--glass-border)'
                            }}>
                                <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="portfolio-content" style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '0',
                                    padding: '3rem',
                                    width: '100%',
                                    background: 'linear-gradient(transparent, rgba(2, 4, 8, 0.95))',
                                    opacity: 0,
                                    transform: 'translateY(20px)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                                        <Icon size={16} />
                                        <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>{proj.category}</span>
                                    </div>
                                    <h3 style={{ fontSize: '2.5rem', color: 'white' }}>{proj.title}</h3>
                                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                                        View Full Study <ChevronRight size={20} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* Featured Highlight Section */}
            <section style={{ padding: '0 10% 10rem' }}>
                <div className="glass-container reveal-up" style={{ padding: '6rem', background: 'radial-gradient(circle at top right, rgba(0, 242, 255, 0.05), transparent)' }}>
                    <div style={{ maxWidth: '900px' }}>
                        <h4 style={{ textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--primary)', marginBottom: '1.5rem' }}>Premier Case Study</h4>
                        <h2 style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: '2.5rem' }}>Project Genesis <br />Architecture Redesign.</h2>
                        <p style={{ fontSize: '1.3rem', opacity: 0.6, lineHeight: '1.8', marginBottom: '4rem' }}>
                            A high-fidelity digital transformation for a global leader, focusing on conversion-optimized UI systems and immersive Web3D engagement. We rebuilt the entire brand ecosystem from the ground up.
                        </p>
                        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
                            <a href="#" className="btn">Deep Dive Into Case</a>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ display: 'block', fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>+142%</span>
                                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.5 }}>Engagement</span>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ display: 'block', fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>+89%</span>
                                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.5 }}>Conversion</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Final Cinematic Impact */}
            <section style={{ padding: '5rem 10%', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, var(--primary-glow) 0%, transparent 60%)',
                    opacity: 0.15,
                    zIndex: -1
                }} />

                <div className="glass-container" style={{ padding: '8rem 4rem', textAlign: 'center', border: 'none', background: 'transparent' }}>
                    <div className="cta-content" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div style={{
                            textTransform: 'uppercase',
                            letterSpacing: '10px',
                            color: 'var(--primary)',
                            fontSize: '0.9rem',
                            marginBottom: '2rem',
                            opacity: 0.6
                        }}>Ready to Elevate?</div>

                        <h2 style={{
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            lineHeight: 1.1,
                            marginBottom: '4rem',
                            fontFamily: 'Playfair Display',
                            fontWeight: 400
                        }}>
                            Partner with <br />
                            <span style={{
                                fontStyle: 'italic',
                                background: 'var(--gradient-main)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'inline-block'
                            }}>Perfection.</span>
                        </h2>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center', marginTop: '4rem' }}>
                            <a href="/contact" className="premium-btn">
                                <span className="btn-text">Initiate Collaboration</span>
                                <div className="btn-aura"></div>
                            </a>
                        </div>

                        <p style={{ marginTop: '3rem', fontSize: '1.1rem', color: 'var(--text-sub)', opacity: 0.4 }}>
                            Currently accepting private commissions for Q3 2025.
                        </p>
                    </div>
                </div>

                <style>{`
                    .cta-content {
                        transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
                    }
                    .premium-btn {
                        position: relative;
                        padding: 1.5rem 3.5rem;
                        background: #fff;
                        color: #000;
                        text-decoration: none;
                        font-weight: 700;
                        font-size: 1.1rem;
                        border-radius: 100px;
                        overflow: hidden;
                        transition: all 0.4s ease;
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        letter-spacing: 1px;
                        box-shadow: 0 10px 30px rgba(255,255,255,0.2);
                    }
                    .premium-btn:hover {
                        transform: translateY(-5px) scale(1.02);
                        box-shadow: 0 20px 50px var(--primary-glow);
                        background: var(--primary);
                        color: white !important;
                    }
                    .btn-aura {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 0;
                        height: 0;
                        background: rgba(255,255,255,0.4);
                        border-radius: 50%;
                        transform: translate(-50%, -50%);
                        transition: width 0.6s ease, height 0.6s ease;
                    }
                    .premium-btn:hover .btn-aura {
                        width: 300px;
                        height: 300px;
                        opacity: 0;
                    }
                    .reveal-item:hover {
                        transform: scale(1.05);
                        border-color: var(--primary);
                        background: rgba(var(--bg-rgb), 0.6);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    }
                    @media (max-width: 1024px) {
                        #experience .reveal {
                            grid-template-columns: 1fr !important;
                            gap: 2rem !important;
                        }
                        #experience .sticky-sidebar {
                            position: relative !important;
                            top: 0 !important;
                            padding-bottom: 1rem;
                            border-bottom: 2px solid var(--primary-glow);
                        }
                    }
                `}</style>
            </section>
        </div>
    )
}

export default WorkPage
