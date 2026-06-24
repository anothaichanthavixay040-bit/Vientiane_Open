import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        red: { DEFAULT:'#C8102E', dark:'#8B0000', light:'#ff1a3a' },
        gold: { DEFAULT:'#C9A84C', light:'#f0c060' },
        dark: { DEFAULT:'#0a0a0a', 2:'#111111', 3:'#1a1a1a', mid:'#2a2a2a' },
      },
      fontFamily: {
        bebas: ['var(--font-bebas)'],
        barlow: ['var(--font-barlow)'],
        condensed: ['var(--font-condensed)'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'slide-up': 'slideUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        slideUp: { from:{opacity:'0',transform:'translateY(20px)'}, to:{opacity:'1',transform:'translateY(0)'} },
        fadeIn: { from:{opacity:'0'}, to:{opacity:'1'} },
        scan: { '0%':{top:'0%'}, '100%':{top:'100%'} },
      }
    },
  },
  plugins: [],
}
export default config
