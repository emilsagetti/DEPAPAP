import { motion } from "framer-motion";

const AnimatedToggle = ({ isOn, onToggle }) => {
    // Spring transition settings for satisfying snap
    const spring = {
        type: "spring",
        stiffness: 500,
        damping: 30
    };

    return (
        // The Track Container - Unified style with PricingSlider
        <div
            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${isOn ? 'justify-end' : 'justify-start'}`}
            onClick={onToggle}
            // Unified gradient: solid brand blue inactive, gradient cyan active (matching slider)
            style={{
                background: isOn
                    ? 'linear-gradient(to right, #023A55, #06B6D4)'
                    : '#1E3A4C'
            }}
        >
            {/* The Sliding Knob - Unified glow effect with slider knob */}
            <motion.div
                className={`w-6 h-6 bg-white rounded-full transition-shadow duration-300 ${isOn ? 'shadow-[0_0_15px_rgba(6,182,212,0.6)]' : 'shadow-sm'}`}
                // MAGIC: 'layout' prop makes it animate smoothly when parent flex justification changes
                layout
                transition={spring}
                // Tactile feedback on press
                whileTap={{ scale: 0.9 }}
            />
        </div>
    );
};

export default AnimatedToggle;
