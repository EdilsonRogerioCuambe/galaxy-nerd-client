import { Banner } from '../../components/banner'
import { GalaxySection } from '../../components/galaxy-section'
import { MostRatedCourses } from '../../components/most-rated-courses'
import { PopularCourses } from '../../components/popular-courses'
import { Promos } from '../../components/promos'
import { Layout } from '../../layout'

export function Home() {
  return (
    <Layout>
      <div className="bg-main mx-auto min-h-screen px-2">
        <GalaxySection />
        <PopularCourses />
      </div>
    </Layout>
  )
}
