"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function FormulaAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
            const chars = textRef.current?.children;

            if (!chars) return;

            // Hide all initially
            gsap.set(chars, { opacity: 0, display: "none" });

            // Character 'p' - Scale In & Rotate Out
            tl.set(chars[0], { display: "block" })
                .fromTo(chars[0],
                    { opacity: 0, scale: 0, rotation: -90 },
                    { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
                )
                .to(chars[0], {
                    opacity: 0,
                    scale: 2,
                    rotation: 90,
                    duration: 0.6,
                    delay: 0.5,
                    ease: "power2.in"
                })
                .set(chars[0], { display: "none" });

            // Character '=' - Split Horizontal In & Fade Out
            tl.set(chars[1], { display: "block" })
                .fromTo(chars[1],
                    { opacity: 0, x: -50, scaleX: 2 },
                    { opacity: 1, x: 0, scaleX: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" }
                )
                .to(chars[1], {
                    opacity: 0,
                    scaleX: 0,
                    duration: 0.5,
                    delay: 0.5,
                    ease: "power2.in"
                })
                .set(chars[1], { display: "none" });

            // Character 'm' - Drop In & Slide Down
            tl.set(chars[2], { display: "block" })
                .fromTo(chars[2],
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "bounce.out" }
                )
                .to(chars[2], {
                    opacity: 0,
                    y: 50,
                    duration: 0.5,
                    delay: 0.5,
                    ease: "power2.in"
                })
                .set(chars[2], { display: "none" });

            // Character 'v' - Zoom from Camera & Blur Out
            tl.set(chars[3], { display: "block" })
                .fromTo(chars[3],
                    { opacity: 0, z: 100, scale: 3 },
                    { opacity: 1, z: 0, scale: 1, duration: 0.8, ease: "expo.out" }
                )
                .to(chars[3], {
                    opacity: 0,
                    filter: "blur(10px)",
                    scale: 0.5,
                    duration: 0.6,
                    delay: 0.5,
                    ease: "power2.in"
                })
                .set(chars[3], { display: "none" });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg shadow-orange-500/20 overflow-hidden" ref={containerRef}>
            <div ref={textRef} className="relative flex items-center justify-center w-full h-full">
                <span className="text-3xl font-bold text-white font-mono leading-none">p</span>
                <span className="text-3xl font-bold text-white font-mono leading-none">=</span>
                <span className="text-3xl font-bold text-white font-mono leading-none">m</span>
                <span className="text-3xl font-bold text-white font-mono leading-none">v</span>
            </div>
        </div>
    );
}
