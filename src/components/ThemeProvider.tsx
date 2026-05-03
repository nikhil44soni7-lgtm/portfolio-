'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type ThemeName = 'obsidian' | 'aurora' | 'sunset' | 'forest' | 'rose'

export const themes: Record<ThemeName, { label: string; icon: string; vars: Record<string, string> }> = {
  obsidian: {
    label: 'Obsidian',
    icon: '🌑',
    vars: {
      '--primary': '#00F2FF',
      '--primary-glow': 'rgba(0, 242, 255, 0.3)',
      '--accent': '#7A00FF',
      '--bg': '#020408',
      '--card-bg': 'rgba(10, 15, 25, 0.7)',
      '--text-main': '#FFFFFF',
      '--text-sub': '#94A3B8',
      '--glass': 'rgba(15, 23, 42, 0.6)',
      '--glass-border': 'rgba(255, 255, 255, 0.08)',
      '--glass-highlight': 'rgba(255, 255, 255, 0.04)',
      '--shadow': '0 20px 50px rgba(0, 0, 0, 0.5)',
      '--gradient-main': 'linear-gradient(135deg, #00F2FF, #7A00FF)',
      '--nav-bg': 'rgba(2, 4, 8, 0.4)',
      '--footer-bg': 'rgba(2, 4, 8, 1)',
      '--mesh-1': 'rgba(0, 242, 255, 0.05)',
      '--mesh-2': 'rgba(122, 0, 255, 0.05)',
      '--bg-rgb': '2, 4, 8',
    },
  },
  aurora: {
    label: 'Aurora',
    icon: '🌌',
    vars: {
      '--primary': '#00FFB2',
      '--primary-glow': 'rgba(0, 255, 178, 0.3)',
      '--accent': '#0066FF',
      '--bg': '#030A10',
      '--card-bg': 'rgba(5, 20, 35, 0.7)',
      '--text-main': '#E8F4FF',
      '--text-sub': '#7BAFC4',
      '--glass': 'rgba(5, 25, 50, 0.6)',
      '--glass-border': 'rgba(0, 255, 178, 0.1)',
      '--glass-highlight': 'rgba(0, 255, 178, 0.04)',
      '--shadow': '0 20px 50px rgba(0, 0, 0, 0.6)',
      '--gradient-main': 'linear-gradient(135deg, #00FFB2, #0066FF)',
      '--nav-bg': 'rgba(3, 10, 16, 0.4)',
      '--footer-bg': 'rgba(3, 10, 16, 1)',
      '--mesh-1': 'rgba(0, 255, 178, 0.05)',
      '--mesh-2': 'rgba(0, 102, 255, 0.05)',
      '--bg-rgb': '3, 10, 16',
    },
  },
  sunset: {
    label: 'Sunset',
    icon: '🌅',
    vars: {
      '--primary': '#FF6B35',
      '--primary-glow': 'rgba(255, 107, 53, 0.35)',
      '--accent': '#FFD700',
      '--bg': '#0D0500',
      '--card-bg': 'rgba(25, 10, 5, 0.7)',
      '--text-main': '#FFF5E6',
      '--text-sub': '#C4956A',
      '--glass': 'rgba(40, 15, 5, 0.6)',
      '--glass-border': 'rgba(255, 107, 53, 0.12)',
      '--glass-highlight': 'rgba(255, 165, 0, 0.05)',
      '--shadow': '0 20px 50px rgba(0, 0, 0, 0.5)',
      '--gradient-main': 'linear-gradient(135deg, #FF6B35, #FFD700)',
      '--nav-bg': 'rgba(13, 5, 0, 0.4)',
      '--footer-bg': 'rgba(13, 5, 0, 1)',
      '--mesh-1': 'rgba(255, 107, 53, 0.06)',
      '--mesh-2': 'rgba(255, 215, 0, 0.04)',
      '--bg-rgb': '13, 5, 0',
    },
  },
  forest: {
    label: 'Forest',
    icon: '🌿',
    vars: {
      '--primary': '#39FF14',
      '--primary-glow': 'rgba(57, 255, 20, 0.3)',
      '--accent': '#00CC66',
      '--bg': '#010A04',
      '--card-bg': 'rgba(5, 20, 10, 0.7)',
      '--text-main': '#E8FFE8',
      '--text-sub': '#72A87F',
      '--glass': 'rgba(5, 25, 10, 0.6)',
      '--glass-border': 'rgba(57, 255, 20, 0.1)',
      '--glass-highlight': 'rgba(57, 255, 20, 0.04)',
      '--shadow': '0 20px 50px rgba(0, 0, 0, 0.5)',
      '--gradient-main': 'linear-gradient(135deg, #39FF14, #00CC66)',
      '--nav-bg': 'rgba(1, 10, 4, 0.4)',
      '--footer-bg': 'rgba(1, 10, 4, 1)',
      '--mesh-1': 'rgba(57, 255, 20, 0.05)',
      '--mesh-2': 'rgba(0, 204, 102, 0.05)',
      '--bg-rgb': '1, 10, 4',
    },
  },
  rose: {
    label: 'Rose',
    icon: '🌸',
    vars: {
      '--primary': '#FF4FA3',
      '--primary-glow': 'rgba(255, 79, 163, 0.35)',
      '--accent': '#BF00FF',
      '--bg': '#0A0006',
      '--card-bg': 'rgba(20, 5, 15, 0.7)',
      '--text-main': '#FFE8F4',
      '--text-sub': '#C470A0',
      '--glass': 'rgba(35, 5, 25, 0.6)',
      '--glass-border': 'rgba(255, 79, 163, 0.1)',
      '--glass-highlight': 'rgba(255, 79, 163, 0.04)',
      '--shadow': '0 20px 50px rgba(0, 0, 0, 0.5)',
      '--gradient-main': 'linear-gradient(135deg, #FF4FA3, #BF00FF)',
      '--nav-bg': 'rgba(10, 0, 6, 0.4)',
      '--footer-bg': 'rgba(10, 0, 6, 1)',
      '--mesh-1': 'rgba(255, 79, 163, 0.06)',
      '--mesh-2': 'rgba(191, 0, 255, 0.05)',
      '--bg-rgb': '10, 0, 6',
    },
  },
}

interface ThemeContextType {
  theme: ThemeName
  setTheme: (t: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'obsidian',
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('obsidian')

  const applyTheme = (t: ThemeName) => {
    const vars = themes[t].vars
    const root = document.documentElement
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    root.setAttribute('data-theme', t)
  }

  const setTheme = (t: ThemeName) => {
    setThemeState(t)
    localStorage.setItem('aura-theme', t)
    applyTheme(t)
  }

  useEffect(() => {
    const saved = (localStorage.getItem('aura-theme') as ThemeName) || 'obsidian'
    setThemeState(saved)
    applyTheme(saved)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
