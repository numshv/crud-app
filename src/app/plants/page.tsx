import { getPlants } from '@/actions/plant.action'
import { getUserDetails } from '@/actions/user.action'
import InventoryTable from '@/components/ui/InventoryTable'
import { stackServerApp } from '@/stack'
import { SignUp } from '@stackframe/stack'
import React from 'react'

async function page() {
  const user = await stackServerApp.getUser()
  const plants = await getPlants()
  const app = stackServerApp.urls
  const userProfile = await getUserDetails(user?.id)
  
  console.log("plants found: ", plants)
  return (
    <div className='my-4 px-10 gap-3 h-max items-center'>
        {user ? (
            <>
              <h1 className='font-bold text-2xl'>Inventory Table</h1>
              <InventoryTable  plants={plants} />
            </>
        ) : (
            <div className='flex justify-center items-center mt-20'>
              <SignUp/>
            </div>
        )}
    </div>
  )
}

export default page