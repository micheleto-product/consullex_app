import React, { useState } from 'react';

// Mock realista de Advogados cadastrados (Em conformidade estrita com o Provimento 205/2021)
const LAWYERS_DATABASE = [
  {
    id: '1',
    name: 'Dra. Mariana Souza',
    oab: 'OAB/SP 123.456',
    specialty: 'Direito de Família',
    state: 'SP',
    bio: 'Graduada e Mestre pela USP. Especialista em planejamento sucessório, partilha de bens e divórcios consensuais. Foco absoluto em soluções extrajudiciais preventivas.',
    price: 350,
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    availableDays: [
      { date: '15/07 (Quarta)', hours: ['09:00', '11:00', '14:00'] },
      { date: '16/07 (Quinta)', hours: ['10:00', '15:30', '17:00'] }
    ]
  },
  {
    id: '2',
    name: 'Dr. Roberto Alencar',
    oab: 'OAB/RJ 987.654',
    specialty: 'Direito Trabalhista',
    state: 'RJ',
    bio: 'Pós-graduado pela UFRJ. Atuação voltada à consultoria preventiva de relações trabalhistas e adequação de microempresas à legislação vigente.',
    price: 300,
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    availableDays: [
      { date: '15/07 (Quarta)', hours: ['08:30', '13:00', '16:00'] },
      { date: '17/07 (Sexta)', hours: ['09:30', '11:30', '14:30'] }
    ]
  },
  {
    id: '3',
    name: 'Dra. Beatriz Mendes',
    oab: 'OAB/MG 111.222',
    specialty: 'Direito Civil',
    state: 'MG',
    bio: 'Especialista em Direito Imobiliário e elaboração de contratos pela UFMG. Auxílio em transações de compra e venda de imóveis e assessoria preventiva.',
    price: 400,
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    availableDays: [
      { date: '16/07 (Quinta)', hours: ['09:00', '14:00', '15:00'] },
      { date: '17/07 (Sexta)', hours: ['10:00', '16:00', '17:30'] }
    ]
  }
];

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  
  // Estados do Modal de Fluxo de Agendamento
  const [activeLawyer, setActiveLawyer] = useState(null);
  const [step, setStep] = useState(1); // 1: Horários, 2: Simulação de Pagamento, 3: Sucesso
  const [bookingDate, setBookingDate] = useState('');
  const [bookingHour, setBookingHour] = useState('');

  const filteredLawyers = LAWYERS_DATABASE.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(search.toLowerCase());
    const matchesState = selectedState ? lawyer.state === selectedState : true;
    const matchesSpecialty = selectedSpecialty ? lawyer.specialty === selectedSpecialty : true;
    return matchesSearch && matchesState && matchesSpecialty;
  });

  const startBooking = (lawyer) => {
    setActiveLawyer(lawyer);
    setStep(1);
    setBookingDate('');
    setBookingHour('');
  };

  const handleSelectTime = (date, hour) => {
    setBookingDate(date);
    setBookingHour(hour);
    setStep(2); // Vai para a simulação de pagamento
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setStep(3); // Sucesso
  };

  const closeModal = () => {
    setActiveLawyer(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
      
      {/* HEADER DE ALTO NÍVEL */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">CONSULLEX</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Inovação e Ética Jurídica</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-slate-600 bg-slate-100 py-1.5 px-3.5 rounded-full border border-slate-200 font-medium">
              Blindado em conformidade com o Provimento 205/21 da OAB
            </span>
          </div>
        </div>
      </header>

      {/* HERO SECTION INFORMATIVO */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-950 text-white py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Encontre Consultoria Preventiva Sob Medida</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Navegue pelos currículos acadêmicos de advogados autônomos. Agende orientações iniciais por videoconferência com transparência, segurança e respeito às diretrizes éticas.
          </p>
        </div>
      </section>

      {/* BUSCA E FILTROS */}
      <main className="max-w-7xl mx-auto py-10 px-6">
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-10">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            🔍 Filtrar Profissionais por Especialidade e Região
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" 
              placeholder="Buscar por nome do profissional..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-slate-900 focus:outline-none text-sm bg-slate-50"
            />
            <select 
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-slate-900 focus:outline-none text-sm bg-slate-50"
            >
              <option value="">Todas as Áreas</option>
              <option value="Direito de Família">Direito de Família (Divórcio, Bens)</option>
              <option value="Direito Trabalhista">Direito Trabalhista</option>
              <option value="Direito Civil">Direito Civil (Contratos)</option>
            </select>
            <select 
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-slate-900 focus:outline-none text-sm bg-slate-50"
            >
              <option value="">Todos os Estados</option>
              <option value="SP">São Paulo (SP)</option>
              <option value="RJ">Rio de Janeiro (RJ)</option>
              <option value="MG">Minas Gerais (MG)</option>
            </select>
          </div>
        </section>

        {/* LISTA DE CARDS DE ADVOGADOS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLawyers.length > 0 ? (
            filteredLawyers.map(lawyer => (
              <div key={lawyer.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition duration-300">
                <div>
                  <div className="flex gap-4 items-center mb-4">
                    <img src={lawyer.avatar} alt={lawyer.name} className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-200" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{lawyer.name}</h4>
                      <p className="text-xs text-slate-400 font-mono font-medium">{lawyer.oab}</p>
                      <span className="inline-block bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-md mt-1 border border-slate-200">
                        {lawyer.specialty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-slate-100 my-4" />
                  
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-4 italic">
                    "{lawyer.bio}"
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block">Valor da Consulta</span>
                    <span className="text-xl font-black text-slate-900">R$ {lawyer.price}</span>
                  </div>
                  <button 
                    onClick={() => startBooking(lawyer)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-xl text-sm transition"
                  >
                    Agendar Consulta
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-400">
              Nenhum profissional encontrado com os filtros selecionados.
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-500 py-12 px-6 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-center md:text-left">
            © 2026 Consullex LTDA. Todos os direitos reservados. Plataforma estritamente tecnológica e informativa nos termos do art. 5º do Código de Ética e Disciplina da OAB.
          </p>
          <div className="flex gap-4 text-xs">
            <span className="hover:text-white transition cursor-pointer">Termos de Uso</span>
            <span>•</span>
            <span className="hover:text-white transition cursor-pointer">Segurança de Dados (LGPD)</span>
          </div>
        </div>
      </footer>

      {/* MODAL DE FLUXO DE AGENDAMENTO COMPLETO */}
      {activeLawyer && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100">
            
            {/* Header do Modal */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  Etapa {step} de 3
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Agendamento com {activeLawyer.name}</h3>
              </div>
              <button 
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold bg-slate-100 hover:bg-slate-200 h-8 w-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Passo 1: Escolha de Horários */}
            {step === 1 && (
              <div>
                <p className="text-xs text-slate-500 mb-4">Selecione uma das datas e horários disponíveis na agenda online do profissional:</p>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                  {activeLawyer.availableDays.map((day, idx) => (
                    <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-700 mb-2">{day.date}</p>
                      <div className="grid grid-cols-3 gap-2">
                        {day.hours.map(hour => (
                          <button
                            key={hour}
                            onClick={() => handleSelectTime(day.date, hour)}
                            className="bg-white border border-slate-200 hover:border-slate-900 hover:bg-slate-50 py-2 rounded-xl text-xs font-bold text-slate-800 transition text-center"
                          >
                            {hour}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Passo 2: Checkout / Pagamento Seguro */}
            {step === 2 && (
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1.5">
                  <p>📅 <strong>Horário Reservado:</strong> {bookingDate} às {bookingHour}</p>
                  <p>💳 <strong>Valor da Orientação:</strong> R$ {activeLawyer.price}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Nome no Cartão</label>
                    <input required type="text" placeholder="Ex: MARIANA S SILVA" className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-1 focus:ring-slate-900 text-sm bg-slate-50" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Número do Cartão</label>
                    <input required type="text" placeholder="•••• •••• •••• ••••" className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-1 focus:ring-slate-900 text-sm bg-slate-50" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Validade</label>
                      <input required type="text" placeholder="MM/AA" className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-1 focus:ring-slate-900 text-sm bg-slate-50" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">CVV</label>
                      <input required type="text" placeholder="123" className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-1 focus:ring-slate-900 text-sm bg-slate-50 animate-none" />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm transition mt-4"
                >
                  Confirmar e Pagar R$ {activeLawyer.price}
                </button>
              </form>
            )}

            {/* Passo 3: Sucesso */}
            {step === 3 && (
              <div className="text-center py-6">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">✓</div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Consulta Reservada!</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  Seu horário no dia <strong>{bookingDate}</strong> às <strong>{bookingHour}</strong> está garantido. O link seguro para a videochamada foi enviado ao seu e-mail cadastrado.
                </p>
                <button 
                  onClick={closeModal}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition"
                >
                  Concluir
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}