import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../hook/useProduct';
import { useSelector } from 'react-redux';
import { useCart } from '../hook/useCart';

// Safely convert Mongoose Map OR plain object attributes → plain JS object
function normalizeAttrs(attrs) {
    if (!attrs) return {};
    if (attrs instanceof Map) return Object.fromEntries(attrs);
    if (typeof attrs === 'object' && !Array.isArray(attrs)) return { ...attrs };
    return {};
}

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [adding, setAdding] = useState(false);
    const [addedFeedback, setAddedFeedback] = useState(false);
    const [stockError, setStockError] = useState('');
    const navigate = useNavigate();
    const { handleProductsById } = useProduct();
    const { handleAddToCart, items: cartItems } = useCart();
    const user = useSelector(state => state.auth.user);

    async function fetchProductDetails() {
        try {
            const data = await handleProductsById(productId);
            setProduct(data?.product || data);
        } catch (error) {
            console.error('Failed to fetch product details', error);
        }
    }

    useEffect(() => { fetchProductDetails(); }, [productId]);

    useEffect(() => {
        if (product?.variants?.length > 0) {
            setSelectedAttributes(normalizeAttrs(product.variants[0].attributes));
        }
    }, [product]);

    // Get all unique attribute keys and their values
    const availableAttributes = useMemo(() => {
        if (!product?.variants) return {};
        const attrs = {};
        product.variants.forEach(variant => {
            if (variant.attributes) {
                const attrObj = normalizeAttrs(variant.attributes);
                Object.entries(attrObj).forEach(([key, value]) => {
                    if (!attrs[key]) attrs[key] = new Set();
                    attrs[key].add(value);
                });
            }
        });
        // Sort sizes
        const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL'];
        Object.keys(attrs).forEach(key => {
            const arr = Array.from(attrs[key]);
            attrs[key] = key.toLowerCase().includes('size')
                ? arr.sort((a, b) => {
                    const ia = sizeOrder.indexOf(String(a).toUpperCase());
                    const ib = sizeOrder.indexOf(String(b).toUpperCase());
                    if (ia !== -1 && ib !== -1) return ia - ib;
                    return String(a).localeCompare(String(b));
                })
                : arr;
        });
        return attrs;
    }, [product]);

    // Active variant matching current selection
    const activeVariant = useMemo(() => {
        if (!product?.variants || product.variants.length === 0) return null;
        return product.variants.find(v => {
            if (!v.attributes) return false;
            const vAttrs = normalizeAttrs(v.attributes);
            const keys = Object.keys(vAttrs);
            return keys.length === Object.keys(selectedAttributes).length &&
                keys.every(k => vAttrs[k] === selectedAttributes[k]);
        }) || null;
    }, [product, selectedAttributes]);

    // Find a variant by one specific attribute value (used for color swatch lookup)
    const getVariantByAttrValue = (attrName, value) => {
        if (!product?.variants) return null;
        return product.variants.find(v => {
            if (!v.attributes) return false;
            return normalizeAttrs(v.attributes)[attrName] === value;
        });
    };

    const handleAttributeChange = (attrName, value) => {
        const newAttrs = { ...selectedAttributes, [attrName]: value };
        const exactMatch = product.variants.find(v => {
            if (!v.attributes) return false;
            const vAttrs = normalizeAttrs(v.attributes);
            const keys = new Set([...Object.keys(newAttrs), ...Object.keys(vAttrs)]);
            return Array.from(keys).every(k => newAttrs[k] === vAttrs[k]);
        });
        if (exactMatch) {
            setSelectedAttributes(normalizeAttrs(exactMatch.attributes));
        } else {
            const fallback = product.variants.find(v => {
                if (!v.attributes) return false;
                return normalizeAttrs(v.attributes)[attrName] === value;
            });
            if (fallback) {
                setSelectedAttributes(normalizeAttrs(fallback.attributes));
            } else {
                setSelectedAttributes(newAttrs);
            }
        }
        setStockError('');
    };

    // How many of active variant are already in cart
    const cartQtyForVariant = useMemo(() => {
        if (!activeVariant) return 0;
        const inCart = cartItems?.find(
            i => i.productId === productId && i.variantId === activeVariant._id
        );
        return inCart?.quantity || 0;
    }, [cartItems, activeVariant, productId]);

    useEffect(() => { setSelectedImage(0); }, [activeVariant]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#131313' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", color: '#ffd700' }}
                    className="text-[10px] uppercase tracking-[0.2em] font-black animate-pulse">
                    Retrieving piece...
                </p>
            </div>
        );
    }

    const displayImages = (activeVariant?.images?.length > 0)
        ? activeVariant.images
        : (product.images?.length > 0 ? product.images : []);

    const displayPrice = activeVariant?.price?.amount
        ? activeVariant.price
        : product.price;

    // Determine if this is a color attribute
    const isColorAttr = (key) => key.toLowerCase().includes('color') || key.toLowerCase() === 'colour';

    async function handleAddToBag() {
        if (!user) { navigate('/login'); return; }
        if (!activeVariant) { setStockError('Please select a variant first.'); return; }
        if (activeVariant.stock <= 0) { setStockError('This variant is out of stock.'); return; }
        if (cartQtyForVariant >= activeVariant.stock) {
            setStockError(`Only ${activeVariant.stock} available. You already have ${cartQtyForVariant} in bag.`);
            return;
        }
        try {
            setAdding(true);
            setStockError('');
            await handleAddToCart(productId, activeVariant._id, 1);
            setAddedFeedback(true);
            setTimeout(() => setAddedFeedback(false), 2000);
        } catch (err) {
            const msg = err?.response?.data?.message || 'Could not add to bag.';
            setStockError(msg);
        } finally {
            setAdding(false);
        }
    }

    const isAtStockLimit = activeVariant
        ? (cartQtyForVariant >= activeVariant.stock || activeVariant.stock <= 0)
        : false;

    return (
        <div className="min-h-screen transition-colors duration-500 overflow-x-hidden"
            style={{ backgroundColor: '#131313', color: '#e5e2e1', fontFamily: 'Inter, sans-serif' }}>

            {/* Gold glow blobs */}
            <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.07]"
                style={{ background: '#ffd700', filter: 'blur(120px)' }} />
            <div className="fixed bottom-[-50px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.05]"
                style={{ background: '#ffd700', filter: 'blur(100px)' }} />

            <div className="relative z-10">
                {/* Nav */}
                <nav className="flex justify-between items-center px-8 lg:px-16 py-8">
                    <Link to="/"
                        className="text-xl font-black tracking-[-0.05em] uppercase hover:opacity-80 transition-opacity"
                        style={{ fontFamily: 'Manrope, sans-serif', color: '#ffd700' }}>
                        SNITCH.
                    </Link>
                    <button onClick={() => navigate(-1)}
                        className="text-[10px] uppercase tracking-[0.25em] font-semibold transition-all hover:text-[#ffd700] flex items-center gap-2"
                        style={{ color: '#999077' }}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        Return to Archive
                    </button>
                </nav>

                <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-8 lg:pt-16 pb-24">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                        {/* LEFT: Image Gallery */}
                        <div className="w-full lg:w-[65%] flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
                            {displayImages.length > 1 && (
                                <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-20 lg:w-24 flex-shrink-0 md:max-h-[calc(100vh-250px)]">
                                    {displayImages.map((img, idx) => (
                                        <button key={idx} onClick={() => setSelectedImage(idx)}
                                            className={`flex-shrink-0 w-20 md:w-full aspect-[4/5] overflow-hidden transition-all duration-300 border ${selectedImage === idx ? 'opacity-100 border-[#ffd700]' : 'opacity-40 hover:opacity-100 border-[#4d4732]'}`}
                                            style={{ backgroundColor: '#1c1b1b' }}>
                                            <img src={img.url} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="relative w-full aspect-[4/5] overflow-hidden group border border-[#4d4732]" style={{ backgroundColor: '#1c1b1b' }}>
                                <img
                                    src={displayImages[selectedImage]?.url || displayImages[0]?.url}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                {displayImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setSelectedImage(p => p === 0 ? displayImages.length - 1 : p - 1)}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-[#4d4732] backdrop-blur-md"
                                            style={{ backgroundColor: 'rgba(19,19,19,0.7)', color: '#ffd700' }}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" /></svg>
                                        </button>
                                        <button
                                            onClick={() => setSelectedImage(p => p === displayImages.length - 1 ? 0 : p + 1)}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-[#4d4732] backdrop-blur-md"
                                            style={{ backgroundColor: 'rgba(19,19,19,0.7)', color: '#ffd700' }}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* RIGHT: Product Info */}
                        <div className="w-full lg:w-[35%] lg:sticky lg:top-24 flex flex-col pt-4">
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-[0.9] mb-6 tracking-tighter"
                                style={{ fontFamily: 'Manrope, sans-serif', color: '#ffd700' }}>
                                {product.title}
                            </h1>

                            <div className="mb-8 flex items-baseline gap-2">
                                <span className="text-xl md:text-2xl font-black tracking-tight" style={{ color: '#e5e2e1' }}>
                                    {displayPrice?.currency || product.currency} {displayPrice?.amount?.toLocaleString()}
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black" style={{ color: '#999077' }}>
                                    Incl. Taxes
                                </span>
                            </div>

                            <div className="h-px w-full mb-8" style={{ backgroundColor: '#4d4732' }} />

                            {/* ── VARIANT SELECTORS ── */}
                            {Object.entries(availableAttributes).map(([attrName, values]) => {
                                const isColor = isColorAttr(attrName);
                                return (
                                    <div key={attrName} className="mb-8">
                                        <h3 className="text-[9px] uppercase tracking-[0.4em] font-black mb-4" style={{ color: '#999077' }}>
                                            {attrName}
                                            {isColor && activeVariant && (
                                                <span className="ml-3 normal-case tracking-normal opacity-60 text-[#e5e2e1]">
                                                    — {selectedAttributes[attrName]}
                                                </span>
                                            )}
                                        </h3>

                                        <div className="flex flex-wrap gap-3">
                                            {values.map(val => {
                                                const isSelected = selectedAttributes[attrName] === val;
                                                const matchedVariant = getVariantByAttrValue(attrName, val);
                                                const variantImg = matchedVariant?.images?.[0]?.url;
                                                const isOutOfStock = matchedVariant && matchedVariant.stock <= 0;

                                                if (isColor && variantImg) {
                                                    // Render as IMAGE SWATCH
                                                    return (
                                                        <button
                                                            key={val}
                                                            onClick={() => handleAttributeChange(attrName, val)}
                                                            title={val}
                                                            className="relative group/swatch flex-shrink-0"
                                                            style={{ outline: 'none' }}>
                                                            <div className={`w-16 h-20 overflow-hidden transition-all duration-300 ${isSelected
                                                                ? 'ring-2 ring-[#ffd700] ring-offset-2 ring-offset-[#131313] scale-105'
                                                                : 'ring-1 ring-[#4d4732] hover:ring-[#ffd700] opacity-60 hover:opacity-100'
                                                                } ${isOutOfStock ? 'opacity-30' : ''}`}>
                                                                <img src={variantImg} alt={val}
                                                                    className="w-full h-full object-cover" />
                                                                {isOutOfStock && (
                                                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                                        <div className="w-full h-px bg-red-500/70 rotate-45" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {/* Tooltip on hover */}
                                                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-wider whitespace-nowrap opacity-0 group-hover/swatch:opacity-100 transition-opacity pointer-events-none"
                                                                style={{ color: '#999077' }}>
                                                                {val}
                                                            </span>
                                                        </button>
                                                    );
                                                }

                                                // Render as TEXT CHIP (for size, material, etc.)
                                                return (
                                                    <button
                                                        key={val}
                                                        onClick={() => handleAttributeChange(attrName, val)}
                                                        disabled={isOutOfStock}
                                                        className={`relative px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] font-black transition-all duration-300 border
                                                            ${isSelected ? 'border-[#ffd700] bg-[#ffd700] text-[#221b00]' : 'border-[#4d4732] text-[#e5e2e1] hover:border-[#ffd700] bg-[#1c1b1b]'}
                                                            ${isOutOfStock ? 'opacity-30 cursor-not-allowed line-through' : ''}`}>
                                                        {val}
                                                        {isOutOfStock && (
                                                            <div className="absolute inset-0 flex items-end justify-end pb-1 pr-1 pointer-events-none">
                                                                <span className="text-red-500 text-[6px]">OOS</span>
                                                            </div>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Stock indicator */}
                            {activeVariant && activeVariant.stock !== undefined && (
                                <div className="mb-8 flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full ${activeVariant.stock > 0 ? 'bg-[#ffd700]' : 'bg-red-500'}`} />
                                    <span className={`text-[9px] uppercase tracking-[0.3em] font-black ${activeVariant.stock > 0 ? 'text-[#e5e2e1]' : 'text-red-500'}`}>
                                        {activeVariant.stock > 0 ? `${activeVariant.stock} Pieces Available` : 'Out of Stock'}
                                    </span>
                                </div>
                            )}

                            {/* Stock error */}
                            {stockError && (
                                <div className="mb-4 px-4 py-3 border border-red-500/30 bg-red-500/10">
                                    <p className="text-[10px] text-red-400 tracking-wider">{stockError}</p>
                                </div>
                            )}

                            <div className="mb-12">
                                <h3 className="text-[9px] uppercase tracking-[0.4em] font-black mb-4" style={{ color: '#999077' }}>
                                    Description
                                </h3>
                                <p className="text-sm leading-relaxed font-medium" style={{ color: '#d0c6ab' }}>
                                    {product.description}
                                </p>
                            </div>

                            {/* Add to Bag */}
                            <div className="flex flex-col gap-4 mt-auto">
                                <button
                                    onClick={handleAddToBag}
                                    disabled={adding || isAtStockLimit}
                                    className="w-full py-5 text-[11px] uppercase tracking-[0.4em] font-black transition-all duration-500 active:scale-[0.98] border border-transparent shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        background: isAtStockLimit
                                            ? '#1c1b1b'
                                            : addedFeedback
                                                ? '#1c1b1b'
                                                : 'linear-gradient(135deg, #ffe16d 0%, #ffd700 100%)',
                                        color: (addedFeedback || isAtStockLimit) ? '#ffd700' : '#221b00',
                                        fontFamily: "'Manrope', sans-serif",
                                    }}>
                                    {adding ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Adding...
                                        </span>
                                    ) : addedFeedback ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Secured in Bag
                                        </span>
                                    ) : isAtStockLimit ? (
                                        activeVariant?.stock <= 0 ? 'Out of Stock' : `Max Stock Reached (${activeVariant.stock})`
                                    ) : 'Add to Shopping Bag'}
                                </button>
                            </div>

                            {/* Details table */}
                            <div className="mt-14 space-y-4 text-[10px] uppercase tracking-[0.15em] font-bold" style={{ color: '#999077' }}>
                                {[['Shipping', 'Complimentary'], ['Returns', '14-Day Window'], ['Support', '24/7 Concierge']].map(([k, v]) => (
                                    <div key={k} className="flex justify-between border-b border-[#1c1b1b] pb-3">
                                        <span>{k}</span>
                                        <span style={{ color: '#e5e2e1' }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;