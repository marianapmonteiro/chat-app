import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import api from '@/lib/api';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants';
import { useAppStore } from '@/store/index';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const validateLogin = () => {
    if (!email.length) {
      toast.error('Por favor digite seu e-mail.');
      return false;
    }
    if (!password.length) {
      toast.error('Por favor digite sua senha.');
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!email.length) {
      toast.error('Email não pode ser nulo.');
      return false;
    }
    if (!password.length) {
      toast.error('Senha não pode ser nula.');
      return false;
    }
    if (!confirmPass.length) {
      toast.error('Por favor confirme a senha.');
      return false;
    }
    if (confirmPass !== password) {
      toast.error('Senhas não conferem.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await api.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.user.id) {
        setUserInfo(response.data.user);
        if (response.data.user.profileSetup) {
          navigate('/chat');
        } else {
          navigate('/profile');
        }
      }
      console.log({ response });
    }
  };

  const handleSignup = async () => {
    try {
      if (validateSignup()) {
        const response = await api.post(
          SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.status === 201) {
          navigate('/profile');
          toast.success('Usuário criado com sucesso!');
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error(error.response.data);
        } else {
          toast.error('Ocorreu um erro ao criar o usuário');
        }
      } else {
        toast.error('Erro na comunicação com o servidor');
      }
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[url('/background.jpg')] bg-cover bg-center">
      <div className="h-[80%] w-[80%] bg-[#96c5e2] bg-opacity-75 rounded-[12px] backdrop-blur-md backdrop-saturate-100 flex justify-center items-center">
        <div className="flex flex-col gap-4 w-[80%] md:w-full lg:w-[80%] justify-center items-center">
          <h3 className="xs:text-[36px]  md:text-[44px] font-extrabold">
            Bem vindo(a)!
          </h3>
          <p className="xs:text-[20px] md:text-[24px] mb-8">
            Digite seu e-mail e senha
          </p>
          <Tabs
            defaultValue="login"
            className="w-full flex flex-col justify-center items-center"
          >
            <TabsList className="bg-transparent rounded-none xs:w-full md:w-[80%] lg:w-1/2">
              <TabsTrigger
                value="login"
                className="border-b-2 border-b-black border-opacity-10 text-black text-opacity-50 rounded-none w-full data-[state=active]:bg-transparent  data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-blue-700 p-3 transition-all duration-300"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="border-b-2 border-b-black border-opacity-10 text-black text-opacity-50 rounded-none w-full data-[state=active]:bg-transparent  data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-blue-700 p-3 transition-all duration-300"
              >
                SignUp
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="login"
              className="w-full flex flex-col gap-6 mt-8 items-center justify-center"
            >
              <Input
                className="xs:w-full md:w-[80%] lg:w-[50%] placeholder:text-white placeholder:text-opacity-40 text-white bg-[#3c5869] bg-opacity-25 rounded-[12px] border-none focus-visible:ring-offset-0 focus-visible:ring-0"
                value={email}
                type="email"
                placeholder="E-mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                className="xs:w-full md:w-[80%] lg:w-[50%] placeholder:text-white placeholder:text-opacity-40 text-white bg-[#3c5869] bg-opacity-25 rounded-[12px] border-none focus-visible:ring-offset-0 focus-visible:ring-0"
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                className="xs:w-full md:w-[80%] lg:w-[50%] bg-blue-700 hover:bg-blue-900"
                onClick={handleLogin}
              >
                Login
              </Button>
            </TabsContent>
            <TabsContent
              value="signup"
              className="w-full flex flex-col gap-6 items-center justify-center"
            >
              <Input
                className="xs:w-full md:w-[80%] lg:w-[50%] placeholder:text-white placeholder:text-opacity-40 text-white bg-[#3c5869] bg-opacity-25 rounded-[12px] border-none focus-visible:ring-offset-0 focus-visible:ring-0"
                value={email}
                type="email"
                placeholder="E-mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                className="xs:w-full md:w-[80%] lg:w-[50%] placeholder:text-white placeholder:text-opacity-40 text-white bg-[#3c5869] bg-opacity-25 rounded-[12px] border-none focus-visible:ring-offset-0 focus-visible:ring-0"
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Input
                className="xs:w-full md:w-[80%] lg:w-[50%] placeholder:text-white placeholder:text-opacity-40 text-white bg-[#3c5869] bg-opacity-25 rounded-[12px] border-none focus-visible:ring-offset-0 focus-visible:ring-0"
                value={confirmPass}
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                }}
              />
              <Button
                className="xs:w-full md:w-[80%] lg:w-[50%] bg-blue-700 hover:bg-blue-900"
                onClick={handleSignup}
              >
                Sign Up
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
