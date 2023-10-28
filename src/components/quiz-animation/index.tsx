import { useSpring, animated } from '@react-spring/web'

interface QuizAnimationProps {
  show: boolean
}

const QuizAnimation = ({ show }: QuizAnimationProps) => {
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: {
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0px)' : 'translateY(-50px)',
    },
  })

  return (
    <animated.div style={animationProps} className="text-green-300">
      +5 pontos de experiência! 🎉 Resposta correta!
    </animated.div>
  )
}

export default QuizAnimation
