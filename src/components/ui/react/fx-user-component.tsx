import { useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { formatTime } from "@/utilities/helpers/time-formatter";
import { Box } from "lucide-react";
import { Badge } from "./badge";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ReloadAfter } from "@/utilities/helpers/reload";
import { formatCurrency } from "@/utilities/helpers/formatCurrency";

export default function FxUserComponent({ data, token }: { data: any[], token: string }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [fxData, setFxData] = useState<any>();
  const [fxAmount, setFxAmount] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const result = data?.find((item) => item?.id === selectedId);
    setFxData(result);
  }, [selectedId, data]);

  const sendFxBid = async () => {
    setLoading(true);
    const payload = {
      ...fxData,
      fxBidAmount: fxAmount,
    };
    const res = await fetch("/api/v1/fx/send-fx-user-bid", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-pol-rfx-secret": token,
      },
      body: JSON.stringify(payload),
    });
    const responseMessage = await res.json();

    if (res.status === 200) {
      toast.success(responseMessage.message);
      setLoading(false); 
      ReloadAfter(1500); //1.5 seconds
    } else {
      toast.error(responseMessage.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-x-4 ml-20 w-[calc(100%-5rem)] px-4 mt-24 mb-8 relative">
        <div className="flex relative">
          <div className="w-1/2 h-full flex flex-col py-8">
            <h1 className="font-semibold text-2xl text-foreground my-8">
              Latest Fx
            </h1>
            <div className="w-full bg-gray-50 dark:bg-natural text-foreground shadow rounded-lg p-4">
              {(!data.length) && (
                <h1 className="flex justify-center py-12">No Fx Item </h1>
              )}
              <ul>
                {/** Sort data in descending order **/}
                {data.slice().sort((a, b) => b.id - a.id).map((item) => (
                  <div
                    className="flex flex-col border-b border-b-primary last:border-b-0 cursor-pointer relative"
                    key={item?.id}
                    onClick={() => setSelectedId(item?.id)}
                  >
                    <h2 className="text-lg text-primary font-semibold mb-4 pt-2">
                      {item?.fx?.title}
                    </h2>
                    <li className="flex flex-row justify-between py-4 capitalize">
                      <span className="flex flex-col">
                        <span className="text-xs">Amount</span>
                        {item?.fx?.currency + " " + item?.fx?.amount}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs">Status</span>
                        {item?.fx?.status === "pending" ||
                        item?.fx?.status === "sent" ? (
                          <Badge className="bg-gray-500 text-gray-100 !text-xs">
                            Pending
                          </Badge>
                        ) : (
                          item?.fx?.status
                        )}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs">Start Time</span>
                        {formatTime(item?.fx?.startTime)}
                      </span>
                    </li>
                    <h1 className={`absolute right-5 top-4 text-xs capitalize ${item?.FxBidPlacement[0]?.status === 'accepted' ? 'text-green-600' : item?.FxBidPlacement[0]?.status === 'rejected' ? 'text-red-600' : item?.FxBidPlacement[0]?.status === 'placed' ? 'text-gray-600' : 'text-gray-600 dark:text-gray-400' }`}>
                      {!item?.FxBidPlacement[0]?.status ? `Not Placed` : item?.FxBidPlacement[0]?.status}
                    </h1>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-[40%] h-full fixed right-5">
            <div className="flex flex-col bg-gray-100 dark:bg-natural w-full min-h-52 p-8 rounded-lg text-foreground">
              <h1 className="text-xl font-bold text-primary">{fxData?.fx?.title}</h1>
              {!fxData ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <h1>There's nothing here</h1>
                  <p className="text-sm">
                    Click on any item on the left side to start
                  </p>
                  <Box size={30} />
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  <span className="flex justify-between">
                    <p className="font-semibold">
                      Currency: {fxData?.fx?.currency.toUpperCase()}
                    </p>
                    <p className="font-semibold">
                      Amount:{" "}
                      {fxData?.fx?.currency.toUpperCase() +
                        " " +
                        fxData?.fx?.amount}
                    </p>
                  </span>
                  <span className="flex justify-between">
                    <p className="font-semibold">
                      Start Time: {formatTime(fxData?.fx?.startTime)}
                    </p>
                    <p className="font-semibold">
                      End Time: {formatTime(fxData?.fx?.endTime)}
                    </p>
                  </span>

                    <span className="flex gap-x-2 font-semibold capitalize">
                    Status:{" "}
                    <span className="text-600">
                      {" "}
                      {!fxData?.FxBidPlacement?.length ? (
                        fxData?.fx?.status === "pending" ||
                        fxData?.fx?.status === "sent" ? (
                          <Badge className="bg-gray-500 text-gray-100 !text-xs">
                            Pending
                          </Badge>
                        ) : (
                          fxData?.fx?.status
                        )
                      ) : (fxData?.FxBidPlacement[0]?.status === "placed" ?
                            <Badge className="bg-primary hover:bg-unset text-gray-100 !text-xs">
                              {fxData?.FxBidPlacement[0]?.status}
                            </Badge> : fxData?.FxBidPlacement[0]?.status === "rejected" ? <Badge className="bg-red-600 text-gray-100 hover:bg-unset !text-xs">
                              {fxData?.FxBidPlacement[0]?.status}
                            </Badge> : <Badge className="bg-green-600 hover:bg-unset text-gray-100 !text-xs">
                              {fxData?.FxBidPlacement[0]?.status}
                            </Badge>
                      )}
                    </span>
                  </span>
                  <span className="flex flex-col gap-x-2 font-semibold">
                    Note:{" "}
                    <p className="font-normal text-[16px] overflow-hidden text-ellipsis line-clamp-3">
                      {fxData?.fx?.note}
                    </p>
                    </span>
                    {!fxData?.FxBidPlacement?.length && <div className="pt-8 flex gap-4 flex-col">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium"
                      >
                        Enter Amount
                      </label>
                      <Input
                        type="text"
                        name="fx_amount"
                        id="amount"
                        className="mt-1 block w-full pl-3 pr-10 border-gray-300 focus:outline-none font-semibold text-xl sm:text-sm rounded-md border-2 py-5"
                        placeholder="0.00"
                        onChange={(e: any) => setFxAmount(e.target.value)}
                        value={fxAmount || ""}
                      />
                      <Button
                        className="bg-primary"
                        onClick={sendFxBid}
                        disabled={loading}
                      >
                        {loading && (
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Place Fx bid
                      </Button>
                    </div>
                    }
                    {fxData?.FxBidPlacement?.length > 0 && <div className="flex justify-between my-4">
                      <div className="flex flex-col">
                        <label className="flex gap-x-2 font-semibold">Amount</label>
                        <h1 className="font-semibold">
                          {formatCurrency(fxData?.FxBidPlacement[0].amount)}
                          </h1>
                      </div>
                      <div className="flex flex-col text-xs mt-4 font-semibold">
                        <p>Placed on:</p>
                        <p>{formatTime(fxData?.FxBidPlacement[0].createdAt)}</p>
                      </div>
                    </div>
                    }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
