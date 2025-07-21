"use server"

import prisma from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function getPlants(searchTerm?: String){
    try{
        const currentUserId = await getUserId()

        const whereClause: any = {
            userId: currentUserId,
        }

        if(searchTerm){
            whereClause.name = {
                contains: searchTerm,
                mode: "insensitive",
            }
        }

        const userPlants = await prisma.plant.findMany({
            where: whereClause,
        })

        console.log("🔍 Fetched Plants:")
        userPlants.forEach((plant, index) => {
        console.log(`${index + 1}.`, plant)
        });

        revalidatePath("/")
        return{success: true, userPlants}
    } catch(error){
        console.log(error)
        throw new Error("failed to fetch plants")
    }
}

export async function getPlantById(id:string) {
    return await prisma.plant.findUnique({
        where: { id },
    })
}