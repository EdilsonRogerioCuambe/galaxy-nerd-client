import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import { useGetCategoriesQuery } from '../../slices/categorySlices/categoryApiSlice'

export function GalaxySection() {
  const { data: categories } = useGetCategoriesQuery({})

  return (
    <>
      <div className="rounded-lg bg-secondary">
        <div className="flex flex-col items-center justify-center py-10 px-4">
          <h2 className="text-2xl font-bold capitalize text-center text-[#e1e1e6]">
            O Que Você Vai Aprender
          </h2>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            speed={2500}
            autoplay={{ delay: 2000 }}
            modules={[Autoplay]}
            className="w-full mt-10 justify-center flex gap-10"
          >
            {categories?.categories?.map((category: any) => (
              <SwiperSlide key={category.id}>
                <motion.div className="flex flex-col items-center justify-center">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-32 h-32 object-cover"
                  />
                  <p className="mt-2 text-lg font-extrabold text-center text-[#c4c4cc]">
                    {category.name}
                  </p>
                  <p className="mt-2 text-sm text-center text-[#c4c4cc]">
                    {category.description}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}
