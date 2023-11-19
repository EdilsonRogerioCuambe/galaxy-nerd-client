import { Problem } from '../../components/playground'
import { jumpGame } from './jump-game'
import { twoSum } from './two-sum'

interface ProblemMap {
  [key: string]: Problem
}

export const problems: ProblemMap = {
  'two-sum': twoSum,
  'jump-game': jumpGame,
}
