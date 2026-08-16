import { Separator } from "@/components/ui/separator";
import { RotateCcw, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="text-right">
        <h1 className="mb-2 text-4xl font-bold">سياسة الاسترجاع</h1>
        <p className="text-muted-foreground mb-8">Return Policy</p>

        <Separator className="mb-8" />

        <div className="space-y-8">
          <section>
            <div className="mb-4 flex items-center gap-3">
              <RotateCcw className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">شروط الاسترجاع</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                نحن نقدر رضاك التام عن منتجاتنا. يمكنك إرجاع المنتجات وفقاً للشروط التالية:
              </p>
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>يجب أن يكون المنتج في حالته الأصلية وغير مستخدم</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>يجب أن تكون العبوة والغلاف الأصلي سليمين</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>مدة الاسترجاع: 14 يوم من تاريخ استلام المنتج</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>يجب توفر فاتورة الشراء الأصلية</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <XCircle className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-semibold">المنتجات غير القابلة للاسترجاع</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <span>العطور التي تم فتح عبوتها أو استخدامها</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <span>المنتجات التي تم طلبها خصيصاً للعميل</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <span>المنتجات المخفضة أو المباعة في التخفيضات الموسمية</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <span>المنتجات التي مضى على شرائها أكثر من 14 يوم</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <AlertCircle className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">كيفية إرجاع منتج</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <ol className="text-muted-foreground space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm">
                    1
                  </span>
                  <div>
                    <h3 className="text-foreground mb-1 font-semibold">تواصل معنا</h3>
                    <p>اتصل بخدمة العملاء أو أرسل طلب إرجاع عبر حسابك</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm">
                    2
                  </span>
                  <div>
                    <h3 className="text-foreground mb-1 font-semibold">احصل على رقم الإرجاع</h3>
                    <p>سنرسل لك رقم إرجاع وتعليمات التغليف</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm">
                    3
                  </span>
                  <div>
                    <h3 className="text-foreground mb-1 font-semibold">أعد تغليف المنتج</h3>
                    <p>غلف المنتج بعناية مع الفاتورة ورقم الإرجاع</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm">
                    4
                  </span>
                  <div>
                    <h3 className="text-foreground mb-1 font-semibold">أرسل المنتج</h3>
                    <p>سنرسل مندوباً لاستلام المنتج من عنوانك</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm">
                    5
                  </span>
                  <div>
                    <h3 className="text-foreground mb-1 font-semibold">استرداد المبلغ</h3>
                    <p>سيتم استرداد المبلغ خلال 5-7 أيام عمل بعد فحص المنتج</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">رسوم الإرجاع</h2>
            <div className="bg-muted/30 space-y-4 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">إرجاع بسبب عيب في المنتج</span>
                <span className="font-semibold text-green-600">مجاناً</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">إرجاع بسبب خطأ في الطلب من قبلنا</span>
                <span className="font-semibold text-green-600">مجاناً</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">إرجاع لأسباب شخصية</span>
                <span className="font-semibold">يتحمل العميل رسوم الشحن</span>
              </div>
            </div>
          </section>

          <section className="bg-primary/10 rounded-lg p-6">
            <h3 className="mb-3 font-semibold">ملاحظة هامة</h3>
            <p className="text-muted-foreground">
              في حال استلام منتج تالف أو معيب، يرجى عدم استخدامه والتواصل معنا فوراً. سنقوم
              باستبداله أو استرداد قيمته كاملة دون أي رسوم إضافية.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
