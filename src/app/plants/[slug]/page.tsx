import React, { use } from 'react'
import PlantCard from './PlantCard'
import { getPlantById } from '@/actions/plant.action'
import { title } from 'process';
import { Description } from '@radix-ui/react-dialog';
import { stackServerApp } from '@/stack';
import { SignUp } from '@stackframe/stack';

export async function name({
  params,
}: {
  params: {slug: string};
}) {
  const[id] = params.slug.split("--")
  const plant = await getPlantById(id) 

  return{
    title: plant ? plant.name : "Plant Details",
    description: plant ? plant.description : "Plants details description"
  }
}


async function page({params}: {params: {slug: string}}) {
  const user = await stackServerApp.getUser()
  const[id] = params.slug.split("--")
  const plant = await getPlantById(id)

  if(!user){
    return(
      <div className='flex justify-center items-center mt-20'>
        <SignUp/>
      </div>
    )
  }

  return (
    <PlantCard plant={plant} />
  )
}

export default page