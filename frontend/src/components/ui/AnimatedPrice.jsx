import { useEffect, useRef } from "react";
import { useSpring, useMotionValue } from "framer-motion";

const AnimatedPrice = ({ value, className = "" }) => {
    // 1. Create a MotionValue for the number
    const motionValue = useMotionValue(value);

    // 2. Wrap it in a Spring for physics-based smoothing
    const springValue = useSpring(motionValue, {
        stiffness: 200,
        damping: 25,
        mass: 0.5
    });

    // 3. Ref to access the DOM node directly (Performance)
    const ref = useRef(null);

    // 4. Update spring target when prop changes
    useEffect(() => {
        motionValue.set(value);
    }, [value, motionValue]);

    // 5. Subscribe to spring changes to update text content
    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                // Round to integer and format with spaces (e.g., "15 000")
                ref.current.textContent = Math.round(latest).toLocaleString('ru-RU');
            }
        });
        return () => unsubscribe();
    }, [springValue]);

    return <span ref={ref} className={className}>{value.toLocaleString('ru-RU')}</span>;
};

export default AnimatedPrice;
