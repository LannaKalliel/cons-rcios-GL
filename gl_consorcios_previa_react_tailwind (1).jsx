import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function GLConsorciosModern() {
  const [tipo, setTipo] = useState("imovel");
  const [valor, setValor] = useState(120000);
  const [parcelas, setParcelas] = useState(120);
  const [resultado, setResultado] = useState(null);

  const ADMIN_FEE_RATE = 0.02;

  function formatBRL(num) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(num);
  }

  function calcular() {
    const v = Number(valor) || 0;
    const p = Number(parcelas) || 1;
    const totalComTaxa = v * (1 + ADMIN_FEE_RATE);
    const parcela = totalComTaxa / p;
    setResultado({ total: totalComTaxa, parcela });
  }

  function getParcelasDisponiveis() {
    if (tipo === "veiculo") return [12, 24, 36, 48, 60, 72];
    return [60, 84, 96, 108, 120, 150, 180];
  }

  function getValorInicial(tipoSelecionado) {
    return tipoSelecionado === "imovel" ? 120000 : 50000;
  }

  function handleTipoChange(novoTipo) {
    setTipo(novoTipo);
    setValor(getValorInicial(novoTipo));
    setParcelas(novoTipo === "veiculo" ? 72 : 120);
  }

  const imagemHero =
    tipo === "imovel"
      ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1920&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-50 text-gray-800">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b shadow-md z-20">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-red-900 text-white flex items-center justify-center font-bold text-2xl shadow-md">GL</div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-red-900">GL Consórcios de Veículos e Imóveis</h1>
              <p className="text-sm text-gray-500 italic">A chave de suas conquistas!</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Hero dinâmico */}
      <section className="relative overflow-hidden rounded-b-[3rem] transition-all duration-700">
        <img
          key={imagemHero}
          src={imagemHero}
          alt={tipo === "imovel" ? "Casa de luxo" : "Carro de luxo"}
          className="w-full h-[75vh] object-cover opacity-95 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end px-10 pb-20 text-white">
          <motion.h2 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl font-bold mb-4">
            A chave de suas conquistas está aqui
          </motion.h2>
          <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg text-gray-200 max-w-2xl">
            Com a GL Consórcios de Veículos e Imóveis, você conquista seus sonhos com planejamento, segurança e sem juros.
          </motion.p>
        </div>
      </section>

      {/* Simulador */}
      <section id="simulador" className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Simule seu Consórcio</h2>
          <p className="text-gray-200 mb-10">Escolha o tipo, defina o valor e descubra o plano ideal para você.</p>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white text-gray-800 rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-2">
                <button onClick={() => handleTipoChange("imovel")} className={`flex-1 py-2 rounded-md border ${tipo === "imovel" ? "bg-red-900 text-white" : "bg-gray-100"}`}>Imóvel</button>
                <button onClick={() => handleTipoChange("veiculo")} className={`flex-1 py-2 rounded-md border ${tipo === "veiculo" ? "bg-red-900 text-white" : "bg-gray-100"}`}>Veículo</button>
              </div>

              <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} className="w-full border rounded-md px-4 py-2" placeholder="Valor desejado" />
              <select value={parcelas} onChange={(e) => setParcelas(e.target.value)} className="w-full border rounded-md px-4 py-2">
                {getParcelasDisponiveis().map((n) => (
                  <option key={n} value={n}>{n}x</option>
                ))}
              </select>
              <button onClick={calcular} className="w-full bg-red-900 text-white py-3 rounded-md font-medium shadow-md hover:bg-red-800">Calcular</button>
            </div>

            {resultado && (
              <div className="text-left bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-semibold text-red-900 mb-3">Resultado da Simulação</h3>
                <p>Tipo: <strong>{tipo === "imovel" ? "Imóvel" : "Veículo"}</strong></p>
                <p>Parcela aproximada: <strong>{formatBRL(resultado.parcela)}</strong></p>
                <p>Total com taxa: {formatBRL(resultado.total)}</p>
                <p className="text-xs text-gray-500 mt-2">*Simulação estimada. Consulte condições reais com um consultor GL.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Botão flutuante WhatsApp */}
      <a
        href="https://wa.me/5511999999999?text=Olá! Quero saber mais sobre os consórcios da GL."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 GL Consórcios de Veículos e Imóveis — A chave de suas conquistas!</p>
          <p className="text-sm">contato@glconsorcios.com.br | (11) 99999-9999</p>
        </div>
      </footer>
    </div>
  );
}
