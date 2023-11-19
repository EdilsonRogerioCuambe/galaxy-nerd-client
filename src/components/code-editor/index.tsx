import { Layout } from '../../layout'
import Workspace from '../workspace'
import { jumpGame } from '../../utils/problems/jump-game'

export function CodeEditor() {
  return (
    <Layout>
      <Workspace problem={jumpGame} />
    </Layout>
  )
}
