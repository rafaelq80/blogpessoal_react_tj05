import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext";

function Navbar() {

   /**
     * Cria a constante navigate, que receberá o Hook useNavigate().
     * Através da constante navigate, o usuário será redirecionado 
     * para outras rotas da aplicação, conforme a necessidade.
     */
   const navigate = useNavigate()

   /**
    * Criamos uma desestruturação para receber a função handleLogout(), 
    * disponível na Context AuthContext, através do Hook useContext(). 
    */
   const { handleLogout } = useContext(AuthContext)

   /**
    * Criamos a função logout(), que será responsável por efetuar 
    * o processo de logout do usuário. A função logout() executa a 
    * função handleLogout() da Context AuthContext, responsável por 
    * reiniciar os dados do usuário no contexto da aplicação, ou seja, 
    * retornando para o Estado inicial. 
    * 
    * Na sequência, será exibido um alerta para informar o usuário que 
    * o logout foi efetuado com sucesso e redireciona o usuário para a 
    * Página de Login, através da constante navigate. 
    */
   function logout() {
       handleLogout()
       alert('O usuário foi desconectado com sucesso!')
       navigate('/')
   }
   
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-indigo-900 text-white'>

                <div className="container flex justify-between text-lg">

                    <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>

                    <div className='flex gap-4'>
                        Postagens
                        Temas
                        Cadastrar tema
                        Perfil
                        <Link to='' onClick={logout} className="hover:underline">
                            Sair
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar