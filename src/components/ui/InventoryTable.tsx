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
import { getPlants } from "@/actions/plant.action";
import { useRouter } from "next/navigation";
import { Skeleton } from "./skeleton";
import { CreateDialog } from "../CreateDialog";
import { EditDialog } from "../EditDialog";


type Plants = Awaited<ReturnType<typeof getPlants>>

interface InventoryTableProps{
    plants: Plants
}

export default function InventoryTable({plants}: InventoryTableProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPlants = plants?.userPlants?.filter((plant : any) =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || plant.category === selectedCategory)
    
  )

  if(!plants){
    return(
        <div className="w-full space-y-4">
            <div className="flex items-center gap-2 py-4">
                <Skeleton className="h-10 w-full max-w-sm"/>
                <Skeleton className="h-10 w-32"/>
                <Skeleton className="h-10 w-32"/>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="[&>*]:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0">
                        <TableHead>
                            <Skeleton className="w-full h-4"/>
                        </TableHead>
                        <TableHead>
                            <Skeleton className="w-full h-4"/>
                        </TableHead>
                        <TableHead>
                            <Skeleton className="w-full h-4"/>
                        </TableHead>
                        <TableHead>
                            <Skeleton className="w-full h-4"/>
                        </TableHead>
                        <TableHead>
                            <Skeleton className="w-full h-4"/>
                        </TableHead>
                        <TableHead className="">
                            <Skeleton className="w-full h-4"/>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="overflow-hidden">
                {filteredPlants?.map((plant) => {
                    const slugifiedName = plant.name.toLowerCase().replace(/\s+/g, "-")
                    const slug = `${plant.id}--${slugifiedName}`
                    const plantUrl = `/plants/${slug}`
                
                    return (
                        <TableRow
                        key={plant.id}
                        className="odd:bg-muted/50 [&>*]:whitespace-nowrap"
                        onClick={() => router.push(plantUrl)}
                        >
                            <TableCell className="font-medium">
                                <Skeleton className="w-full h-4"/>
                            </TableCell>
                            <TableCell className="font-medium">
                                <Skeleton className="w-full h-4"/>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-4"/>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-4"/>
                            </TableCell>
                            <TableCell className="font-bold">
                                <Skeleton className="w-full h-4"/>
                            </TableCell>

                            <TableCell className="text-right">
                                <Skeleton className="w-full h-4"/>
                            </TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
        </div>
    )
  }

  return (
    <div>
        <div className="flex justify-between w-full py-4">
            <div className="flex justify-between w-1/2 gap-8">
                <Input placeholder ="Filter plants ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <Combobox value={selectedCategory} onChange={(val) => setSelectedCategory(val)}/>
            </div>
            <CreateDialog/>
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
            {filteredPlants?.map((plant) => {
                const slugifiedName = plant.name.toLowerCase().replace(/\s+/g, "-")
                const slug = `${plant.id}--${slugifiedName}`
                const plantUrl = `/plants/${slug}`
            
                return (
                    <TableRow
                    key={plant.id}
                    className="odd:bg-muted/50 [&>*]:whitespace-nowrap"
                    >
                        <TableCell className="font-medium cursor-pointer" onClick={() => router.push(plantUrl)}>{plant.id}</TableCell>
                        <TableCell className="font-medium cursor-pointer" onClick={() => router.push(plantUrl)}>{plant.name}</TableCell>
                        <TableCell className="cursor-pointer" onClick={() => router.push(plantUrl)}>{plant.category}</TableCell>
                        <TableCell className="cursor-pointer" onClick={() => router.push(plantUrl)}>{plant.price}</TableCell>
                        <TableCell className="font-bold cursor-pointer" onClick={() => router.push(plantUrl)}>{plant.stock}</TableCell>

                        <TableCell className="text-right">
                            <div className="flex justify-around space-x-4">
                                <EditDialog plant={plant} onOpenClick={(e) => e.stopPropagation()}/>
                                <h1>Delete button</h1>
                            </div>
                        </TableCell>
                    </TableRow>
                )
            })}
            </TableBody>
        </Table>
        </div>
    </div>
  );
}
