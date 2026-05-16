import {ArrowLeft, CheckCircle2, FileText, ShieldCheck} from "lucide-react";
import {useNavigate} from "react-router-dom";

import {Badge} from "@shared/ui/badge.tsx";
import {Button} from "@shared/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card.tsx";
import {Separator} from "@shared/ui/separator.tsx";

const terms = [
  {
    icon: CheckCircle2,
    title: "Назначение сервиса",
    text: "Приложение предназначено для улучшения качества изображений и просмотра результата обработки.",
  },
  {
    icon: FileText,
    title: "Ответственность пользователя",
    text: "Пользователь отвечает за право загрузки изображений и корректность материалов, отправляемых в обработку.",
  },
  {
    icon: ShieldCheck,
    title: "Ограничения",
    text: "Сервис может быть недоступен во время обслуживания, обновления или технических ограничений инфраструктуры.",
  },
];

export const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 py-16" style={{fontFamily: "Manrope, sans-serif"}}>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Button
          type="button"
          variant="outline"
          className="w-fit"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit">
              Документы
            </Badge>
            <CardTitle className="text-3xl">Условия использования</CardTitle>
            <CardDescription>
              Правила работы с приложением SuperRes и результатами обработки изображений.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm leading-6 text-muted-foreground">
              Используя SuperRes, пользователь соглашается применять сервис в рамках его функционального
              назначения и не нарушать права третьих лиц при загрузке изображений.
            </p>

            <Separator />

            <div className="grid gap-4 md:grid-cols-3">
              {terms.map(({icon: Icon, title, text}) => (
                <div key={title} className="rounded-lg border bg-background p-4">
                  <Icon className="mb-3 size-5 text-primary" />
                  <h2 className="mb-2 font-semibold">{title}</h2>
                  <p className="text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
