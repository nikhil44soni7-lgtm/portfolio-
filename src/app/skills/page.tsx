'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    LayoutTemplate, PenTool, Video, Layers, Monitor, Play,
    Globe, Database, Cpu, Smartphone, Wind, Terminal, Palette, FileSpreadsheet, Image as ImageIcon, FileText
} from 'lucide-react'

const Figma = ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
        <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
        <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
)

gsap.registerPlugin(ScrollTrigger)

const SkillsPage = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [skills, setSkills] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Icon mapping for dynamic rendering
    const iconMap: Record<string, any> = {
        Globe, Database, Cpu, Monitor, Figma, Smartphone, LayoutTemplate, 
        Wind, Terminal, Palette, FileText, Layers, Video, ImageIcon
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin')
                const data = await res.json()
                setSkills(data.skills)
                setIsLoading(false)
            } catch (error) {
                console.error('Failed to fetch skills')
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            const sections = containerRef.current!.querySelectorAll('section')
            sections.forEach((section) => {
                const content = section.querySelector('.service-card')
                if (content) {
                    gsap.from(content, {
                        y: 80,
                        opacity: 0,
                        duration: 1.5,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    })
                }
            })
            ScrollTrigger.refresh()
        }, containerRef)

        return () => ctx.revert()
    }, [isLoading])

    return (
        <div ref={containerRef}>
            {/* Skills Hero */}
            <section className="hero">
                <div className="hero-inner" style={{ textAlign: 'center' }}>
                    <h3 style={{ textTransform: 'uppercase', letterSpacing: '8px', color: 'var(--primary)', marginBottom: '1.5rem', opacity: 0.6 }}>Technical Mastery</h3>
                    <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '-0.04em' }}>The Skill Matrix.</h1>
                    <p style={{ marginTop: '2rem', opacity: 0.6, maxWidth: '600px', margin: '2rem auto 0' }}>An elite architectural suite spanning core engineering and high-fidelity visual design.</p>
                </div>
            </section>

            {/* Service Cards Mapping */}
            {isLoading ? (
                <div style={{ padding: '10rem', textAlign: 'center', opacity: 0.5 }}>Syncing Matrix...</div>
            ) : skills.map((skill, idx) => {
                const Icon = iconMap[skill.icon] || Globe
                return (
                    <section key={idx} style={{ padding: '4rem 10%' }}>
                        <div className="service-card" style={{ flexDirection: idx % 2 !== 0 ? 'row-reverse' : 'row' }}>
                            <div className="service-info glass-container" style={{ border: '1px solid var(--glass-border)', background: 'var(--glass)', backdropFilter: 'blur(30px)', textAlign: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
                                    <div style={{ background: 'var(--gradient-main)', padding: '1rem', borderRadius: '16px', display: 'flex', marginBottom: '1.5rem' }}>
                                        <Icon size={32} color="white" />
                                    </div>
                                    <h3 style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.8rem', opacity: 0.4 }}>Matrix Unit {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</h3>
                                </div>
                                <h2 style={{ fontSize: '3rem', lineHeight: '1.1', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #fff 0%, #94A3B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{skill.title}</h2>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-sub)', marginBottom: '3rem', lineHeight: '1.8' }}>
                                    {skill.desc}
                                </p>

                                {/* Three Pillars Content */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                    <div>
                                        <h4 style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--primary)', marginBottom: '0.8rem' }}>Strategy</h4>
                                        <p style={{ fontSize: '0.85rem', opacity: 0.5, lineHeight: '1.5' }}>{skill.strategy}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--primary)', marginBottom: '0.8rem' }}>Precision</h4>
                                        <p style={{ fontSize: '0.85rem', opacity: 0.5, lineHeight: '1.5' }}>{skill.precision}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--primary)', marginBottom: '0.8rem' }}>Architecture</h4>
                                        <p style={{ fontSize: '0.85rem', opacity: 0.5, lineHeight: '1.5' }}>{skill.architecture}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="service-image" style={{ filter: 'brightness(1.1) contrast(1.05)' }}>
                                <img src={skill.img} alt={skill.title} />
                            </div>
                        </div>
                    </section>
                )
            })}

            {/* Matrix Toolset Conclusion */}
            <section style={{ textAlign: 'center', padding: '10rem 10%' }}>
                <div className="glass-container" style={{ padding: '6rem' }}>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Evolutionary Stack.</h2>
                    <p style={{ opacity: 0.5, marginBottom: '4rem' }}>Optimized for the next generation of digital infrastructure.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap', opacity: 0.3 }}>
                        {[Monitor, Layers, Database, Wind, Terminal, Palette, FileText].map((Icon, idx) => (
                            <div key={idx} style={{ transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)' }} onMouseEnter={e => {
                                e.currentTarget.style.opacity = '1'
                                e.currentTarget.style.color = 'var(--primary)'
                                e.currentTarget.style.transform = 'scale(1.2)'
                            }} onMouseLeave={e => {
                                e.currentTarget.style.opacity = '0.3'
                                e.currentTarget.style.color = 'currentColor'
                                e.currentTarget.style.transform = 'scale(1)'
                            }}>
                                <Icon size={50} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SkillsPage
