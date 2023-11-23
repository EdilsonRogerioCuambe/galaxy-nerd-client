/* eslint-disable no-new-func */
import React, { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import EditorFooter from '../editor-footer'
import Split from 'react-split'
import { message } from 'antd'
import { javascript } from '@codemirror/lang-javascript'
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import axios from 'axios'
import assert from 'assert'

export type Example = {
  id: number
  inputText: string
  outputText: string
  explanation?: string
  img?: string
}

export type Problem = {
  id: string
  title: string
  problemStatement: string
  examples: Example[]
  constraints: string
  order: number
  starterCode: string
  handlerFunction: ((fn: any) => boolean) | string
  starterFunctionName: string
}

export type DBProblem = {
  id: string
  title: string
  category: string
  difficulty: string
  likes: number
  dislikes: number
  order: number
  videoId?: string
  link?: string
}

type PlaygroundProps = {
  problem: Problem
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
  setSolved: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ISettings {
  fontSize: string
  settingsModalIsOpen: boolean
  dropdownIsOpen: boolean
}

export default function Playground({
  problem,
  setSuccess,
  setSolved,
}: PlaygroundProps) {
  const [compiledCode, setCompiledCode] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0)
  let [userCode, setUserCode] = useState<string>(problem?.starterCode)

  const [fontSize, setFontSize] = useLocalStorage('lcc-fontSize', '16px')

  const [settings, setSettings] = useState<ISettings>({
    fontSize,
    settingsModalIsOpen: true,
    dropdownIsOpen: false,
  })

  useEffect(() => {
    const code = localStorage.getItem(`code-${problem?.id}`)
    console.log(`code-${problem?.id}`, code)
    setUserCode(
      typeof code === 'string' && code.length > 0 ? code : problem?.starterCode,
    )
  }, [problem?.id, problem?.starterCode])

  const handleSubmit = async () => {
    try {
      userCode = userCode.slice(userCode?.indexOf(problem?.starterFunctionName))
      const cb = new Function(`return ${userCode}`)()
      const handler = new Function(
        'assert',
        `return ${problem?.handlerFunction}`,
      )(assert)

      if (typeof handler === 'function') {
        const success = handler(cb)
        if (success) {
          message.success('Congratulations! You solved the problem')
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 4000)

          setSolved(true)
        }
      }
    } catch (error: any) {
      console.log(error)
      if (
        error?.message.startsWith(
          'AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:',
        )
      ) {
        message.error('Oops! Some tests failed')
      } else {
        message.error('Oops! Something went wrong')
      }
    }
  }

  const handleCompileCode = async () => {
    try {
      const response = await axios.post('http://localhost:3333/compile', {
        sourceCode: userCode,
        language: 'javascript',
        timeLimit: 1,
        memoryLimit: 323244,
      })

      console.log(response.data.output)

      if (response.status === 200) {
        setCompiledCode(response.data.output)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const onChange = (value: string) => {
    setUserCode(value)
    localStorage.setItem(`code-${problem?.id}`, value)
  }

  useEffect(() => {
    const code = localStorage.getItem(`code-${problem?.id}`)
    if (code) {
      setUserCode(code)
    } else {
      setUserCode(problem?.starterCode)
    }
  }, [problem?.id, problem?.starterCode])

  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      {/* <PreferenceNav settings={settings} setSettings={setSettings} /> */}
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            onChange={onChange}
            extensions={[javascript()]}
            style={{ fontSize: settings.fontSize }}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex">
            {problem?.examples?.map((example, index) => (
              <div
                className="mr-2 items-start mt-2 "
                key={example?.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? 'text-white' : 'text-gray-500'}
									`}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem?.examples[activeTestCaseId]?.inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem?.examples[activeTestCaseId]?.outputText}
            </div>
          </div>

          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Compiled:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-green-400 mt-2">
              {compiledCode}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter
        handleSubmit={handleSubmit}
        handleCompileCode={handleCompileCode}
      />
    </div>
  )
}
