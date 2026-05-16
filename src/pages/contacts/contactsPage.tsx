import {ArrowLeft, Github, Mail} from "lucide-react";
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

const contacts = [
  {
    icon: Mail,
    title: "stakheev12@mail.ru",
    text: "Для вопросов по работе приложения используйте контактный адрес команды проекта.",
  },
  {
    icon: Github,
    title: "Dblue44",
    text: "Исходный код и история разработки доступны в репозитории проекта.",
  }
];

export const ContactsPage = () => {
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
              Связь
            </Badge>
            <CardTitle className="text-3xl">Контакты</CardTitle>
            <CardDescription>
              Каналы для связи по вопросам использования, разработки и поддержки SuperRes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm leading-6 text-muted-foreground">
              Если у вас есть вопрос по работе сервиса, результатам обработки или интерфейсу, свяжитесь
              с командой проекта удобным способом.
            </p>

            <Separator />

            <div className="grid gap-4 md:grid-cols-3">
              {contacts.map(({icon: Icon, title, text}) => (
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
