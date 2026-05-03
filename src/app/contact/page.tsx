'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ContactPage = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

    useEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            const reveals = gsap.utils.toArray('.reveal')
            reveals.forEach((reveal: any) => {
                gsap.from(reveal, {
                    y: 40,
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

            // Contact block staggered entrance
            gsap.from('.contact-info-block', {
                x: -30,
                opacity: 0,
                stagger: 0.2,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-grid',
                    start: 'top 80%'
                }
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.message) return

        setStatus('sending')
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            
            if (res.ok) {
                setStatus('success')
                setFormData({ name: '', email: '', message: '' })
                setTimeout(() => setStatus('idle'), 5000)
            } else {
                setStatus('error')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    return (
        <div ref={containerRef}>
            {/* Contact Hero */}
            <section className="hero">
                <div className="hero-inner" style={{ textAlign: 'center' }}>
                    <div style={{ textTransform: 'uppercase', letterSpacing: '8px', color: 'var(--primary)', marginBottom: '1.5rem', opacity: 0.6 }}>The Protocol</div>
                    <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.9 }}>Forge Your <br />Digital Legacy.</h1>
                    <p style={{ marginTop: '2.5rem', color: 'var(--text-sub)', maxWidth: '600px', margin: '2.5rem auto 0', fontSize: '1.2rem' }}>
                        Transforming high-fidelity visions into addictive digital realities. Currently accepting exclusive project inquiries for 2024.
                    </p>
                </div>
            </section>

            {/* Direct Contact & Form Grid */}
            <section className="contact-grid" style={{ padding: '0 10% 10rem' }}>
                <div className="glass-container reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '6rem', padding: '6rem', background: 'radial-gradient(circle at bottom left, rgba(0, 242, 255, 0.03), transparent)' }}>
                    <div>
                        <h2 style={{ fontSize: '3rem', marginBottom: '3rem', lineHeight: 1.1 }}>Direct Command.</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                            <div className="contact-info-block" style={{ borderLeft: '1px solid var(--glass-border)', paddingLeft: '2.5rem' }}>
                                <Mail size={24} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, fontSize: '0.75rem', marginBottom: '0.8rem' }}>Email Address</h4>
                                <p style={{ fontSize: '1.4rem', color: 'white', fontWeight: 600 }}>harshita1soni23@gmail.com</p>
                            </div>
                            <div className="contact-info-block" style={{ borderLeft: '1px solid var(--glass-border)', paddingLeft: '2.5rem' }}>
                                <MessageSquare size={24} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, fontSize: '0.75rem', marginBottom: '0.8rem' }}>Contact Number</h4>
                                <p style={{ fontSize: '1.4rem', color: 'white', fontWeight: 600 }}>9166300359</p>
                            </div>
                            <div className="contact-info-block" style={{ borderLeft: '1px solid var(--glass-border)', paddingLeft: '2.5rem' }}>
                                <MapPin size={24} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, fontSize: '0.75rem', marginBottom: '0.8rem' }}>Operation Hub</h4>
                                <p style={{ fontSize: '1.2rem', color: 'white', opacity: 0.7 }}>Hanuman Colony Sastri Nagar <br />Bhilwara Rajasthan India</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form" style={{ maxWidth: 'none', margin: '0' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '3rem', lineHeight: 1.1 }}>Initiate Transmission.</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div className="input-group">
                                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', opacity: 0.4, marginBottom: '1rem', display: 'block' }}>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Johnathan Doe" 
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '1.2rem 1.8rem', borderRadius: '12px', color: 'white', outline: 'none', transition: 'all 0.3s' }} 
                                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 20px var(--primary-glow)' }} 
                                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.boxShadow = 'none' }} 
                                />
                            </div>
                            <div className="input-group">
                                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', opacity: 0.4, marginBottom: '1rem', display: 'block' }}>Corporate Email</label>
                                <input 
                                    type="email" 
                                    placeholder="john@project.io" 
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '1.2rem 1.8rem', borderRadius: '12px', color: 'white', outline: 'none', transition: 'all 0.3s' }} 
                                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 20px var(--primary-glow)' }} 
                                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.boxShadow = 'none' }} 
                                />
                            </div>
                            <div className="input-group">
                                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', opacity: 0.4, marginBottom: '1rem', display: 'block' }}>Brief Description</label>
                                <textarea 
                                    rows={6} 
                                    placeholder="Tell us about your architectural vision..." 
                                    required
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '1.2rem 1.8rem', borderRadius: '12px', color: 'white', outline: 'none', resize: 'none', transition: 'all 0.3s' }} 
                                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 20px var(--primary-glow)' }} 
                                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.boxShadow = 'none' }}
                                ></textarea>
                            </div>
                            <button 
                                className="btn" 
                                type="submit"
                                disabled={status === 'sending'}
                                style={{ 
                                    padding: '1.5rem', 
                                    fontSize: '1.1rem', 
                                    letterSpacing: '2px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    gap: '1rem',
                                    opacity: status === 'sending' ? 0.5 : 1,
                                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                                    background: status === 'success' ? '#22c55e' : status === 'error' ? '#ef4444' : 'var(--primary)',
                                    color: status === 'success' || status === 'error' ? 'white' : 'black'
                                }}
                            >
                                {status === 'idle' && <><Send size={20} /> Initiate Protocol</>}
                                {status === 'sending' && <>Sending Transmission...</>}
                                {status === 'success' && <><CheckCircle2 size={20} /> Transmission Sent</>}
                                {status === 'error' && <><AlertCircle size={20} /> Transmission Failed</>}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactPage
