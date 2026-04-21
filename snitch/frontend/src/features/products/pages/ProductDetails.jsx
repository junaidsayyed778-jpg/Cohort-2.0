import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../hook/useProduct';
import { useDispatch } from 'react-redux';
import { addItem } from '../state/cartSlice';

const ProductDetail = () => {
    const { productId } = useParams();
    const [ product, setProduct ] = useState(null);
    const [ selectedImage, setSelectedImage ] = useState(0);
    const [ selectedAttributes, setSelectedAttributes ] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleProductsById } = useProduct();

    const [ added, setAdded ] = useState(false);

    async function fetchProductDetails() {
        try {
            const data = await handleProductsById(productId);
            setProduct(data?.product || data);
        } catch (error) {
            console.error("Failed to fetch product details", error);
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, [ productId ]);

    useEffect(() => {
        if (product?.variants?.length > 0) {
            setSelectedAttributes(product.variants[ 0 ].attributes || {});
        }
    }, [ product ]);

    const handleAttributeChange = (attrName, value) => {
        const newAttrs = { ...selectedAttributes, [ attrName ]: value };

        // Find if an exact match exists for this combination
        const exactMatch = product.variants.find(v => {
            const vAttrs = v.attributes || {};
            const keys = new Set([...Object.keys(newAttrs), ...Object.keys(vAttrs)]);
            return Array.from(keys).every(k => newAttrs[ k ] === vAttrs[ k ]);
        });

        if (exactMatch) {
            setSelectedAttributes(exactMatch.attributes);
        } else {
            // Find any variant that has this newly selected attribute to fallback nicely
            const fallbackVariant = product.variants.find(v => v.attributes && v.attributes[ attrName ] === value);
            if (fallbackVariant) {
                setSelectedAttributes(fallbackVariant.attributes);
            } else {
                setSelectedAttributes(newAttrs);
            }
        }
    };

    const activeVariant = useMemo(() => {
        if (!product?.variants || product.variants.length === 0) return null;
        return product.variants.find(v => {
            if (!v.attributes) return false;
            const vKeys = Object.keys(v.attributes);
            const sKeys = Object.keys(selectedAttributes);
            const isMatch = vKeys.every(k => v.attributes[ k ] === selectedAttributes[ k ]);
            return vKeys.length === sKeys.length && isMatch;
        });
    }, [ product, selectedAttributes ]);

    const availableAttributes = useMemo(() => {
        if (!product?.variants) return {};
        const attrs = {};
        product.variants.forEach(variant => {
            if (variant.attributes) {
                Object.entries(variant.attributes).forEach(([ key, value ]) => {
                    if (!attrs[ key ]) attrs[ key ] = new Set();
                    attrs[ key ].add(value);
                });
            }
        });

        // Standard Size Order
        const sizeOrder = [ 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL' ];
        const sortSizes = (sizes) => {
            return [ ...sizes ].sort((a, b) => {
                const indexA = sizeOrder.indexOf(String(a).toUpperCase());
                const indexB = sizeOrder.indexOf(String(b).toUpperCase());
                if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                return String(a).localeCompare(String(b));
            });
        };

        Object.keys(attrs).forEach(key => {
            const valuesArray = Array.from(attrs[ key ]);
            attrs[ key ] = (key.toLowerCase().includes('size')) ? sortSizes(valuesArray) : valuesArray;
        });
        return attrs;
    }, [ product ]);

    useEffect(() => {
        setSelectedImage(0);
    }, [ activeVariant ]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#131313' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", color: '#ffd700' }} className="text-[10px] uppercase tracking-[0.2em] font-black animate-pulse">
                    Retrieving piece...
                </p>
            </div>
        );
    }

    const displayImages = (activeVariant?.images && activeVariant.images.length > 0)
        ? activeVariant.images
        : (product.images && product.images.length > 0 ? product.images : []);

    const displayPrice = activeVariant?.price?.amount
        ? activeVariant.price
        : product.price;

    return (
        <div className="min-h-screen transition-colors duration-500 overflow-x-hidden" style={{ backgroundColor: '#131313', color: '#e5e2e1', fontFamily: 'Inter, sans-serif' }}>
            {/* Background Glow Blobs */}
            <div
                className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.07]"
                style={{ background: '#ffd700', filter: 'blur(120px)' }}
            />
            <div
                className="fixed bottom-[-50px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.05]"
                style={{ background: '#ffd700', filter: 'blur(100px)' }}
            />

            <div className="relative z-10">
                {/* Navigation */}
                <nav className="flex justify-between items-center px-8 lg:px-16 py-8">
                    <Link to="/"
                        className="text-xl font-black tracking-[-0.05em] uppercase hover:opacity-80 transition-opacity"
                        style={{ fontFamily: 'Manrope, sans-serif', color: '#ffd700' }}
                    >
                        SNITCH.
                    </Link>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-[10px] uppercase tracking-[0.25em] font-semibold transition-all hover:text-[#ffd700] flex items-center gap-2"
                        style={{ color: '#999077' }}
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                        Return to Archive
                    </button>
                </nav>

                <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-8 lg:pt-16 pb-24">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                        {/* LEFT: Image Gallery */}
                        <div className="w-full lg:w-[65%] flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
                            {/* Thumbnails */}
                            {displayImages.length > 1 && (
                                <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-20 lg:w-24 flex-shrink-0 md:max-h-[calc(100vh-250px)]">
                                    {displayImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`flex-shrink-0 w-20 md:w-full aspect-[4/5] overflow-hidden transition-all duration-300 border ${selectedImage === idx ? 'opacity-100 border-[#ffd700]' : 'opacity-40 hover:opacity-100 border-[#4d4732]'}`}
                                            style={{ backgroundColor: '#1c1b1b' }}
                                        >
                                            <img src={img.url} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Main Image */}
                            <div className="relative w-full aspect-[4/5] overflow-hidden group border border-[#4d4732]" style={{ backgroundColor: '#1c1b1b' }}>
                                <img
                                    src={displayImages[ selectedImage ]?.url || displayImages[ 0 ]?.url}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                {displayImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setSelectedImage(prev => prev === 0 ? displayImages.length - 1 : prev - 1)}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-[#4d4732] backdrop-blur-md"
                                            style={{ backgroundColor: 'rgba(19,19,19,0.7)', color: '#ffd700' }}
                                            aria-label="Previous"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" /></svg>
                                        </button>
                                        <button
                                            onClick={() => setSelectedImage(prev => prev === displayImages.length - 1 ? 0 : prev + 1)}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-[#4d4732] backdrop-blur-md"
                                            style={{ backgroundColor: 'rgba(19,19,19,0.7)', color: '#ffd700' }}
                                            aria-label="Next"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* RIGHT: Product Details */}
                        <div className="w-full lg:w-[35%] lg:sticky lg:top-24 flex flex-col pt-4">
                            <h1
                                className="text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-[0.9] mb-6 tracking-tighter"
                                style={{ fontFamily: 'Manrope, sans-serif', color: '#ffd700' }}
                            >
                                {product.title}
                            </h1>

                            <div className="mb-8 flex items-baseline gap-2">
                                <span className="text-xl md:text-2xl font-black tracking-tight" style={{ color: '#e5e2e1' }}>
                                    {displayPrice?.currency} {displayPrice?.amount?.toLocaleString()}
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black" style={{ color: '#999077' }}>
                                    Incl. Taxes
                                </span>
                            </div>

                            <div className="h-px w-full mb-8" style={{ backgroundColor: '#4d4732' }} />

                            {/* Attributes */}
                            {Object.entries(availableAttributes).map(([ attrName, values ]) => (
                                <div key={attrName} className="mb-8">
                                    <h3 className="text-[9px] uppercase tracking-[0.4em] font-black mb-4" style={{ color: '#999077' }}>
                                        {attrName}
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {values.map(val => {
                                            const isSelected = selectedAttributes[ attrName ] === val;
                                            return (
                                                <button
                                                    key={val}
                                                    onClick={() => handleAttributeChange(attrName, val)}
                                                    className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] font-black transition-all duration-300 border ${isSelected ? 'border-[#ffd700] bg-[#ffd700] text-[#221b00]' : 'border-[#4d4732] text-[#e5e2e1] hover:border-[#ffd700] bg-[#1c1b1b]'}`}
                                                >
                                                    {val}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            {/* Stock */}
                            {activeVariant && activeVariant.stock !== undefined && (
                                <div className="mb-8 flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full ${activeVariant.stock > 0 ? 'bg-[#ffd700]' : 'bg-red-500'}`} />
                                    <span className={`text-[9px] uppercase tracking-[0.3em] font-black ${activeVariant.stock > 0 ? 'text-[#e5e2e1]' : 'text-red-500'}`}>
                                        {activeVariant.stock > 0 ? `${activeVariant.stock} Pieces Available` : 'Waitlist Only'}
                                    </span>
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

                            {/* Actions */}
                            <div className="flex flex-col gap-4 mt-auto">
                                <button
                                    className="w-full py-5 text-[11px] uppercase tracking-[0.4em] font-black transition-all duration-500 active:scale-[0.98] border border-transparent shadow-2xl"
                                    style={{
                                        background: added ? '#1c1b1b' : 'linear-gradient(135deg, #ffe16d 0%, #ffd700 100%)',
                                        color: added ? '#ffd700' : '#221b00',
                                        fontFamily: "'Manrope', sans-serif"
                                    }}
                                    onClick={() => {
                                        if (activeVariant && product) {
                                            const itemToAdd = {
                                                ...product,
                                                variantId: activeVariant._id,
                                                variantTitle: activeVariant.title,
                                                attributes: activeVariant.attributes,
                                                price: activeVariant.price,
                                                images: activeVariant.images?.[ 0 ] ? activeVariant.images : product.images,
                                                quantity: 1
                                            };
                                            dispatch(addItem(itemToAdd));
                                            setAdded(true);
                                            setTimeout(() => setAdded(false), 2000);
                                        }
                                    }}
                                >
                                    {added ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                            Secured in Bag
                                        </span>
                                    ) : 'Add to Shopping Bag'}
                                </button>

                                <button
                                    className="w-full py-4 text-[10px] uppercase tracking-[0.35em] font-black transition-all duration-300 border bg-transparent hover:bg-white/5"
                                    style={{
                                        borderColor: '#4d4732',
                                        color: '#ffd700',
                                        fontFamily: "'Manrope', sans-serif"
                                    }}
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Details Table */}
                            <div className="mt-14 space-y-4 text-[10px] uppercase tracking-[0.15em] font-bold" style={{ color: '#999077' }}>
                                <div className="flex justify-between border-b border-[#1c1b1b] pb-3">
                                    <span>Shipping</span>
                                    <span style={{ color: '#e5e2e1' }}>Complimentary</span>
                                </div>
                                <div className="flex justify-between border-b border-[#1c1b1b] pb-3">
                                    <span>Returns</span>
                                    <span style={{ color: '#e5e2e1' }}>14-Day Window</span>
                                </div>
                                <div className="flex justify-between border-b border-[#1c1b1b] pb-3">
                                    <span>Support</span>
                                    <span style={{ color: '#e5e2e1' }}>24/7 Concierge</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;