import { useState } from 'react'
import { InstructorSideBar } from '../../layout/sidebar/instructor'

interface ICourse {
  title: string
  description: string
  category: string
  price: number
  image: File | null
  thumbnail: File | null
  rating: number
  level: string
  duration: string
}

export function AddCourse() {
  return (
    <>
      <InstructorSideBar>
        <div className="flex-betweens gap-2">
          <h2 className="text-xl font-bold">Adicionar curso</h2>
        </div>
      </InstructorSideBar>
    </>
  )
}
