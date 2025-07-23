import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PencilLine, Sprout } from "lucide-react"
import { useState } from "react"
import { Combobox } from "./ui/combobox"
import { Textarea } from "./ui/textarea"
import { createPlant, editPlant, getPlantById } from "@/actions/plant.action"
import { toast } from "sonner"

interface EditDialogProps{
    plant: Plant,
    onOpenClick?: (e: React.MouseEvent) => void
}

type Plant = Awaited<ReturnType<typeof getPlantById>>

export function EditDialog({plant, onOpenClick}: EditDialogProps) {
    
    if(!plant){
        return
    }
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    id: plant.id,
    name: plant?.name,
    description: plant?.description ?? "",
    stock: plant?.stock,
    price: plant?.price,
    category: plant?.category,
    userId: plant?.userId,
    imageUrl: plant?.imageUrl ?? "",
  })

  const handleChange = (field: string, value: string | number) => {
    console.log(`Field changed: ${field}, New value: ${value}`)
    setFormData({ ...formData, [field]: value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
        const newPlant = await editPlant(formData)
        console.log("plant edited")
        toast.success("Plant edited successfully")
        // setFormData({
        //     name: "",
        //     description: "",
        //     stock: 1,
        //     price: 1,
        //     category: "",
        //     userId: "",
        //     imageUrl: "",
        // })
        
    }catch(error){
        console.error("error creating product: ", error)
        toast.error("Failed to create new plant")
    }
    
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2" 
            onClick={(e) => {
            e.stopPropagation() 
            setOpen(true)
            }}
            asChild>
                <div>
                    <PencilLine className=""/>
                    <span className="hidden lg:inline">Edit plant</span>
                </div>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit plant</DialogTitle>
            <DialogDescription>
              Edit your plant details here. Click edit when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
            <div className="grid gap-3">
              <Label htmlFor="name">Name <span className="text-red-500 font-bold">*</span> </Label>
              <Input id="name" name="name" placeholder="Enter name ... " required={true}
                    value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter description ... "
                    value={formData.description} onChange={(e) => handleChange("description", e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category <span className="text-red-500 font-bold">*</span></Label>
              <Combobox value={formData.category} onChange={(val) => handleChange("category", val)}/>
            </div>
            <div className="flex gap-2">
              <div className="grid gap-3">
                <Label htmlFor="stock">Stock <span className="text-red-500 font-bold">*</span></Label>
                <Input id="stock" placeholder="Enter stock ..." type="number" defaultValue={1} required={true}
                      value={formData.stock} onChange={(e) => handleChange("stock", parseInt(e.target.value))} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price <span className="text-red-500 font-bold">*</span></Label>
                <Input id="price" placeholder="Enter price ..." type="number" defaultValue={1} required={true}
                      value={formData.price} onChange={(e) => handleChange("price", parseFloat(e.target.value))} />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="imageUrl">Image link</Label>
              <Input id="imageUrl" 
              value={formData.imageUrl} onChange={(e) => handleChange("imageUrl", e.target.value)}/>
            </div>
          </div>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Edit</Button>
          </DialogFooter>
        </form>
        </DialogContent>
    </Dialog>
  )
}
