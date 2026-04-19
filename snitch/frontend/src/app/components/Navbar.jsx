import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { useAuth } from "../../features/auth/hook/useAuth";

export default function Navbar() {
    const { user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { handleLogout } = useAuth();
    
    const isSellerDashboard = location.pathname === "/seller/dashboard";

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            navigate(`/?search=${searchQuery.trim()}`);
            setIsSearchOpen(false);
        }
    };

    return (
        <nav 
            className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 flex items-center justify-between px-6 md:px-12 backdrop-blur-md transition-all border-b"
            style={{ 
                background: "rgba(19, 19, 19, 0.8)", 
                borderColor: "rgba(77, 71, 50, 0.3)" 
            }}
        >
            {/* Logo */}
            <Link 
                to="/" 
                className="text-xl md:text-2xl font-black tracking-tighter uppercase group"
                style={{ fontFamily: "Manrope, sans-serif", color: "#ffd700" }}
            >
                SNI<span className="group-hover:text-white transition-colors">TCH</span>
            </Link>

            {/* Navigation links */}
            <div className="hidden lg:flex items-center gap-10">
                {["New Arrivals", "Collections", "Editorial"].map((item) => (
                    <Link
                        key={item}
                        to="/"
                        className="text-[10px] tracking-[0.25em] uppercase font-bold hover:opacity-100 opacity-60 transition-opacity"
                        style={{ fontFamily: "Inter, sans-serif", color: "#e5e2e1" }}
                    >
                        {item}
                    </Link>
                ))}
                {user?.role === "seller" && (
                    <Link
                        to="/seller/dashboard"
                        className="text-[10px] tracking-[0.25em] uppercase font-black transition-all"
                        style={{ 
                            fontFamily: "Inter, sans-serif",
                            color: isSellerDashboard ? "#ffd700" : "#e5e2e1",
                            opacity: isSellerDashboard ? 1 : 0.6
                        }}
                    >
                        Seller Dashboard
                    </Link>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-8">
                {/* Search Bar */}
                <div className="flex items-center">
                    {isSearchOpen ? (
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search Obsidian Store..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="bg-transparent border-b border-[#ffd700] text-[10px] tracking-[0.2em] uppercase font-bold text-[#e5e2e1] px-2 py-1 outline-none w-32 md:w-48 transition-all animate-in slide-in-from-right-4"
                        />
                    ) : null}
                    <button 
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="material-symbols-outlined text-[20px] md:text-[22px] hover:text-[#ffd700] transition-colors p-2" 
                        style={{ color: "#e5e2e1" }}
                    >
                        {isSearchOpen ? "close" : "search"}
                    </button>
                </div>
                
                {user ? (
                    <div className="flex items-center gap-4">
                        <Link 
                            to="/profile" 
                            className="flex items-center gap-3 group"
                        >
                            <div className="flex flex-col items-end hidden md:flex">
                                <span className="text-[9px] font-black uppercase tracking-tight text-[#e5e2e1]">MT. {user.fullname?.split(" ")[0]}</span>
                                <span className="text-[7px] tracking-[0.2em] uppercase text-[#ffd700] opacity-60">Gilded</span>
                            </div>
                            <div className="w-8 h-8 rounded-full border border-[#4d4732] flex items-center justify-center overflow-hidden group-hover:border-[#ffd700] transition-all bg-[#0e0e0e]">
                                {user.profilePic ? (
                                    <img src={user.profilePic} alt={user.fullname} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-[12px] font-black text-[#ffd700]" style={{ fontFamily: "Manrope, sans-serif" }}>
                                        {user.fullname?.charAt(0)}
                                    </span>
                                )}
                            </div>
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className="material-symbols-outlined text-[18px] text-[#999077] hover:text-[#ffd700] transition-colors p-1"
                        >
                            logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="text-[10px] tracking-[0.2em] uppercase font-black hover:text-[#ffd700] transition-colors"
                        style={{ fontFamily: "Inter, sans-serif", color: "#e5e2e1" }}
                    >
                        Join
                    </Link>
                )}
                
                <Link to="/cart" className="relative group p-2">
                    <span className="material-symbols-outlined text-[20px] md:text-[24px] group-hover:text-[#ffd700] transition-colors" style={{ color: "#e5e2e1" }}>
                        shopping_bag
                    </span>
                    {cartCount > 0 && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-[#ffd700] rounded-full flex items-center justify-center text-[8px] font-black text-[#131313] animate-pulse">
                            {cartCount}
                        </div>
                    )}
                </Link>
            </div>
        </nav>
    );
}
