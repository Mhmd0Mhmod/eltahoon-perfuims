import { getCookies } from "@/app/actions";
import AddProductForm from "@/components/admin/products/AddProductForm";
import { ProductActionsMenu } from "@/components/admin/products/ProductActionsMenu";
import { VariantsPopover } from "@/components/admin/products/VariantsPopover";
import { PaginationServer } from "@/components/shared/pagination";
import SearchInput from "@/components/shared/search-input";
import StatsSkeleton from "@/components/shared/stats-skeleton";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryAPI } from "@/lib/api/category";
import { ProductAPI } from "@/lib/api/product";
import { SizeAPI } from "@/lib/api/size";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Category } from "@/types/category";
import { Pageable } from "@/types/pageable";
import { ProdcutSearchParams, Product } from "@/types/product";
import { Size } from "@/types/size";
import { Package, PackageCheck, PackageX, Plus, Search } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

async function AddProductFormButton() {
  const [categories, sizes] = await Promise.all([
    CategoryAPI.getAdminCategories(),
    SizeAPI.getAdminSizes(),
  ]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          إضافة منتج
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogClose />
        <DialogHeader>
          <DialogTitle>إضافة منتج جديد</DialogTitle>
          <DialogDescription>
            أدخل بيانات المنتج الجديد هنا. انقر حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>

        <AddProductForm categories={categories} sizes={sizes} />
      </DialogContent>
    </Dialog>
  );
}
async function ProductsPage({ searchParams }: { searchParams: Promise<ProdcutSearchParams> }) {
  const params = await searchParams;
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">المنتجات</h1>
          <p className="text-muted-foreground">إدارة جميع المنتجات والباقات</p>
        </div>
        <AddProductFormButton />
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsSkeleton length={3} />}>
        <ProductStatsCards />
      </Suspense>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="text-right">
              <CardTitle className="text-2xl font-bold">قائمة المنتجات</CardTitle>
              <CardDescription>عرض وإدارة جميع المنتجات</CardDescription>
            </div>
            <SearchInput />
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableSkeleton columns={6} rows={8} />}
            key={Object.values(params).toString()}
          >
            <ProductsTable searchParams={params} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function ProductStatsCards() {
  const data = (await ProductAPI.getAdminProducts()) as Pageable<Product>;
  const products = data.content;
  const totalProducts = data.totalElements;
  const availableProducts = products.filter((p) => p.variants?.some((v) => v.isAvailable)).length;
  const unavailableProducts = totalProducts - availableProducts;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
          <Package className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-muted-foreground text-xs">جميع المنتجات والباقات</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">المنتجات المتوفرة</CardTitle>
          <PackageCheck className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{availableProducts}</div>
          <p className="text-muted-foreground text-xs">منتجات متاحة للشراء</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">منتجات غير متوفرة</CardTitle>
          <PackageX className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unavailableProducts}</div>
          <p className="text-muted-foreground text-xs">منتجات غير متاحة حالياً</p>
        </CardContent>
      </Card>
    </div>
  );
}

async function ProductsTable({ searchParams }: { searchParams: ProdcutSearchParams }) {
  const data = (await ProductAPI.getAdminProducts({
    categoryIds: searchParams.categoryIds?.split(",") || [],
    offerIds: searchParams.offerIds?.split(",") || [],
    searchTerm: searchParams.q,
    page: searchParams.page,
    displayAll: false,
  })) as Pageable<Product>;
  const products = data.content;
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Package className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="text-lg font-semibold">لا توجد منتجات</h3>
        <p className="text-muted-foreground text-sm">ابدأ بإضافة منتج جديد</p>
      </div>
    );
  }
  const [categories, sizes] = await Promise.all([
    CategoryAPI.getAdminCategories(),
    SizeAPI.getAdminSizes(),
  ]);
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">المنتج</TableHead>
              <TableHead className="text-right">التصنيف</TableHead>
              <TableHead className="text-right">النوع</TableHead>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">تاريخ الإضافة</TableHead>
              <TableHead className="text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                categories={categories}
                sizes={sizes}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationServer
        totalPages={data.totalPages}
        currentPage={data.page}
        searchParams={searchParams}
      />
    </div>
  );
}

function ProductTableRow({
  product,
  categories,
  sizes,
}: {
  product: Product;
  categories: Category[];
  sizes: Size[];
}) {
  const minPrice = Math.min(...product.variants.map((v) => v.newPrice));
  const maxPrice = Math.max(...product.variants.map((v) => v.newPrice));
  return (
    <TableRow key={product.id}>
      <TableCell className="max-w-50 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
            <Image
              src={product.imageUrl || "/assets/logo.png"}
              alt={product.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 text-right">
            <p className="truncate font-medium">{product.name}</p>
            <p className="text-muted-foreground truncate text-xs">{product.description}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex max-w-50 flex-wrap gap-1">
          {product.categories && product.categories.length > 0 ? (
            product.categories.slice(0, 2).map((cat) => (
              <Badge variant="outline" key={cat.id} className="text-xs">
                {cat.name}
              </Badge>
            ))
          ) : (
            <Badge variant="secondary" className="text-xs">
              بدون تصنيف
            </Badge>
          )}
          {product.categories && product.categories.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{product.categories.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="text-right">
        {product.variants && product.variants.length > 0 ? (
          <VariantsPopover countryCode={product.countryCode} variants={product.variants} />
        ) : (
          <Badge variant="secondary">لا يوجد أحجام</Badge>
        )}
      </TableCell>
      <TableCell className="text-right">
        {product.variants && product.variants.length > 0 ? (
          <div className="flex items-center gap-1 font-medium">
            <span>
              {formatCurrency({
                amount: minPrice,
                code: product.countryCode,
              })}
            </span>
            {minPrice !== maxPrice && (
              <>
                <span className="text-muted-foreground">-</span>
                <span>
                  {formatCurrency({
                    amount: maxPrice,
                    code: product.countryCode,
                  })}
                </span>
              </>
            )}
          </div>
        ) : (
          <Badge variant="secondary" className="text-xs">
            غير محدد
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-muted-foreground text-right text-sm">
        {formatDate(product.createdAt)}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          <ProductActionsMenu product={product} categories={categories} sizes={sizes} />
        </div>
      </TableCell>
    </TableRow>
  );
}
export default ProductsPage;
