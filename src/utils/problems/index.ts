import { Problem } from '../../components/playground'
import { jumpGame } from './jump-game'

interface ProblemMap {
  [key: string]: Problem
}

export const problems: ProblemMap = {
  'jump-game': jumpGame,
}
