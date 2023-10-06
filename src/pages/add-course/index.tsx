import { useState } from 'react'
import { CourseModal } from '../../components/course-modal'
import { SideBar } from '../../layout/sidebar'

export function AddCourse() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <SideBar>
        <CourseModal open={open} setOpen={setOpen} />
      </SideBar>
    </>
  )
}
