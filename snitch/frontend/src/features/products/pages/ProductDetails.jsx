import { useParams, Link, useNavigate } from "react-router"
import { useProduct } from "../hook/useProduct"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"  // ✅ Add useSelector
import { addItem } from "../state/cartSlice"

const ProductDetails = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [selectedAttributes, setSelectedAttributes] = useState({}) 
    const [loading, setLoading] = useState(true)
    const [added, setAdded] = useState(false)
    const { handleProductsById } = useProduct()

    // ✅ NEW: Subscribe to Redux state for this product
    const reduxProduct = useSelector(state => {
        // Check both products arrays (public + seller)
        const allProducts = [
            ...(state.product?.products || []), 
            ...(state.product?.sellerProducts || [])
        ]
        return allProducts.find(p => p._id === productId)
    })

    // ✅ NEW: Sync Redux updates to local state
    useEffect(() => {
                console.log("🟣 [COMPONENT] reduxProduct changed:", reduxProduct?._id || "null")

        if (reduxProduct && reduxProduct._id === productId) {
            setProduct(reduxProduct)
               console.log("🟣 [COMPONENT] Variants count:", reduxProduct.variants?.length)
            console.log("🟣 [COMPONENT] First variant price:", reduxProduct.variants?.[0]?.price?.amount)
        }
    }, [reduxProduct, productId])

    async function fetchProductDetails() {
        try {
            setLoading(true)
            const data = await handleProductsById(productId)
            setProduct(data)
            
            if (data.variants && data.variants.length > 0) {
                const initialVariant = data.variants[0]
                setSelectedVariant(initialVariant)
                setSelectedAttributes(initialVariant.attributes)
            }
        } catch (err) {
            console.error("Error fetching product details:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (productId) {
            fetchProductDetails()
        }
    }, [productId])

    // Find a variant that matches current attribute selections
    useEffect(() => {
        if (!product || !product.variants) return

        const matchingVariant = product.variants.find(v => {
            return Object.entries(selectedAttributes).every(([key, value]) => {
                return v.attributes[key] === value
            })
        })

        if (matchingVariant) {
            setSelectedVariant(matchingVariant)
        }
    }, [selectedAttributes, product])

    const handleAttributeSelect = (key, value) => {
        const nextAttributes = { ...selectedAttributes, [key]: value }
        
        // Check if any variant exists for this new target
        const exists = product.variants.find(v => {
            return Object.entries(nextAttributes).every(([attrKey, attrVal]) => attrVal === v.attributes[attrKey])
        })


        if (exists) {
            setSelectedAttributes(nextAttributes)
        } else {
            // If the specific combination (e.g., New Color + Current Size) doesn't exist,
            // find the first variant that matches the new attribute (New Color)
            const fallback = product.variants.find(v => v.attributes[key] === value)
            if (fallback) {
                setSelectedAttributes(fallback.attributes)
            }
        }
    }


    const handleAddToCart = () => {
        if (selectedVariant) {
            const itemToAdd = {
                ...product,
                variantId: selectedVariant._id,
                variantTitle: selectedVariant.title,
                attributes: selectedVariant.attributes,
                price: selectedVariant.price,
                images: selectedVariant.images?.length > 0 ? selectedVariant.images : product.images,
                quantity: 1
            }
            dispatch(addItem(itemToAdd))
            setAdded(true)
            setTimeout(() => setAdded(false), 2000)
        }
    }

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
                <h2 className="text-xl font-black uppercase tracking-[0.4em]">Vault Entry Missing</h2>
                <Link to="/" className="mt-8 text-[10px] tracking-[0.3em] uppercase underline hover:text-[#ffd700]">Return to Archive</Link>
            </div>
        )
    }

    // Helper: Get all unique values for a specific attribute key
    const getUniqueAttributeValues = (key) => {
        const values = new Set()
        product.variants.forEach(v => {
            if (v.attributes[key]) values.add(v.attributes[key])
        })
        return Array.from(values)
    }

    // Identify all unique attribute keys across all variants
    const allAttributeKeys = Array.from(new Set(
        product.variants?.flatMap(v => Object.keys(v.attributes || {})) || []
    ))
    
    // We'll treat the first key as primary (thumbnails) if it sounds like color/style
    const primaryAttrKey = allAttributeKeys.find(k => k.toLowerCase().includes('color') || k.toLowerCase().includes('style')) || allAttributeKeys[0]
    const secondaryAttrKeys = allAttributeKeys.filter(k => k !== primaryAttrKey)

    const isOutOfStock = selectedVariant?.stock <= 0

    return (
        <div className="min-h-screen bg-[#131313] text-[#e5e2e1] pt-20 animate-in fade-in duration-1000">

            <div className="max-w-screen-2xl mx-auto px-4 md:px-10">
                
                <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
                    
                    {/* LEFT: Image Gallery (Two Column Style) */}
                    <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(selectedVariant?.images?.length > 0 ? selectedVariant.images : product.images).map((img, idx) => (
                            <div key={idx} className="aspect-[3/4] bg-[#1c1b1b] overflow-hidden border border-[#4d4732]/10 relative group">
                                <img 
                                    src={img.url} 
                                    alt="Product View" 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                />
                                {isOutOfStock && idx === 0 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[1px]">
                                        <span className="px-6 py-2 border border-[#ffd700] text-[#ffd700] text-[10px] tracking-[0.4em] uppercase font-black bg-black/40">OUT OF STOCK</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: Product Info (Sticky) */}
                    <div className="lg:w-2/5 xl:pl-10">
                        <div className="lg:sticky lg:top-32 space-y-10">
                            
                            {/* Branding & Essentials */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-[14px] font-black tracking-[0.2em] uppercase text-[#ffd700]/80">SNITCH</p>
                                    <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                                        {selectedVariant?.title || product.title}
                                    </h1>
                                    <p className="text-[11px] tracking-[0.1em] text-[#999077] opacity-60 uppercase">{product.category || "Editorial Select"}</p>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 bg-[#1c1b1b] px-2 py-1 border border-[#4d4732]/30 rounded-sm">
                                        <span className="text-[11px] font-black">4.8</span>
                                        <span className="material-symbols-outlined text-[12px] text-[#ffd700] filled">star</span>
                                    </div>
                                    <span className="h-4 w-[1px] bg-white/10" />
                                    <span className="text-[9px] tracking-widest uppercase text-[#999077] font-bold">1.2K Ratings</span>
                                </div>

                                <div className="pt-4 border-t border-white/5 space-y-2">
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl font-black text-[#e5e2e1]">
                                            {selectedVariant?.price?.currency || product.currency} {selectedVariant?.price?.amount || product.price?.amount}
                                        </span>
                                        {/* MRP & Discount */}
                                        <span className="text-sm line-through opacity-40">
                                            {selectedVariant?.price?.currency || product.currency} {Math.round((selectedVariant?.price?.amount || product.price?.amount) * 1.6)}
                                        </span>
                                        <span className="text-sm font-black text-orange-500 tracking-wider">(60% OFF)</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Inclusive of all taxes</p>
                                </div>
                            </div>

                            {/* ATTRIBUTE SELECTION: PRIMARY (Colors) */}
                            {primaryAttrKey && (
                                <div className="space-y-6">
                                    <h3 className="text-[9px] tracking-[0.4em] uppercase font-black text-[#ffd700]">More {primaryAttrKey}s</h3>
                                    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                                        {getUniqueAttributeValues(primaryAttrKey).map((val) => {
                                            // Find a representative image for this color
                                            const repVariant = product.variants.find(v => v.attributes[primaryAttrKey] === val)
                                            const isActive = selectedAttributes[primaryAttrKey] === val
                                            return (
                                                <button 
                                                    key={val}
                                                    onClick={() => handleAttributeSelect(primaryAttrKey, val)}
                                                    className={`aspect-[3/4] border transition-all relative group overflow-hidden ${isActive ? 'border-[#ffd700] ring-1 ring-[#ffd700]/50' : 'border-[#4d4732]/20 hover:border-[#ffd700]/40'}`}
                                                >
                                                    <img 
                                                        src={repVariant?.images?.[0]?.url || product.images?.[0]?.url} 
                                                        className={`w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all ${isActive ? 'grayscale-0' : ''}`}
                                                        alt={val}
                                                    />
                                                    <div className={`absolute inset-0 bg-[#ffd700]/10 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* ATTRIBUTE SELECTION: SECONDARY (Sizes etc) */}
                            {secondaryAttrKeys.map(key => (
                                <div key={key} className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-[9px] tracking-[0.4em] uppercase font-black text-[#ffd700]">Select {key}</h3>
                                        <button className="text-[9px] text-[#999077] underline tracking-widest font-bold">Size Chart</button>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {getUniqueAttributeValues(key).map(val => {
                                            const isActive = selectedAttributes[key] === val
                                            // Check if this specific combo (Selected Primary + this Val) is available and in stock
                                            const comboVariant = product.variants.find(v => 
                                                v.attributes[primaryAttrKey] === selectedAttributes[primaryAttrKey] && 
                                                v.attributes[key] === val
                                            )
                                            const exists = !!comboVariant
                                            const out = exists && comboVariant.stock <= 0

                                            return (
                                                <button 
                                                    key={val}
                                                    disabled={!exists}
                                                    onClick={() => handleAttributeSelect(key, val)}
                                                    className={`
                                                        min-w-[56px] h-14 flex items-center justify-center px-4 border transition-all text-sm font-black tracking-widest uppercase
                                                        ${isActive ? 'bg-[#e5e2e1] border-[#e5e2e1] text-[#131313]' : 'bg-transparent border-[#4d4732]/40 hover:border-[#ffd700] text-[#e5e2e1]'}
                                                        ${!exists ? 'opacity-10 border-dashed cursor-not-allowed' : ''}
                                                        ${out ? 'opacity-40 line-through' : ''}
                                                    `}
                                                >
                                                    {val}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}

                            {/* ACTIONS */}
                            <div className="pt-10 border-t border-white/5 space-y-6">
                                <div className="flex gap-4">
                                    <button 
                                        onClick={handleAddToCart}
                                        disabled={isOutOfStock || added}
                                        className={`flex-1 h-16 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] transition-all
                                            ${added ? 'bg-green-600 text-white' : 'bg-[#ffd700] text-[#131313] hover:brightness-110 active:scale-[0.98] disabled:opacity-30 disabled:grayscale'}
                                        `}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">{added ? 'check_circle' : 'shopping_bag'}</span>
                                        {added ? 'Added to Bag' : (isOutOfStock ? 'Sold Out' : 'Add to Bag')}
                                    </button>
                                    
                                    <button className="w-16 h-16 flex items-center justify-center border border-[#4d4732] hover:border-[#ffd700] transition-all group">
                                        <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-125">favorite</span>
                                    </button>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center gap-4 text-[9px] tracking-widest uppercase text-[#999077] font-black">
                                        <span className="material-symbols-outlined text-sm">local_shipping</span>
                                        Free express delivery on orders above ₹999
                                    </div>
                                    <div className="flex items-center gap-4 text-[9px] tracking-widest uppercase text-[#999077] font-black">
                                        <span className="material-symbols-outlined text-sm">assignment_return</span>
                                        Easy 30-day returns and exchanges
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Optional description footer */}
                <div className="mt-32 max-w-2xl space-y-10 pb-20">
                    <div className="space-y-4">
                        <h2 className="text-[16px] font-black uppercase tracking-[0.3em]">Editor's Note</h2>
                        <p className="text-sm leading-relaxed text-[#d0c6ab] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                            {selectedVariant?.description || product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ProductDetails