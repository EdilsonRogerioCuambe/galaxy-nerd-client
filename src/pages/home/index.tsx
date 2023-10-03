import { Banner } from '../../components/banner'
import { MostRatedCourses } from '../../components/most-rated-courses'
import { PopularCourses } from '../../components/popularCourses'
import { Promos } from '../../components/promos'
import { Layout } from '../../layout'

export function Home() {
  return (
    <Layout>
      <div className="bg-main mx-auto min-h-screen px-2">
        <Banner />
        <PopularCourses />
        <Promos />
        <MostRatedCourses />
      </div>
    </Layout>
  )
}
