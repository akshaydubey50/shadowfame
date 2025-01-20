import { X } from 'lucide-react'
import React from 'react'

export default function Modal({ onConfirm, onCancel}:{ onConfirm:()=>void, onCancel:()=>void}) {
  return (
    <>
      <div className="  ">
        <div className='justify-between items-center flex '>
          <p>Are you sure you want to delete this item?</p>
          <button onClick={onCancel}><X /></button>
        </div>

        <div className='flex justify-end space-x-4 pt-8'>
          <button className='border rounded-xl px-10 py-1' onClick={onCancel}>Cancel</button>
          <button className='bg-orange-500 text-white rounded-xl border border-orange-500 px-10 py-1' onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </>
  )
}
