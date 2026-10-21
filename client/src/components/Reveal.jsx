import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (visible) return "translate(0, 0)";
    if (direction === "up") return "translateY(40px)";
    if (direction === "left") return "translateX(-40px)";
    if (direction === "right") return "translateX(40px)";
    return "translateY(40px)";
  };

    return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)`,
        transitionDelay: `${delay}ms`,
        height: "100%",          // ADD THIS
        display: "flex",         // ADD THIS
        flexDirection: "column", // ADD THIS
        width: "100%",    // ADD THIS
        minWidth: 0, 
      }}
    >
      {children}
    </div>
  );
}