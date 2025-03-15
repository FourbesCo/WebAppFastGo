import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardLayout from '../components/layout/CardLayout';
import FastGoLogo from '../components/common/FastGoLogo';
import { Mail, KeyRound, LogIn, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import Lottie from 'lottie-react';
import loadingAnimation from '../../public/svg/Animation.json';

// Cores personalizadas
const COLORS = {
  green: '#5ed85b',
  purple: '#7f00b2',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [appear, setAppear] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAppear(true);
    document.body.classList.add('animated-bg');
    return () => {
      document.body.classList.remove('animated-bg');
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Preencha todos os campos');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      navigate('/menu');
      toast.success('Login realizado com sucesso');
      setLoading(false);
    }, 5000);
  };

  return (
    <CardLayout showBackButton={false}>
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
          
          @keyframes float {
            0% { transform: translateY(0px) }
            50% { transform: translateY(-20px) }
            100% { transform: translateY(0px) }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 0.9; }
            100% { transform: scale(1); opacity: 0.7; }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .animated-gradient {
            background: linear-gradient(135deg, ${COLORS.purple}, ${COLORS.green}, ${COLORS.purple});
            background-size: 400% 400%;
            animation: gradientAnimation 15s ease infinite;
          }
          
          .floating {
            animation: float 6s ease-in-out infinite;
          }
          
          .pulsing {
            animation: pulse 3s ease-in-out infinite;
          }
          
          .spinning {
            animation: spin 20s linear infinite;
          }
          
          .btn-shine {
            position: relative;
            overflow: hidden;
          }
          
          .btn-shine::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              to bottom right,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.4) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            transform: rotate(45deg);
            transition: all 0.5s;
            opacity: 0;
          }
          
          .btn-shine:hover::after {
            opacity: 1;
            left: 100%;
            top: 100%;
            transition: all 0.8s;
          }
        `}
      </style>
      
      <div className="absolute inset-0 animated-gradient rounded-3xl opacity-95"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 spinning"></div>
        <div 
          className="absolute left-1/4 top-1/4 w-16 h-16 rounded-full floating"
          style={{ background: COLORS.green, opacity: 0.2 }}
        ></div>
        <div 
          className="absolute right-1/4 bottom-1/3 w-24 h-24 rounded-full pulsing"
          style={{ background: COLORS.purple, opacity: 0.15 }}
        ></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-32 -mb-32"></div>
      </div>
      
      <div className="relative flex flex-col justify-center items-center h-full px-6 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-6 w-full">
            <div 
              className="transition-all duration-500 ease-in-out p-6 rounded-3xl bg-white shadow-2xl"
              style={{ width: "320px", height: "320px" }}
            >
              <Lottie 
                animationData={loadingAnimation} 
                loop={true}
                style={{ width: '100%', height: '100%' }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid meet'
                }}
              />
            </div>
            <p className="text-white font-bold text-xl mt-6 tracking-wide flex items-center">
              <span className="inline-block mr-2">Verificando credenciais</span>
              <span className="flex space-x-1">
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </span>
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <div 
              className={`mb-8 transform transition-all duration-700 flex justify-center ${
                appear ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
              }`}
            >
              <FastGoLogo />
            </div>
            
            <div 
              className={`bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-700 border border-white border-opacity-20 ${
                appear ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              <div className="px-8 py-6 relative" style={{ background: `linear-gradient(to right, ${COLORS.purple}, ${COLORS.green})` }}>
                <h1 className="text-3xl font-bold text-white">Login</h1>
                <p className="text-white text-opacity-80 mt-1">Acesse sua conta FastGo</p>
                
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 right-10 w-8 h-8 bg-white opacity-10 rounded-full"></div>
              </div>
              
              <form onSubmit={handleLogin} className="p-8">
                <div 
                  className={`mb-6 transform transition-all duration-700 delay-200 ${
                    appear ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`}
                >
                  <label htmlFor="email" className="block text-sm font-bold text-white mb-2 ml-1">
                    E-mail
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5" style={{ color: COLORS.purple }} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Entre seu email"
                      className="w-full py-4 pl-12 pr-4 bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 rounded-xl border-2 border-transparent focus:border-purple-500 focus:ring-4 focus:ring-green-200 outline-none transition-all duration-200 text-base"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div 
                  className={`mb-6 transform transition-all duration-700 delay-300 ${
                    appear ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`}
                >
                  <label htmlFor="password" className="block text-sm font-bold text-white mb-2 ml-1">
                    Senha
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5" style={{ color: COLORS.purple }} />
                    </div>
                    <input
                      id="password"
                      type="password"
                      placeholder="Senha da conta"
                      className="w-full py-4 pl-12 pr-4 bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 rounded-xl border-2 border-transparent focus:border-purple-500 focus:ring-4 focus:ring-green-200 outline-none transition-all duration-200 text-base"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <div 
                  className={`flex justify-end mb-6 transform transition-all duration-700 delay-400 ${
                    appear ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                >
                  <a 
                    href="#" 
                    className="text-sm text-white hover:text-green-200 font-medium transition-colors duration-200"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                
                <div 
                  className={`transform transition-all duration-700 delay-500 ${
                    appear ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  <button 
                    type="submit" 
                    className="w-full py-4 px-6 text-white font-bold rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 transition-all duration-300 relative btn-shine"
                    style={{ background: `linear-gradient(to right, ${COLORS.purple}, ${COLORS.green})` }}
                  >
                    <span className="relative z-10">ENTRAR</span>
                    <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
                
                <div 
                  className={`mt-8 text-center transform transition-all duration-700 delay-600 ${
                    appear ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  <p className="text-white text-opacity-80">
                    Não tem uma conta? 
                    <a 
                      href="#" 
                      className="ml-1 text-white hover:text-green-200 font-bold transition-colors duration-200"
                    >
                      Cadastre-se
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </CardLayout>
  );
};
export default Login;