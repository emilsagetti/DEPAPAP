export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            'xs': '520px',   // мобильная версия
            'sm': '640px',
            'md': '720px',   // mobile menu
            'lg': '820px',   // Telegram split layout
            'xl': '980px',   // main grid переход
            '2xl': '1280px',
        },
        extend: {
            colors: {
                // Landing page color system
                paper: '#FCF9F3',
                ink: '#2E2E2E',
                grayline: '#CCCAC6',
                bronze: '#A08965',
                navy: '#21304E',
                primary: '#21304E',
                secondary: '#64748B',
                accent: '#A08965',
                // Depa Nordic palette (Strict)
                'depa-brand': '#023A55',  // Primary Deep (Brand Base)
                'depa-dark': '#0F2837',   // Primary Dark (Text & Header)
                'depa-bg': '#E7E7E7',     // Canvas Background
                'depa-cta': '#0077FF',    // CTA / Action (Electric Blue)
                'depa-muted': '#5E7A8D',  // Secondary elements
                'depa-light': '#A8BDC3',  // Glass Border / Inactive
                'depa-white': '#FFFFFF',

                // Glass tokens
                'glass-border': 'rgba(255, 255, 255, 0.4)',
                'glass-border-light': 'rgba(255, 255, 255, 0.2)',
                'glass-warm': '#4C2300',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
                glass: '14px',
                heavy: '20px',
            },
            boxShadow: {
                'glass': '0 26px 80px rgba(0, 0, 0, 0.55)',
                'glass-sm': '0 18px 48px rgba(0, 0, 0, 0.38)',
                'glass-hover': '0 28px 86px rgba(0, 0, 0, 0.62)',
                'glass-inset': 'inset 0 1px 0 rgba(231, 231, 231, 0.08)',
            },
            borderRadius: {
                'glass': '22px',
                'glass-sm': '16px',
            },
            backgroundImage: {
                'glass-gradient': 'radial-gradient(680px 360px at 20% 0%, rgba(255, 255, 255, 0.06), transparent 62%)',
                'glass-warm': 'radial-gradient(520px 180px at 14% 0%, rgba(76, 35, 0, 0.14), transparent 64%)',
                'glass-panel': 'linear-gradient(to bottom, rgba(255, 255, 255, 0.04), transparent)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2.5s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            transitionTimingFunction: {
                'premium': 'cubic-bezier(0.16, 1, 0.3, 1)', // Snappy yet smooth (Apple-like)
            },
        },
    },
    plugins: [],
}
