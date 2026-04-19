import { useSelector } from "react-redux"
import { useProduct } from "../hook/useProduct"
import { useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { useLocation } from "react-router"

export default function Home() {
    const products = useSelector((state) => state.product.products)
    const { handleGetAllProducts } = useProduct()
    const location = useLocation()
    const query = new URLSearchParams(location.search).get("search")

    useEffect(() => {
        handleGetAllProducts(query)
    }, [query])

    return (
        <div className="flex flex-col">
            {/* ═══════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════ */}
            <section className="relative h-[70vh] md:h-[85vh] flex items-center px-6 md:px-12 overflow-hidden bg-[#0e0e0e]">
                {/* Background Text (Watermark style) */}
                <div 
                    className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none"
                    style={{ fontSize: "25vw", fontFamily: "Manrope, sans-serif", fontWeight: 900 }}
                >
                    SNITCH
                </div>

                {/* Animated Gradient Blob */}
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-10 pointer-events-none"
                    style={{ background: "radial-gradient(circle, #ffd700 0%, transparent 70%)" }}
                />

                <div className="relative z-10 max-w-4xl space-y-8">
                    <div className="space-y-2">
                        <p 
                            className="text-[10px] md:text-[12px] tracking-[0.4em] uppercase font-bold"
                            style={{ color: "#ffd700" }}
                        >
                            Summer / Autumn 2025
                        </p>
                        <h1 
                            className="text-6xl md:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter uppercase"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                            The Night <br />
                            Is <span style={{ color: "transparent", WebkitTextStroke: "1px #ffd700" }}>Yours.</span>
                        </h1>
                    </div>
                    
                    <p 
                        className="max-w-md text-sm md:text-lg leading-relaxed opacity-70"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Explore our latest editorial collection. 
                        Precision-crafted garments for those who redefine the standards of modern fashion.
                    </p>

                    <div className="flex items-center gap-6 pt-4">
                        <button 
                            className="px-10 py-4 bg-[#ffd700] text-black text-[10px] tracking-[0.2em] font-black uppercase hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                        >
                            Shop Collection
                        </button>
                        <button 
                            className="group p-4 flex items-center gap-3 text-[10px] tracking-[0.2em] font-black uppercase hover:text-[#ffd700] transition-colors cursor-pointer"
                        >
                            Editorial Book
                            <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
                    <span className="material-symbols-outlined text-[30px]" style={{ color: "#ffd700" }}>
                        keyboard_double_arrow_down
                    </span>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                PRODUCT COLLECTION
            ═══════════════════════════════════════════ */}
            <section className="px-6 md:px-12 py-20 md:py-32">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-1">
                    <div className="space-y-3">
                        <h2 
                            className="text-3xl md:text-5xl font-black tracking-tight uppercase"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                            New <span className="opacity-40">Arrivals</span>
                        </h2>
                        <div className="w-20 h-1" style={{ background: "#ffd700" }} />
                    </div>
                    
                    <div className="flex gap-4">
                        {["All", "Shirts", "Basics", "Premium"].map((cat) => (
                            <button 
                                key={cat}
                                className={`text-[10px] tracking-[0.2em] uppercase font-bold px-4 py-2 border transition-all hover:border-[#ffd700] ${cat === "All" ? "border-[#ffd700] text-[#ffd700]" : "border-transparent text-[#999077]"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full h-64 flex flex-col items-center justify-center border border-dashed border-[#4d4732] rounded-sm opacity-50">
                            <span className="material-symbols-outlined text-4xl mb-4" style={{ color: "#ffd700" }}>
                                shopping_bag
                            </span>
                            <p className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: "#e5e2e1" }}>
                                Our collection is coming soon.
                            </p>
                        </div>
                    )}
                </div>

                {/* Grid Footer - Load More */}
                <div className="mt-24 flex justify-center">
                    <button 
                        className="group flex flex-col items-center gap-4 hover:text-[#ffd700] transition-colors"
                    >
                        <span className="text-[10px] tracking-[0.4em] uppercase font-black">
                            View All Items
                        </span>
                        <div className="w-px h-16 bg-[#4d4732] group-hover:bg-[#ffd700] transition-colors" />
                    </button>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                FOOTER (Basic Branded)
            ═══════════════════════════════════════════ */}
            <footer className="px-6 md:px-12 py-16 border-t border-[#4d4732] bg-[#0e0e0e]/50">
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between gap-12">
                    <div className="space-y-6">
                        <span className="text-2xl font-black tracking-[-0.05em] uppercase" style={{ color: "#ffd700" }}>
                            SNITCH
                        </span>
                        <p className="max-w-xs text-xs leading-loose opacity-50" style={{ color: "#d0c6ab" }}>
                            Redefining midnight fashion. Premium quality, editorial design, 
                            and uncompromised style for the modern individual.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-16 gap-y-10">
                        {["Shop", "Client Service", "Company"].map((title) => (
                            <div key={title} className="space-y-4">
                                <h4 className="text-[10px] tracking-[0.2em] uppercase font-black">{title}</h4>
                                <div className="flex flex-col gap-3">
                                    {[1, 2, 3].map((i) => (
                                        <a key={i} href="#" className="text-[10px] tracking-wide opacity-40 hover:opacity-100 transition-opacity">
                                            Link Option {i}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-20 pt-8 border-t border-[#4d4732]/30 flex flex-col md:flex-row justify-between gap-4">
                    <p className="text-[8px] tracking-[0.4em] uppercase opacity-30">
                        © 2025 SNITCH — ALL RIGHTS RESERVED
                    </p>
                    <div className="flex gap-8">
                        {["Privacy", "Terms", "Cookies"].map((l) => (
                            <a key={l} href="#" className="text-[8px] tracking-[0.4em] uppercase opacity-30 hover:opacity-100 transition-opacity">
                                {l}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    )
}