'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    ArrowRight, Monitor, Layers, Video, Globe,
    Star, Quote, Send, Mail, MessageSquare,
    Camera, MessageCircle, Code2,
    Play, ChevronLeft, ChevronRight
} from 'lucide-react'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
    {
        id: 1,
        name: 'Rajesh Sharma',
        company: 'NDIMENSIONS Studio',
        rating: 5,
        text: 'Harshita transformed our brand identity completely. The attention to detail, the precision in every design deliverable — absolutely world-class. Our clients noticed the difference immediately.',
        role: 'Creative Director'
    },
    {
        id: 2,
        name: 'Priya Mehta',
        company: 'Tech Startup',
        rating: 5,
        text: 'The UI/UX work delivered was beyond our expectations. The user flows are intuitive, visually stunning, and our conversion rate jumped 40% after the redesign. Truly a game-changer.',
        role: 'Product Manager'
    },
    {
        id: 3,
        name: 'Anil Verma',
        company: 'Versatile Prime Info',
        rating: 5,
        text: 'Professional, creative, and always delivers on time. The video editing work for our campaigns was cinematic — it exactly captured the essence of what we were trying to communicate.',
        role: 'Marketing Head'
    },
    {
        id: 4,
        name: 'Sunita Joshi',
        company: 'Healthcare Brand',
        rating: 5,
        text: 'What impressed me most was the ability to understand the brief and translate it into a visual language that resonated with our audience. The graphic design work was premium.',
        role: 'Brand Manager'
    }
]

const skills = [
    { label: 'UI/UX Design', level: 95 },
    { label: 'Graphic Design', level: 92 },
    { label: 'Video Editing', level: 88 },
    { label: 'Web Development', level: 85 },
    { label: 'Adobe Suite', level: 90 },
    { label: 'Figma & Prototyping', level: 93 },
]

