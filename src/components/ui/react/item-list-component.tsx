import { Input } from './input'

export function ItemListComponent({ data }: any) {
    return (
        <>
            {data?.map((item, idx) => (<div key={idx} className="flex flex-col my-4">
                <div className="flex justify-between gap-x-4 w-full bg-white dark:bg-background-color rounded-xl p-4">
                    <span className="w-1/3">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-500">Description</label>
                        <Input className="text-foreground pl-0 font-regular text-md w-full border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" defaultValue={item?.name} readOnly />
                    </span>
                    <span className="w-1/3">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-500">Quantity</label>
                        <Input className="text-foreground pl-0 font-regular text-md w-full" defaultValue={item?.quantity} readOnly />
                    </span>
                    <span className="w-1/3">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-500">Unit</label>
                        <Input className="text-foreground pl-0 font-regular text-md w-full" defaultValue={String(item?.unit).toLocaleString()} readOnly />
                    </span>
                </div>
            </div>))}
        </>
  )
}
