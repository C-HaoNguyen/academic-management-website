import { motion } from "framer-motion";

type PaymentFormProps = {
    onSubmit: () => void;
};

const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-6 shadow"
        >
            <h2 className="mb-6 text-xl font-semibold text-gray-800">
                Thông tin thanh toán
            </h2>

            <div className="space-y-4">
                {/* Card number */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">
                        Số thẻ
                    </label>
                    <input
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3
                                   focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>

                {/* Expiry + CVC */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Ngày hết hạn
                        </label>
                        <input
                            placeholder="MM/YY"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            CVC
                        </label>
                        <input
                            placeholder="CVC"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        />
                    </div>
                </div>

                {/* Name */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">
                        Tên chủ thẻ
                    </label>
                    <input
                        placeholder="Nguyễn Văn A"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    />
                </div>

                {/* Save card */}
                <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                    />
                    Lưu thẻ cho lần thanh toán sau
                </label>

                {/* Submit */}
                <button
                    onClick={onSubmit}
                    className="mt-4 w-full rounded-xl bg-blue-600 py-3
                               font-semibold text-white hover:bg-blue-700 transition"
                >
                    Thanh toán
                </button>
            </div>
        </motion.div>
    );
};

export default PaymentForm;
