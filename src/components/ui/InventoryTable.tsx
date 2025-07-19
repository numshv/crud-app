"use client"

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
import { useState } from "react";

const plants = [
  {
    id: 101,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 59.99,
    stock: 120,
  },
  {
    id: 101,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 59.99,
    stock: 120,
  },
  {
    id: 101,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 59.99,
    stock: 120,
  },
  {
    id: 101,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 59.99,
    stock: 120,
  }
];

export default function InventoryTable() {
  const [selectedCategory, setSelectedCategory] = useState("")

  return (
    <div>
        <div className="flex justify-between w-full py-4">
            <div className="flex justify-between w-1/2 gap-8">
                <Input placeholder ="Filter plants ..."/>
                <Combobox value={selectedCategory} onChange={(val) => setSelectedCategory(val)}/>
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
