import {ArrowLeft, Database, Eye, Lock} from "lucide-react";
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

const privacyItems = [
  {
    icon: Database,
    title: "Какие данные используются",
    text: "Сервис обрабатывает загруженные изображения и технические данные, необходимые для выполнения улучшения качества.",
  },
  {
    icon: Eye,
    title: "Как используются изображения",
    text: "Изображения используются только для обработки выбранной операции и отображения результата пользователю.",
  },
  {
    icon: Lock,
    title: "Безопасность",
    text: "Доступ к результатам обработки ограничивается пользовательским сценарием работы с приложением.",
  },
];

export const PrivacyPage = () => {
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
              SuperRes
            </Badge>
            <CardTitle className="text-3xl">Политика конфиденциальности</CardTitle>
            <CardDescription>
              Основные принципы обработки данных при использовании сервиса улучшения изображений.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm leading-6 text-muted-foreground">
              SuperRes стремится собирать только те данные, которые нужны для работы функций приложения:
              загрузки изображения, обработки, предпросмотра и получения результата.
            </p>

            <Separator />

            <div className="grid gap-4 md:grid-cols-3">
              {privacyItems.map(({icon: Icon, title, text}) => (
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
