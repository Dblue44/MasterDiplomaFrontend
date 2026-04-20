export function AppDisabledStub() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-16">
        <div className="w-full rounded-3xl border border-border/60 bg-card/80 p-8 text-center shadow-sm backdrop-blur sm:p-12">
          <span className="inline-flex rounded-full border border-border/60 px-3 py-1 text-sm text-muted-foreground">
            Приложение временно недоступно
          </span>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">
            Мы скоро вернемся
          </h1>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Сервис временно отключен. Попробуйте зайти позже.
          </p>
        </div>
      </section>
    </main>
  );
}
