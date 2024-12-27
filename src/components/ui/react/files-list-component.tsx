import { Input } from './input'
import { Button } from './button'

export function FilesListComponent({ data, bucketPublicDomain }: { data: any, bucketPublicDomain: string }) {

  return (
      <>
          {
              data?.map((item, idx) => (
              <div className="flex flex-col my-4" key={idx}>
                  <div className="flex justify-between gap-x-4 w-full bg-white dark:bg-background-color rounded-xl p-4">
                      <div className="w-full">
                          <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-500"
                          >
                              Name
                          </label>
                          <div className="flex flex-row w-full !justify-between space-x-8">
                              <Input
                                  className="text-foreground pl-0 font-regular text-md border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                  defaultValue={item?.name}
                                  readOnly
                              />
                              <p className="text-sm mt-1 w-full text-foreground">
                                  {Number((item?.size / 1024 / 1024).toFixed(2)) > 1
                                      ? (item?.size / 1024 / 1024).toFixed(2) + " MB"
                                      : (item?.size / 1024).toFixed(2) + " KB"}
                              </p>
                                  <a href={`${bucketPublicDomain}/${item?.name}`} target="_blank">
                                      <Button variant="outline" size="sm" className='text-foreground'>
                                          View
                                      </Button>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          ))
          }
      </>
  )
}
