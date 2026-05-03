'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote, Award, Briefcase, Calendar, Eye, Target, GraduationCap, School, BookOpen, Sparkles, User, Cpu, Mail, Trophy, Code, Palette, Music, Activity } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const AboutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            const sections = containerRef.current!.querySelectorAll('section')
            sections.forEach((section) => {
                const content = section.querySelector('.glass-container, .animate-content, .reveal-item')
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

            // Metric counter effect
            const metrics = gsap.utils.toArray('.metric-num')
            metrics.forEach((metric: any) => {
                const target = parseInt(metric.innerText)
                metric.innerText = '0'
                gsap.to(metric, {
                    innerText: target,
                    duration: 2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: metric,
                        start: 'top 90%'
                    },
                    snap: { innerText: 1 }
                })
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef}>
            {/* About Hero */}
            <section className="hero">
                <div className="hero-inner" style={{ textAlign: 'center' }}>
                    <div style={{ textTransform: 'uppercase', letterSpacing: '8px', color: 'var(--primary)', marginBottom: '1.5rem', opacity: 0.6 }}>The Origin</div>
                    <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.9 }}>Digital Mastery <br />Through Minimalism.</h1>
                </div>
            </section>

            {/* Philosophy & Image Section - Cinematic Layout */}
            <section style={{ padding: '0 10% 8rem' }}>
                <div className="glass-container" style={{ padding: '6rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Quote size={80} color="var(--primary)" style={{ opacity: 0.3, marginBottom: '2rem', margin: '0 auto' }} />
                            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', lineHeight: 1.1 }}>Crafting the <br /><span style={{ color: 'var(--primary)' }}>Luxury Atmosphere.</span></h2>
                            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-sub)', marginBottom: '2rem' }}>
                                We don't just build websites; we sculpt digital brands. Our work lives at the intersection of pixel-level precision and cinematic narrative. Every scroll is a movement, and every movement is an experience.
                            </p>
                            <p style={{ fontSize: '1rem', color: 'var(--text-sub)', opacity: 0.7, lineHeight: '1.8' }}>
                                My design language is built on creating a unique atmosphere for each digital product. Whether it's a UI for a fintech giant or a commercial reel for a fashion brand, the goal is always the same: Addictive Quality.
                            </p>
                        </div>
                        <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', height: '500px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                            <img
                                src="/profile.jpg"
                                alt="Harshita Soni"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Work and Experience - Detailed History */}
            <section id="experience" style={{ padding: '5rem 10% 10rem' }}>
                <div className="glass-container" style={{ padding: '6rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <h4 style={{ textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--primary)', marginBottom: '1rem' }}>Expertise in Action</h4>
                        <h2>Work and Experience.</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                        {[
                            {
                                title: 'Graphic Designer & Video Editor',
                                company: 'NDIMENSIONS Studio',
                                period: '2025 – Present',
                                points: [
                                    'Worked on multiple client projects across industries like hospitals, hospitality, real estate, schools, and meditation centers',
                                    'Designed marketing materials including flex banners, posters, social media creatives, and promotional graphics',
                                    'Created professional ID cards, business cards, and custom print materials based on client requirements',
                                    'Developed branding assets ensuring consistency across all platforms',
                                    'Edited videos for clients including promotional videos, reels, and social media content',
                                    'Collaborated directly with clients to understand requirements and deliver creative solutions',
                                    'Managed multiple projects simultaneously while maintaining quality and deadlines'
                                ]
                            },

                            {
                                title: 'UI/UX Designer, Software Developer & Graphic Designer',
                                company: 'Technology Twist Pvt. Ltd.',
                                period: '2024',
                                points: [
                                    'Designed UI for web applications and improved usability',
                                    'Developed frontend using HTML, CSS, JavaScript',
                                    'Worked on branding and graphic design assets'
                                ]
                            },

                            {
                                title: 'UI/UX Designer & Graphic Designer Intern',
                                company: 'Versatile Prime Info Solutions Pvt. Ltd.',
                                period: '2023 – 2024',
                                points: [
                                    'Designed responsive UI/UX for websites and applications',
                                    'Created wireframes, prototypes, and high-fidelity designs',
                                    'Worked with developers to implement user-friendly interfaces',
                                    'Conducted research and improved user experience'
                                ]
                            }
                        ].map((work, idx) => (
                            <div key={idx} className="reveal" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 3fr', gap: '4rem', paddingBottom: '4rem', borderBottom: idx !== 2 ? '1px solid var(--glass-border)' : 'none' }}>
                                <div className="sticky-sidebar" style={{ position: 'sticky', top: '100px', height: 'fit-content', textAlign: 'center' }}>
                                    <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1rem' }}>{work.period}</p>
                                    <h4 style={{ color: 'var(--text-sub)', fontSize: '1.1rem', fontStyle: 'italic' }}>{work.company}</h4>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ fontSize: '2.5rem', marginBottom: '2.5rem', background: 'linear-gradient(135deg, #fff, var(--text-sub))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{work.title}</h3>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem', alignItems: 'center' }}>
                                        {work.points.map((point, pIdx) => (
                                            <li key={pIdx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', color: 'var(--text-sub)', fontSize: '1.1rem', lineHeight: 1.6, textAlign: 'center', justifyContent: 'center' }}>
                                                <span style={{ color: 'var(--primary)', marginTop: '0.4rem', fontSize: '1.4rem' }}>•</span>
                                                <span style={{ maxWidth: '80%' }}>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section - Redesigned for Premium Impact */}
            <section style={{ padding: '0 10% 12rem', position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                    opacity: 0.2,
                    zIndex: -1,
                    filter: 'blur(100px)'
                }} />

                <div className="animate-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 0.8fr) minmax(400px, 1.2fr)', gap: '4rem', alignItems: 'start' }}>
                    {/* Vision Card - The "Big Statement" */}
                    <div className="vision-card" style={{
                        padding: '5rem 4rem',
                        background: 'linear-gradient(135deg, rgba(var(--bg-rgb), 0.8), rgba(var(--bg-rgb), 0.4))',
                        backdropFilter: 'blur(30px)',
                        borderRadius: '40px',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: '-10%', left: '-10%', opacity: 0.03 }}>
                            <Eye size={350} color="var(--primary)" />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', zIndex: 1, alignItems: 'center' }}>
                            <div style={{
                                background: 'var(--gradient-main)',
                                width: 'fit-content',
                                padding: '1.2rem',
                                borderRadius: '24px',
                                boxShadow: '0 10px 30px var(--primary-glow)'
                            }}>
                                <Eye size={36} color="white" />
                            </div>

                            <h3 style={{ fontSize: '3.5rem', fontFamily: 'Playfair Display', lineHeight: 1.1 }}>
                                Our <br /><span style={{ color: 'var(--primary)' }}>Vision.</span>
                            </h3>

                            <p style={{ fontSize: '1.4rem', lineHeight: '1.7', color: 'var(--text-main)', fontWeight: 300, opacity: 0.9 }}>
                                "To revolutionize the digital landscape by creating <span style={{ color: 'var(--primary)' }}>innovative, user-centric</span> web designs that seamlessly blend aesthetics with functionality."
                            </p>
                        </div>
                    </div>

                    {/* Mission Section - The "Pillars of Excellence" */}
                    <div className="mission-container" style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '4rem' }}>
                            <h4 style={{ textTransform: 'uppercase', letterSpacing: '6px', color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                                <Target size={20} /> Our Mission
                            </h4>
                            <h2 style={{ fontSize: '3rem', lineHeight: 1.2 }}>Setting New Standards <br />for Digital Excellence.</h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {[
                                { title: 'Innovation', desc: 'Captivating users through boundary-pushing design.', icon: Sparkles },
                                { title: 'Quality', desc: 'Exceeding expectations with absolute precision.', icon: Award },
                                { title: 'User-First', desc: 'Seamless experiences that leave lasting impressions.', icon: User },
                                { title: 'Mastery', desc: 'Staying ahead with cutting-edge technologies.', icon: Cpu },
                                { title: 'Collaboration', desc: 'Transparent communication for successful outcomes.', icon: Mail },
                                { title: 'Growth', desc: 'Constantly evolving to maintain market leadership.', icon: Calendar }
                            ].map((item, i) => (
                                <div key={i} className="mission-pillar" style={{
                                    padding: '2.5rem',
                                    background: 'var(--glass)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '24px',
                                    transition: 'all 0.4s ease',
                                    cursor: 'default'
                                }}>
                                    <h5 style={{
                                        color: 'var(--primary)',
                                        fontSize: '1.2rem',
                                        marginBottom: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.8rem'
                                    }}>
                                        <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '2px', transform: 'rotate(45deg)' }} />
                                        {item.title}
                                    </h5>
                                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-sub)', opacity: 0.7 }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`
                    .mission-pillar:hover {
                        transform: translateY(-5px);
                        border-color: var(--primary);
                        box-shadow: 0 15px 30px var(--primary-glow);
                        background: rgba(255,255,255,0.03);
                    }
                    .vision-card::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
                        transition: 0.5s;
                    }
                    .vision-card:hover::after {
                        left: 100%;
                    }
                `}</style>
            </section>

            {/* Educational Background Section */}
            <section style={{ padding: '5rem 10% 5rem' }}>
                <div className="glass-container" style={{ padding: '6rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <div style={{ background: 'var(--primary-glow)', width: 'fit-content', margin: '0 auto 1.5rem', padding: '1rem', borderRadius: '50%' }}>
                            <GraduationCap size={40} color="var(--primary)" />
                        </div>
                        <h4 style={{ textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--primary)', marginBottom: '1rem' }}>Academic Foundation</h4>
                        <h2>Educational Excellence.</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        {[
                            {
                                degree: 'Bachelor of Science in Information Technology',
                                school: 'Vidhya Professional and Technology College',
                                year: '2021 - 2023',
                                score: '72.88%',
                                icon: GraduationCap,
                                desc: 'Comprehensive study of information systems, software development, and digital technology architectures.'
                            },
                            {
                                degree: 'Senior Secondary Education',
                                school: 'Board of Secondary Education, Rajasthan',
                                year: '2019 - 2020',
                                score: '61.40%',
                                icon: School,
                                desc: 'Focused on advanced theoretical concepts and academic excellence in higher secondary studies.'
                            },
                            {
                                degree: 'Secondary Education',
                                school: 'Board of Secondary Education, Rajasthan',
                                year: '2017 - 2018',
                                score: '62.17%',
                                icon: BookOpen,
                                desc: 'Foundational education with a strong emphasis on core scientific and mathematical principles.'
                            }
                        ].map((edu, index) => (
                            <div key={index} className="reveal-item" style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--glass-border)', transition: 'transform 0.3s ease' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                    <div style={{ background: 'var(--primary-glow)', padding: '0.8rem', borderRadius: '12px' }}>
                                        <edu.icon size={24} color="var(--primary)" />
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', display: 'block' }}>{edu.year}</span>
                                        <span style={{ color: 'var(--text-sub)', fontSize: '0.75rem', opacity: 0.6 }}>Score: {edu.score}</span>
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', lineHeight: 1.3 }}>{edu.degree}</h3>
                                <p style={{ color: 'var(--text-sub)', fontWeight: 600, marginBottom: '1.5rem', fontSize: '0.9rem' }}>{edu.school}</p>
                                <p style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: 1.6 }}>{edu.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Certifications & Achievements Section */}
            <section id="achievements" style={{ padding: '4rem 10% 10rem' }}>
                <div className="glass-container" style={{ padding: '6rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <div style={{ background: 'var(--primary-glow)', width: 'fit-content', margin: '0 auto 1.5rem', padding: '1rem', borderRadius: '50%' }}>
                            <Trophy size={40} color="var(--primary)" />
                        </div>
                        <h4 style={{ textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--primary)', marginBottom: '1rem' }}>Milestones</h4>
                        <h2>Certifications & Achievements.</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: 'RSCIT Certificate', provider: 'Rajasthan State Certificate of IT', icon: Cpu, desc: 'Advanced proficiency in information technology and digital workflows.' },
                            { title: '1st Prize - Web Design', provider: 'Inter-College Competition', icon: Trophy, desc: 'Recognized for excellence in modern web architecture and UI aesthetics.' },
                            { title: 'Web Development', provider: 'Udemy Certified', icon: Code, desc: 'Comprehensive mastery of full-stack development and responsive systems.' },
                            { title: 'Graphic Design', provider: 'Coursera Certified', icon: Palette, desc: 'Professional certification in visual communication and digital artistry.' },
                            { title: 'Cultural Lead', provider: 'Miss Vidhya College Bhilwara', icon: Music, desc: 'Active participant and organizer of high-profile college cultural activities.' },
                            { title: 'Badminton Enthusiast', provider: 'Sports & Athletics', icon: Activity, desc: 'Competitive player with a focus on agility, strategy, and endurance.' }
                        ].map((item, idx) => (
                            <div key={idx} className="reveal-item" style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '2.5rem',
                                borderRadius: '24px',
                                border: '1px solid var(--glass-border)',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}>
                                <div style={{ marginBottom: '1.5rem', opacity: 0.8, display: 'flex', justifyContent: 'center' }}>
                                    <item.icon size={32} color="var(--primary)" />
                                </div>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', textAlign: 'center' }}>{item.title}</h3>
                                <p style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', opacity: 0.8, textAlign: 'center' }}>{item.provider}</p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', opacity: 0.6, lineHeight: 1.5, textAlign: 'center' }}>{item.desc}</p>
                            </div>
                        ))}
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

export default AboutPage
