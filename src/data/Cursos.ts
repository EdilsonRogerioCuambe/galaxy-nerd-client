import html from '../assets/images/html.jpg'
import unity from '../assets/images/unity.jpg'
import ai from '../assets/images/ai.jpg'
import reactNative from '../assets/images/react-native.jpg'
import wall from '../assets/images/wall.jpg'
import apple from '../assets/images/apple.jpg'
import seguranca from '../assets/images/seguranca.jpg'
import analise from '../assets/images/python.jpg'
import flutter from '../assets/images/flutter.jpg'
import ml from '../assets/images/ml.jpg'

export const Cursos = [
  {
    id: 1,
    imagem: wall,
    thumbnail: html,
    nome: 'Curso de Desenvolvimento Web com HTML, CSS e JavaScript',
    slug: 'curso-desenvolvimento-web-com-html-css-javascript',
    descricao:
      'Aprenda a criar sites interativos e dinâmicos utilizando as linguagens fundamentais da web.',
    categoria: 'Desenvolvimento Web',
    linguagem: 'HTML, CSS, JavaScript',
    duracao: '8 semanas',
    nivel: 'Iniciante',
    link: 'https://www.exemplo.com/curso-desenvolvimento-web',
    avaliacao: 4.5,
    avaliacoes: 500,
    topicos: [
      {
        titulo: 'Introdução ao HTML',
        videos: [
          {
            titulo: 'Aula 01 - Criando o projeto e realizando o setup inicial',
            link: 'https://www.exemplo.com/video1',
            concluido: true,
          },
          {
            titulo: 'Aula 01 - Criando o projeto e realizando o setup inicial',
            link: 'https://www.exemplo.com/video2',
            concluido: true,
          },
        ],
      },
      {
        titulo: 'CSS Básico',
        videos: [
          {
            titulo: 'Video 1 - Introdução ao CSS',
            link: 'https://www.exemplo.com/video3',
          },
          {
            titulo: 'Video 2 - Seletores CSS',
            link: 'https://www.exemplo.com/video4',
          },
        ],
      },
      {
        titulo: 'JavaScript Fundamentals',
        videos: [
          {
            titulo: 'Video 1 - Introdução ao JavaScript',
            link: 'https://www.exemplo.com/video5',
          },
          {
            titulo: 'Video 2 - Variáveis e Tipos de Dados',
            link: 'https://www.exemplo.com/video6',
          },
        ],
      },
      {
        titulo: 'Introdução ao React',
        videos: [
          {
            titulo: 'Video 1 - Introdução ao React',
            link: 'https://www.exemplo.com/video7',
          },
          {
            titulo: 'Video 2 - Componentes React',
            link: 'https://www.exemplo.com/video8',
          },
          {
            titulo: 'Video 3 - Hooks React',
            link: 'https://www.exemplo.com/video9',
          },
          {
            titulo: 'Video 4 - React Router',
            link: 'https://www.exemplo.com/video10',
          },
          {
            titulo: 'Video 5 - Redux',
            link: 'https://www.exemplo.com/video11',
          },
          {
            titulo: 'Video 6 - Redux Saga',
            link: 'https://www.exemplo.com/video12',
          },
          {
            titulo: 'Video 7 - Redux Persist',
            link: 'https://www.exemplo.com/video13',
          },
          {
            titulo: 'Video 8 - Redux Thunk',
            link: 'https://www.exemplo.com/video14',
          },
          {
            titulo: 'Video 9 - Redux Toolkit',
            link: 'https://www.exemplo.com/video15',
          },
          {
            titulo: 'Video 10 - React Native',
            link: 'https://www.exemplo.com/video16',
          },
          {
            titulo: 'Video 11 - Next.js',
            link: 'https://www.exemplo.com/video17',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    imagem: wall,
    thumbnail: unity,
    nome: 'Curso de Desenvolvimento de Jogos com Unity',
    slug: 'curso-desenvolvimento-jogos-com-unity',
    descricao:
      'Domine o Unity e crie seus próprios jogos para diversas plataformas, incluindo PC, mobile e console.',
    categoria: 'Desenvolvimento de Jogos',
    linguagem: 'C#',
    duracao: '10 semanas',
    nivel: 'Intermediário',
    link: 'https://www.exemplo.com/curso-desenvolvimento-jogos',
    avaliacao: 4.2,
    avaliacoes: 300,
    topicos: [
      {
        titulo: 'Introdução ao Unity',
        videos: [
          {
            titulo: 'Video 1 - Configuração do Ambiente',
            link: 'https://www.exemplo.com/unity-video1',
          },
          {
            titulo: 'Video 2 - Interface do Unity',
            link: 'https://www.exemplo.com/unity-video2',
          },
        ],
      },
      {
        titulo: 'Programação em C#',
        videos: [
          {
            titulo: 'Video 1 - Variáveis e Estruturas de Controle',
            link: 'https://www.exemplo.com/csharp-video1',
          },
          {
            titulo: 'Video 2 - Classes e Objetos em C#',
            link: 'https://www.exemplo.com/csharp-video2',
          },
        ],
      },
      {
        titulo: 'Desenvolvimento de Jogos 2D',
        videos: [
          {
            titulo: 'Video 1 - Criando um Personagem 2D',
            link: 'https://www.exemplo.com/unity-2d-video1',
          },
          {
            titulo: 'Video 2 - Animação 2D no Unity',
            link: 'https://www.exemplo.com/unity-2d-video2',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    imagem: wall,
    thumbnail: reactNative,
    nome: 'Curso de Desenvolvimento de Aplicativos Android',
    slug: 'curso-desenvolvimento-aplicativos-android',
    descricao:
      'Aprenda a criar aplicativos Android incríveis e conquiste o mercado mobile.',
    categoria: 'Desenvolvimento Mobile',
    linguagem: 'Java, Kotlin',
    duracao: '12 semanas',
    nivel: 'Intermediário',
    link: 'https://www.exemplo.com/curso-desenvolvimento-android',
    avaliacao: 4.0,
    avaliacoes: 400,
    topicos: [
      {
        titulo: 'Introdução ao Desenvolvimento Android',
        videos: [
          {
            titulo: 'Video 1 - Configuração do Ambiente Android',
            link: 'https://www.exemplo.com/android-video1',
          },
          {
            titulo: 'Video 2 - Interface de Usuário no Android',
            link: 'https://www.exemplo.com/android-video2',
          },
        ],
      },
      {
        titulo: 'Programação em Java',
        videos: [
          {
            titulo: 'Video 1 - Variáveis e Estruturas de Controle em Java',
            link: 'https://www.exemplo.com/java-video1',
          },
          {
            titulo: 'Video 2 - Classes e Objetos em Java',
            link: 'https://www.exemplo.com/java-video2',
          },
        ],
      },
      {
        titulo: 'Desenvolvimento de Aplicativos Android',
        videos: [
          {
            titulo: 'Video 1 - Criando uma Aplicação Android Básica',
            link: 'https://www.exemplo.com/android-app-video1',
          },
          {
            titulo: 'Video 2 - Conexão com Serviços Web no Android',
            link: 'https://www.exemplo.com/android-app-video2',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    imagem: wall,
    thumbnail: ai,
    nome: 'Curso de Inteligência Artificial e Aprendizado de Máquina',
    slug: 'curso-inteligencia-artificial-aprendizado-maquina',
    descricao:
      'Explore o fascinante mundo da IA e do Aprendizado de Máquina e construa modelos inteligentes.',
    categoria: 'Inteligência Artificial',
    linguagem: 'Python',
    duracao: '16 semanas',
    nivel: 'Avançado',
    link: 'https://www.exemplo.com/curso-ia-aprendizado-maquina',
    avaliacao: 4.8,
    avaliacoes: 600,
  },
  {
    id: 5,
    imagem: wall,
    nome: 'Curso de Segurança Cibernética e Ethical Hacking',
    thumbnail: seguranca,
    slug: 'curso-seguranca-cibernetica-ethical-hacking',
    descricao:
      'Torne-se um especialista em segurança cibernética e proteja sistemas contra ameaças digitais.',
    categoria: 'Segurança Cibernética',
    linguagem: 'Varia de acordo com o tópico',
    duracao: '14 semanas',
    nivel: 'Avançado',
    link: 'https://www.exemplo.com/curso-seguranca-cibernetica',
    avaliacao: 4.6,
    avaliacoes: 450,
  },
  {
    id: 6,
    imagem: wall,
    nome: 'Curso de Desenvolvimento de Aplicativos iOS com Swift',
    thumbnail: apple,
    slug: 'curso-desenvolvimento-aplicativos-ios-swift',
    descricao:
      'Aprenda a criar aplicativos para dispositivos iOS, como iPhone e iPad, usando Swift.',
    categoria: 'Desenvolvimento Mobile',
    linguagem: 'Swift',
    duracao: '10 semanas',
    nivel: 'Intermediário',
    link: 'https://www.exemplo.com/curso-desenvolvimento-ios',
    avaliacao: 4.4,
    avaliacoes: 350,
  },
  {
    id: 7,
    imagem: wall,
    nome: 'Curso de Análise de Dados com Python',
    thumbnail: analise,
    slug: 'curso-analise-dados-com-python',
    descricao:
      'Domine a análise de dados usando Python e transforme informações em insights valiosos.',
    categoria: 'Análise de Dados',
    linguagem: 'Python',
    duracao: '12 semanas',
    nivel: 'Intermediário',
    link: 'https://www.exemplo.com/curso-analise-dados',
    avaliacao: 4.7,
    avaliacoes: 550,
  },
  {
    id: 8,
    imagem: wall,
    nome: 'Curso de Desenvolvimento de Aplicativos Web com React',
    thumbnail: reactNative,
    slug: 'curso-desenvolvimento-aplicativos-web-react',
    descricao:
      'Construa aplicativos web modernos e reativos com a biblioteca React.',
    categoria: 'Desenvolvimento Web',
    linguagem: 'JavaScript (React)',
    duracao: '10 semanas',
    nivel: 'Intermediário',
    link: 'https://www.exemplo.com/curso-desenvolvimento-react',
    avaliacao: 4.3,
    avaliacoes: 400,
  },
  {
    id: 9,
    imagem: wall,
    nome: 'Curso de Desenvolvimento de Aplicativos Móveis com Flutter',
    thumbnail: flutter,
    slug: 'curso-desenvolvimento-aplicativos-moveis-flutter',
    descricao:
      'Crie aplicativos móveis nativos para Android e iOS com o framework Flutter.',
    categoria: 'Desenvolvimento Mobile',
    linguagem: 'Dart',
    duracao: '12 semanas',
    nivel: 'Intermediário',
    link: 'https://www.exemplo.com/curso-desenvolvimento-flutter',
    avaliacao: 4.9,
    avaliacoes: 600,
  },
  {
    id: 10,
    imagem: wall,
    nome: 'Curso de Machine Learning para Ciência de Dados',
    thumbnail: ml,
    slug: 'curso-machine-learning-ciencia-dados',
    descricao:
      'Aprenda os conceitos e técnicas fundamentais de Machine Learning para análise de dados.',
    categoria: 'Ciência de Dados',
    linguagem: 'Python',
    duracao: '14 semanas',
    nivel: 'Avançado',
    link: 'https://www.exemplo.com/curso-machine-learning',
    avaliacao: 4.5,
    avaliacoes: 500,
  },
]
