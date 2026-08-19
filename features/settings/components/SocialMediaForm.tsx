"use client";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { storeSettingsSchema, StoreSettingsSchema } from "../schema";
import { Button } from "@/components/ui/button";

interface SocialMediaFormProps {
  initialData: Partial<StoreSettingsSchema>;
}

export function SocialMediaForm({ initialData }: SocialMediaFormProps) {
  const form = useForm<StoreSettingsSchema>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: {
      facebookUrl: initialData.facebookUrl ?? "",
      instagramUrl: initialData.instagramUrl ?? "",
      twitterUrl: initialData.twitterUrl ?? "",
      whatsappNumber: initialData.whatsappNumber ?? "",
    },
  });

  async function onSubmit(data: StoreSettingsSchema) {
    const id = toast.loading("جارٍ حفظ إعدادات التواصل الاجتماعي...");

    try {
      //   const result = await updateStoreSettingsAction(data);
      const result = {
        success: true,
        message: "تم حفظ إعدادات التواصل الاجتماعي بنجاح",
      };
      if (!result.success) {
        toast.error(
          result.message || "حدث خطأ أثناء حفظ إعدادات التواصل الاجتماعي",
          { id },
        );
        return;
      }

      toast.success(
        result.message || "تم حفظ إعدادات التواصل الاجتماعي بنجاح",
        { id },
      );
    } catch {
      toast.error("حدث خطأ غير متوقع", { id });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>روابط التواصل الاجتماعي</CardTitle>
        <CardDescription>اربط متجرك بمنصات التواصل المختلفة</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          dir="rtl"
        >
          <Controller
            name="facebookUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-2">
                <FieldLabel className="flex items-center gap-2">
                  <FaFacebook className="h-4 w-4 text-blue-600" />
                  <span>رابط فيسبوك</span>
                </FieldLabel>

                <FieldContent>
                  <Input
                    placeholder="https://facebook.com/your-store"
                    {...field}
                  />
                </FieldContent>

                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="instagramUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-2">
                <FieldLabel className="flex items-center gap-2">
                  <FaInstagram className="h-4 w-4 text-pink-600" />
                  <span>رابط إنستغرام</span>
                </FieldLabel>

                <FieldContent>
                  <Input
                    placeholder="https://instagram.com/your-store"
                    {...field}
                  />
                </FieldContent>

                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="twitterUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-2">
                <FieldLabel className="flex items-center gap-2">
                  <FaTwitter className="h-4 w-4 text-blue-600" />
                  <span>رابط تويتر</span>
                </FieldLabel>

                <FieldContent>
                  <Input
                    placeholder="https://twitter.com/your-store"
                    {...field}
                  />
                </FieldContent>

                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="whatsappNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-2">
                <FieldLabel className="flex items-center gap-2">
                  <FaWhatsapp className="h-4 w-4 text-green-600" />
                  <span>رقم واتساب</span>
                </FieldLabel>

                <FieldContent>
                  <Input placeholder="مثال: 966123456789" {...field} />
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
