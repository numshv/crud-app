import { deletePlant, getPlantById } from "@/actions/plant.action"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Delete, PencilLine } from "lucide-react"
import { useState } from "react"

interface DeleteDialogProps{
    plant: Plant,
    onOpenClick?: (e: React.MouseEvent) => void
}

type Plant = Awaited<ReturnType<typeof getPlantById>>

export function DeleteDialog({plant, onOpenClick}: DeleteDialogProps) {

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

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="flex items-center gap-2" 
        onClick={(e) => {
        e.stopPropagation() 
        setOpen(true)
        }}
        asChild>
            <div>
                <Delete className=""/>
                <span className="hidden lg:inline">Delete plant</span>
            </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            plant and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
            onClick={async () => {
                try {
                await deletePlant({ id: plant.id }) // kirim ID saja, karena cukup
                console.log("Plant deleted successfully")
                } catch (error) {
                console.error("Failed to delete plant:", error)
                }
            }}
            >
            Continue
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
