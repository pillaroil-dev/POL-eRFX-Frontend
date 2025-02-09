import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "./sheet";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { actions } from "astro:actions";
import { ReloadAfter } from "@/utilities/helpers/reload";
import { ChevronRight } from "lucide-react";

export function VendorStatSheet({
  title,
  data,
  role,
  companyName
}: {
  title: string;
  data: any[];
  role?: string;
  companyName?: string
}) {
  const [open, setOpen] = useState(false);

  function memberData() {
    return (
      <>
        <div className="flex flex-col gap-2 pt-8">
          {data.length === 0 && (
            <span className="text-center text-muted-foreground">
              No members found
            </span>
          )}
          {data &&
            data?.map((item: any) => (
              <div
                key={item?.id}
                className="bg-background border border-input rounded-lg p-4 mb-4"
              >
                <h3 className="font-semibold text-lg mb-1 text-foreground">
                  {item?.fullname}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-sm text-muted-foreground">
                    Email: {item?.email}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    User ID: {`PUID` + item?.userId}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Phone: {item?.phone}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Address: {item?.address}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  }

  function tenderData() {
    return (
      <>
        <div className="flex flex-col gap-2 pt-8">
          {data.length === 0 && (
            <span className="text-center text-muted-foreground">
              No tender found
            </span>
          )}

          {data.map((item, index) =>  <div className="bg-background border border-input rounded-lg p-4 mb-4 relative" key={item?.id}>
            <span className="absolute bottom-4 right-4 text-primary/70 text-xs">{`#${index + 1}`}</span>
            <h1 className="font-semibold text-sm mb-1 text-foreground">{item?.tender?.title}</h1>
            <span className="text-sm text-muted-foreground">{item?.tender?.description}</span>
            <div className="grid grid-cols-2 gap-2 pt-4">
              <span className="text-sm text-muted-foreground">
                Tender ID: {`PTID${item?.tenderId}`}
              </span>
              <span className="text-sm text-muted-foreground">
                Location: {item?.tender.location}
              </span>
              <span className="text-sm text-muted-foreground">
                Start Date: {new Date(item?.tender.startDate).toLocaleString('en-GB', { day: 'numeric', month: '2-digit', year: 'numeric' }).split(' ').join('/')}
              </span>
              <span className="text-sm text-muted-foreground">
                End Date: {new Date(item?.tender.endDate).toLocaleString('en-GB', { day: 'numeric', month: '2-digit', year: 'numeric' }).split(' ').join('/')}
              </span>
              <span className="text-sm text-muted-foreground capitalize">
                Status: {item?.status === "open" ? (
                  <span className="text-green-600 font-semibold">{item?.status}</span>
                ) : item?.status === "closed" ? (
                  <span className="text-red-600 font-semibold">{item?.status}</span>
                ) : item?.status === "sent" ? (
                  <span className="text-primary font-semibold">{item?.status}</span>
                ) : (
                  <span className="font-semibold">{item?.status ?? "Pending"}</span>
                )}
              </span>
              <span className="text-sm text-muted-foreground capitalize">
                Bid Order: {item?.bidOrder === "accepted" ? (
                  <span className="text-green-600 font-semibold">{item?.bidOrder}</span>
                ) : item?.bidOrder === "rejected" ? (
                  <span className="text-red-600 font-semibold">{item?.bidOrder}</span>
                ) : item?.bidOrder === "placed" ? (
                  <span className="text-primary font-semibold">{item?.bidOrder}</span>
                ) : (
                  <span className="font-semibold">{item?.bidOrder ?? "Not Placed"}</span>
                )}
              </span>
            </div>
            <div className="mt-4 flex">
              <a href={`/u/${role}/tenders/manage/${item?.tenderId}`} className="flex items-center text-primary font-semibold text-sm cursor-pointer group">
                Manage
                <ChevronRight className="w-4 h-4 ml-2 hidden group-hover:flex mt-1" />
              </a>
            </div>
          </div>)}
        </div>
      </>
    );
  }

  function renderData() {
    if (title === "Members") {
      return memberData();
    } else {
      return tenderData();
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <span className="mt-4 text-primary font-bold cursor-pointer">View</span>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{companyName}</SheetTitle>
          <SheetDescription>{title + " List"}</SheetDescription>
        </SheetHeader>
        <div className="w-full h-auto overflow-auto">{renderData()}</div>
      </SheetContent>
    </Sheet>
  );
}
