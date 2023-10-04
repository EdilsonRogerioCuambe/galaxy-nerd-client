import { Layout } from '../../layout'
import { Input } from '../../custom'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { useState } from 'react'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-2 mt-8 flex-colo">
        <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 md:3/5 bg-secondary rounded-lg">
          <span className="uppercase text-[#c4c4cc] text-4xl font-extrabold">
            GALAXY NERD
          </span>
          <Input
            label="Email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Link
            to="/dashboard"
            className="bg-quinary transitions hover:bg-main flex-rows gap-4 text-[#e1e1e6] p-4 rounded-lg w-full"
          >
            <FiLogIn size={20} /> Entrar
          </Link>
          <p className="text-[#c4c4cc]">
            Novo por aqui?{' '}
            <Link to="/register" className="text-quinary">
              Assine agora.
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}
