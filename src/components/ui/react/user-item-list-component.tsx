import { useEffect, useState } from 'react';
import { Input } from './input';

// Define a type for the item structure
type Item = {
    name: string;
    quantity: number;
    unit: string;
    cost: number;
};

export function UserItemListComponent({ items }: { items: Item[] }) {
    const [itemList, setItemList] = useState<Item[]>(items);

    const handleCostChange = (index: number, newCost: number) => {
        const updatedItems = itemList.map((item, idx) => {
            if (idx === index) {
                return { ...item, cost: newCost };
            }
            return item;
        });
        setItemList(updatedItems);
    };

    return (
        <>
            <div className="flex flex-col">
                {itemList.map((item, index) => (
                    <div key={index} className="flex justify-between gap-x-4 w-full bg-white dark:bg-background-color rounded-xl p-4 my-2">
                        <span className="w-1/3">
                            <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-500">Description</label>
                            <Input className="text-foreground pl-0 font-regular text-md w-full border-0 ring-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" defaultValue={item?.name} readOnly />
                        </span>
                        <span className="w-1/3">
                            <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-500">Quantity</label>
                            <Input className="text-foreground pl-0 font-regular text-md w-full" defaultValue={item?.quantity} readOnly />
                        </span>
                        <span className="w-1/3">
                            <label htmlFor={`unit-${index}`} className="block text-sm font-medium text-gray-500">Unit</label>
                            <Input className="text-foreground pl-0 font-regular text-md w-full" defaultValue={String(item?.unit)} readOnly />
                        </span>
                        <span className="w-1/3">
                            <label htmlFor={`cost-${index}`} className="block text-sm font-medium text-gray-500">Cost</label>
                            <Input id={`cost-${index}`} className="text-foreground pl-0 font-regular text-md w-full" placeholder="Enter cost" value={item?.cost} onChange={(e) => handleCostChange(index, parseFloat(e.target.value))} />
                        </span>
                        <span className="w-1/3">
                            <label htmlFor={`total-${index}`} className="block text-sm font-medium text-gray-500">Total</label>
                            <Input id={`total-${index}`} className="text-foreground pl-0 font-regular text-md w-full" value={itemList[index].cost * itemList[index].quantity} readOnly />
                        </span>
                    </div>
                ))}
            </div>
            <div className='flex justify-end text-foreground'>
                <h2 className='pr-8 font-medium underline underline-offset-4'>Total cost: {itemList.reduce((acc, item) => acc + (item.cost * item.quantity), 0)}</h2>
            </div>
        </>
    );
}