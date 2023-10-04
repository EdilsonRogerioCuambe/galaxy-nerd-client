import { Link } from 'react-router-dom'
import { Layout } from '../../layout'
import { Input } from '../../custom'
import { useState } from 'react'

export function Register() {
  const [file, setFile] = useState<File | null | undefined>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 mt-8 flex-colo">
        <div className="w-full 2xl:w-2/5 gap-8 flex-colo sm:p-8 bg-secondary rounded-lg">
          <h1 className="uppercase text-[#c4c4cc] text-4xl font-extrabold">
            GALAXY NERD
          </h1>
          <p className="text-[#c4c4cc]">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-quinary">
              Entrar
            </Link>
          </p>
          <Input
            label="Foto de perfil"
            type="file"
            placeholder="Foto de perfil"
            bg={true}
            onChange={(event) => setFile(event.target.files?.[0])}
            value={file?.name}
          />
          <Input
            label="Nome Completo"
            type="text"
            placeholder="Nome"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <Input
            label="Email"
            type="text"
            placeholder="Email ou número de telefone"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Senha"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <Input
            label="Confirmar senha"
            type="password"
            placeholder="Confirmar senha"
            onChange={(event) => setConfirm(event.target.value)}
            value={confirm}
          />
          <button
            title="Cadastrar"
            type="button"
            className="bg-quinary transitions hover:bg-main flex-rows gap-4 text-[#e1e1e6] p-4 rounded-lg w-full"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </Layout>
  )
}
