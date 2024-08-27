import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './Cadastro.css'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

function Cadastro() {

  /**
  * Cria a constante navigate, que receberá o hook useNavigate().
  * Através da constante navigate, o usuário será redirecionado 
  * para outras rotas da aplicação, conforme a necessidade.
  */
  const navigate = useNavigate();

  /**
  * Definimos um estado chamado isLoading, do tipo boolean, através do 
  * Hook UseState, com o valor inicial false. 
  * Este estado será utilizado para armazenar um valor do tipo boolean, 
  * auxiliando no processo de confirmação se uma determinada ação foi 
  * finalizada (false) ou não (true). 
  * Para atualizar o estado da variável isLoading, foi criada a 
  * função setIsLoading.
  * 
  * Para modificar o valor do estado isLoading, foi criada a função 
  * setIsLoading, responsável por atualizar o valor do estado 
  * isLoading, seguindo a sintaxe básica do Hook useState. 
  */
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * Criamos um estado chamado confirmaSenha, do tipo string, através 
   * do Hook UseState, com o valor inicial vazio. 
   * Este estado será utilizado para armazenar e controlar o valor do 
   * input confirmarSenha do formulário.
   * 
   * Para modificar o valor do estado confirmaSenha, foi criada a função 
   * setConfirmaSenha, responsável por atualizar o valor do estado 
   * confirmaSenha, seguindo a sintaxe básica do Hook useState. 
   */
  const [confirmaSenha, setConfirmaSenha] = useState<string>('');

  /**
   * Criamos um estado chamado usuario, do tipo Usuario (Interface Model), 
   * através do Hook UseState, com todos os atributos da Interface Usuario,
   * inicializados com o valor vazio ou zero, de acordo com as respectivas 
   * tipagens de cada atributo. 
   * Para modificar o valor do estado, foi criada a função setUsuario, 
   * seguindo a sintaxe básica do Hook useState.
   * 
   * O objetivo do estado usuario é armazenar as informações do usuário, 
   * que será cadastrado na aplicação.
   */
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  });

  /**
    * Adicionamos o Hook useEffect, que será executado sempre que houver 
    * uma mudança no estado do usuario.
    * 
    * Todas as vezes que ocorrer uma mudança no estado usuario, 
    * o Laço Condicional verificará se o atributo ID do usuário é diferente de zero. 
    * Se o ID for diferente de zero, significa que o usuário foi cadastrado,
    * desta forma, a constante navigate será invocada para redirecionar o 
    * usuário para a rota do componente Home (/login). 
   */
  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  /**
   * Cria a função retornar(), que será responsável por redirecionar o usuário 
   * para a rota do Componente Login, após o cadastro do usuário ser bem sucedido. 
   * 
   * O botão Cancelar também utilizará esta mesma função, para redirecionar 
   * o usuário para o Componente Login, caso ele desista de efetuar o Cadastro.
   */
  function retornar() {
    navigate('/login')
  }

  /**
  * A função atualizarEstado é utilizada para atualizar dinamicamente os dados 
  * dos atributos do Estado usuario, que será enviado para a autenticação 
  * do usuário no Backend. 
  * 
  * Quando um elemento input do Formulário for modificado, ou seja, o usuário 
  * digitar alguma coisa no input, esta função criará um novo objeto usuario, 
  * mantendo todos os valores armazenados anteriormente, através do Operador Spread. 
  * Além disso, o atributo associado ao input, que teve o seu valor alterado, 
  * será atualizado com o novo valor digitado pelo usuário.
  * 
  * [e.target.name] 🡪 Propriedade name do input que foi modificado
  * 
  * e.target.value 🡪 Valor atual digitado dentro do input.
  * 
  * Como as propriedades name de todos os inputs, possuem os mesmos nomes dos atributos 
  * definidos no Estado usuario, o valor do input que foi modificado, será atribuído 
  * ao respectivo atributo do Estado usuario.
  */
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  /**
   * Essa função é utilizada para atualizar o Estado confirmaSenha, 
   * com o valor inserido pelo usuário no input confirmarSenha. Sempre que o usuário digita algo nesse campo, essa função é chamada e atualiza o Estado. 
   */
  function handleConfirmaSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  /**
   * A função cadastrarNovoUsuario() é responsável por realizar o processo de 
   * cadastro de um novo usuário na aplicação. 
   * Enquanto o processo de cadastro está em andamento, a função exibe 
   * um indicador de carregamento (Loader), valida as senhas, trata os erros do processo, 
   * exibe alertas de sucesso ou falha do processo e atualiza o Estado da aplicação, 
   * incluindo a atualização dos dados do Estado usuario após o cadastro bem-sucedido.
   */
  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {

    /**
     * A Função e.preventDefault() tem a responsabilidade de impedir que a página seja 
     * recarregada todas as vezes que os dados do formulário forem enviados, ao clicar
     * no botão cadastrar.
     */
    e.preventDefault();

    /**
     * O Laço Condicional verifica se a senha digitada no input senha e 
     * a senha digitada no input confirmarSenha são iguais, além de 
     * verificar se as senhas digitadas possuem pelo menos 8 caracteres.
     */
    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {

      /**
       * A função setIsLoading(true) modifica o valor do Estado isLoading 
       * para true, indicando que o processo de cadastro está em andamento, 
       * exibindo o Loader.
       */
      setIsLoading(true)

      try {

        /**
         * Dentro do bloco TRY, invocamos a função cadastrarUsuario, do Script Service. 
         * Seguindo a sua estrutura, passamos como argumentos:
         * 
         * - A URL do endpoint de cadastro ('/usuarios/cadastrar'), definida no recurso Usuario do Backend;
         * - O Estado usuario, contendo os dados que serão persistidos no Banco de dados;
         * - A função setUsuario, que será utilizada para atualizar o Estado do objeto usuario, 
         * com os dados recebidos na Resposta da Requisição HTTP. 
         */
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        alert('Usuário cadastrado com sucesso!');

      } catch (error) {
        alert('Erro ao cadastrar o usuário!')
      }

    } else {
      alert("Dados estão inconsistentes! Verifique os dados do usuário.");
      setUsuario({ ...usuario, senha: '' });
      setConfirmaSenha('');
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>

        {/* 
          Adicionamos o Evento onSubmit no formulário, passando como argumento 
          a função cadastrarNovoUsuario, ou seja, quando o usuário enviar o formulário 
          (clicar no botão entrar), a função definida dentro dos parênteses será
          executada. 
        */}
        <form className='flex justify-center items-center flex-col w-2/3 gap-3'
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
               
              /**
               * Através da propriedade value, definimos que o valor dentro desse 
               * input será o mesmo valor que estiver armazenado no respectivo 
               * atributo do Estado usuario. 
               */
              value={usuario.nome}

              /**
              * Através do evento onChange definiremos a função que será executada, 
              * todas as vezes que o valor do input for modificado, ou seja, quando 
              * o usuário digitar alguma coisa no input. 
              * 
              * A função (e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e), 
              * receberá os dados do input que foi modificado, através do parâmetro e (Evento).
              */
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

              /**
               * Através da propriedade value, definimos que o valor dentro desse 
               * input será o mesmo valor que estiver armazenado no respectivo 
               * atributo do Estado usuario. 
               */
              value={usuario.usuario}

              /**
              * Através do evento onChange definiremos a função que será executada, 
              * todas as vezes que o valor do input for modificado, ou seja, quando 
              * o usuário digitar alguma coisa no input. 
              * 
              * A função (e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e), 
              * receberá os dados do input que foi modificado, através do parâmetro e (Evento).
              */
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

              /**
               * Através da propriedade value, definimos que o valor dentro desse 
               * input será o mesmo valor que estiver armazenado no respectivo 
               * atributo do Estado usuario. 
               */
              value={usuario.foto}

              /**
              * Através do evento onChange definiremos a função que será executada, 
              * todas as vezes que o valor do input for modificado, ou seja, quando 
              * o usuário digitar alguma coisa no input. 
              * 
              * A função (e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e), 
              * receberá os dados do input que foi modificado, através do parâmetro e (Evento).
              */
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

              /**
               * Através da propriedade value, definimos que o valor dentro desse 
               * input será o mesmo valor que estiver armazenado no respectivo 
               * atributo do Estado usuario. 
               */
              value={usuario.senha}

              /**
              * Através do evento onChange definiremos a função que será executada, 
              * todas as vezes que o valor do input for modificado, ou seja, quando 
              * o usuário digitar alguma coisa no input. 
              * 
              * A função (e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e), 
              * receberá os dados do input que foi modificado, através do parâmetro e (Evento).
              */
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

               /**
               * Através da propriedade value, definimos que o valor dentro desse 
               * input será o Estado confirmaSenha. 
               */
              value={confirmaSenha}

              /**
              * Através do evento onChange definiremos a função que será executada, 
              * todas as vezes que o valor do input for modificado, ou seja, quando 
              * o usuário digitar alguma coisa no input.
              *  
              * Observe que neste input foi passada outra função, a função handleConfirmarSenha(e)
              *  
              * A função (e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e), 
              * receberá os dados do input confirmarSenha, através do parâmetro e (Evento).
              */
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmaSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            {/* 
              Adicionamos no botão Cancelar o evento onClick para executar a função retornar(). 
            */}
            <button className='rounded text-white bg-red-400 
                  hover:bg-red-700 w-1/2 py-2'
              onClick={retornar}
            >
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