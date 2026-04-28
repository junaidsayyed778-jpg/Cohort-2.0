import { useOrders } from "../hook/useOrders"
import { useNavigate } from "react-router"

const Orders = () => {
    const { orders, loading, error, handleRemoveOrder } = useOrders()
    const navigate = useNavigate()

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center bg-[#131313]">
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#ffd700] animate-pulse">
                    Retrieving your collection...
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 md:pt-32 pb-20 bg-[#131313]">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#4d4732]/30 pb-10 mb-16 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#e5e2e1]"
                            style={{ fontFamily: "Manrope, sans-serif" }}>
                            MY <span className="text-[#ffd700]">HISTORY</span>
                        </h1>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[#999077] font-bold mt-2">
                            Past Curations & Editorial Deliveries
                        </p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <span className="material-symbols-outlined text-6xl mb-6 text-[#ffd700]">inventory_2</span>
                        <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#e5e2e1]">No orders found yet</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-[#1c1b1b] border border-[#4d4732]/20 overflow-hidden group">
                                {/* Order Header */}
                                <div className="p-6 md:p-8 border-b border-[#4d4732]/10 flex flex-wrap justify-between items-center gap-4 bg-[#1e1d1d]">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-[7px] tracking-[0.3em] uppercase font-black text-[#999077] mb-1">Date</p>
                                            <p className="text-[10px] font-bold text-[#e5e2e1] uppercase">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[7px] tracking-[0.3em] uppercase font-black text-[#999077] mb-1">Total</p>
                                            <p className="text-[10px] font-bold text-[#ffd700] uppercase">
                                                {order.price.currency} {order.price.amount.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[7px] tracking-[0.3em] uppercase font-black text-[#999077] mb-1">Delivery</p>
                                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-sm ${
                                                order.deliveryStatus === 'delivered' ? 'bg-green-500/10 text-green-500' : 
                                                order.deliveryStatus === 'shipped' ? 'bg-blue-500/10 text-blue-500' : 
                                                'bg-[#ffd700]/10 text-[#ffd700]'
                                            }`}>
                                                {order.deliveryStatus}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-[8px] tracking-[0.2em] font-black text-[#999077]">
                                            ID: <span className="text-[#e5e2e1]">{order._id.slice(-8).toUpperCase()}</span>
                                        </p>
                                        <button 
                                            onClick={() => {
                                                if(window.confirm("Remove this order from history?")) {
                                                    handleRemoveOrder(order._id)
                                                }
                                            }}
                                            className="text-[#999077] hover:text-red-500 transition-colors p-1"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">close</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6 md:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {order.orderItems.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 group/item cursor-pointer" 
                                                onClick={() => navigate(`/product/${item.productId}`)}>
                                                <div className="w-16 h-20 bg-[#131313] overflow-hidden rounded-sm flex-shrink-0">
                                                    <img src={item.images?.[0]?.url} alt={item.title} className="w-full h-full object-cover grayscale-[0.5] group-hover/item:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <div className="flex flex-col justify-center gap-1">
                                                    <h4 className="text-[10px] font-black uppercase text-[#e5e2e1] group-hover/item:text-[#ffd700] transition-colors line-clamp-1">{item.title}</h4>
                                                    <p className="text-[8px] tracking-wider uppercase text-[#999077]">Qty: {item.quantity}</p>
                                                    <p className="text-[9px] font-bold text-[#ffd700]">{item.price.currency} {item.price.amount.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders
