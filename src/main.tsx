import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/CartContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Blog } from './pages/Blog';
import { BlogPostDetail } from './pages/BlogPostDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { CGV, Confidentialite, FAQ } from './pages/StaticPages';
import { Toaster } from '../components/ui/sonner';
import { Flame } from 'lucide-react';
import './index.css';

// Create React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Scroll to Top on Page Changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [pathname]);

  return null;
};

// Main Layout Wrapper
const AppLayout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`relative min-h-screen transition-colors duration-300 flex flex-col overflow-x-clip selection:bg-orange-500 selection:text-white ${
      theme === 'dark' 
        ? 'bg-[#050505] text-neutral-100' 
        : 'bg-[#fcfcfc] text-neutral-800'
    }`}>
      {/* Immersive Background Glows */}
      {theme === 'dark' ? (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/5 blur-[140px] rounded-full pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-950/5 blur-[140px] rounded-full pointer-events-none z-0" />
        </>
      ) : (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
        </>
      )}
      
      {/* Scroll indicator & header lines */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-50 ${
        theme === 'dark' ? 'bg-gradient-to-r from-transparent via-orange-500/20 to-transparent' : 'bg-gradient-to-r from-transparent via-orange-500/10 to-transparent'
      }`} />

      {/* Navigation */}
      <Navbar />

      {/* Main Page Area */}
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>

      {/* Main Footer */}
      <Footer />

      {/* Immersive System Status Bar */}
      <div className={`relative z-20 border-t px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-widest font-mono ${
        theme === 'dark' 
          ? 'border-white/5 bg-black/60 text-neutral-500' 
          : 'border-neutral-200 bg-neutral-100/80 text-neutral-600'
      }`}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>STATUT SERVEUR : EN LIGNE (OK)</span>
        </div>
        <div className="flex items-center gap-4">
          <span>RÉGION : TUNISIE (TND)</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1">
            <Flame className="h-3 w-3 text-orange-500 animate-bounce" />
            <span>TUNIBOTS SECURE ENGINE v2.0</span>
          </span>
        </div>
      </div>
    </div>
  );
};

// Root Component
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="produits" element={<Products />} />
                <Route path="produit/:slug" element={<ProductDetail />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPostDetail />} />
                <Route path="a-propos" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="cgv" element={<CGV />} />
                <Route path="confidentialite" element={<Confidentialite />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
            <Toaster position="bottom-right" closeButton />
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
