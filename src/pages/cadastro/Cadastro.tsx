import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Usuario from '../../models/Usuario'
import './Cadastro.css'
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

function Cadastro() {

  // Hook useNavigate para redirecionar rotas
  const navigate = useNavigate();

  // Estado que vai guardar os dados do meu usuário
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: ""
  })

  // Estado que vai guardar a confirmação da senha
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  // Estado que vai indicar quando a animação (loader) será carregada
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect para monitorar o Estado usuario
  useEffect(() => {
    if (usuario.id !== 0){
      retornar()
    }
  }, [usuario])

  // Redireciona para o Componente Login (rota /login)
  function retornar() {
    navigate('/login')
  }

  // Função que atualiza as propriedades do Estado Usuário com os dados digitados no input
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  // Função que atualiza o Estado confirmaSenha
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  // Função para cadastrar um novo usuário
  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {

    // Impede o comportamento padrão do formulário
    e.preventDefault()

    // Valida a senha
    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {

      // Inicializa a animação
      setIsLoading(true)

      try {

        // Executa a função de cadastro do usuário
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        alert("Usuário Cadastrado com Sucesso!")

      } catch (error) {
        alert('Erro ao cadastrar o usuário!')
      }

    } else {
      alert("Dados inconsistentes! Verifique as informações do Cadastro.")
      setUsuario({ ...usuario, senha: "" })
      setConfirmaSenha("")
    }

    // Finaliza a animação
    setIsLoading(false)
  }

  console.log(usuario)
  console.log(confirmaSenha)

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form onSubmit={cadastrarNovoUsuario} className='flex justify-center items-center flex-col w-2/3 gap-3' >
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button className='rounded text-white bg-red-400 
                  hover:bg-red-700 w-1/2 py-2' >
              Cancelar
            </button>
            <button
              type='submit'
              className='rounded text-white bg-indigo-400 
                           hover:bg-indigo-900 w-1/2 py-2
                           flex justify-center'
            >
              {isLoading ? <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              /> :
                <span>Cadastrar</span>
              }

            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro