import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'
import { NavigationBar } from '../../components/navbar'

describe('NavigationBar', () => {
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>,
    )

    expect(getByText('G-NERD')).toBeInTheDocument()
    expect(
      getByPlaceholderText('Pesquise por cursos, categorias ou instrutores...'),
    ).toBeInTheDocument()
    expect(getByText('Cursos')).toBeInTheDocument()
    expect(getByText('Sobre')).toBeInTheDocument()
    expect(getByText('Contato')).toBeInTheDocument()
    expect(getByText('0')).toBeInTheDocument()
  })

  it('should render correctly when click on search button', async () => {
    const { getByRole, getByPlaceholderText } = render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>,
    )

    const searchButton = getByRole('button', { name: /pesquisar/i })
    const input = getByPlaceholderText(
      'Pesquise por cursos, categorias ou instrutores...',
    )

    fireEvent.click(searchButton)
    expect(input).toBeInTheDocument()

    fireEvent.click(searchButton)
    await waitForElementToBeRemoved(() => getByPlaceholderText(/pesquise/i))
  })
})
