"use client";
import { motion } from "motion/react";

export default function MarqueeSection() {
  const row1 = ["GITHUB", "MERGE", "ISSUES", "FORK", "COMMIT", "PUSH"];
  const row2 = ["CODING", "BUILD", "DEPLOY", "DEBUG", "CREATE", "LEARN"];

  return (
    <div className="w-full py-20 flex flex-col gap-0 bg-white overflow-hidden relative z-20">
      {/* Marquee 1 */}
      <div className="relative w-[110%] -left-[5%] bg-zinc-950 py-6 border-y-4 border-black -rotate-2 shadow-2xl z-10">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex flex-nowrap whitespace-nowrap"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ repeat: Infinity, ease: "linear", duration: 120 }}
          >
            {[...row1, ...row1, ...row1, ...row1].map((item, i) => (
              <span key={i} className="text-7xl md:text-9xl font-[family-name:var(--font-passero)] text-[#bfff00] mx-6 flex items-center gap-6">
                {item} <span className="text-zinc-600">•</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Marquee 2 */}
      <div className="relative w-[110%] -left-[5%] bg-[#bfff00] py-6 border-y-4 border-black rotate-2 shadow-xl z-20 -mt-10">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex flex-nowrap whitespace-nowrap"
            initial={{ x: "-50%" }}
            animate={{ x: 0 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 120 }}


          >
            {[...row2, ...row2, ...row2, ...row2].map((item, i) => (
              <span key={i} className="text-7xl md:text-9xl font-[family-name:var(--font-passero)] text-black mx-6 flex items-center gap-6">
                {item} <span className="text-black/20">•</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
