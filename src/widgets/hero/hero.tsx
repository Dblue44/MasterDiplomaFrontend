import {useNavigate} from "react-router-dom";
import {ImageUpload} from "@widgets/imageUpload";
import TextType from "@shared/ui/textType.tsx";
import Magnet from "@shared/ui/magnet.tsx";
import {stagger, Variants} from "motion";
import { motion } from "framer-motion";
import {useTheme} from "next-themes";
import {ChevronsDown} from "lucide-react";
import {useEffect, useState} from "react";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.1, { startDelay: 0.2 }), // новый синтаксис
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 58, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.2, duration: 2.2 },
  },
};

export function Hero() {
  const navigate = useNavigate();
  const { theme, resolvedTheme } = useTheme();
  const isDark = (theme ?? resolvedTheme) === "dark";

  const textColors = isDark
    ? ["#f6f6f6"]
    : ["#0c0c0c"];

  const [hintDismissed, setHintDismissed] = useState(false);
  useEffect(() => {
    const onFirstScroll = () => {
      setHintDismissed(true);
      window.removeEventListener("scroll", onFirstScroll);
    };
    window.addEventListener("scroll", onFirstScroll, { passive: true });
    return () => window.removeEventListener("scroll", onFirstScroll);
  }, []);

  return (
    <section className="py-50 px-4">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto text-center max-w-4xl"
      >
        <motion.h1
          variants={item}
          className="relative mb-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]"
        >
          {/* Невидимый «призрак» — резервирует высоту под 1–2 строки */}
          <span aria-hidden className="invisible block">
            Увеличим качество ваших фото с помощью AI
          </span>

          <span className="absolute inset-0 w-full text-center">
            <TextType
              text={["Увеличим качество ваших фото с помощью AI"]}
              typingSpeed={30}
              showCursor={false}
              textColors={textColors}
            />
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Превратите размытые снимки в четкие изображения высокого разрешения
          с помощью нашего передового алгоритма искусственного интеллекта
        </motion.p>

        <motion.div
          variants={item}
          className="flex space-y-6 items-center justify-center"
        >
          <Magnet padding={60} disabled={false} magnetStrength={4}>
            <ImageUpload
              onUploadSuccess={() => {
                navigate("/images");
              }}
            />
          </Magnet>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: hintDismissed ? 0 : 0.9, y: hintDismissed ? 6 : 0 }}
          transition={{ duration: 0.7 }}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
        >
          <motion.div
            transition={{ duration: 2.0, repeat: hintDismissed ? 0 : Infinity, ease: "easeInOut" }}
            className="rounded-full border bg-background/60 px-3 py-1.5 backdrop-blur"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ChevronsDown className="h-4 w-4" />
              Информация о продукте
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}