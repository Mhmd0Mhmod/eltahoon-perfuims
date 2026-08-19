"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { markets } from "@/config/markets";
import useCookies from "@/hooks/useCookies";
import { Globe, Phone } from "lucide-react";
import { SocialMediaForm } from "./SocialMediaForm";
import { ContactForm } from "./ContactForm";

interface SettingsFormProps {
  socialMedia: any;
}

export default function SettingsForm({ socialMedia }: SettingsFormProps) {
  const { getCookie } = useCookies();
  const countryCode = getCookie("country_code");
  const country = markets[countryCode as keyof typeof markets] || markets["eg"];
  return (
    <Tabs
      defaultValue="contact"
      className="w-full flex flex-col"
      orientation="horizontal"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="contact" className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>اتصال البلد الحالي</span>
        </TabsTrigger>

        <TabsTrigger value="social" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>التواصل الاجتماعي</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="contact" className="mt-4">
        <ContactForm country={country} />
      </TabsContent>

      <TabsContent value="social" className="mt-4">
        <SocialMediaForm initialData={socialMedia} />
      </TabsContent>
    </Tabs>
  );
}
