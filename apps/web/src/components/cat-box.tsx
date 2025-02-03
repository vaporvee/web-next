"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CatBox() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return (
    <motion.div className="absolute top-0 left-0 w-screen h-screen">
      <motion.div
        drag
        dragConstraints={{
          top: 0,
          left: 0,
          right: windowSize.width - 150,
          bottom: windowSize.height + 50,
        }}
        dragElastic={0.2}
        whileHover={{ scale: 1.1 }}
        className="w-36 h-36 cursor-all-scroll"
        style={{ x: windowSize.width - 200, y: 100 }}
      >
        <Image
          draggable="false"
          src="/assets/cat.webp"
          alt="silly cat"
          width={200}
          height={200}
        />
      </motion.div>
    </motion.div>
  );
}
