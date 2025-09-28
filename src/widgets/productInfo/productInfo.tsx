import { Upload, Sparkles, Download, Zap, Shield, Maximize } from "lucide-react";
import {Card, CardContent} from "@shared/ui/card.tsx";
import {Badge} from "@shared/ui/badge.tsx";
import {BeforeAfterSlider} from "@widgets/beforeAfterSlider";
import {ReactNode} from "react";
import {stagger, Variants} from "motion";
import { motion } from "framer-motion";


const steps = [
  {
    icon: Upload,
    title: "Загрузите фото",
    description: "Выберите изображение любого формата и размера"
  },
  {
    icon: Sparkles,
    title: "AI улучшает детали",
    description: "Наш алгоритм анализирует и восстанавливает детали"
  },
  {
    icon: Download,
    title: "Скачайте результат",
    description: "Получите четкое изображение высокого разрешения"
  }
];

const features = [
  { icon: Shield, text: "Сохраняем детали" },
  { icon: Zap, text: "Убираем шум" },
  { icon: Maximize, text: "До 4× масштаб" }
];

// Контейнеры для поочерёдного появления
const sectionContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.06, { startDelay: 0.1 }),
    },
  },
};

const blockItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.28, duration: 0.9 },
  },
};

// Отдельный контейнер для сетки карточек
const cardsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.08, { startDelay: 0.15 }),
    },
  },
};

export function ProductInfo() {

  return (
    <section className="py-20 px-4">
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto max-w-6xl"
      >
        <motion.div variants={blockItem} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Как это работает</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Простой процесс из трех шагов для получения профессиональных результатов
          </p>
        </motion.div>

        <motion.div
          variants={cardsContainer}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {steps.map(({ icon, title, description }, index) => {
            const Icon = icon;
            return (
              <motion.div key={index} variants={blockItem}>
                <Card className="text-center hover:shadow-lg transition-shadow dark:shadow-none bg-background">
                  <CardContent className="pb-8 pt-6">
                    <CardDecorator>
                      <Icon className="size-6" aria-hidden />
                    </CardDecorator>

                    <h3 className="mt-6 font-bold text-2xl">{title}</h3>
                    <p className="mt-3 text-md text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={blockItem} className="mb-12">
          <BeforeAfterSlider
            beforeSrc="/images/before.jpg"
            afterSrc="/images/after.jpg"
            className="max-w-3xl mx-auto"
            width="w-220"
            height="h-120"
          />
        </motion.div>

        <motion.div variants={blockItem} className="text-center">
          <h3 className="text-xl font-semibold mb-6">Наши преимущества</h3>
          <motion.div
            variants={cardsContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={i} variants={blockItem}>
                  <Badge variant="secondary" className="text-sm py-2 px-4 gap-2">
                    <Icon className="w-4 h-4" />
                    {feature.text}
                  </Badge>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
  </div>
)