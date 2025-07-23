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
              Add new plant to your inventory here. Click add when you&apos;re
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
                {/* <ImageUpload
                  endpoint="postImage"
                  value={formData.imageUrl}
                  onChange={(url: string) => {
                    handleChange("imageUrl", url);
                  }}
                  onUploadingChange={(val) => {
                    console.log("📦 Uploading status:", val);
                    setUploading(val)
                  }}
                /> */}

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
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
        </DialogContent>
    </Dialog>
  )
}
