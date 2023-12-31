import { useState } from 'react'
import Split from 'react-split'
import ProblemDescription from '../problem-description'
import Confetti from 'react-confetti'
import useWindowSize from '../../hooks/useWindowSize'
import Playground, { Problem } from '../playground'

type WorkspaceProps = {
  problem: Problem
}

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  const { width, height } = useWindowSize()
  const [success, setSuccess] = useState(false)
  const [solved, setSolved] = useState(false)

  return (
    <Split className="split" minSize={0}>
      <ProblemDescription
        key={problem?.id}
        problem={problem}
        _solved={solved}
      />
      <div className="bg-dark-fill-2">
        <Playground
          key={problem?.id}
          problem={problem}
          setSuccess={setSuccess}
          setSolved={setSolved}
        />
        {success && (
          <Confetti
            gravity={0.3}
            tweenDuration={4000}
            width={width - 1}
            height={height - 1}
          />
        )}
      </div>
    </Split>
  )
}
export default Workspace
