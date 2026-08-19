"use client";

// import { updateCountry } from "@/app/admin/actions";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Mail, MapPin, Phone } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ICountry } from "../types";
import z from "zod";
import { Button } from "@/components/ui/button";

interface ContactFormProps {
  country: Partial<ICountry>;
}
const schema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  contactNumber: z.string().min(1, "رقم الهاتف مطلوب"),
  address: z.string().min(1, "العنوان مطلوب"),
});
type CountrySchema = z.infer<typeof schema>;
export function ContactForm({ country }: ContactFormProps) {
  const form = useForm<CountrySchema>({
    defaultValues: {
      email: country.email ?? "",
      contactNumber: country.contactNumber ?? "",
      address: country.address ?? "",
    },
  });

  async function onSubmit(data: CountrySchema) {
    const id = toast.loading("جارٍ حفظ إعدادات الاتصال...");

    try {
      if (!country.id) {
        toast.error("معرف البلد غير موجود", { id });
        return;
      }

      //   const result = await updateCountry(country.id, data);
      const result = {
        success: true,
        message: "تم حفظ إعدادات الاتصال بنجاح",
      };

      if (!result.success) {
        toast.error(result.message || "حدث خطأ أثناء حفظ إعدادات الاتصال", {
          id,
        });
        return;
      }

      toast.success(result.message || "تم حفظ إعدادات الاتصال بنجاح", { id });
    } catch {
      toast.error("حدث خطأ غير متوقع", { id });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>بيانات الاتصال</CardTitle>

        <CardDescription>كيف يمكن للعملاء الوصول إليك</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          dir="rtl"
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-2">
                <FieldLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>البريد الإلكتروني للارتباط</span>
                </FieldLabel>

                <FieldContent>
                  <Input
                    type="email"
                    placeholder="info@example.com"
                    {...field}
                  />
                </FieldContent>

                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="contactNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-2">
                <FieldLabel className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>رقم الهاتف</span>
                </FieldLabel>

                <FieldContent>
                  <Input type="tel" placeholder="0123456789" {...field} />
                </FieldContent>

                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-2">
                <FieldLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>العنوان الرئيسي</span>
                </FieldLabel>

                <FieldContent>
                  <Textarea
                    placeholder="أدخل عنوان المقر الرئيسي..."
                    {...field}
                  />
                </FieldContent>

                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="default"
              className="w-full sm:w-auto"
            >
              حفظ التغييرات
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
