import { useState } from 'react';
import { Button } from './button'
import { DownloadIcon } from 'lucide-react';

export default function ReportComponent({ report }: { report: any }) {

    const [showCSV, setShowCSV] = useState(false);
    const [showPDF, setShowPDF] = useState(false);
    const exportCSV = () => {
        setShowCSV(true)
        setShowPDF(false)
    };

    const exportPDF = () => {
        setShowCSV(false)
        setShowPDF(true)
    };

    const downloadReport = ({type, filename, object }:{type: string, filename: string, object: any[]}) => {
        //@ts-ignore
        objectExporter({
            exportable: object,
            type: type,
            fileName: filename,
            columnSeparator: type === 'csv' ? 'comma' : "",
        });
    }

  return (
      <div className='flex flex-col w-[calc(100%-7rem)] ml-24'>
          <div
              className="flex flex-col gap-x-4 md:p-8 mt-24 h-full rounded-2xl"
          >
              <div>
                  <h1 className="font-semibold text-2xl text-foreground my-8">
                      Vendor and Bid Report
                  </h1>
              </div>

              <div className="grid grid-rows-2 gap-y-4 md:flex md:gap-x-6">
                  <div className="w-full md:w-1/4 bg-slate-100 dark:bg-natural rounded-lg p-4 shadow-md">
                      <h2 className="font-semibold text-foreground text-lg mb-2">
                          Total Vendors
                      </h2>
                      <span className="flex justify-between">
                          <p className="text-gray-500 dark:text-gray-300 text-4xl font-bold">
                              {report?.totalVendor}
                          </p>
                          {/* <Icon
                          name="majesticons:analytics-line"
                          size={40}
                          class="bg-white dark:bg-slate-300 text-slate-500 p-2 rounded-full"
                      /> */}
                      </span>
                  </div>
                  <div
                      className="w-full md:w-1/4 bg-slate-100 dark:bg-natural font-semibold text-foreground rounded-lg p-4 shadow-md"
                  >
                      <h2 className="font-semibold text-lg mb-2">Total Bids</h2>
                      <span className="flex justify-between">
                          <p className="text-gray-500 dark:text-gray-300 text-4xl font-bold">
                              {report?.totalBids}
                          </p>
                          {/* <Icon
                          name="majesticons:analytics-line"
                          size={40}
                          className="bg-white dark:bg-slate-300 text-slate-500 p-2 rounded-full"
                      /> */}
                      </span>
                  </div>
                  <div
                      className="w-full md:w-1/4 bg-slate-100 dark:bg-natural font-semibold text-foreground rounded-lg p-4 shadow-md"
                  >
                      <h2 className="font-semibold text-lg mb-2">Total Tenders</h2>
                      <span className="flex justify-between">
                          <p className="text-gray-500 dark:text-gray-300 text-4xl font-bold">
                              {report?.totalTender}
                          </p>
                          {/* <Icon
                          name="majesticons:analytics-line"
                          size={40}
                          class="bg-white dark:bg-slate-300 text-slate-500 p-2 rounded-full"
                      /> */}
                      </span>
                  </div>
                  <div
                      className="w-full md:w-1/4 bg-slate-100 dark:bg-natural font-semibold text-foreground rounded-lg p-4 shadow-md"
                  >
                      <h2 className="font-semibold text-lg mb-2">Export Reports</h2>
                      <span className="flex justify-between">
                          <Button className="bg-primary text-white px-4 py-2 rounded-md" onClick={exportCSV}
                          >Export CSV</Button
                          >
                          <Button className="bg-primary text-white px-4 py-2 rounded-md" onClick={exportPDF}
                          >Export PDF</Button
                          >
                      </span>
                  </div>
              </div>
          </div>
          {showCSV && (
              <div className="md:h-40 flex justify-end gap-2 md:space-x-4 rounded-2xl md:-mt-12 p-4 md:p-8 text-foreground">
                  <span className='flex flex-col items-center border p-2 rounded-lg cursor-pointer' onClick={()=> downloadReport({type: 'csv', filename: 'vendors', object: report?.vendors})}>
                      <h1>Vendors.csv</h1>
                      <DownloadIcon />
                  </span>
                  <span className='flex flex-col items-center border p-2 rounded-lg cursor-pointer' onClick={() => downloadReport({ type: 'csv', filename: 'bids', object: report?.bidPlacement?.data })}>
                      <h1>Bids.csv</h1>
                      <DownloadIcon />
                  </span>
                  <span className='flex flex-col items-center border p-2 rounded-lg cursor-pointer' onClick={() => downloadReport({ type: 'csv', filename: 'tenders', object: report?.tenders })}>
                      <h1>Tenders.csv</h1>
                      <DownloadIcon />
                  </span>
              </div>
          )}

          {showPDF && (
              <div className="md:h-40 flex justify-end gap-2 md:space-x-4 rounded-2xl md:-mt-12 p-4 md:p-8 text-foreground">
                  <span className='flex flex-col items-center border p-2 rounded-lg cursor-pointer' onClick={() => downloadReport({ type: 'pdf', filename: 'vendors', object: report?.vendors })}>
                      <h1>Vendors.pdf</h1>
                      <DownloadIcon />
                  </span>
                  <span className='flex flex-col items-center border p-2 rounded-lg cursor-pointer' onClick={() => downloadReport({ type: 'pdf', filename: 'bids', object: report?.bidPlacement?.data })}>
                      <h1>Bids.pdf</h1>
                      <DownloadIcon />
                  </span>
                  <span className='flex flex-col items-center border p-2 rounded-lg cursor-pointer' onClick={() => downloadReport({ type: 'pdf', filename: 'tenders', object: report?.tenders })}>
                      <h1>Tenders.pdf</h1>
                      <DownloadIcon />
                  </span>
              </div>
          )}
      </div>

  )
}
