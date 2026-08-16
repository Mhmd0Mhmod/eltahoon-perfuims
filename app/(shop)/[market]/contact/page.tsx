import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-right">
        <h1 className="mb-2 text-4xl font-bold">اتصل بنا</h1>
        <p className="text-muted-foreground mb-8">Contact Us</p>

        <Separator className="mb-8" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <h2 className="mb-6 text-2xl font-semibold">أرسل لنا رسالة</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="block text-right">
                  الاسم
                </Label>
                <Input
                  id="name"
                  placeholder="أدخل اسمك الكامل"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="block text-right">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="block text-right">
                  رقم الهاتف
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+966 XX XXX XXXX"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="block text-right">
                  الموضوع
                </Label>
                <Input
                  id="subject"
                  placeholder="موضوع الرسالة"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="block text-right">
                  الرسالة
                </Label>
                <Textarea
                  id="message"
                  placeholder="اكتب رسالتك هنا..."
                  className="min-h-[150px] text-right"
                />
              </div>

              <Button type="submit" className="w-full">
                إرسال الرسالة
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2">
            <h2 className="mb-6 text-2xl font-semibold">معلومات التواصل</h2>
            <div className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-6">
                <div className="mb-4 flex items-start gap-4">
                  <MapPin className="text-primary mt-1 h-6 w-6 shrink-0" />
                  <div className="flex-1 text-right">
                    <h3 className="mb-1 font-semibold">العنوان</h3>
                    {/* <p className="text-muted-foreground">{country?.name}</p> */}
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="mb-4 flex items-start gap-4">
                  <Phone className="text-primary mt-1 h-6 w-6 shrink-0" />
                  <div className="flex-1 text-right">
                    <h3 className="mb-1 font-semibold">الهاتف</h3>
                    {/* <a
                      href={`tel:${country?.contactNumber}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      dir="ltr"
                    >
                      {country?.contactNumber}
                    </a> */}
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="mb-4 flex items-start gap-4">
                  <Mail className="text-primary mt-1 h-6 w-6 shrink-0" />
                  <div className="flex-1 text-right">
                    <h3 className="mb-1 font-semibold">البريد الإلكتروني</h3>
                    {/* <a
                      href={`mailto:${country?.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      dir="ltr"
                    >
                      {country?.email}
                    </a> */}
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex items-start gap-4">
                  <MessageCircle className="text-primary mt-1 h-6 w-6 shrink-0" />
                  <div className="flex-1 text-right">
                    <h3 className="mb-1 font-semibold">واتساب</h3>
                    <p className="text-muted-foreground">
                      متاح على مدار الساعة
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="mb-3 font-semibold">أوقات العمل</h3>
                <div className="text-muted-foreground space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>السبت - الخميس</span>
                    <span dir="ltr">9:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الجمعة</span>
                    <span dir="ltr">2:00 PM - 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
