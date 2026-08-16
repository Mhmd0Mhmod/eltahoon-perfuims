import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

function Newsletter() {
  return (
    <section className="pb-20 pt-10 md:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <Card className="editorial-shell border-0 bg-[linear-gradient(140deg,rgba(247,243,236,0.96),rgba(236,226,212,0.9))] py-0">
          <CardContent className="p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-none border border-primary/35 bg-card/70">
                  <Mail className="text-primary h-7 w-7" />
                </div>
              </div>

              <p className="mb-3 text-[11px] tracking-[0.34em] text-primary/85 uppercase">
                Private Letter
              </p>

              <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                اشترك في النشرة البريدية
              </h2>

              <p className="mb-8 text-base leading-8 text-muted-foreground">
                احصل على الإصدارات المحدودة والدعوات الحصرية قبل الإطلاق، مباشرة
                إلى بريدك الإلكتروني.
              </p>

              <form className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="h-12 flex-1 rounded-none border-foreground/20 bg-card/85 px-4 text-right"
                />

                <Button
                  type="submit"
                  size="lg"
                  className="h-12 rounded-none border border-primary/40 px-8 text-xs tracking-[0.24em] uppercase"
                >
                  اشترك الآن
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default Newsletter;
