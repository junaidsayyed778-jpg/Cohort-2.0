import { useParams, Link } from "react-router"
import { useProduct } from "../hook/useProduct"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addItem } from "../state/cartSlice"

const ProductDetails = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [added, setAdded] = useState(false)
    const { handleProductsById } = useProduct()

    async function fetchProductDetails() {
        try {
            setLoading(true)
            const data = await handleProductsById(productId)
            setProduct(data)
        } catch (err) {
            console.error("Error fetching product details:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleAddToCart = () => {
        if (product) {
            dispatch(addItem(product))
            setAdded(true)
            setTimeout(() => setAdded(false), 2000)
        }
    }

    useEffect(() => {
        if (productId) {
            fetchProductDetails()
        }
    }, [productId])

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center bg-[#131313]">
                <div className="w-8 h-8 border-2 border-[#ffd700] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-[#131313] text-[#e5e2e1]">
                <span className="material-symbols-outlined text-6xl mb-4 text-[#ffd700]">error</span>
                <h2 className="text-xl font-black uppercase tracking-widest">Product Not Found</h2>
                <Link to="/" className="mt-8 text-[10px] tracking-[0.3em] uppercase underline hover:text-[#ffd700]">
                    Back to Collection
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 md:pt-32 pb-20 bg-[#131313]">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
                    
                    {/* Left: Image Showcase */}
                    <div className="lg:w-3/5 space-y-6">
                        <div className="aspect-[4/5] bg-[#1c1b1b] rounded-sm overflow-hidden border border-[#4d4732]/20 shadow-2xl">
                            <img 
                                src={product.images?.[0]?.url || "/placeholder_product.png"} 
                                alt={product.title}
                                className="w-full h-full object-cover animate-in fade-in duration-1000"
                            />
                        </div>
                        {/* Thumbnail grid if more images */}
                        {product.images?.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.slice(1).map((img, i) => (
                                    <div key={i} className="aspect-square bg-[#1c1b1b] rounded-sm overflow-hidden border border-[#4d4732]/10 hover:border-[#ffd700] transition-colors cursor-crosshair">
                                        <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Editorial Details */}
                    <div className="lg:w-2/5 space-y-10 lg:sticky lg:top-32 h-fit">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#ffd700]">Collection 2025</span>
                                <div className="h-px flex-1 bg-[#ffd700]/20" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-[#e5e2e1]" style={{ fontFamily: "Manrope, sans-serif" }}>
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-black text-[#ffd700]">
                                    {product.currency} {product.price?.amount}
                                </span>
                                <span className="text-[10px] tracking-[0.2em] uppercase text-[#999077] font-bold">Inclusive of taxes</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="text-sm md:text-base leading-relaxed text-[#d0c6ab] opacity-80" style={{ fontFamily: "Inter, sans-serif" }}>
                                {product.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-3">
                                {["Cotton 100%", "Editorial Fit", "Metallic Detailing"].map(tag => (
                                    <span key={tag} className="px-3 py-1 border border-[#4d4732] text-[8px] tracking-[0.3em] uppercase font-bold text-[#999077]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="space-y-6 pt-6 border-t border-[#4d4732]/30">
                            <div className="flex gap-4">
                                <button 
                                    onClick={handleAddToCart}
                                    className={`flex-1 py-5 transition-all text-[10px] tracking-[0.3em] font-black uppercase active:scale-[0.98] ${added ? 'bg-green-600 text-white' : 'bg-[#ffd700] text-[#131313] hover:brightness-110'}`}
                                >
                                    {added ? 'Added to Bag' : 'Add to Bag'}
                                </button>
                                <button className="w-16 h-16 border border-[#4d4732] flex items-center justify-center hover:border-[#ffd700] group transition-all">
                                    <span className="material-symbols-outlined text-[#e5e2e1] group-hover:scale-110 transition-transform">favorite</span>
                                </button>
                            </div>
                            
                            <p className="text-[9px] tracking-[0.2em] text-[#999077] text-center uppercase">
                                Shipping worldwide — 5-7 business days
                            </p>
                        </div>

                        {/* Back Link */}
                        <div className="pt-10">
                            <Link to="/" className="group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase font-black text-[#e5e2e1]">
                                <span className="material-symbols-outlined transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                Back to Collection
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetails