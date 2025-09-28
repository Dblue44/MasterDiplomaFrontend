import {Hero} from "@widgets/hero";
import {ProductInfo} from "@widgets/productInfo";
import {Toaster} from "@shared/ui/sonner.tsx";
import { motion } from "framer-motion";
import {stagger, Variants} from "motion";
import {Meteors} from "@shared/ui/meteors.tsx";

const gridContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.08, { startDelay: 0.15 }),
    },
  },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.3, duration: 0.9 },
  },
};

export const HomePage = () => {

  return (
    <div id={"home"} className="flex flex-col pt-16">
      <Meteors number={10} />
      <Toaster position="top-center" richColors />
      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.section variants={fadeUpItem}>
          <Hero />
        </motion.section>
      </motion.div>

      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.section variants={fadeUpItem}>
          <ProductInfo />
        </motion.section>
      </motion.div>
    </div>
  );
}