import SettingsForm from "@/features/settings/components/SettingsForm";

export default async function AdminSettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">إعدادات النظام</h2>
      </div>

      <SettingsForm socialMedia={{}} />
    </div>
  );
}
