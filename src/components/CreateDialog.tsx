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
import { Sprout } from "lucide-react"
import { useState } from "react"
import { Combobox } from "./ui/combobox"
import { Textarea } from "./ui/textarea"
import { createPlant } from "@/actions/plant.action"
import { toast } from "sonner"



export function CreateDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: 1,
    price: 1,
    category: "",
    userId: "",
    imageUrl: "",
  })

  const handleChange = (field: string, value: string | number) => {
    console.log(`Field changed: ${field}, New value: ${value}`)
    setFormData({ ...formData, [field]: value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
        const newPlant = await createPlant(formData)
        console.log("plant added")
        toast.success("Plant created successfully")
        setFormData({
            name: "",
            description: "",
            stock: 1,
            price: 1,
            category: "",
            userId: "",
            imageUrl: "",
        })
        
    }catch(error){
        console.error("error creating product: ", error)
        toast.error("Failed to create new plant")
    }
    
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2" asChild>
                <div>
                    <Sprout className=""/>
                    <span className="hidden lg:inline">Add new plant</span>
                </div>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add new plant</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Enter name ... " required={true}
                    value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter description ... "
                    value={formData.description} onChange={(e) => handleChange("description", e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Combobox value={formData.category} onChange={(val) => handleChange("category", val)}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" placeholder="Enter stock ..." type="number" defaultValue={1} required={true}
                    value={formData.stock} onChange={(e) => handleChange("stock", parseInt(e.target.value))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="Enter price ..." type="number" defaultValue={1} required={true}
                    value={formData.price} onChange={(e) => handleChange("price", parseFloat(e.target.value))} />
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="imageUrl">Upload image</Label>
              <Input id="imageUrl" type="file" 
              value={formData.imageUrl}/>
            </div> */}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
        </DialogContent>
    </Dialog>
  )
}
