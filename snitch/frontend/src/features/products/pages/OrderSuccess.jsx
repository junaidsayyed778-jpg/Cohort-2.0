import { useLocation, Link } from "react-router"

const OrderSuccess = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const orderId = queryParams.get("order_id")

    return (
        <div className="min-h-screen pt-24 md:pt-32 flex flex-col items-center justify-center bg-[#131313] text-[#e5e2e1] px-6">
            {/* Elegant Checkmark Icon */}
            <div className="mb-12 relative flex items-center justify-center">
                <div className="absolute w-24 h-24 border border-[#ffd700]/20 rounded-full animate-ping"></div>
                <div className="w-20 h-20 bg-[#ffd700] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.3)]">
                    <span className="material-symbols-outlined text-4xl text-[#131313] font-black">check</span>
                </div>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-center leading-none" 
                style={{ fontFamily: "'Manrope', sans-serif" }}>
                YOUR CURATION IS <span className="text-[#ffd700]">SECURED</span>
            </h1>

            {/* Confirmation Message */}
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#999077] font-bold text-center max-w-lg mb-16 opacity-80 leading-relaxed">
                Thank you for choosing Snitch. Your editorial pieces are being prepared for dispatch with the utmost care.
            </p>

            {/* Order Details Card */}
            <div className="w-full max-w-md bg-[#1c1b1b] border border-[#4d4732]/20 p-8 space-y-6 mb-16 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd700] opacity-[0.02] blur-3xl -mr-16 -mt-16 group-hover:opacity-[0.05] transition-opacity duration-700"></div>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-baseline border-b border-[#4d4732]/20 pb-4">
                        <span className="text-[8px] tracking-[0.4em] uppercase font-black text-[#999077]">Order Reference</span>
                        <span className="text-sm font-black text-[#ffd700] tracking-wider">{orderId}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-[8px] tracking-[0.4em] uppercase font-black text-[#999077]">Estimated Arrival</span>
                        <span className="text-[10px] font-black text-[#e5e2e1] tracking-widest uppercase">3 - 5 Business Days</span>
                    </div>
                </div>

                <div className="pt-4">
                    <p className="text-[7px] tracking-[0.5em] uppercase text-[#999077] font-bold opacity-50 mb-2 italic">
                        Confirmed via Secure Checkout
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-md">
                <Link to="/" 
                    className="flex-1 py-5 bg-[#ffd700] text-[#131313] text-[10px] tracking-[0.4em] font-black uppercase text-center hover:brightness-110 active:scale-[0.98] transition-all">
                    Back to Shop
                </Link>
                <Link to="/orders" 
                    className="flex-1 py-5 bg-transparent border border-[#ffd700] text-[#ffd700] text-[10px] tracking-[0.4em] font-black uppercase text-center hover:bg-[#ffd700]/5 active:scale-[0.98] transition-all">
                    View My Orders
                </Link>
            </div>

            {/* Branding Accent */}
            <div className="mt-20 opacity-20 flex items-center gap-4">
                <div className="h-px w-8 bg-[#999077]"></div>
                <span className="text-[8px] tracking-[0.5em] uppercase font-bold text-[#999077]">Aurelian Noir Edition</span>
                <div className="h-px w-8 bg-[#999077]"></div>
            </div>
        </div>
    )
}

export default OrderSuccess