"use client"; // Isso permite que a interatividade seja tratada no Client Component

import Button from "@/components/Button";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Home() {
  return (
    <div className="font-[League Spartan] flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-[#5ED85B] bg-gradient-to-r from-[#5ED85B] to-[#7F00B2]">
      <Layout>
        <Logo />
        <Input placeholder="Digite seu email" icon={<FaEnvelope />} />
        <Input placeholder="Digite sua senha" type="password" icon={<FaLock />} />
        <Button label="LOGIN" onClick={() => alert("Botão clicado!")} />
      </Layout>
    </div>
  );
}
