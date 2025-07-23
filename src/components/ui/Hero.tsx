import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 lg:py-0">
        <div className="my-auto">
          <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none">
            Just launched: Plantventory v1.0
          </Badge>
          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] tracking-tight">
            Smarter Inventory, Healthier Plants
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">
            Plantventory helps you keep track of every plant — from species and quantity to care schedules and locations.
            Built for nurseries, greenhouses, and plant enthusiasts who want clarity, not chaos.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Button size="lg" className="rounded-full text-base">
              <Link href="/plants" className="flex flex-row-reverse gap-2">
                  <span className="text-base">Try Plantventory</span> <ArrowUpRight className="!h-5 !w-5 pt-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="!h-5 !w-5" /> See It in Action
            </Button>
          </div>

        </div>
        <div className="w-full aspect-video lg:aspect-auto lg:w-[1000px] lg:h-screen bg-accent rounded-xl lg:rounded-none">
          <img 
          src="https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg"
          alt="greenhouse"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
