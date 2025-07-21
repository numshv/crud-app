import { getPlantById } from "@/actions/plant.action";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

type Plant = Awaited<ReturnType<typeof getPlantById>>

interface PlantCardProps{
    plant: Plant
}

export default function PlantCard({plant}: PlantCardProps){
  if (!plant) {
    return <div className="text-red-500">Plant not found.</div>;
  }
  
  return (
    <div className="w-full h-full px-10 py-5">
      <Card className="shadow-none">
        {/* <CardHeader className="pt-4 pb-4 px-5 flex-row items-center gap-3 font-semibold">
        </CardHeader> */}

        <CardContent className="text-[15px] text-muted-foreground px-5 py-5 flex flex-row gap-10 flex-wrap justify-between">
          <div className="w-[640px] aspect-video bg-muted rounded-xl" />
          <div className="flex flex-col gap-4 min-w-[50%]">
              <h1 className="text-4xl text-primary font-bold">{plant.name}</h1>
              <h2 className="text-2xl text-primary font-bold">${plant.price}</h2>
              <Badge className="w-fit font-semibold">{plant.category}</Badge>
              <p >Stock: {plant.stock}</p>
              <p className="text-primary">{plant.description ?? ""}</p>
          </div>
        </CardContent>

        {/* <CardFooter>
        </CardFooter> */}
      </Card>
    </div>
  );
};

