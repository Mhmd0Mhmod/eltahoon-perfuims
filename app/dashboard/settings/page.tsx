import { ContactForm } from "@/components/admin/settings/ContactForm";
import { SocialMediaForm } from "@/components/admin/settings/SocialMediaForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CountryAPI } from "@/lib/api/country";
import { Site } from "@/lib/api/site";
import { Globe, Phone } from "lucide-react";

export default async function AdminSettingsPage() {
  const [country, socialMedia] = await Promise.all([
    CountryAPI.getCurrentCountryServer(),
    Site.getSiteSocialMedia(),
  ]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">إعدادات النظام</h2>
      </div>

      <div className="grid gap-4">
        <Tabs defaultValue="contact" className="w-full">
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
            <ContactForm country={country!} />
          </TabsContent>

          <TabsContent value="social" className="mt-4">
            <SocialMediaForm initialData={socialMedia} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
