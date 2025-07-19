import { getUserDetails } from '@/actions/user.action'
import InventoryTable from '@/components/ui/InventoryTable'
import { stackServerApp } from '@/stack'
import { SignUp } from '@stackframe/stack'
import React from 'react'

async function page() {
  const user = await stackServerApp.getUser()
  const app = stackServerApp.urls
  const userProfile = await getUserDetails(user?.id)
  return (
    <div className='my-4 px-10 gap-3 h-max items-center'>
        {user ? (
            <>
              <h1 className='font-bold text-2xl'>Inventory Table</h1>
              <InventoryTable />
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