import { motion } from "framer-motion";

type OrderSummaryProps = {
    title: string;
    instructor: string;
    price: number;
    discount: number;
    coupon: string;
    thumbnail?: string;

    enableCoupon?: boolean;
    onCouponChange: (v: string) => void;
    onApplyCoupon: () => void;
};

const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN") + "₫";

const OrderSummary = ({
    title,
    instructor,
    price,
    discount,
    coupon,
    thumbnail,
    enableCoupon,
    onCouponChange,
    onApplyCoupon
}: OrderSummaryProps) => {
    const total = Math.max(price - discount, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-6 shadow"
        >
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Chi tiết thanh toán
            </h3>

            {/* Course info */}
            <div className="mb-4 flex gap-4">
                <img
                    src={thumbnail}
                    className="h-20 w-32 rounded-lg object-cover"
                />
                <div>
                    <p className="font-semibold text-gray-800">{title}</p>
                    <p className="text-sm text-gray-500">
                        Giảng viên: {instructor}
                    </p>
                </div>
            </div>

            {/* Coupon */}
            {enableCoupon && (
                <div className="mb-4 flex gap-2">
                    <input
                        value={coupon}
                        onChange={(e) => onCouponChange?.(e.target.value)}
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 rounded-lg border-blue-800 px-4 py-2 text-sm"
                    />
                    <button
                        onClick={onApplyCoupon}
                        className="rounded-xl bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-800"
                    >
                        Áp dụng
                    </button>
                </div>
            )}

            {/* Price */}
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Giá gốc</span>
                    <span>{formatPrice(price)}</span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Giảm giá</span>
                        <span>-{formatPrice(discount)}</span>
                    </div>
                )}

                <hr />

                <div className="flex justify-between text-lg font-semibold">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(total)}</span>
                </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
                ✔ Hoàn tiền trong 30 ngày nếu không hài lòng
            </p>
        </motion.div>
    );
};

export default OrderSummary;
