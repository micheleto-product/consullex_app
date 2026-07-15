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
  Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    area: '',
    advogado: '',
    data: '',
    horario: '',
    nome: '',
    email: '',
    telefone: '',
    documento: '',
    termos: false
  });

  const areas = [
    { id: 'civil', nome: 'Direito Civil e Família', icon: 'user', desc: 'Divórcio, inventário e bens' },
    { id: 'trabalhista', nome: 'Direito Trabalhista', icon: 'briefcase', desc: 'Rescisões e direitos do trabalhador' },
    { id: 'empresarial', nome: 'Direito Empresarial', icon: 'activity', desc: 'Assessoria jurídica e societária' },
    { id: 'penal', nome: 'Direito Penal', icon: 'shield', desc: 'Defesas, inquéritos e acompanhamento' },
  ];

  const advogadosPorArea = {
    civil: [
      { id: '1', nome: 'Dra. Mariana Silva', cargo: 'Especialista em Família', OAB: 'OAB/SP 123.456' },
      { id: '2', nome: 'Dr. Roberto Santos', cargo: 'Especialista em Contratos', OAB: 'OAB/SP 234.567' }
    ],
    trabalhista: [
      { id: '3', nome: 'Dr. Carlos Eduardo', cargo: 'Direito do Trabalho', OAB: 'OAB/SP 345.678' }
    ],
    empresarial: [
      { id: '4', nome: 'Dra. Beatriz Costa', cargo: 'Societário e Tributos', OAB: 'OAB/SP 456.789' }
    ],
    penal: [
      { id: '5', nome: 'Dr. Thiago Alcântara', cargo: 'Criminalista Sênior', OAB: 'OAB/SP 567.890' }
    ]
  };

  const datasDisponiveis = [
    { data: '2026-07-20', diaSemana: 'Segunda-feira' },
    { data: '2026-07-21', diaSemana: 'Terça-feira' },
    { data: '2026-07-22', diaSemana: 'Quarta-feira' }
  ];

  const horariosDisponiveis = ['09:00', '10:30', '14:00', '15:30', '17:00'];

  const handleSelectArea = (areaId) => {
    setFormData({ ...formData, area: areaId, advogado: '' });
    setStep(2);
  };

  const handleSelectAdvogado = (advName) => {
    setFormData({ ...formData, advogado: advName });
    setStep(3);
  };

  const handleSelectDataHora = (data, horario) => {
    setFormData({ ...formData, data, horario });
    setStep(4);
  };

  const handleSubmit = () => {
    if (formData.termos && formData.nome && formData.email) {
      setStep(5);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Seguro */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Feather name="scale" size={22} color="#f59e0b" />
          <Text style={styles.headerTitle}>CONSULLEX</Text>
        </View>
        <View style={styles.badge}>
          <Feather name="lock" size={12} color="#34d399" />
          <Text style={styles.badgeText}>Segurança SSL</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Progress Tracker */}
        {step < 5 && (
          <View style={styles.trackerContainer}>
            <Text style={styles.trackerText}>Passo {step} de 4</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBar, { width: `${(step / 4) * 100}%` }]} />
            </View>
          </View>
        )}

        {/* Passo 1: Áreas */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>Escolha a Área de Atendimento</Text>
            <Text style={styles.subtitle}>Selecione a especialidade jurídica para o seu caso.</Text>
            
            {areas.map((a) => (
              <TouchableOpacity 
                key={a.id} 
                style={styles.card} 
                onPress={() => handleSelectArea(a.id)}
              >
                <View style={styles.iconContainer}>
                  <Feather name={a.icon} size={22} color="#f59e0b" />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{a.nome}</Text>
                  <Text style={styles.cardDesc}>{a.desc}</Text>
                </View>
                <Feather name="chevron-right" size={18} color="#475569" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Passo 2: Advogados */}
        {step === 2 && (
          <View style={styles.stepContainer}>
            <View style={styles.rowBetween}>
              <Text style={styles.title}>Selecione o Profissional</Text>
              <TouchableOpacity onPress={() => setStep(1)} style={styles.backButton}>
                <Feather name="arrow-left" size={14} color="#94a3b8" />
                <Text style={styles.backText}>Voltar</Text>
              </TouchableOpacity>
            </View>

            {advogadosPorArea[formData.area]?.map((adv) => (
              <TouchableOpacity 
                key={adv.id} 
                style={styles.card} 
                onPress={() => handleSelectAdvogado(adv.nome)}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{adv.nome.split(' ').pop().charAt(0)}</Text>
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{adv.nome}</Text>
                  <Text style={styles.cardDesc}>{adv.cargo}</Text>
                  <Text style={styles.oabText}>{adv.OAB}</Text>
                </View>
                <Feather name="chevron-right" size={18} color="#475569" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Passo 3: Data e Hora */}
        {step === 3 && (
          <View style={styles.stepContainer}>
            <View style={styles.rowBetween}>
              <Text style={styles.title}>Agende sua Consulta</Text>
              <TouchableOpacity onPress={() => setStep(2)} style={styles.backButton}>
                <Feather name="arrow-left" size={14} color="#94a3b8" />
                <Text style={styles.backText}>Voltar</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionLabel}>1. Escolha o dia:</Text>
            <View style={styles.grid}>
              {datasDisponiveis.map((d) => (
                <TouchableOpacity
                  key={d.data}
                  style={[
                    styles.gridButton,
                    formData.data === d.data && styles.gridButtonActive
                  ]}
                  onPress={() => setFormData({ ...formData, data: d.data, horario: '' })}
                >
                  <Text style={[styles.gridButtonTitle, formData.data === d.data && styles.textDark]}>
                    {d.data.split('-')[2]}/{d.data.split('-')[1]}
                  </Text>
                  <Text style={[styles.gridButtonSub, formData.data === d.data && styles.textDark]}>
                    {d.diaSemana}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {formData.data !== '' && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.sectionLabel}>2. Escolha o horário:</Text>
                <View style={styles.gridHorarios}>
                  {horariosDisponiveis.map((h) => (
                    <TouchableOpacity
                      key={h}
                      style={[
                        styles.horarioButton,
                        formData.horario === h && styles.horarioButtonActive
                      ]}
                      onPress={() => handleSelectDataHora(formData.data, h)}
                    >
                      <Text style={[styles.horarioText, formData.horario === h && styles.textDark]}>
                        {h}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Passo 4: Dados Pessoais */}
        {step === 4 && (
          <View style={styles.stepContainer}>
            <View style={styles.rowBetween}>
              <Text style={styles.title}>Seus Dados</Text>
              <TouchableOpacity onPress={() => setStep(3)} style={styles.backButton}>
                <Feather name="arrow-left" size={14} color="#94a3b8" />
                <Text style={styles.backText}>Voltar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <Text style={styles.inputLabel}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome completo"
                placeholderTextColor="#475569"
                value={formData.nome}
                onChangeText={(text) => setFormData({ ...formData, nome: text })}
              />

              <Text style={styles.inputLabel}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="exemplo@email.com"
                placeholderTextColor="#475569"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />

              <Text style={styles.inputLabel}>WhatsApp / Celular</Text>
              <TextInput
                style={styles.input}
                placeholder="(11) 99999-9999"
                placeholderTextColor="#475569"
                keyboardType="phone-pad"
                value={formData.telefone}
                onChangeText={(text) => setFormData({ ...formData, telefone: text })}
              />

              <View style={styles.switchContainer}>
                <Switch
                  value={formData.termos}
                  onValueChange={(val) => setFormData({ ...formData, termos: val })}
                  trackColor={{ false: '#1e293b', true: '#f59e0b' }}
                  thumbColor={formData.termos ? '#ffffff' : '#94a3b8'}
                />
                <Text style={styles.switchText}>
                  Autorizo o tratamento de meus dados em conformidade com a LGPD para fins de agendamento e contato.
                </Text>
              </View>

              <TouchableOpacity 
                style={[styles.submitButton, !formData.termos && styles.buttonDisabled]}
                disabled={!formData.termos}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Confirmar Agendamento Seguro</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Passo 5: Sucesso */}
        {step === 5 && (
          <View style={styles.successContainer}>
            <Feather name="check-circle" size={64} color="#10b981" />
            <Text style={styles.successTitle}>Confirmado!</Text>
            <Text style={styles.successSubtitle}>Sua reunião com criptografia de ponta a ponta está agendada.</Text>

            <View style={styles.summaryBox}>
              <Text style={styles.summaryItem}>👨‍⚖️ Profissional: <Text style={styles.boldText}>{formData.advogado}</Text></Text>
              <Text style={styles.summaryItem}>📅 Data: <Text style={styles.boldText}>{formData.data.split('-').reverse().join('/')} às {formData.horario}</Text></Text>
              <Text style={styles.summaryItem}>📧 E-mail: <Text style={styles.boldText}>{formData.email}</Text></Text>
            </View>

            <TouchableOpacity 
              style={[styles.card, { justifyContent: 'center' }]}
              onPress={() => {
                setStep(1);
                setFormData({ area: '', advogado: '', data: '', horario: '', nome: '', email: '', telefone: '', documento: '', termos: false });
              }}
            >
              <Text style={styles.cardTitle}>Fazer outro agendamento</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617', // bg-slate-950
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    backgroundColor: '#0f172a',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(6, 78, 59, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    gap: 4,
  },
  badgeText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    width: '100%',
    alignSelf: 'center',
  },
  trackerContainer: {
    marginBottom: 24,
  },
  trackerText: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 6,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#1e293b',
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#f59e0b',
  },
  stepContainer: {
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: -8,
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  iconContainer: {
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 8,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDesc: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#f59e0b',
    fontSize: 18,
    fontWeight: 'bold',
  },
  oabText: {
    color: '#475569',
    fontSize: 11,
    marginTop: 4,
  },
  sectionLabel: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    gap: 10,
  },
  gridButton: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
  },
  gridButtonActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  gridButtonTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gridButtonSub: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2,
  },
  textDark: {
    color: '#020617',
  },
  gridHorarios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  horarioButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 8,
  },
  horarioButtonActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  horarioText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    gap: 12,
  },
  inputLabel: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    fontSize: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 10,
    paddingRight: 20,
  },
  switchText: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#f59e0b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#020617',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 20,
  },
  successTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  successSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  summaryBox: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    gap: 12,
    marginVertical: 10,
  },
  summaryItem: {
    color: '#94a3b8',
    fontSize: 14,
  },
  boldText: {
    color: '#ffffff',
    fontWeight: 'bold',
  }
});