const HomePage = () => {
    const mainRef = useRef<HTMLDivElement>(null)
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
    const [dbData, setDbData] = useState<{ skills: any[], work: any[] }>({ skills: [], work: [] })
    const [isDataLoading, setIsDataLoading] = useState(true)
    const floaterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin')
                const data = await res.json()
                setDbData(data)
                setIsDataLoading(false)
            } catch (error) {
                console.error('Failed to fetch home data')
                setIsDataLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (!mainRef.current || isDataLoading) return

        const ctx = gsap.context(() => {
            // Hero entrance
            gsap.from('.hero-tag', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' })
            gsap.from('.hero-title', { y: 100, opacity: 0, duration: 1.5, delay: 0.2, ease: 'power4.out' })
            gsap.from('.hero-sub', { y: 30, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
            gsap.from('.hero-intro', { y: 20, opacity: 0, duration: 1, delay: 0.7, ease: 'power3.out' })
            gsap.from('.hero-btns', { scale: 0.9, opacity: 0, duration: 1, delay: 0.9, ease: 'back.out(1.7)' })
            gsap.from('.hero-socials', { x: -30, opacity: 0, duration: 1, delay: 1.1, ease: 'power3.out' })

            // Floating shapes animation
            gsap.to('.float-orb-1', { y: -30, x: 15, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
            gsap.to('.float-orb-2', { y: 25, x: -20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })
            gsap.to('.float-orb-3', { y: -20, x: 10, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
            gsap.to('.float-ring', { rotate: 360, duration: 20, repeat: -1, ease: 'none' })
            gsap.to('.float-ring-2', { rotate: -360, duration: 15, repeat: -1, ease: 'none' })

            // Scroll reveals
            const reveals = gsap.utils.toArray('.reveal')
            reveals.forEach((el: any) => {
                gsap.from(el, {
                    y: 60, opacity: 0, duration: 1.2,
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
                })
            })

            // Stagger card reveals
            const cardGroups = gsap.utils.toArray('.stagger-group')
            cardGroups.forEach((group: any) => {
                const cards = group.querySelectorAll('.stagger-card')
                if (cards.length > 0) {
                    gsap.from(cards, {
                        y: 50, opacity: 0, duration: 0.9, stagger: 0.15,
                        scrollTrigger: { 
                            trigger: group, 
                            start: 'top 80%', 
                            toggleActions: 'play none none reverse',
                            onEnter: () => ScrollTrigger.refresh()
                        }
                    })
                }
            })

            // Skill bar animations
            const bars = gsap.utils.toArray('.skill-bar-fill')
            bars.forEach((bar: any) => {
                const target = bar.dataset.width
                gsap.from(bar, {
                    width: 0, duration: 1.5, ease: 'power3.out',
                    scrollTrigger: { trigger: bar, start: 'top 90%' }
                })
            })

            // Count up stats
            const stats = gsap.utils.toArray('.stat-num')
            stats.forEach((stat: any) => {
                const val = parseInt(stat.textContent)
                stat.textContent = '0'
                gsap.to(stat, {
                    innerText: val, duration: 2, ease: 'power2.out',
                    scrollTrigger: { trigger: stat, start: 'top 90%' },
                    snap: { innerText: 1 }
                })
            })

            ScrollTrigger.refresh()
        }, mainRef)

        return () => {
            ctx.revert()
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [isDataLoading])

    // Auto-advance testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.message) return
        setFormStatus('sending')
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                setFormStatus('success')
                setFormData({ name: '', email: '', message: '' })
                setTimeout(() => setFormStatus('idle'), 5000)
            } else {
                setFormStatus('error')
            }
        } catch {
            setFormStatus('error')
        }
    }

    const inputStyle: React.CSSProperties = {
        width: '100%',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid var(--glass-border)',
        padding: '1.1rem 1.5rem',
        borderRadius: '12px',
        color: 'white',
        outline: 'none',
        transition: 'all 0.3s',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '0.95rem',
    }

    return (
        <main ref={mainRef}>

            {/* ─────────────────────────────────────────────
                1. HERO SECTION
            ───────────────────────────────────────────── */}
            <section className="hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>

                {/* Floating 3D abstract shapes */}
                <div className="float-orb-1" style={{
                    position: 'absolute', width: '400px', height: '400px',
                    borderRadius: '50%', top: '10%', right: '5%',
                    background: 'radial-gradient(circle, rgba(0,242,255,0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)', pointerEvents: 'none'
                }} />
                <div className="float-orb-2" style={{
                    position: 'absolute', width: '300px', height: '300px',
                    borderRadius: '50%', bottom: '15%', left: '5%',
                    background: 'radial-gradient(circle, rgba(122,0,255,0.2) 0%, transparent 70%)',
                    filter: 'blur(80px)', pointerEvents: 'none'
                }} />
                <div className="float-orb-3" style={{
                    position: 'absolute', width: '200px', height: '200px',
                    borderRadius: '50%', top: '40%', left: '15%',
                    background: 'radial-gradient(circle, rgba(0,242,255,0.08) 0%, transparent 70%)',
                    filter: 'blur(40px)', pointerEvents: 'none'
                }} />

                {/* Rotating rings */}
                <div className="float-ring" style={{
                    position: 'absolute', width: '600px', height: '600px',
                    borderRadius: '50%', border: '1px solid rgba(0,242,255,0.06)',
                    top: '50%', right: '-100px', transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                }} />
                <div className="float-ring-2" style={{
                    position: 'absolute', width: '400px', height: '400px',
                    borderRadius: '50%', border: '1px solid rgba(122,0,255,0.08)',
                    top: '50%', right: '-60px', transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                }} />

                {/* Social Links — left side */}
                <div className="hero-socials" style={{
                    position: 'absolute', left: '3%', top: '50%', transform: 'translateY(-50%)',
                    display: 'flex', flexDirection: 'column', gap: '1.5rem', zIndex: 10
                }}>
                    {[
                        { icon: Camera, href: '#' },
                        { icon: Globe, href: '#' },
                        { icon: MessageCircle, href: '#' },
                        { icon: Code2, href: '#' },
                    ].map(({ icon: Icon, href }, i) => (
                        <a key={i} href={href} style={{
                            color: 'rgba(255,255,255,0.3)', transition: 'all 0.3s', display: 'flex'
                        }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
                            <Icon size={18} />
                        </a>
                    ))}
                    <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--glass-border), transparent)', margin: '0 auto' }} />
                </div>

                <div className="hero-inner" style={{ textAlign: 'center', zIndex: 10 }}>
                    {/* Tag */}
                    <div className="hero-tag" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                        background: 'rgba(0,242,255,0.08)', border: '1px solid rgba(0,242,255,0.2)',
                        padding: '0.5rem 1.4rem', borderRadius: '100px',
                        textTransform: 'uppercase', letterSpacing: '4px',
                        color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600,
                        marginBottom: '2rem'
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                        Available for New Projects
                    </div>

                    {/* Headline */}
                    <h1 className="hero-title" style={{ marginBottom: '0' }}>
                        Designing &amp; Developing<br />
                        Digital Experiences<br />
                        <span style={{
                            background: 'var(--gradient-main)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline-block',
                            fontStyle: 'italic'
                        }}>That Stand Out.</span>
                    </h1>

                    {/* Subheadline roles */}
                    <div className="hero-sub" style={{
                        display: 'flex', justifyContent: 'center', gap: '0',
                        marginTop: '2rem', flexWrap: 'wrap'
                    }}>
                        {['UI/UX Designer', 'Graphic Designer', 'Video Editor', 'Developer'].map((role, i, arr) => (
                            <React.Fragment key={role}>
                                <span style={{ color: 'var(--text-sub)', fontSize: '1rem', fontWeight: 500 }}>{role}</span>
                                {i < arr.length - 1 && <span style={{ color: 'var(--primary)', margin: '0 0.8rem', opacity: 0.6 }}>•</span>}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Short intro */}
                    <p className="hero-intro" style={{
                        fontSize: '1.15rem', maxWidth: '600px', margin: '2rem auto',
                        color: 'var(--text-sub)', lineHeight: 1.7, opacity: 0.8
                    }}>
                        I craft premium digital experiences — from pixel-perfect interfaces to cinematic brand visuals —
                        turning bold visions into memorable digital realities.
                    </p>

                    {/* CTA Buttons */}
                    <div className="hero-btns" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/work" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                            View My Work <Play size={14} fill="currentColor" />
                        </Link>
                        <Link href="/contact" style={{
                            display: 'flex', alignItems: 'center', gap: '0.8rem',
                            color: 'white', textDecoration: 'none', fontWeight: 600,
                            padding: '1.2rem 2rem', borderRadius: '12px',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(255,255,255,0.03)',
                            transition: 'all 0.3s'
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLElement).style.color = 'var(--primary)' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)'; (e.currentTarget as HTMLElement).style.color = 'white' }}>
                            Let&apos;s Work Together <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Stats strip */}
                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '5rem',
                        flexWrap: 'wrap'
                    }}>
                        {[
                            { num: 3, suffix: '+', label: 'Years Experience' },
                            { num: 50, suffix: '+', label: 'Projects Delivered' },
                            { num: 30, suffix: '+', label: 'Happy Clients' },
                        ].map((stat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'Playfair Display' }}>
                                    <span className="stat-num">{stat.num}</span>
                                    <span style={{ color: 'var(--primary)' }}>{stat.suffix}</span>
                                </div>
                                <p style={{ fontSize: '0.8rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '2px', marginTop: '0.3rem' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom glow */}
                <div style={{
                    position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)',
                    width: '300px', height: '2px',
                    background: 'var(--gradient-main)',
                    boxShadow: '0 0 60px var(--primary)', opacity: 0.4
                }} />

                <style>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.5; transform: scale(0.8); }
                    }
                `}</style>
            </section>

            {/* ─────────────────────────────────────────────
                2. ABOUT / PERSONAL BRAND SECTION
            ───────────────────────────────────────────── */}
            <section style={{ padding: '10rem 10%', minHeight: 'auto' }}>
                <div className="reveal" style={{
                    display: 'grid', gridTemplateColumns: '1fr 1.3fr',
                    gap: '6rem', alignItems: 'center'
                }}>
                    {/* Image side */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            borderRadius: '32px', overflow: 'hidden',
                            height: '600px', position: 'relative',
                            boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <img
                                src="/profile.png"
                                alt="Harshita Soni"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,4,8,0.6), transparent 60%)' }} />
                        </div>

                        {/* Floating badge */}
                        <div style={{
                            position: 'absolute', bottom: '3rem', left: '-2rem',
                            background: 'var(--glass)', backdropFilter: 'blur(20px)',
                            border: '1px solid var(--glass-border)', borderRadius: '20px',
                            padding: '1.5rem 2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}>
                            <p style={{ color: 'var(--primary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.3rem' }}>Currently At</p>
                            <p style={{ fontWeight: 700, fontSize: '1rem' }}>NDIMENSIONS Studio</p>
                        </div>

                        {/* Accent corner ring */}
                        <div style={{
                            position: 'absolute', top: '-2rem', right: '-2rem',
                            width: '120px', height: '120px',
                            border: '2px solid rgba(0,242,255,0.2)', borderRadius: '50%',
                            pointerEvents: 'none'
                        }} />
                    </div>

                    {/* Content side */}
                    <div>
                        <div style={{ textTransform: 'uppercase', letterSpacing: '6px', color: 'var(--primary)', fontSize: '0.8rem', marginBottom: '1.5rem', opacity: 0.7 }}>
                            About Me
                        </div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                            The Mind Behind <br />
                            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>The Vision.</span>
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-sub)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                            I&apos;m Harshita Soni — a UI/UX Designer, Graphic Designer, Video Editor, and Web Developer from Bhilwara, Rajasthan.
                            With 3+ years of professional experience, I transform complex challenges into sleek, intuitive, and visually stunning digital products.
                        </p>
                        <p style={{ fontSize: '1rem', color: 'var(--text-sub)', lineHeight: 1.8, opacity: 0.7, marginBottom: '3rem' }}>
                            My working philosophy: every pixel serves a purpose. I merge aesthetic intelligence with technical precision
                            to create digital experiences that don&apos;t just look good — they convert, engage, and leave a lasting impression.
                        </p>

                        {/* Skill badges */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '3rem' }}>
                            {['Figma', 'Adobe XD', 'Photoshop', 'InDesign', 'Premiere Pro', 'HTML/CSS', 'JavaScript', 'Next.js'].map(skill => (
                                <span key={skill} style={{
                                    padding: '0.5rem 1.2rem',
                                    background: 'rgba(0,242,255,0.06)',
                                    border: '1px solid rgba(0,242,255,0.2)',
                                    borderRadius: '100px',
                                    fontSize: '0.8rem',
                                    color: 'var(--primary)',
                                    fontWeight: 500
                                }}>{skill}</span>
                            ))}
                        </div>

                        {/* Skill bars */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {(dbData.skills.length > 0 ? dbData.skills.slice(0, 6) : skills).map((skill: any) => (
                                <div key={skill.title || skill.label}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{skill.title || skill.label}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{skill.level || 90}%</span>
                                    </div>
                                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
                                        <div
                                            className="skill-bar-fill"
                                            data-width={`${skill.level || 90}%`}
                                            style={{
                                                height: '100%', width: `${skill.level || 90}%`,
                                                background: 'var(--gradient-main)',
                                                borderRadius: '100px'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
                            <Link href="/about" className="btn">My Full Story</Link>
                        </div>
                    </div>
                </div>

                <style>{`
                    @media (max-width: 1024px) {
                        .about-grid { grid-template-columns: 1fr !important; }
                    }
                `}</style>
            </section>

            {/* ─────────────────────────────────────────────
                3. SERVICES SECTION
            ───────────────────────────────────────────── */}
            <section style={{ padding: '10rem 10%', background: 'rgba(255,255,255,0.01)', minHeight: 'auto' }}>
                <div className="reveal" style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <div style={{ textTransform: 'uppercase', letterSpacing: '6px', color: 'var(--primary)', fontSize: '0.8rem', marginBottom: '1rem', opacity: 0.7 }}>
                        What I Do
                    </div>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>The Digital Arsenal.</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-sub)', maxWidth: '600px', margin: '0 auto', opacity: 0.7 }}>
                        Four specialized disciplines, one unified creative vision. Each service is crafted to elevate your brand.
                    </p>
                </div>

                <div className="stagger-group" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {(dbData.skills.length > 0 ? dbData.skills.slice(0, 4) : [
                        { icon: Layers, title: 'UI/UX Design', desc: 'Behavioral mapping, wireframes, prototypes.', color: '#00F2FF' },
                        { icon: Monitor, title: 'Graphic Design', desc: 'Brand identities and visual storytelling.', color: '#7A00FF' },
                        { icon: Video, title: 'Video Editing', desc: 'Cinematic promotional videos and reels.', color: '#00F2FF' },
                        { icon: Globe, title: 'Web Development', desc: 'Responsive and performant web experiences.', color: '#7A00FF' }
                    ]).map((service, i) => {
                        const Icon = typeof service.icon === 'string' ? (service.icon === 'Layers' ? Layers : service.icon === 'Monitor' ? Monitor : service.icon === 'Video' ? Video : service.icon === 'Globe' ? Globe : Layers) : service.icon
                        const color = service.color || (i % 2 === 0 ? '#00F2FF' : '#7A00FF')
                        
                        return (
                            <div key={i} className="stagger-card service-hover-card" style={{
                                background: 'var(--glass)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '28px',
                                padding: '3rem',
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'default',
                                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
                            }}>
                                {/* Glow accent */}
                                <div style={{
                                    position: 'absolute', top: '-40px', right: '-40px',
                                    width: '150px', height: '150px', borderRadius: '50%',
                                    background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
                                    pointerEvents: 'none', transition: 'all 0.4s'
                                }} />

                                <div style={{
                                    width: '60px', height: '60px', borderRadius: '18px',
                                    background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                                    border: `1px solid ${color}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '2rem'
                                }}>
                                    <Icon size={28} color={color} />
                                </div>

                                <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>{service.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-sub)', lineHeight: 1.7, marginBottom: '2rem', opacity: 0.8 }}>{service.desc}</p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {(service.tags || ['Design', 'Creative']).map((tag: any) => (
                                        <span key={tag} style={{
                                            padding: '0.3rem 0.9rem',
                                            background: `${color}12`,
                                            border: `1px solid ${color}25`,
                                            borderRadius: '100px',
                                            fontSize: '0.75rem',
                                            color: color,
                                            fontWeight: 500
                                        }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <style>{`
                    .service-hover-card:hover {
                        transform: translateY(-8px);
                        border-color: rgba(0,242,255,0.3);
                        box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0,242,255,0.05);
                    }
                `}</style>
            </section>

            {/* ─────────────────────────────────────────────
                4. FEATURED PROJECTS SECTION
            ───────────────────────────────────────────── */}
            <section style={{ padding: '10rem 10%', minHeight: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem' }}>
                    <div className="reveal">
                        <div style={{ textTransform: 'uppercase', letterSpacing: '6px', color: 'var(--primary)', fontSize: '0.8rem', marginBottom: '1rem', opacity: 0.7 }}>
                            Portfolio
                        </div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>Featured Work.</h2>
                    </div>
                    <Link href="/work" className="reveal" style={{
                        display: 'flex', alignItems: 'center', gap: '0.8rem',
                        color: 'var(--primary)', textDecoration: 'none', fontWeight: 600,
                        fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px'
                    }}>
                        View All <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="stagger-group" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridAutoRows: '280px',
                    gap: '1.5rem'
                }}>
                    {(dbData.work.length > 0 ? dbData.work.slice(0, 4) : [
                        { title: 'Brand Identity System', category: 'Branding', img: '/web_dev_hero.jpg' },
                        { title: 'Mobile UI/UX Design', category: 'UI/UX', img: '/ui_design_hero.jpg' },
                        { title: 'Campaign Video Edit', category: 'Video Editing', img: '/adobe_suite_hero.jpg' },
                        { title: 'E-Commerce Web App', category: 'Development', img: '/responsive_design_hero.jpg' }
                    ]).map((proj, i) => {
                        const colSpans = [7, 5, 5, 7, 6, 6]
                        const span = colSpans[i % colSpans.length]
                        return (
                            <div key={i} className="stagger-card proj-card" style={{
                                gridColumn: `span ${span}`,
                                borderRadius: '24px', overflow: 'hidden',
                                border: '1px solid var(--glass-border)',
                                position: 'relative', cursor: 'pointer',
                                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                            }}>
                                <img src={proj.img} alt={proj.title} style={{
                                    width: '100%', height: '100%', objectFit: 'cover',
                                    transition: 'transform 0.6s ease', display: 'block'
                                }} />
                                <div className="proj-overlay" style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to top, rgba(2,4,8,0.95) 0%, rgba(2,4,8,0.3) 50%, transparent 100%)',
                                    opacity: 0, transition: 'opacity 0.4s',
                                    display: 'flex', flexDirection: 'column',
                                    justifyContent: 'flex-end', padding: '2.5rem'
                                }}>
                                    <span style={{
                                        color: 'var(--primary)', fontSize: '0.75rem',
                                        textTransform: 'uppercase', letterSpacing: '3px',
                                        marginBottom: '0.8rem', fontWeight: 600
                                    }}>{proj.category || proj.tag}</span>
                                    <h3 style={{ fontSize: '1.5rem', lineHeight: 1.2 }}>{proj.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: 'var(--primary)' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>View Case Study</span>
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <style>{`
                    .proj-card:hover img { transform: scale(1.05); }
                    .proj-card:hover .proj-overlay { opacity: 1; }
                    .proj-card:hover {
                        border-color: rgba(0,242,255,0.3);
                        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    }
                    @media (max-width: 768px) {
                        .proj-card { grid-column: span 12 !important; }
                    }
                `}</style>
            </section>

            {/* ─────────────────────────────────────────────
                5. TESTIMONIALS SECTION
            ───────────────────────────────────────────── */}
            <section style={{ padding: '10rem 10%', background: 'rgba(255,255,255,0.01)', minHeight: 'auto', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                    width: '500px', height: '500px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(122,0,255,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div style={{ textTransform: 'uppercase', letterSpacing: '6px', color: 'var(--primary)', fontSize: '0.8rem', marginBottom: '1rem', opacity: 0.7 }}>
                        Social Proof
                    </div>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>Client Voices.</h2>
                </div>

                {/* Main testimonial card */}
                <div className="reveal" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
                    <div style={{
                        background: 'var(--glass)', backdropFilter: 'blur(30px)',
                        border: '1px solid var(--glass-border)', borderRadius: '32px',
                        padding: '5rem', textAlign: 'center',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                        minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'center'
                    }}>
                        <Quote size={48} color="var(--primary)" style={{ margin: '0 auto 2rem', opacity: 0.4 }} />

                        {/* Stars */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.3rem', marginBottom: '2rem' }}>
                            {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                                <Star key={i} size={18} fill="var(--primary)" color="var(--primary)" />
                            ))}
                        </div>

                        <p style={{
                            fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--text-main)',
                            marginBottom: '2.5rem', fontStyle: 'italic', opacity: 0.9,
                            transition: 'all 0.4s ease'
                        }}>
                            &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                        </p>

                        <div>
                            <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{testimonials[currentTestimonial].name}</p>
                            <p style={{ color: 'var(--primary)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                                {testimonials[currentTestimonial].role} · {testimonials[currentTestimonial].company}
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '3rem' }}>
                        <button
                            onClick={() => setCurrentTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}
                            style={{
                                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
                                borderRadius: '50%', width: '48px', height: '48px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', cursor: 'pointer', transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Dots */}
                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                            {testimonials.map((_, i) => (
                                <button key={i} onClick={() => setCurrentTestimonial(i)} style={{
                                    width: currentTestimonial === i ? '24px' : '8px',
                                    height: '8px', borderRadius: '100px',
                                    background: currentTestimonial === i ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                                    border: 'none', cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }} />
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentTestimonial(p => (p + 1) % testimonials.length)}
                            style={{
                                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
                                borderRadius: '50%', width: '48px', height: '48px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', cursor: 'pointer', transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ─────────────────────────────────────────────
                6. CONTACT / CTA SECTION
            ───────────────────────────────────────────── */}
            <section style={{ padding: '10rem 10%', position: 'relative', overflow: 'hidden', minHeight: 'auto' }}>
                {/* Gradient spotlight */}
                <div style={{
                    position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
                    width: '100%', height: '100%',
                    background: 'radial-gradient(ellipse at top, rgba(0,242,255,0.06) 0%, transparent 60%)',
                    pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute', bottom: '0', left: '0', width: '100%',
                    height: '1px', background: 'var(--glass-border)'
                }} />

                <div className="reveal" style={{ textAlign: 'center', marginBottom: '7rem' }}>
                    <div style={{ textTransform: 'uppercase', letterSpacing: '6px', color: 'var(--primary)', fontSize: '0.8rem', marginBottom: '1.5rem', opacity: 0.7 }}>
                        Let&apos;s Connect
                    </div>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
                        Let&apos;s Build Something<br />
                        <span style={{
                            background: 'var(--gradient-main)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontStyle: 'italic'
                        }}>Amazing Together.</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-sub)', maxWidth: '500px', margin: '0 auto', opacity: 0.7 }}>
                        Have a project in mind? Let&apos;s discuss and bring your vision to life with precision and flair.
                    </p>
                </div>

                <div className="reveal" style={{
                    display: 'grid', gridTemplateColumns: '1fr 1.5fr',
                    gap: '5rem', alignItems: 'start'
                }}>
                    {/* Left — contact info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <div style={{
                            background: 'var(--glass)', backdropFilter: 'blur(20px)',
                            border: '1px solid var(--glass-border)', borderRadius: '24px',
                            padding: '3rem'
                        }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', opacity: 0.9 }}>Direct Channels.</h3>

                            {[
                                { icon: Mail, label: 'Email', value: 'harshita1soni23@gmail.com', href: 'mailto:harshita1soni23@gmail.com' },
                                { icon: MessageSquare, label: 'WhatsApp', value: '+91 9166300359', href: 'https://wa.me/919166300359' },
                            ].map(({ icon: Icon, label, value, href }, i) => (
                                <a key={i} href={href} style={{
                                    display: 'flex', alignItems: 'center', gap: '1.5rem',
                                    padding: '1.5rem', borderRadius: '16px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.02)',
                                    textDecoration: 'none', marginBottom: '1rem',
                                    transition: 'all 0.3s'
                                }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
                                >
                                    <div style={{
                                        width: '44px', height: '44px', borderRadius: '12px',
                                        background: 'rgba(0,242,255,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Icon size={20} color="var(--primary)" />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.75rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.2rem' }}>{label}</p>
                                        <p style={{ fontSize: '0.95rem', color: 'white', fontWeight: 500 }}>{value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social links */}
                        <div style={{
                            background: 'var(--glass)', backdropFilter: 'blur(20px)',
                            border: '1px solid var(--glass-border)', borderRadius: '24px',
                            padding: '2.5rem'
                        }}>
                            <p style={{ fontSize: '0.75rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1.5rem' }}>Follow Along</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {[Camera, Globe, MessageCircle, Code2].map((Icon, i) => (
                                    <a key={i} href="#" style={{
                                        width: '44px', height: '44px', borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'rgba(255,255,255,0.4)', transition: 'all 0.3s', textDecoration: 'none'
                                    }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = 'var(--primary)'
                                            e.currentTarget.style.color = 'var(--primary)'
                                            e.currentTarget.style.background = 'rgba(0,242,255,0.08)'
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = 'var(--glass-border)'
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                                        }}
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right — contact form */}
                    <div style={{
                        background: 'var(--glass)', backdropFilter: 'blur(20px)',
                        border: '1px solid var(--glass-border)', borderRadius: '24px',
                        padding: '4rem', position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute', top: '-50px', right: '-50px',
                            width: '200px', height: '200px', borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(0,242,255,0.06) 0%, transparent 70%)',
                            pointerEvents: 'none'
                        }} />

                        <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Send a Transmission.</h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-sub)', opacity: 0.6, marginBottom: '3rem' }}>
                            I typically respond within 24 hours.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, display: 'block', marginBottom: '0.7rem' }}>Your Name</label>
                                    <input
                                        type="text" required placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        style={inputStyle}
                                        onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,242,255,0.1)' }}
                                        onBlur={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.boxShadow = 'none' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, display: 'block', marginBottom: '0.7rem' }}>Email Address</label>
                                    <input
                                        type="email" required placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        style={inputStyle}
                                        onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,242,255,0.1)' }}
                                        onBlur={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.boxShadow = 'none' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, display: 'block', marginBottom: '0.7rem' }}>Your Message</label>
                                <textarea
                                    required rows={5} placeholder="Tell me about your project..."
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    style={{ ...inputStyle, resize: 'none' }}
                                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,242,255,0.1)' }}
                                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.boxShadow = 'none' }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={formStatus === 'sending'}
                                style={{
                                    padding: '1.2rem 2.5rem',
                                    background: formStatus === 'success' ? '#22c55e' : formStatus === 'error' ? '#ef4444' : 'var(--gradient-main)',
                                    color: 'white', fontWeight: 700, fontSize: '1rem',
                                    borderRadius: '12px', border: 'none', cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
                                    transition: 'all 0.3s', opacity: formStatus === 'sending' ? 0.6 : 1,
                                    letterSpacing: '1px', fontFamily: 'Outfit, sans-serif'
                                }}
                            >
                                {formStatus === 'idle' && <><Send size={18} /> Send Message</>}
                                {formStatus === 'sending' && <>Sending...</>}
                                {formStatus === 'success' && <>Message Sent Successfully!</>}
                                {formStatus === 'error' && <>Failed to Send — Try Again</>}
                            </button>
                        </form>
                    </div>
                </div>

                <style>{`
                    @media (max-width: 1024px) {
                        .contact-grid-inner { grid-template-columns: 1fr !important; }
                    }
                `}</style>
            </section>
        </main>
    )
}

export default HomePage
