import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function Navbar() {
    const { user } = useSelector((state) => state.auth);

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
            <div className="hidden md:flex items-center gap-10">
                {["New Arrivals", "Collections", "Editorial"].map((item) => (
                    <Link
                        key={item}
                        to="#"
                        className="text-[10px] tracking-[0.25em] uppercase font-bold hover:opacity-100 opacity-60 transition-opacity"
                        style={{ fontFamily: "Inter, sans-serif", color: "#e5e2e1" }}
                    >
                        {item}
                    </Link>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 md:gap-8">
                <button className="material-symbols-outlined text-[20px] md:text-[22px] hover:text-[#ffd700] transition-colors" style={{ color: "#e5e2e1" }}>
                    search
                </button>
                
                {user ? (
                    <Link 
                        to={user.role === "seller" ? "/seller/dashboard" : "/profile"} 
                        className="flex items-center gap-2 group"
                    >
                        <div className="w-8 h-8 rounded-full border border-[#4d4732] flex items-center justify-center overflow-hidden group-hover:border-[#ffd700] transition-colors">
                            <span className="material-symbols-outlined text-[18px]" style={{ color: "#ffd700" }}>
                                person
                            </span>
                        </div>
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="text-[10px] tracking-[0.2em] uppercase font-black hover:text-[#ffd700] transition-colors"
                        style={{ fontFamily: "Inter, sans-serif", color: "#e5e2e1" }}
                    >
                        Login
                    </Link>
                )}
                
                <button className="material-symbols-outlined text-[20px] md:text-[22px] hover:text-[#ffd700] transition-colors" style={{ color: "#e5e2e1" }}>
                    shopping_bag
                </button>
            </div>
        </nav>
    );
}
