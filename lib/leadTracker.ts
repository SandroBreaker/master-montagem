
import { supabase } from './supabaseClient';

export const trackAndRedirect = async (clientName: string, serviceType: string) => {
  const phone = '5511968036476'; // Número do montador
  const message = `Olá! Vi seu site e gostaria de um orçamento para: ${serviceType}. Meu nome é ${clientName}.`;
  
  try {
    // Salva no banco de dados primeiro
    await supabase.from('leads').insert([
      { 
        client_name: clientName, 
        whatsapp: 'Via Site', 
        service_type: serviceType,
        status: 'novo'
      }
    ]);
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
  } finally {
    // Redireciona de qualquer forma para não travar o usuário
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
};
