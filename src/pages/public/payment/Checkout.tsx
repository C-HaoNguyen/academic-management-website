import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentForm from "../../../components/checkout/PaymentForm";
import OrderSummary from "../../../components/checkout/OrderSummary";
import PaymentSuccessOverlay from "../../../components/checkout/EnrollSuccessOverlay";
import { getAccessToken } from "../../../utils/AuthUtils";

type CourseDetail = {
    courseId: number;
    title: string;
    price: number;
    thumbnail?: string;
    instructor: {
        fullName: string;
    };
};

const Checkout = () => {
    const location = useLocation();
    const courseId = location.state?.courseId;

    const [course, setCourse] = useState<CourseDetail | null>(null);
    const [success, setSuccess] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [coupon, setCoupon] = useState("");

    useEffect(() => {
        if (!courseId) return;

        fetch(`http://localhost:8080/courses/${courseId}`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then(res => res.json())
            .then(setCourse);
    }, [courseId]);

    const applyCoupon = () => {
        // mock logic – sau này gọi API
        if (coupon === "GIAM50") {
            setDiscount(50000);
        } else if (coupon === "FREE100") {
            setDiscount(course ? course.price : 0);
        } else {
            setDiscount(0);
            alert("Mã giảm giá không hợp lệ");
        }
    };

    if (!course) return null;

    const handlePayment = async () => {
        if (!course) return;

        try {
            await fetch("http://localhost:8080/enrollments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({
                    courseId: course.courseId,
                    pricePaid: Math.max(course.price - discount, 0),
                    couponCode: coupon || null
                })
            });

            setSuccess(true);
        } catch (err) {
            alert("Thanh toán thất bại");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-12">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <PaymentForm onSubmit={handlePayment} />
                </div>

                <OrderSummary
                    title={course.title}
                    instructor={course.instructor.fullName}
                    thumbnail={course.thumbnail}
                    price={course.price}
                    discount={discount}
                    enableCoupon={true}
                    coupon={coupon}
                    onCouponChange={setCoupon}
                    onApplyCoupon={applyCoupon}
                />
            </div>

            <PaymentSuccessOverlay
                open={success}
                onClose={() => setSuccess(false)}
            />
        </div>
    );
};

export default Checkout;
