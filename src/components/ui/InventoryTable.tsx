import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input"
import { Combobox } from "./combobox";
import { Button } from "./button";
import { Sprout } from "lucide-react";
import Link from "next/link";

const plants = [
  {
    id: 101,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 59.99,
    rating: 4.5,
    stock: 120,
    supplier: "SoundTech Ltd",
    dateAdded: "2024-01-15",
  },
  {
    id: 102,
    name: "Yoga Mat",
    category: "Sports & Fitness",
    price: 25.0,
    rating: 4.8,
    stock: 200,
    supplier: "FitGear Inc",
    dateAdded: "2024-01-20",
  },
  {
    id: 103,
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 80.0,
    rating: 4.2,
    stock: 80,
    supplier: "HomeBrew Supplies",
    dateAdded: "2024-02-05",
  },
  {
    id: 104,
    name: "Running Shoes",
    category: "Sportswear",
    price: 70.0,
    rating: 4.6,
    stock: 150,
    supplier: "RunWell Co.",
    dateAdded: "2024-03-15",
  },
  {
    id: 105,
    name: "Smartwatch",
    category: "Electronics",
    price: 120.0,
    rating: 4.7,
    stock: 60,
    supplier: "TechTime",
    dateAdded: "2024-04-10",
  },
  {
    id: 106,
    name: "Gaming Mouse",
    category: "Electronics",
    price: 45.0,
    rating: 4.3,
    stock: 95,
    supplier: "GamePro Gear",
    dateAdded: "2024-04-22",
  },
  {
    id: 107,
    name: "Blender",
    category: "Kitchen Appliances",
    price: 55.0,
    rating: 4.4,
    stock: 110,
    supplier: "KitchenEssentials",
    dateAdded: "2024-05-05",
  },
  {
    id: 108,
    name: "Electric Kettle",
    category: "Kitchen Appliances",
    price: 30.0,
    rating: 4.1,
    stock: 130,
    supplier: "HomeEssentials",
    dateAdded: "2024-05-18",
  },
  {
    id: 109,
    name: "Office Chair",
    category: "Furniture",
    price: 150.0,
    rating: 4.6,
    stock: 50,
    supplier: "FurniPro",
    dateAdded: "2024-06-01",
  },
  {
    id: 110,
    name: "LED Desk Lamp",
    category: "Lighting",
    price: 20.0,
    rating: 4.5,
    stock: 210,
    supplier: "BrightLight",
    dateAdded: "2024-06-10",
  },
];

export default function InventoryTable() {
  return (
    <div>
        <div className="flex justify-between w-full py-4">
            <div className="flex justify-between w-1/2 gap-8">
                <Input placeholder ="Filter plants ..."/>
                <Combobox/>
            </div>
            <Button variant="default" className="flex items-center gap-2" asChild>
                <Link href="/plants">
                    <Sprout className=""/>
                    <span className="hidden lg:inline">Add new plant</span>
                </Link>
            </Button>
        </div>
        <div className="grid w-full h-max [&>div]:border [&>div]:rounded">
        <Table>
            <TableHeader>
            <TableRow className="[&>*]:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0">
                <TableHead>Plant ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price (USD)</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody className="overflow-hidden">
            {plants.map((plant) => (
                <TableRow
                key={plant.id}
                className="odd:bg-muted/50 [&>*]:whitespace-nowrap"
                >
                <TableCell className="font-medium">{plant.id}</TableCell>
                <TableCell className="font-medium">{plant.name}</TableCell>
                <TableCell>{plant.category}</TableCell>
                <TableCell>{plant.price}</TableCell>
                <TableCell className="font-bold">{plant.stock}</TableCell>

                <TableCell className="text-right">
                    <div className="flex justify-around space-x-4">
                        <h1>Edit button</h1>
                        <h1>Delete button</h1>
                    </div>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </div>
    </div>
  );
}
