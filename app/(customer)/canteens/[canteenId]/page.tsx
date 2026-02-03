/**
 * Canteen Detail Page
 * Display canteen information and menu
 */

"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { CanteenDetailHeader } from "@/components/canteen";
import { MenuList } from "@/components/menu";
import { MenuListSkeleton } from "@/components/menu/menu-list-skeleton";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCanteen, useCanteenMenu } from "@/hooks/use-canteens";

interface CanteenDetailPageProps {
  params: Promise<{
    canteenId: string;
  }>;
}

export default function CanteenDetailPage({ params }: CanteenDetailPageProps) {
  const { canteenId } = use(params);
  const {
    data: canteen,
    isLoading: isLoadingCanteen,
    error: canteenError,
  } = useCanteen(canteenId);
  const {
    data: menuItems,
    isLoading: isLoadingMenu,
    error: menuError,
  } = useCanteenMenu(canteenId);

  // Loading state for canteen info
  if (isLoadingCanteen) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-10 w-32 mb-6" />
        <Skeleton className="h-[400px] w-full mb-8" />
      </div>
    );
  }

  // Error state for canteen info
  if (canteenError) {
    return (
      <div className="container mx-auto p-6">
        <Link href="/canteens">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Canteens
          </Button>
        </Link>
        <Alert variant="destructive">
          <p className="font-semibold">Failed to load canteen</p>
          <p className="text-sm mt-1">{canteenError.message}</p>
        </Alert>
      </div>
    );
  }

  // Canteen not found
  if (!canteen) {
    return (
      <div className="container mx-auto p-6">
        <Link href="/canteens">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Canteens
          </Button>
        </Link>
        <Alert>
          <p className="font-semibold">Canteen not found</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Back button */}
      <Link href="/canteens">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Canteens
        </Button>
      </Link>

      {/* Canteen Info */}
      <CanteenDetailHeader canteen={canteen} className="mb-8" />

      <Separator className="my-8" />

      {/* Menu Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Menu</h2>

        {/* Loading state for menu */}
        {isLoadingMenu && <MenuListSkeleton count={6} />}

        {/* Error state for menu */}
        {menuError && (
          <Alert variant="destructive">
            <p className="font-semibold">Failed to load menu</p>
            <p className="text-sm mt-1">{menuError.message}</p>
          </Alert>
        )}

        {/* Menu items - empty state handled by MenuList component */}
        {!isLoadingMenu && !menuError && <MenuList items={menuItems || []} />}
      </div>
    </div>
  );
}
