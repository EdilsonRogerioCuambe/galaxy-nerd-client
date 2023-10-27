import { Layout } from '../../layout'
import { useParams } from 'react-router-dom'
import { useGetQuestionBySlugQuery } from '../../slices/questionSlices/questionsApiSlice'
import { useGetChildrenAnswersQuery } from '../../slices/answersSlices/answersApiSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import Editor from '../../components/editorjs'
import CommentInForum from '../../components/comment-in-forum'
import CommentList from '../../components/forum-comment-list'

interface Answer {
  answer: string
  createdAt: string
  id: string
  parentId: string | null
  student?: {
    avatar: string
    name: string
  }
  instructor?: {
    avatar: string
    name: string
  }
  content: string
  upvotes: number
  downvotes: number
  studentId: string
  updatedAt: string
  children: Answer[]
  vote: [
    {
      studentId: string
      instructorId: string
      answerId: string
      voteType: 'UPVOTE' | 'DOWNVOTE'
    },
  ]
}

export function ForumPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: forum } = useGetQuestionBySlugQuery(slug)

  const { data: childrenAnswers } = useGetChildrenAnswersQuery(
    forum?.forum?.forum?.id || '',
  )
  const { student } = useSelector((state: RootState) => state.studentAuth)
  const { instructor } = useSelector((state: RootState) => state.instructorAuth)

  const parseDescription = JSON.parse(forum?.forum?.forum?.description || '{}')

  return (
    <Layout>
      <div className="bg-secondary relative container mx-auto rounded-md text-[#c4c4cc] p-6 mt-8">
        <div className="max-w-7xl bg-secondary rounded-lg p-4 text-[#c4c4cc]">
          <h1 className="text-[#e1e1e6] text-4xl text-center font-semibold mb-2 mx-auto max-w-3xl">
            #{forum?.forum?.forum?.title}
          </h1>
          <Editor data={parseDescription} readOnly={true} />
        </div>
      </div>

      <div className="bg-secondary relative container mx-auto rounded-md text-[#c4c4cc] p-6 mt-8">
        <div className="max-w-7xl bg-secondary rounded-lg p-4 text-[#c4c4cc]">
          <h1 className="text-[#e1e1e6] text-xl font-semibold mb-2">
            Comentários
          </h1>

          <CommentInForum
            studentId={student?.id}
            instructorId={instructor?.id}
            forumId={forum?.forum?.forum?.id}
          />

          {childrenAnswers?.answers?.answers?.map((answer: Answer) => (
            <CommentList
              key={answer.id}
              answer={answer}
              studentId={student?.id}
              forumId={forum?.forum?.forum?.id}
              instructorId={instructor?.id}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}
