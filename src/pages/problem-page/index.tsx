import { Layout } from '../../layout'
import Workspace from '../../components/workspace'
import { useGetProblemByLessonIdQuery } from '../../slices/problemsApiSlices/problemLessonsApiSlice'
import { useGetLessonBySlugQuery } from '../../slices/lessonsSlices/lessonsApiSlice'
import { useParams } from 'react-router-dom'

export function ProblemPage() {
  const { slug } = useParams()
  const { data: lessonData } = useGetLessonBySlugQuery(slug)
  const { data: problemData } = useGetProblemByLessonIdQuery(
    lessonData?.lesson?.lesson?.id,
  )

  console.log(problemData)

  return (
    <Layout>
      <Workspace problem={problemData?.problem} />
    </Layout>
  )
}
