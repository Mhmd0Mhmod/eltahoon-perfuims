import { Separator } from "@/components/ui/separator";
import { FileText, ShoppingCart, CreditCard, RotateCcw, AlertTriangle, Scale } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="text-right">
        <h1 className="mb-2 text-4xl font-bold">الشروط والأحكام</h1>
        <p className="text-muted-foreground mb-8">Terms & Conditions</p>

        <Separator className="mb-8" />

        <div className="space-y-8">
          <section>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              مرحباً بك في مؤسسه طاحون - المسك للعطور. باستخدامك لهذا الموقع والشراء منه، فإنك توافق
              على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل إتمام أي عملية شراء.
            </p>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <FileText className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">الشروط العامة</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>يجب أن يكون عمر المستخدم 18 عاماً على الأقل للشراء من الموقع</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>جميع المعلومات المقدمة يجب أن تكون صحيحة ودقيقة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>أنت مسؤول عن الحفاظ على سرية حسابك وكلمة المرور</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>نحتفظ بالحق في رفض الخدمة لأي شخص لأي سبب في أي وقت</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <ShoppingCart className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">الطلبات والأسعار</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>جميع الأسعار معروضة بالريال السعودي وتشمل ضريبة القيمة المضافة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>نحتفظ بالحق في تغيير الأسعار دون إشعار مسبق</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>يتم تأكيد الطلب بعد استلام الدفع بنجاح</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>نحتفظ بالحق في إلغاء أي طلب في حالة عدم توفر المنتج</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>الحد الأدنى للطلب: لا يوجد حد أدنى</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>لا يمكن تعديل أو إلغاء الطلب بعد تأكيده</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <CreditCard className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">الدفع</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    نقبل الدفع عبر البطاقات الائتمانية، مدى، Apple Pay، والدفع عند الاستلام
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>جميع المعاملات آمنة ومشفرة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>يتم معالجة الدفع فوراً عند تأكيد الطلب</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>في حالة الدفع عند الاستلام، يجب دفع المبلغ الكامل للمندوب</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>لا نخزن معلومات بطاقتك الائتمانية على خوادمنا</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <RotateCcw className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">الاسترجاع والاستبدال</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>يمكن إرجاع المنتجات غير المفتوحة خلال 14 يوم</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>يجب أن تكون المنتجات في حالتها الأصلية مع التغليف</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>استبدال المنتجات التالفة أو المعيبة مجاناً</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>يتم استرداد المبلغ بنفس طريقة الدفع الأصلية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    للمزيد من التفاصيل، راجع{" "}
                    <a href="/returns" className="text-primary hover:underline">
                      سياسة الاسترجاع
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <AlertTriangle className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">ضمان المنتجات</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>جميع منتجاتنا أصلية 100% من مصادر معتمدة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>نضمن جودة المنتجات عند التسليم</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>لا نتحمل مسؤولية سوء الاستخدام أو التخزين غير الصحيح</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>العطور قد تختلف رائحتها قليلاً حسب كيمياء الجسم</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>الصور المعروضة قد تختلف قليلاً عن المنتج الفعلي</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <Scale className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">حدود المسؤولية</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>لا نتحمل المسؤولية عن أي ردود فعل تحسسية للمنتجات</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>يُنصح بإجراء اختبار حساسية قبل الاستخدام الكامل</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>لا نتحمل مسؤولية التأخير في الشحن بسبب ظروف خارجة عن إرادتنا</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>مسؤوليتنا القصوى محدودة بقيمة المنتج المشترى</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">الملكية الفكرية</h2>
            <div className="bg-muted/30 rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                جميع المحتويات على هذا الموقع، بما في ذلك النصوص والصور والشعارات والتصاميم، محمية
                بموجب حقوق الملكية الفكرية. يُحظر استخدام أي محتوى دون إذن كتابي مسبق.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">القانون المطبق</h2>
            <div className="bg-muted/30 rounded-lg p-6">
              <p className="text-muted-foreground">
                تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية. أي نزاع ينشأ عن أو يتعلق
                بهذه الشروط يخضع للاختصاص الحصري لمحاكم المملكة العربية السعودية.
              </p>
            </div>
          </section>

          <section className="bg-primary/10 rounded-lg p-6">
            <h3 className="mb-3 font-semibold">تحديثات الشروط</h3>
            <p className="text-muted-foreground">
              نحتفظ بالحق في تحديث هذه الشروط والأحكام في أي وقت. استمرارك في استخدام الموقع بعد أي
              تغييرات يعتبر موافقة منك على الشروط المعدلة.
            </p>
            <p className="text-muted-foreground mt-3">
              <strong>آخر تحديث:</strong> {new Date().toLocaleDateString("ar-SA")}
            </p>
          </section>

          <section className="text-center">
            <p className="text-muted-foreground">
              للأسئلة أو الاستفسارات حول الشروط والأحكام، يرجى{" "}
              <a href="/contact" className="text-primary hover:underline">
                التواصل معنا
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
