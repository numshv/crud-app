import React from 'react'
import PlantCard from './PlantCard'
import { getPlantById } from '@/actions/plant.action'
import { stackServerApp } from '@/stack';
import { SignUp } from '@stackframe/stack';


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