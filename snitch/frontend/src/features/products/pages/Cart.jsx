import { useSelector, useDispatch } from "react-redux"
import { removeItem, updateQuantity, clearCart } from "../state/cartSlice"
import { Link } from "react-router"

export default function Cart() {
    const { items } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const subtotal = items.reduce((acc, item) => acc + (item.price.amount * item.quantity), 0)

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-24 md:pt-32 flex flex-col items-center justify-center bg-[#131313] text-[#e5e2e1]">
                <span className="material-symbols-outlined text-6xl mb-6 text-[#ffd700] opacity-50">shopping_bag</span>
                <h1 className="text-2xl font-black uppercase tracking-widest mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Your Bag is Empty</h1>
                <p className="text-[10px] tracking-[0.2em] uppercase opacity-50 mb-8">Discover our latest editorial collection</p>
                <Link to="/" className="px-10 py-4 bg-[#ffd700] text-[#131313] text-[10px] tracking-[0.3em] font-black uppercase hover:brightness-110 transition-all">
                    Shop New Arrivals
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 md:pt-32 pb-20 bg-[#131313]">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* Left: Item List */}
                    <div className="lg:w-2/3 space-y-10">
                        <div className="flex items-center justify-between border-b border-[#4d4732]/30 pb-6">
                            <h1 className="text-3xl font-black uppercase tracking-tight text-[#e5e2e1]" style={{ fontFamily: "Manrope, sans-serif" }}>
                                Your <span className="text-[#ffd700]">Bag</span>
                            </h1>
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[#999077] font-bold">
                                {items.length} Items
                            </span>
                        </div>

                        <div className="space-y-8">
                            {items.map((item) => (
                                <div key={item._id} className="flex gap-6 pb-8 border-b border-[#4d4732]/10 group">
                                    <div className="w-24 h-32 md:w-32 md:h-40 bg-[#1c1b1b] overflow-hidden rounded-sm flex-shrink-0">
                                        <img src={item.images?.[0]?.url} alt={item.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-sm md:text-base font-bold uppercase text-[#e5e2e1] mb-1">{item.title}</h3>
                                                <p className="text-[10px] text-[#999077] uppercase tracking-wider">{item.currency} {item.price?.amount}</p>
                                            </div>
                                            <button 
                                                onClick={() => dispatch(removeItem(item._id))}
                                                className="text-[#999077] hover:text-red-500 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">close</span>
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-[#4d4732]/30 rounded-full h-8 px-2 translate-y-2">
                                                <button 
                                                    onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                                                    className="w-6 h-6 flex items-center justify-center text-[#e5e2e1] hover:text-[#ffd700]"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center text-[10px] font-bold text-[#ffd700]">{item.quantity}</span>
                                                <button 
                                                    onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                                                    className="w-6 h-6 flex items-center justify-center text-[#e5e2e1] hover:text-[#ffd700]"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="text-sm font-black text-[#ffd700]">
                                                {item.currency} {item.price?.amount * item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            onClick={() => dispatch(clearCart())}
                            className="text-[8px] tracking-[0.4em] uppercase text-[#999077] hover:text-[#ffd700] transition-colors"
                        >
                            Clear Shopping Bag
                        </button>
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-[#1c1b1b] p-8 space-y-8 border border-[#4d4732]/20">
                            <h2 className="text-xs tracking-[0.3em] uppercase font-black text-[#ffd700] border-b border-[#ffd700]/20 pb-4">
                                Order Summary
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] tracking-wider uppercase font-bold text-[#999077]">
                                    <span>Subtotal</span>
                                    <span>INR {subtotal}</span>
                                </div>
                                <div className="flex justify-between text-[10px] tracking-wider uppercase font-bold text-[#999077]">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="h-px bg-[#4d4732]/30 my-6" />
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] tracking-[0.4em] uppercase font-black">Total</span>
                                    <span className="text-2xl font-black text-[#ffd700]">INR {subtotal}</span>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-[#ffd700] text-[#131313] text-[10px] tracking-[0.3em] font-black uppercase hover:brightness-110 active:scale-[0.98] transition-all">
                                Checkout
                            </button>
                            
                            <div className="pt-4 flex items-center gap-3 justify-center opacity-30 grayscale">
                                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                                <span className="text-[8px] tracking-[0.3em] uppercase font-bold">Secure Editorial Checkout</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
