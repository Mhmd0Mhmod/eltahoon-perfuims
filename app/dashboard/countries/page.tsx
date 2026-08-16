import AddCountryForm from "@/components/admin/countries/AddCountryForm";
import CountryCard from "@/components/admin/countries/CountryCard";
import StatsSkeleton from "@/components/shared/stats-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CountryAPI } from "@/lib/api/country";
import { Country } from "@/types/country";
import { CheckCircle2, Globe, Plus, Search, XCircle } from "lucide-react";
import { Suspense } from "react";

async function StatsCards() {
  const countries = await CountryAPI.getAdminCountriesServer();
  const activeCountries = countries.filter((c: Country) => c.isActive).length;
  const inactiveCountries = countries.filter((c: Country) => !c.isActive).length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي الدول</CardTitle>
          <Globe className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{countries.length}</div>
          <p className="text-muted-foreground text-xs">جميع الدول المسجلة</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الدول النشطة</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCountries}</div>
          <p className="text-muted-foreground text-xs">متاحة للشحن</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الدول غير النشطة</CardTitle>
          <XCircle className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inactiveCountries}</div>
          <p className="text-muted-foreground text-xs">غير متاحة حالياً</p>
        </CardContent>
      </Card>
    </div>
  );
}

function CountriesListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 flex-1" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function CountriesList() {
  const countries = await CountryAPI.getAdminCountriesServer();

  return (
    <>
      {/* Countries Grid */}
      {countries.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <Globe className="text-muted-foreground h-16 w-16" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">لا توجد دول مسجلة</h3>
              <p className="text-muted-foreground mt-1 text-sm">ابدأ بإضافة دولة جديدة</p>
            </div>
            <Button className="mt-2 gap-2">
              <Plus className="h-4 w-4" />
              إضافة دولة
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}

function page() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Stats Cards */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsCards />
      </Suspense>

      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="text-right">
          <h1 className="text-2xl font-bold">قائمة الدول</h1>
          <p className="text-muted-foreground text-sm">إدارة وعرض جميع الدول المتاحة للشحن</p>
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="ابحث عن دولة..." className="pr-10" />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                إضافة دولة
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة دولة جديدة إلى قائمة الدول المتاحة للشحن</DialogTitle>
              </DialogHeader>
              <AddCountryForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Countries List */}
      <Suspense fallback={<CountriesListSkeleton />}>
        <CountriesList />
      </Suspense>
    </div>
  );
}
export default page;
