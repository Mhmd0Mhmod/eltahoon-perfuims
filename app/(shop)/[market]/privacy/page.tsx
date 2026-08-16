import { Separator } from "@/components/ui/separator";
import { Shield, Lock, Eye, Database, Users } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="text-right">
        <h1 className="mb-2 text-4xl font-bold">سياسة الخصوصية</h1>
        <p className="text-muted-foreground mb-8">Privacy Policy</p>

        <Separator className="mb-8" />

        <div className="space-y-8">
          <section>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              نحن في مؤسسه طاحون - المسك للعطور نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح
              هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام موقعنا الإلكتروني.
            </p>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <Database className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">المعلومات التي نجمعها</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="mb-3 font-semibold">المعلومات الشخصية:</h3>
              <ul className="text-muted-foreground mb-4 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>الاسم الكامل</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>عنوان البريد الإلكتروني</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>رقم الهاتف</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>عنوان الشحن والفوترة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>معلومات الدفع (مشفرة وآمنة)</span>
                </li>
              </ul>

              <Separator className="my-4" />

              <h3 className="mb-3 font-semibold">المعلومات التقنية:</h3>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>عنوان IP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>نوع المتصفح ونظام التشغيل</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>سجل التصفح داخل الموقع</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>ملفات تعريف الارتباط (Cookies)</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <Eye className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">كيف نستخدم معلوماتك</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>معالجة وإتمام الطلبات والمدفوعات</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>التواصل معك بخصوص طلباتك</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>تحسين تجربة التسوق وتخصيص المحتوى</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>إرسال عروض وتحديثات (بموافقتك فقط)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>منع الاحتيال وضمان أمان الموقع</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>الامتثال للمتطلبات القانونية</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <Lock className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">حماية بياناتك</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                نستخدم إجراءات أمنية صارمة لحماية معلوماتك الشخصية:
              </p>
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>تشفير SSL/TLS لجميع البيانات المنقولة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>تخزين آمن للبيانات في خوادم محمية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>الوصول المقيد للموظفين المصرح لهم فقط</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>مراجعة دورية للإجراءات الأمنية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>عدم تخزين معلومات بطاقات الائتمان الكاملة</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <Users className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">مشاركة المعلومات</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                لن نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط مع:
              </p>
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>شركات الشحن لتوصيل طلباتك</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>معالجي الدفع لإتمام المعاملات المالية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>مزودي الخدمات التقنية (تحت التزامات سرية صارمة)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>السلطات القانونية عند الضرورة القانونية</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <Shield className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">حقوقك</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>الحق في الوصول إلى بياناتك الشخصية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>الحق في تصحيح البيانات غير الدقيقة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>الحق في حذف بياناتك (وفقاً للقيود القانونية)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>الحق في الاعتراض على معالجة بياناتك</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>الحق في سحب الموافقة على تلقي رسائل تسويقية</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">ملفات تعريف الارتباط (Cookies)</h2>
            <div className="bg-muted/30 rounded-lg p-6">
              <p className="text-muted-foreground">
                نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتذكر تفضيلاتك. يمكنك التحكم في
                ملفات تعريف الارتباط من إعدادات متصفحك، لكن تعطيلها قد يؤثر على وظائف الموقع.
              </p>
            </div>
          </section>

          <section className="bg-primary/10 rounded-lg p-6">
            <h3 className="mb-3 font-semibold">تحديثات السياسة</h3>
            <p className="text-muted-foreground">
              قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة مع تحديث
              تاريخ السريان. نوصي بمراجعة هذه السياسة بانتظام.
            </p>
            <p className="text-muted-foreground mt-3">
              <strong>آخر تحديث:</strong> {new Date().toLocaleDateString("ar-SA")}
            </p>
          </section>

          <section className="text-center">
            <p className="text-muted-foreground">
              للأسئلة أو الاستفسارات حول سياسة الخصوصية، يرجى{" "}
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
