import React from 'react';
import { SignUpButton, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { ArrowRight, Layout, Zap, Rocket, Users, CheckCircle, Github, Twitter, Linkedin, Heart, Moon, Sun } from 'lucide-react';
import { dark } from '@clerk/themes';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/themeSlice';

const LandingPage = () => {
    const { user, isLoaded } = useUser();
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme);
    const isDark = theme === 'dark';

    if (isLoaded && user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className={`min-h-screen w-full relative transition-colors duration-500 overflow-x-hidden ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} selection:bg-purple-500/30`}>
            {/* Background Gradients */}
            {isDark ? (
                <div
                    className="fixed inset-0 z-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
                            radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
                            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
                            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
                            #000000
                        `,
                    }}
                />
            ) : (
                <div
                    className="fixed inset-0 z-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 120% 80% at 70% 20%, rgba(168, 85, 247, 0.08), transparent 50%),
                            radial-gradient(ellipse 100% 60% at 30% 10%, rgba(59, 130, 246, 0.05), transparent 60%),
                            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(236, 72, 153, 0.05), transparent 65%),
                            #f9fafb
                        `,
                    }}
                />
            )}
            
            {/* Grid Overlay */}
            <div className={`fixed inset-0 z-0 opacity-[0.15] pointer-events-none ${isDark ? 'mix-blend-overlay' : 'mix-blend-multiply'}`} 
                 style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

            {/* Navbar */}
            <nav className={`relative z-50 flex justify-between items-center px-6 py-8 max-w-7xl mx-auto backdrop-blur-sm sticky top-0 border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="size-10 bg-gradient-to-br from-fuchsia-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:rotate-6 transition-transform">
                        <Layout className="text-white size-6" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter uppercase italic">
                        Collabify
                    </span>
                </div>
                
                <div className="flex items-center gap-6">
                    {/* Theme Toggle */}
                    <button 
                        onClick={() => dispatch(toggleTheme())} 
                        className={`size-10 flex items-center justify-center rounded-xl transition-all hover:scale-110 active:scale-95 ${isDark ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-black/5 text-gray-600 hover:bg-black/10'}`}
                    >
                        {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
                    </button>

                    <SignUpButton mode="modal" appearance={{ baseTheme: isDark ? dark : undefined, variables: { colorBackground: isDark ? 'rgba(0,0,0,0.8)' : '#ffffff', backdropFilter: 'blur(16px)' } }}>
                        <button className={`text-sm font-semibold transition-opacity ${isDark ? 'opacity-70 hover:opacity-100' : 'text-gray-600 hover:text-black'}`}>Log In</button>
                    </SignUpButton>
                    <SignUpButton mode="modal" appearance={{ baseTheme: isDark ? dark : undefined, variables: { colorBackground: isDark ? 'rgba(0,0,0,0.8)' : '#ffffff', backdropFilter: 'blur(16px)' } }}>
                        <button className={`${isDark ? 'bg-white text-black shadow-white/10' : 'bg-black text-white shadow-black/10'} px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-xl`}>
                            Join Free
                        </button>
                    </SignUpButton>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 flex flex-col items-center justify-center pt-24 px-6 text-center">
                <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] lg:max-w-4xl mx-auto">
                        The Next Era of <br />
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-fuchsia-400 via-purple-400 to-indigo-400 drop-shadow-2xl' : 'from-fuchsia-600 via-purple-600 to-indigo-600'}`}>
                            Collaboration.
                        </span>
                    </h1>

                    <p className={`text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-normal ${isDark ? 'text-gray-400 opacity-80' : 'text-gray-600'}`}>
                        Experience the ultimate project management tool. Beautifully designed, 
                        blazing fast, and built for the modern workforce.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32">
                        <SignUpButton mode="modal" appearance={{ baseTheme: isDark ? dark : undefined, variables: { colorBackground: isDark ? 'rgba(0,0,0,0.8)' : '#ffffff', backdropFilter: 'blur(16px)' } }}>
                            <button className={`group relative px-10 py-5 ${isDark ? 'bg-white text-black hover:shadow-white/20' : 'bg-black text-white hover:shadow-black/20'} rounded-full font-black text-xl hover:shadow-[0_0_30px] transition-all flex items-center gap-2`}>
                                Getting Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </SignUpButton>
                        <button className={`px-10 py-5 font-bold text-xl border rounded-full backdrop-blur-md transition-colors ${isDark ? 'text-white/50 border-white/10 hover:bg-white/5 hover:text-white' : 'text-gray-500 border-black/10 hover:bg-black/5 hover:text-black'}`}>
                            Live Demo
                        </button>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-80 grid grid-cols-1 md:grid-cols-4 gap-12 w-full max-w-6xl px-12 pb-40">
                    {[
                        { icon: Rocket, label: "Fast Setup", desc: "Configuration in under 1 minute." },
                        { icon: Users, label: "Team Sync", desc: "Real-time updates across all members." },
                        { icon: Zap, label: "Smart Workflows", desc: "Custom processes for every team." },
                        { icon: CheckCircle, label: "Analytics", desc: "Data-driven insights for growth." }
                    ].map((item, i) => (
                        <div key={i} className={`flex flex-col items-start text-left gap-4 p-8 rounded-3xl border backdrop-blur-xl transition-all group ${isDark ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]' : 'bg-black/[0.02] border-black/5 hover:bg-black/[0.04]'}`}>
                            <div className="p-3 bg-purple-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                                <item.icon className="size-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className={`font-black text-xl mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.label}</h3>
                                <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Professional Footer */}
            <footer className={`relative z-10 border-t pt-20 pb-10 px-6 ${isDark ? 'border-white/10 bg-black/40 backdrop-blur-2xl text-white' : 'border-black/5 bg-white/80 backdrop-blur-2xl text-gray-900'}`}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-left">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`size-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                <Layout className="size-6" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase italic">Collabify</span>
                        </div>
                        <p className={`max-w-md leading-relaxed mb-8 font-medium ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                            Designed for the next generation of creators and managers. 
                            Simplify your projects, amplify your results.
                        </p>
                        <div className="flex gap-8">
                            <Twitter className={`size-6 cursor-pointer transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`} />
                            <a href="https://github.com/Navyasree-ulava/Collabify" target="_blank" rel="noopener noreferrer">
                                <Github className={`size-6 cursor-pointer transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`} />
                            </a>
                            <a href="https://www.linkedin.com/in/navya-sree-ulava/" target="_blank" rel="noopener noreferrer">
                                <Linkedin className={`size-6 cursor-pointer transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-black text-sm mb-8 uppercase tracking-widest">Product</h4>
                        <ul className={`space-y-4 font-bold text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                            <li className="hover:text-purple-500 transition-colors cursor-pointer">Features</li>
                            <li className="hover:text-purple-500 transition-colors cursor-pointer">Workflows</li>
                            <li className="hover:text-purple-500 transition-colors cursor-pointer">Integrations</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-sm mb-8 uppercase tracking-widest">Support</h4>
                        <ul className={`space-y-4 font-bold text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                            <li className="hover:text-purple-500 transition-colors cursor-pointer">Docs</li>
                            <li className="hover:text-purple-500 transition-colors cursor-pointer">Help Center</li>
                            <li className="hover:text-purple-500 transition-colors cursor-pointer">Contact</li>
                        </ul>
                    </div>
                </div>

                <div className={`max-w-7xl mx-auto pt-10 border-t flex flex-col items-center gap-8 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full">
                        <div className={`text-xs font-black tracking-widest uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                            © {new Date().getFullYear()} COLLABIFY INC.
                        </div>
                        <div className={`flex items-center gap-2 text-xs font-black tracking-widest uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Made with <Heart className="size-3 text-red-500 fill-red-500" /> by <span className={`transition-colors cursor-pointer ${isDark ? 'text-white hover:text-purple-400' : 'text-black hover:text-purple-600'}`}>Navyasree Ulava</span>
                        </div>
                        <div className={`flex gap-8 text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                            <span className={`cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Privacy Policy</span>
                            <span className={`cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Ambient Lighting */}
            <div className={`fixed top-[-10%] right-[-10%] size-[800px] blur-[200px] rounded-full pointer-events-none transition-opacity duration-1000 ${isDark ? 'bg-fuchsia-600/5 opacity-100' : 'bg-fuchsia-600/10 opacity-50'}`} />
            <div className={`fixed bottom-[-10%] left-[-10%] size-[800px] blur-[200px] rounded-full pointer-events-none transition-opacity duration-1000 ${isDark ? 'bg-purple-600/5 opacity-100' : 'bg-purple-600/10 opacity-50'}`} />
        </div>
    );
};

export default LandingPage;
