"use client";
import AlertDialog from "@/components/AlertDialog";
import FormatCurrency from "@/components/FormatCurrency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PagiedTableDashboardPage from "@/features/dashboard/layout/PagiedTableDashboardPage";
import VariantsPopover from "@/features/products/components/VariantsPopover";
import { getAdminProducts } from "@/features/products/services";
import { IProduct } from "@/features/products/types";
import { Column } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Package, PackageCheck, PackageX, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { toast } from "sonner";
import { deleteProduct } from "../actions";

function ProductsPage() {
  const { mutate } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: deleteProduct,
    onSuccess: (data, _, __, context) => {
      if (data.success) {
        toast.success(data.message || "تم حذف المنتج بنجاح");
        context.client.invalidateQueries({
          queryKey: ["products"],
        });
      } else {
        toast.error(data.message || "حدث خطأ أثناء حذف المنتج");
      }
    },
  });
  const columns: Column<IProduct>[] = useMemo(
    () => [
      {
        title: "#",
        render(row) {
          return (
            <div className="relative h-12 w-12 overflow-hidden rounded-md">
              <Image
                src={row.imageUrl}
                alt={row.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          );
        },
      },
      {
        header: "name",
        title: "المنتج",
        render(row) {
          return (
            <Button variant="link" className="p-0 text-left">
              <Link href={row.id.toString()}>{row.name}</Link>
            </Button>
          );
        },
      },
      {
        header: "categories",
        title: "التصنيف",
        render(row) {
          return (
            <div className="flex max-w-50 flex-wrap gap-1">
              {row.categories && row.categories.length > 0 ? (
                row.categories.slice(0, 2).map((cat) => (
                  <Badge variant="outline" key={cat.id} className="text-xs">
                    {cat.name}
                  </Badge>
                ))
              ) : (
                <Badge variant="secondary" className="text-xs">
                  بدون تصنيف
                </Badge>
              )}
              {row.categories && row.categories.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{row.categories.length - 2}
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        header: "variants",
        title: "النوع",
        render(row) {
          return row.variants && row.variants.length > 0 ? (
            <VariantsPopover
              variants={row.variants}
              currency={row.countryCode}
            />
          ) : (
            <Badge variant="secondary">لا يوجد أحجام</Badge>
          );
        },
      },
      {
        header: "variants",
        title: "السعر",
        render(row) {
          const minPrice = Math.min(...row.variants.map((v) => v.newPrice));
          const maxPrice = Math.max(...row.variants.map((v) => v.newPrice));
          return row.variants && row.variants.length > 0 ? (
            <div className="flex items-center gap-1 font-medium">
              <span>
                <FormatCurrency
                  value={Math.min(...row.variants.map((v) => v.newPrice))}
                  marketKey={row.countryCode}
                />
              </span>
              {minPrice !== maxPrice && (
                <>
                  <span className="text-muted-foreground">-</span>
                  <span>
                    <FormatCurrency
                      value={Math.max(...row.variants.map((v) => v.newPrice))}
                      marketKey={row.countryCode}
                    />
                  </span>
                </>
              )}
            </div>
          ) : (
            <Badge variant="secondary" className="text-xs">
              غير محدد
            </Badge>
          );
        },
      },
      {
        header: "createdAt",
        title: "تاريخ الإضافة",
        valueFormatter(value) {
          return format(value.createdAt, "dd/MM/yyyy");
        },
      },
      {
        title: "الإجراءات",
        render(row) {
          return (
            <div className="flex items-center gap-2">
              <Link href={`products/${row.id}`} className="text-xs">
                <Button variant={"outline"}>
                  <Pencil />
                </Button>
              </Link>
              <AlertDialog
                title={`حذف المنتج ${row.name}`}
                description="هل أنت متأكد من حذف هذا المنتج؟"
                onConfirm={() => mutate(row.id)}
                triggerVariant="destructive"
                actionButtonText="حذف"
              />
            </div>
          );
        },
      },
    ],
    [],
  );
  return (
    <PagiedTableDashboardPage<IProduct>
      title="المنتجات"
      description="إدارة جميع المنتجات والباقات"
      table={{
        title: "قائمة المنتجات",
        description: "عرض وإدارة جميع المنتجات",
      }}
      columns={columns}
      queryKey={["products"]}
      queryFn={getAdminProducts}
      stats={[
        {
          title: "إجمالي المنتجات",
          value: 0,
          description: "جميع المنتجات والباقات",
          icon: <Package />,
        },
        {
          title: "المنتجات المتوفرة",
          value: 0,
          description: "منتجات متاحة للشراء",
          icon: <PackageCheck />,
        },
        {
          title: "منتجات غير متوفرة",
          value: 0,
          description: "منتجات غير متاحة حالياً",
          icon: <PackageX />,
        },
      ]}
      form={{
        to: "products/new",
        title: "إضافة منتج جديد",
      }}
      emptyState={
        <div className="flex flex-col items-center justify-center py-12">
          <Package className="text-muted-foreground mb-4 h-12 w-12" />
          <h3 className="text-lg font-semibold">لا توجد منتجات</h3>
          <p className="text-muted-foreground text-sm">ابدأ بإضافة منتج جديد</p>
        </div>
      }
    />
  );
}

export default ProductsPage;
