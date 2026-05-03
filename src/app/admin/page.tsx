'use client'

import React, { useState, useEffect } from 'react'
import { 
    Plus, Trash2, Edit3, Save, X, Upload, Check, Lock, 
    Globe, Database, Cpu, Monitor, Smartphone, LayoutTemplate, 
    Wind, Terminal, Palette, FileText, Layers, Video, Image as ImageIcon, MessageSquare
} from 'lucide-react'

// Custom Figma Icon SVG
const Figma = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
        <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
        <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
)

// Icon mapping for dynamic rendering
const IconMap: Record<string, any> = {
    Globe, Database, Cpu, Monitor, Figma, Smartphone, LayoutTemplate, 
    Wind, Terminal, Palette, FileText, Layers, Video, ImageIcon
}

const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState('')
    const [activeTab, setActiveTab] = useState<'skills' | 'work' | 'messages'>('skills')
    const [data, setData] = useState<any>({ skills: [], work: [], messages: [] })
    const [editingItem, setEditingItem] = useState<any>(null)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await fetch('/api/admin')
        const json = await res.json()
        setData(json)
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === 'admin123') setIsLoggedIn(true)
        else alert('Invalid Credentials')
    }

    const saveChanges = async (updatedData = data) => {
        await fetch('/api/admin', {
            method: 'POST',
            body: JSON.stringify(updatedData)
        })
        fetchData()
        setEditingItem(null)
    }

    const handleFileUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "skills" | "work" | "messages"
    ) => {
        if (type === "messages") return
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        const json = await res.json()

        if (json.success) {
            setEditingItem({ ...editingItem, img: json.url })
        }
        setIsUploading(false)
    }

    const deleteItem = (id: number, type: 'skills' | 'work') => {
        if (!confirm('Are you sure?')) return
        const newData = { ...data, [type]: data[type].filter((item: any) => item.id !== id) }
        setData(newData)
        saveChanges(newData)
    }

    const addItem = (type: 'skills' | 'work') => {
        const newItem = type === 'skills' ? {
            id: Date.now(),
            title: 'New Skill',
            desc: '',
            icon: 'Globe',
            img: '',
            strategy: '',
            precision: '',
            architecture: ''
        } : {
            id: Date.now(),
            title: 'New Project',
            category: 'UI/UX',
            img: '',
            icon: 'Layers'
        }
        setEditingItem(newItem)
    }

    const handleSaveItem = () => {
        const type = activeTab
        let newData
        if (data[type].find((item: any) => item.id === editingItem.id)) {
            newData = { ...data, [type]: data[type].map((item: any) => item.id === editingItem.id ? editingItem : item) }
        } else {
            newData = { ...data, [type]: [...data[type], editingItem] }
        }
        setData(newData)
        saveChanges(newData)
    }

    if (!isLoggedIn) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
                <form onSubmit={handleLogin} className="glass-container" style={{ padding: '4rem', width: '400px', textAlign: 'center' }}>
                    <Lock size={40} color="var(--primary)" style={{ marginBottom: '2rem' }} />
                    <h2 style={{ marginBottom: '2rem' }}>Secure Access</h2>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Master Password"
                        style={{ 
                            width: '100%', 
                            padding: '1.2rem', 
                            background: 'rgba(255,255,255,0.05)', 
                            border: '1px solid var(--glass-border)',
                            borderRadius: '12px',
                            color: 'white',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}
                    />
                    <button type="submit" className="premium-btn" style={{ width: '100%', justifyContent: 'center' }}>Authenticate</button>
                    <p style={{ marginTop: '2rem', opacity: 0.3, fontSize: '0.8rem' }}>Solar Flare Admin Engine v1.0</p>
                </form>
            </div>
        )
    }

    return (
        <div style={{ padding: '6rem 10%', minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6rem' }}>
                <div>
                    <h1 style={{ fontSize: '3rem' }}>Matrix Control.</h1>
                    <p style={{ opacity: 0.5 }}>Manage your digital infrastructure and portfolio.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '16px' }}>
                    <button 
                        onClick={() => { setActiveTab('skills'); setEditingItem(null); }}
                        style={{ 
                            padding: '1rem 2rem', 
                            borderRadius: '12px', 
                            background: activeTab === 'skills' ? 'var(--primary)' : 'transparent',
                            color: activeTab === 'skills' ? 'black' : 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 700
                        }}
                    >Skills</button>
                    <button 
                        onClick={() => { setActiveTab('work'); setEditingItem(null); }}
                        style={{ 
                            padding: '1rem 2rem', 
                            borderRadius: '12px', 
                            background: activeTab === 'work' ? 'var(--primary)' : 'transparent',
                            color: activeTab === 'work' ? 'black' : 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 700
                        }}
                    >Projects</button>
                    <button 
                        onClick={() => { setActiveTab('messages'); setEditingItem(null); }}
                        style={{ 
                            padding: '1rem 2rem', 
                            borderRadius: '12px', 
                            background: activeTab === 'messages' ? 'var(--primary)' : 'transparent',
                            color: activeTab === 'messages' ? 'black' : 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 700
                        }}
                    >Messages</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: editingItem ? '1fr 400px' : '1fr', gap: '3rem' }}>
                <div className="glass-container" style={{ padding: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.5rem', opacity: 0.8 }}>
                            {activeTab === 'skills' ? 'Active Units' : activeTab === 'work' ? 'Active Records' : 'Direct Transmissions'}
                        </h2>
                        {activeTab !== 'messages' && (
                            <button onClick={() => addItem(activeTab as 'skills' | 'work')} className="premium-btn" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>
                                <Plus size={18} /> Add New
                            </button>
                        )}
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {activeTab === 'messages' ? (
                            data.messages?.length > 0 ? (
                                data.messages.map((msg: any) => (
                                    <div key={msg.id} style={{ 
                                        padding: '2rem', 
                                        background: 'rgba(255,255,255,0.02)', 
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '16px' 
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                            <div>
                                                <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{msg.name}</h4>
                                                <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>{msg.email}</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ fontSize: '0.8rem', opacity: 0.3 }}>{new Date(msg.timestamp).toLocaleString()}</p>
                                                <button 
                                                    onClick={() => {
                                                        if(confirm('Delete message?')) {
                                                            const newData = { ...data, messages: data.messages.filter((m: any) => m.id !== msg.id) }
                                                            setData(newData)
                                                            saveChanges(newData)
                                                        }
                                                    }} 
                                                    style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', marginTop: '0.5rem' }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.8, whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.2 }}>
                                    <MessageSquare size={48} style={{ margin: '0 auto 1rem' }} />
                                    <p>No transmissions received yet.</p>
                                </div>
                            )
                        ) : (
                            data[activeTab].map((item: any) => (
                                <div key={item.id} style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between', 
                                    padding: '1.5rem', 
                                    background: 'rgba(255,255,255,0.02)', 
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '16px' 
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ width: '50px', height: '50px', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
                                            <img src={item.img || '/placeholder.png'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem' }}>{item.title}</h4>
                                            <p style={{ fontSize: '0.8rem', opacity: 0.4 }}>{item.category || item.icon}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => setEditingItem(item)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0.5rem' }}><Edit3 size={18} /></button>
                                        <button onClick={() => deleteItem(item.id, activeTab as 'skills' | 'work')} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '0.5rem' }}><Trash2 size={18} /></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {editingItem && (
                    <div className="glass-container" style={{ padding: '3rem', height: 'fit-content', position: 'sticky', top: '100px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>{data[activeTab].find((i:any) => i.id === editingItem.id) ? 'Edit' : 'Create'} Entry</h3>
                            <button onClick={() => setEditingItem(null)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    width: '100%', 
                                    height: '180px', 
                                    borderRadius: '20px', 
                                    background: '#000', 
                                    marginBottom: '1rem', 
                                    overflow: 'hidden',
                                    border: '1px dashed var(--glass-border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                    {editingItem.img ? <img src={editingItem.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon opacity={0.2} size={40} />}
                                    <label style={{ 
                                        position: 'absolute', 
                                        inset: 0, 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        background: 'rgba(0,0,0,0.4)', 
                                        cursor: 'pointer',
                                        opacity: isUploading ? 1 : 0,
                                        transition: 'opacity 0.3s'
                                    }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
                                        <input type="file"  onChange={(e) => {
                                            if (activeTab === "skills" || activeTab === "work") {
                                                handleFileUpload(e, activeTab);
                                            }
                                        }} />
                                        <Upload size={24} />
                                    </label>
                                </div>
                                <p style={{ fontSize: '0.7rem', opacity: 0.4 }}>Click to upload cover image</p>
                            </div>

                            <div className="form-group">
                                <label style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>Title</label>
                                <input className="admin-input" value={editingItem.title} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} />
                            </div>

                            {activeTab === 'skills' ? (
                                <>
                                    <div className="form-group">
                                        <label style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>Icon Component</label>
                                        <select className="admin-input" value={editingItem.icon} onChange={(e) => setEditingItem({...editingItem, icon: e.target.value})}>
                                            {Object.keys(IconMap).map(name => <option key={name} value={name}>{name}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>Description</label>
                                        <textarea className="admin-input" value={editingItem.desc} onChange={(e) => setEditingItem({...editingItem, desc: e.target.value})} rows={3} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '0.7rem', opacity: 0.5 }}>Strategy</label>
                                            <input className="admin-input" value={editingItem.strategy} onChange={(e) => setEditingItem({...editingItem, strategy: e.target.value})} />
                                        </div>
                                        <div className="form-group">
                                            <label style={{ fontSize: '0.7rem', opacity: 0.5 }}>Precision</label>
                                            <input className="admin-input" value={editingItem.precision} onChange={(e) => setEditingItem({...editingItem, precision: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: '0.7rem', opacity: 0.5 }}>Architecture</label>
                                        <input className="admin-input" value={editingItem.architecture} onChange={(e) => setEditingItem({...editingItem, architecture: e.target.value})} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <label style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>Category</label>
                                        <select className="admin-input" value={editingItem.category} onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}>
                                            <option value="UI/UX">UI/UX</option>
                                            <option value="Graphic">Graphic</option>
                                            <option value="Video">Video</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>Icon</label>
                                        <select className="admin-input" value={editingItem.icon} onChange={(e) => setEditingItem({...editingItem, icon: e.target.value})}>
                                            {Object.keys(IconMap).map(name => <option key={name} value={name}>{name}</option>)}
                                        </select>
                                    </div>
                                </>
                            )}

                            <button onClick={handleSaveItem} className="premium-btn" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                                <Save size={18} /> Push to Matrix
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .admin-input {
                    width: 100%;
                    padding: 1rem;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    color: white;
                    outline: none;
                    transition: border-color 0.3s;
                }
                .admin-input:focus {
                    border-color: var(--primary);
                }
                select.admin-input option {
                    background: #020408;
                    color: white;
                }
                .premium-btn {
                    position: relative;
                    padding: 1.2rem 2.5rem;
                    background: var(--primary);
                    color: black;
                    text-decoration: none;
                    font-weight: 700;
                    border-radius: 100px;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    transition: all 0.3s ease;
                }
                .premium-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px var(--primary-glow);
                }
            `}</style>
        </div>
    )
}

export default AdminPage
