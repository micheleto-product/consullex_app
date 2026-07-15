import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  Switch,
  SafeAreaView,
  Platform,
  Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'agendamento_sucesso'
  const [selectedArea, setSelectedArea] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Controle de agendamento temporário
  const [selectedAdvogado, setSelectedAdvogado] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Form final
  const [step, setStep] = useState(1); // 1: Escolha no Card / 2: Formulário LGPD / 3: Sucesso
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    termos: false
  });

  const areas = [
    { id: 'todos', nome: 'Todas as Áreas', icon: 'grid' },
    { id: 'civil', nome: 'Civil e Família', icon: 'user' },
    { id: 'trabalhista', nome: 'Trabalhista', icon: 'briefcase' },
    { id: 'empresarial', nome: 'Empresarial', icon: 'activity' },
    { id: 'penal', nome: 'Penal', icon: 'shield' },
  ];

  const advogados = [
    { 
      id: '1', 
      nome: 'Dra. Mariana Silva', 
      cargo: 'Especialista em Família e Sucessões', 
      OAB: 'OAB/SP 123.456',
      area: 'civil',
      desc: 'Advogada dedicada a resoluções consensuais e planejamento patrimonial familiar. Foco em acolhimento e escuta ativa de cada caso.',
      consultas: 1420,
      avatar: 'MS'
    },
    { 
      id: '2', 
      nome: 'Dr. Roberto Santos', 
      cargo: 'Direito Contratual e Imobiliário', 
      OAB: 'OAB/SP 234.567',
      area: 'civil',
      desc: 'Focado em segurança em transações de imóveis, elaboração e revisão de contratos complexos civis e comerciais.',
      consultas: 890,
      avatar: 'RS'
    },
    { 
      id: '3', 
      nome: 'Dr. Carlos Eduardo', 
      cargo: 'Especialista em Relações do Trabalho', 
      OAB: 'OAB/SP 345.678',
      area: 'trabalhista',
      desc: 'Atuação preventiva corporativa e defesa de direitos do trabalhador de alta gerência. Pareceres técnicos detalhados.',
      consultas: 1150,
      avatar: 'CE'
    },
    { 
      id: '4', 
      nome: 'Dra. Beatriz Costa', 
      cargo: 'Consultora de Direito Empresarial', 
      OAB: 'OAB/SP 456.789',
      area: 'empresarial',
      desc: 'Assessoria em estruturação societária, acordos de sócios e proteção à propriedade intelectual para Startups e PMEs.',
      consultas: 620,
      avatar: 'BC'
    }
  ];

  const datasDisponiveis = [
    { data: '2026-07-20', diaSemana: 'SEG', diaNum: '20' },
    { data: '2026-07-21', diaSemana: 'TER', diaNum: '21' },
    { data: '2026-07-22', diaSemana: 'QUA', diaNum: '22' },
    { data: '2026-07-23', diaSemana: 'QUI', diaNum: '23' }
  ];

  const horariosDisponiveis = ['09:00', '10:30', '14:00', '15:30', '17:00'];

  const handleSelectSlot = (adv, data, hora) => {
    setSelectedAdvogado(adv);
    setSelectedDate(data);
    setSelectedTime(hora);
    setStep(2); // Avança para o form LGPD
  };

  const handleConfirmAgendamento = () => {
    if (formData.nome && formData.email && formData.termos) {
      setStep(3); // Sucesso
    }
  };

  const handleReset = () => {
    setSelectedAdvogado(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ nome: '', email: '', telefone: '', termos: false });
    setStep(1);
    setCurrentPage('home');
  };

  // Filtragem dos Especialistas
  const filteredAdvogados = advogados.filter(adv => {
    const matchesArea = selectedArea === 'todos' || adv.area === selectedArea;
    const matchesSearch = adv.nome.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          adv.cargo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesArea && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 1. HEADER (Zenklub Style) */}
      <View style={styles.navbar}>
        <View style={styles.navbarLeft}>
          <Feather name="scale" size={24} color="#6d28d9" />
          <Text style={styles.logoText}>consullex</Text>
        </View>
        <View style={styles.navbarRight}>
          <Text style={styles.navLink}>Para Empresas</Text>
          <Text style={styles.navLink}>Especialistas</Text>
          <TouchableOpacity style={styles.btnNavPrimary}>
            <Text style={styles.btnNavPrimaryText}>Atendimento Urgente</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {currentPage === 'home' && step === 1 && (
          <View>
            
            {/* 2. HERO SECTION */}
            <View style={styles.heroSection}>
              <View style={styles.heroLeft}>
                <View style={styles.heroBadge}>
                  <Text style={styles.heroBadgeText}>O melhor benefício de segurança jurídica</Text>
                </View>
                <Text style={styles.heroTitle}>Apoio jurídico especializado que cabe na sua rotina</Text>
                <Text style={styles.heroSubtitle}>
                  Simplificamos o contato com advogados éticos e especializados. Agende consultas online criptografadas e resolva suas pendências sem burocracia.
                </Text>
                
                {/* Search Bar */}
                <View style={styles.searchBarContainer}>
                  <Feather name="search" size={20} color="#64748b" />
                  <TextInput 
                    placeholder="Procure por nome, especialidade jurídica..."
                    placeholderTextColor="#64748b"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
              </View>

              {/* Lado Direito do Hero (Ilustrativo) */}
              {Platform.OS === 'web' && (
                <View style={styles.heroRight}>
                  <View style={styles.heroIllustrationCard}>
                    <Feather name="shield-off" size={40} color="#6d28d9" style={{ marginBottom: 12 }} />
                    <Text style={styles.illustrationCardTitle}>Ambiente Seguro</Text>
                    <Text style={styles.illustrationCardDesc}>Todas as consultas e trocas de arquivos contam com segurança de sigilo profissional e LGPD.</Text>
                  </View>
                </View>
              )}
            </View>

            {/* 3. FILTRO DE ÁREAS (BOTÕES ESTILO ZENKLUB) */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Selecione a área do seu interesse</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.areaFiltersScroll}>
                {areas.map(area => (
                  <TouchableOpacity 
                    key={area.id}
                    style={[
                      styles.filterTag,
                      selectedArea === area.id && styles.filterTagActive
                    ]}
                    onPress={() => setSelectedArea(area.id)}
                  >
                    <Feather name={area.icon} size={14} color={selectedArea === area.id ? "#ffffff" : "#6d28d9"} />
                    <Text style={[styles.filterTagText, selectedArea === area.id && styles.filterTagTextActive]}>
                      {area.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* 4. VITRINE DE ADVOGADOS COM AGENDA INTEGRADA */}
            <View style={styles.sectionContainer}>
              <Text style={styles.resultsCount}>Encontramos {filteredAdvogados.length} especialistas disponíveis</Text>
              
              {filteredAdvogados.map(adv => (
                <View key={adv.id} style={styles.expertCard}>
                  
                  {/* Perfil Técnico */}
                  <View style={styles.expertInfoSide}>
                    <View style={styles.expertHeaderRow}>
                      <View style={styles.expertAvatar}>
                        <Text style={styles.expertAvatarText}>{adv.avatar}</Text>
                      </View>
                      <View style={styles.expertTitleCol}>
                        <View style={styles.expertNameContainer}>
                          <Text style={styles.expertName}>{adv.nome}</Text>
                          <Feather name="check-circle" size={16} color="#6d28d9" style={{ marginLeft: 6 }} />
                        </View>
                        <Text style={styles.expertCargo}>{adv.cargo}</Text>
                        <Text style={styles.expertOab}>{adv.OAB}</Text>
                      </View>
                    </View>

                    <Text style={styles.expertDesc}>{adv.desc}</Text>

                    <View style={styles.expertStatsRow}>
                      <View style={styles.statBadge}>
                        <Feather name="message-square" size={12} color="#475569" />
                        <Text style={styles.statBadgeText}>{adv.consultas} atendimentos</Text>
                      </View>
                      <View style={styles.statBadge}>
                        <Feather name="star" size={12} color="#eab308" />
                        <Text style={styles.statBadgeText}>5.0 (Excelente)</Text>
                      </View>
                    </View>
                  </View>

                  {/* Agenda Integrada Lateral (Zenklub UX) */}
                  <View style={styles.expertScheduleSide}>
                    <Text style={styles.scheduleTitle}>Selecione uma data e horário:</Text>
                    
                    {/* Linha das Datas */}
                    <View style={styles.daysRow}>
                      {datasDisponiveis.map(d => (
                        <TouchableOpacity 
                          key={d.data}
                          style={[
                            styles.dayColumn,
                            selectedDate === d.data && styles.dayColumnActive
                          ]}
                          onPress={() => {
                            setSelectedDate(d.data);
                            setSelectedAdvogado(adv);
                          }}
                        >
                          <Text style={[styles.dayText, selectedDate === d.data && styles.dayTextActive]}>{d.diaSemana}</Text>
                          <Text style={[styles.dayNum, selectedDate === d.data && styles.dayNumActive]}>{d.diaNum}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    {/* Horários para o dia selecionado */}
                    <View style={styles.hoursGrid}>
                      {horariosDisponiveis.map(h => {
                        const isThisAdv = selectedAdvogado?.id === adv.id;
                        return (
                          <TouchableOpacity 
                            key={h}
                            style={[
                              styles.hourButton,
                              isThisAdv && selectedTime === h && styles.hourButtonActive
                            ]}
                            onPress={() => handleSelectSlot(adv, selectedDate || datasDisponiveis[0].data, h)}
                          >
                            <Text style={[
                              styles.hourButtonText,
                              isThisAdv && selectedTime === h && styles.hourButtonTextActive
                            ]}>{h}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    <Text style={styles.legalNotice}>Consultas em conformidade com o Código de Ética da OAB.</Text>
                  </View>

                </View>
              ))}
            </View>

            {/* 5. SEÇÃO INSTITUCIONAL / CONFIANÇA */}
            <View style={styles.trustSection}>
              <Text style={styles.trustTitle}>Segurança e transparência jurídica com tecnologia</Text>
              
              <View style={styles.trustGrid}>
                <View style={styles.trustItem}>
                  <Text style={styles.trustItemValue}>100%</Text>
                  <Text style={styles.trustItemLabel}>Sigilo Profissional assegurado por criptografia de ponta</Text>
                </View>
                <View style={styles.trustItem}>
                  <Text style={styles.trustItemValue}>LGPD</Text>
                  <Text style={styles.trustItemLabel}>Conformidade rigorosa no tratamento e custódia de dados</Text>
                </View>
                <View style={styles.trustItem}>
                  <Text style={styles.trustItemValue}>OAB</Text>
                  <Text style={styles.trustItemLabel}>Profissionais devidamente credenciados e habilitados</Text>
                </View>
              </View>
            </View>

          </View>
        )}

        {/* 6. FORMULÁRIO DE CONFIRMAÇÃO (Após clicar no Horário) */}
        {step === 2 && selectedAdvogado && (
          <View style={styles.formContainer}>
            <TouchableOpacity style={styles.backLink} onPress={() => setStep(1)}>
              <Feather name="arrow-left" size={16} color="#6d28d9" />
              <Text style={styles.backLinkLabel}>Voltar para especialistas</Text>
            </TouchableOpacity>

            <Text style={styles.formMainTitle}>Complete seu agendamento seguro</Text>
            <Text style={styles.formMainSubtitle}>Você escolheu falar com {selectedAdvogado.nome} no dia {selectedDate.split('-').reverse().join('/')} às {selectedTime}.</Text>

            <View style={styles.formBox}>
              <Text style={styles.inputLabel}>Seu Nome Completo</Text>
              <TextInput 
                style={styles.input}
                placeholder="Insira seu nome"
                placeholderTextColor="#94a3b8"
                value={formData.nome}
                onChangeText={(text) => setFormData({...formData, nome: text})}
              />

              <Text style={styles.inputLabel}>Seu Melhor E-mail</Text>
              <TextInput 
                style={styles.input}
                placeholder="exemplo@empresa.com"
                placeholderTextColor="#94a3b8"
                autoCapitalize="none"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
              />

              <Text style={styles.inputLabel}>WhatsApp para Contato</Text>
              <TextInput 
                style={styles.input}
                placeholder="(11) 99999-9999"
                placeholderTextColor="#94a3b8"
                keyboardType="phone-pad"
                value={formData.telefone}
                onChangeText={(text) => setFormData({...formData, telefone: text})}
              />

              <View style={styles.lgpdBox}>
                <Switch 
                  value={formData.termos}
                  onValueChange={(val) => setFormData({...formData, termos: val})}
                  trackColor={{ false: '#cbd5e1', true: '#6d28d9' }}
                />
                <Text style={styles.lgpdText}>
                  Estou de acordo com a Política de Privacidade e dou consentimento para fins de agendamento de consulta de acordo com as regras da OAB e LGPD.
                </Text>
              </View>

              <TouchableOpacity 
                style={[styles.btnSubmit, (!formData.nome || !formData.email || !formData.termos) && styles.btnSubmitDisabled]}
                disabled={!formData.nome || !formData.email || !formData.termos}
                onPress={handleConfirmAgendamento}
              >
                <Text style={styles.btnSubmitText}>Solicitar Confirmação de Agenda</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 7. TELA DE SUCESSO */}
        {step === 3 && (
          <View style={styles.successContainer}>
            <View style={styles.successIconBox}>
              <Feather name="check" size={40} color="#ffffff" />
            </View>
            <Text style={styles.successTitle}>Solicitação Realizada!</Text>
            <Text style={styles.successSubtitle}>
              O escritório enviou a confirmação e o link de acesso seguro para a sua sala de conferência por e-mail e WhatsApp.
            </Text>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Detalhes da Reserva:</Text>
              <Text style={styles.summaryText}>⚖️ Advogado: <Text style={styles.bold}>{selectedAdvogado?.nome}</Text></Text>
              <Text style={styles.summaryText}>📆 Data: <Text style={styles.bold}>{selectedDate?.split('-').reverse().join('/')}</Text></Text>
              <Text style={styles.summaryText}>⏰ Horário: <Text style={styles.bold}>{selectedTime}</Text></Text>
              <Text style={styles.summaryText}>🔒 Segurança: <Text style={styles.bold}>Link Exclusivo com Criptografia</Text></Text>
            </View>

            <TouchableOpacity style={styles.btnReset} onPress={handleReset}>
              <Text style={styles.btnResetText}>Voltar para a Página Principal</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Consullex Plataforma de Serviços Tecnológicos Jurídicos. Todos os direitos reservados.</Text>
        <Text style={styles.footerSubText}>Nos termos do Provimento 205/2021 da OAB, esta ferramenta atua de forma estritamente informativa de facilitação de contato inicial, sendo vedada a captação mercantilista de clientela.</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // Fundo claro clássico das startups de bem-estar/medicina/saúde
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 18,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    ...Platform.select({
      web: { position: 'sticky', top: 0, zIndex: 100 }
    })
  },
  navbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6d28d9', // Roxo clássico inspirado no Zenklub
    letterSpacing: -0.5,
  },
  navbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    display: Platform.OS === 'web' ? 'flex' : 'none',
  },
  navLink: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '500',
    cursor: 'pointer',
  },
  btnNavPrimary: {
    backgroundColor: '#6d28d9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnNavPrimaryText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  heroSection: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 32,
    paddingVertical: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    gap: 40,
  },
  heroLeft: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 640,
  },
  heroRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: '#6d28d9',
    fontSize: 12,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 46,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 26,
    marginTop: 16,
    marginBottom: 32,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    maxWidth: 500,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#0f172a',
    fontSize: 15,
    borderWidth: 0,
    ...Platform.select({
      web: { outlineStyle: 'none' }
    })
  },
  heroIllustrationCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    width: '100%',
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  illustrationCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  illustrationCardDesc: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 20,
  },
  sectionContainer: {
    paddingHorizontal: 32,
    paddingTop: 40,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 18,
  },
  areaFiltersScroll: {
    gap: 10,
    paddingBottom: 10,
  },
  filterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 99,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterTagActive: {
    backgroundColor: '#6d28d9',
    borderColor: '#6d28d9',
  },
  filterTagText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
  },
  filterTagTextActive: {
    color: '#ffffff',
  },
  resultsCount: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  expertCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 24,
    padding: 24,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
  },
  expertInfoSide: {
    flex: 3,
  },
  expertHeaderRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  expertAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expertAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6d28d9',
  },
  expertTitleCol: {
    flex: 1,
  },
  expertNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expertName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  expertCargo: {
    fontSize: 13,
    color: '#6d28d9',
    fontWeight: '600',
    marginTop: 2,
  },
  expertOab: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 1,
  },
  expertDesc: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginTop: 16,
  },
  expertStatsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statBadgeText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  expertScheduleSide: {
    flex: 2,
    borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
    borderLeftColor: '#f1f5f9',
    paddingLeft: Platform.OS === 'web' ? 24 : 0,
    paddingTop: Platform.OS === 'web' ? 0 : 20,
    borderTopWidth: Platform.OS === 'web' ? 0 : 1,
    borderTopColor: '#f1f5f9',
  },
  scheduleTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 12,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 10,
  },
  dayColumnActive: {
    backgroundColor: '#f3e8ff',
    borderColor: '#6d28d9',
  },
  dayText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
  },
  dayTextActive: {
    color: '#6d28d9',
  },
  dayNum: {
    fontSize: 16,
    fontWeight: '700',
    color: '#475569',
    marginTop: 2,
  },
  dayNumActive: {
    color: '#6d28d9',
  },
  hoursGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hourButton: {
    flex: 1,
    minWidth: 64,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  hourButtonActive: {
    backgroundColor: '#6d28d9',
    borderColor: '#6d28d9',
  },
  hourButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  hourButtonTextActive: {
    color: '#ffffff',
  },
  legalNotice: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 16,
    fontStyle: 'italic',
  },
  trustSection: {
    backgroundColor: '#0f172a', // Dark slate elegante de rodapé informativo
    paddingVertical: 60,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 40,
  },
  trustTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 40,
  },
  trustGrid: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: 32,
    maxWidth: 1000,
    width: '100%',
  },
  trustItem: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  trustItemValue: {
    color: '#a78bfa',
    fontSize: 32,
    fontWeight: '900',
  },
  trustItemLabel: {
    color: '#94a3b8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  formContainer: {
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  backLinkLabel: {
    fontSize: 14,
    color: '#6d28d9',
    fontWeight: '600',
  },
  formMainTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  formMainSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
    marginBottom: 24,
  },
  formBox: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 24,
    gap: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    color: '#0f172a',
    fontSize: 15,
  },
  lgpdBox: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingRight: 20,
    marginTop: 8,
  },
  lgpdText: {
    fontSize: 11,
    color: '#64748b',
    lineHeight: 16,
    flex: 1,
  },
  btnSubmit: {
    backgroundColor: '#6d28d9',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  btnSubmitDisabled: {
    backgroundColor: '#cbd5e1',
  },
  btnSubmitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  successContainer: {
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    gap: 16,
  },
  successIconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 20,
    width: '100%',
    gap: 10,
    marginVertical: 16,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 13,
    color: '#475569',
  },
  bold: {
    fontWeight: '700',
    color: '#0f172a',
  },
  btnReset: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  btnResetText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#ffffff',
    paddingVertical: 32,
    paddingHorizontal: 32,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  footerSubText: {
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
    maxWidth: 800,
    lineHeight: 14,
  }
});