import { Input } from './input'
import { formatCurrency } from '@/utilities/helpers/formatCurrency'
import { formatTime } from '@/utilities/helpers/time-formatter'
import { Button } from './button'
import { Badge } from './badge'
import { Textarea } from './text-area'
import { toast } from 'sonner'
import { useState } from 'react'
import { ReloadAfter } from '@/utilities/helpers/reload'

export default function ManageFxComponent({ data, token }: { data: any, token: string }) {

    const [loading, setLoading] = useState(false)

    const handleSendFx = async () => {
        setLoading(true)
        const payload = data;
        const res = await fetch(`/api/v1/fx/send-fx-bids`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-pol-rfx-secret": token,
            },
            body: JSON.stringify(payload)
        });

        const responseMessage = await res.json();

        if (res) {
            toast.success(responseMessage?.message)
            setLoading(false)
            ReloadAfter(2000)
        } else {
            toast.error(responseMessage?.message)
            setLoading(false)
        }
    };

  return (
      <>
          <div
              className="flex flex-col bg-slate-100 dark:bg-natural gap-x-4 ml-24 w-[calc(100%-7rem)] p-8 mt-24 mb-8 h-full rounded-2xl"
          >
              <div className="flex flex-row gap-8 text-foreground">
                  <div className="w-full">
                      <h1 className="text-xl font-bold mb-4">Manage Fx Bid</h1>
                      <div className="flex flex-row space-x-4 w-full">
                          <div className="w-3/5">
                              <h2 className="font-semibold">General information</h2>
                              <div className="flex flex-col my-8 gap-y-4">
                                  <div className="flex justify-between gap-x-4 w-full">
                                      <span className="w-1/2">
                                          <label
                                              htmlFor="title"
                                              className="block text-sm font-medium text-gray-500">Title</label
                                          >
                                          <Textarea
                                              className="text-foreground font-medium text-lg w-full border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                              defaultValue={data?.fx?.title}
                                              readOnly
                                          />
                                      </span>
                                      <span className="w-1/2">
                                          <label
                                              htmlFor="title"
                                              className="block text-sm font-medium text-gray-500"
                                          >Amount</label
                                          >
                                          <Input
                                              className="text-foreground font-medium text-lg w-full"
                                              defaultValue={data?.fx?.currency.toUpperCase() +
                                                  " " +
                                                  formatCurrency(Number(data?.fx?.amount))}
                                              readOnly
                                          />
                                      </span>
                                  </div>

                                  <div className="flex justify-between gap-x-4 w-full">
                                      <span className="w-1/2">
                                          <label
                                              htmlFor="title"
                                              className="block text-sm font-medium text-gray-500"
                                          >Start Time</label
                                          >
                                          <Input
                                              className="text-foreground font-medium text-lg w-full"
                                              defaultValue={formatTime(data?.fx?.startTime)}
                                              readOnly
                                          />
                                      </span>
                                      <span className="w-1/2">
                                          <label
                                              htmlFor="title"
                                              className="block text-sm font-medium text-gray-500"
                                          >End Time</label
                                          >
                                          <Input
                                              className="text-foreground font-medium text-lg w-full"
                                              defaultValue={formatTime(data?.fx?.endTime)}
                                              readOnly
                                          />
                                      </span>
                                  </div>

                                  <div className="flex justify-between gap-x-4 w-full">
                                      <span className="w-1/2">
                                          <label
                                              htmlFor="title"
                                              className="block text-sm font-medium text-gray-500 pb-2"
                                          >Status</label
                                          >
                                          {
                                              data?.fx?.status === "pending" ? (
                                                  <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[14px] text-slate-200">
                                                      {data?.fx?.status}
                                                  </Badge>
                                              ) : data?.fx?.status === "sent" ? (
                                                  <Badge className="bg-primary hover:bg-primary px-4 text-[14px] text-slate-200">
                                                      {data?.fx?.status}
                                                  </Badge>
                                              ) : data?.fx?.status === "closed" ? (
                                                  <Badge className="bg-red-600 hover:bg-red-600 px-4 text-[14px] text-slate-200">
                                                      {data?.fx?.status}
                                                  </Badge>
                                              ) : data?.fx?.status === "open" ? (
                                                  <Badge className="bg-green-600 hover:bg-green-600 px-4 text-[14px] text-slate-200">
                                                      {data?.fx?.status}
                                                  </Badge>
                                              ) : (
                                                  <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[14px] text-slate-200">
                                                      {data?.fx?.status}
                                                  </Badge>
                                              )
                                          }
                                      </span>
                                      <span className="w-1/2">
                                          <label
                                              htmlFor="title"
                                              className="block text-sm font-medium text-gray-500"
                                          >Last updated</label
                                          >
                                          <Input
                                              className="text-foreground font-medium text-lg w-full"
                                              defaultValue={formatTime(data?.fx?.lastUpdatedDate)}
                                              readOnly
                                          />
                                      </span>
                                  </div>
                              </div>

                              <h2 className="font-semibold">Note</h2>
                              <div className="flex flex-col">
                                  <div className="flex justify-between gap-x-4 w-full">
                                      <span className="w-full">
                                          <Textarea
                                              className="text-foreground font-regular text-md w-full border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                              defaultValue={data?.fx?.note}
                                              rows={8}
                                              readOnly
                                          />
                                      </span>
                                  </div>
                              </div>
                          </div>
                          <div
                              className="flex flex-col justify-between w-2/5 bg-white dark:bg-background-color rounded-xl p-6"
                          >
                              <div className="w-full h-[85]">
                                  <h2 className="font-bold pb-4">Bidding recepients</h2>
                                  <div className="w-full relative overflow-y-auto h-[95%]">
                                      {
                                          data?.fx?.FxRecipients.map((item, idx) => (
                                              <div className="flex flex-col" key={idx}>
                                                  <p className="text-sm font-medium py-1">
                                                      {item?.fxBidder?.firstName && item?.fxBidder?.lastName
                                                          ? item?.fxBidder?.firstName +
                                                          " " +
                                                          item?.fxBidder?.lastName
                                                          : "User Info Missing"}
                                                  </p>
                                              </div>
                                          ))
                                      }
                                  </div>
                              </div>
                              <div className="w-full flex max-h-[15] justify-end">
                                  <Button
                                      onClick={handleSendFx}
                                      size="sm"
                                      className="flex px-12 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:text-white dark:hover:bg-green-700 flex-end"
                                      disabled={(data?.fx?.status !== 'pending') || loading}
                                      >
                                      Send
                                  </Button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}
