import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const PricingSlider = ({ min = 0, max = 100, step = 1, value, onChange }) => {
    const constraintsRef = useRef(null);
    const isDragging = useRef(false); // Flag to stop state conflicts
    const x = useMotionValue(0);
    const [width, setWidth] = useState(0);

    // Measure track width and keep it updated
    useEffect(() => {
        if (!constraintsRef.current) return;

        const updateWidth = () => {
            if (constraintsRef.current) {
                setWidth(constraintsRef.current.offsetWidth);
            }
        };

        // Initial measure
        updateWidth();

        // Observe resize
        const observer = new ResizeObserver(updateWidth);
        observer.observe(constraintsRef.current);

        return () => observer.disconnect();
    }, []);

    // Sync external value -> slider position
    // ONLY if not currently dragging (prevents jitter)
    useEffect(() => {
        if (width > 0 && !isDragging.current) {
            const progress = (value - min) / (max - min);
            const targetX = progress * width;
            animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
        }
    }, [value, width, min, max, x]);

    const handleDrag = () => {
        const currentX = x.get();
        // Clamp progress between 0 and 1
        const newProgress = Math.max(0, Math.min(1, currentX / width));
        const newValue = Math.round((min + newProgress * (max - min)) / step) * step;

        if (newValue !== value) {
            onChange(newValue);
        }
    };

    const fillWidth = useTransform(x, (currentX) => currentX);

    return (
        <div className="relative h-12 flex items-center select-none touch-none w-full">
            {/* Constraints Container (The Track) */}
            <div
                ref={constraintsRef}
                className="relative w-full h-2 bg-[#0F2837] rounded-full"
            >
                {/* Background Track (Inactive) */}
                <div className="absolute inset-0 bg-white/5 rounded-full" />

                {/* Active Fill Bar */}
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#023A55] to-[#06B6D4] rounded-full"
                    style={{ width: fillWidth }}
                />

                {/* Draggable Knob */}
                <motion.div
                    className="absolute top-1/2 left-0 w-6 h-6 bg-white rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)] z-10 cursor-grab active:cursor-grabbing"
                    // Style adjustments for perfect centering:
                    // -translate-y-1/2: Centers vertically
                    // -translate-x-1/2: Centers horizontally on the X coordinate
                    style={{ x, y: "-50%", translateX: "-50%" }}

                    drag="x"
                    dragConstraints={constraintsRef}
                    dragElastic={0}
                    dragMomentum={false}

                    onDragStart={() => { isDragging.current = true; }}
                    onDrag={handleDrag}
                    onDragEnd={() => { isDragging.current = false; }}
                />
            </div>
        </div>
    );
};

export default PricingSlider;
