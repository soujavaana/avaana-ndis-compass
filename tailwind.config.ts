
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        recoleta: ['Recoleta', 'serif'],
        avenir: ['Avenir', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#F4F4F0',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#2DCE89',
          hover: '#1AAE6F',
          light: '#E6F7F0',
          dark: '#0D8F5F',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#5b7977',
          hover: '#4a6261',
          light: '#EDF2F7',
          foreground: '#FFFFFF'
        },
        destructive: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
          light: '#FEF2F2',
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#F1F5F9',
          foreground: '#64748B'
        },
        accent: {
          DEFAULT: '#F1F5F9',
          foreground: '#0F172A'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F172A'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        avaana: {
          primary: '#2DCE89',
          secondary: '#1AAE6F',
          light: '#E6F7F0',
          accent: '#F4F4F0',
          background: '#F6F8FA',
          text: '#333333',
          border: '#E5E7EB',
          muted: '#6B7280',
          success: '#2DCE89',
          warning: '#F59E0B',
          error: '#EF4444',
          cream: '#F4F4F0',
          orange: {
            DEFAULT: '#F97316',
            light: '#FFEDD5',
          },
          indigo: {
            DEFAULT: '#6366F1',
            light: '#E0E7FF',
          },
          purple: {
            DEFAULT: '#8B5CF6',
            light: '#EDE9FE',
          },
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      backgroundColor: {
        'custom-background': '#F4F4F0',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
