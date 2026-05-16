import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA, VALID_PROOF_CODES } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- ESTADOS GLOBAIS ---
  // Tenta carregar do localStorage (memória do navegador) ou usa os dados iniciais
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ps_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [wallet, setWallet] = useState(() => {
    const saved = localStorage.getItem('ps_wallet');
    return saved ? JSON.parse(saved) : INITIAL_DATA.wallet;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('ps_transactions');
    return saved ? JSON.parse(saved) : INITIAL_DATA.transactions;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('ps_stats');
    return saved ? JSON.parse(saved) : INITIAL_DATA.stats;
  });

  const [isLoading, setIsLoading] = useState(false);

  // --- PERSISTÊNCIA (Salvar sempre que mudar) ---
  useEffect(() => {
    if (user) localStorage.setItem('ps_user', JSON.stringify(user));
    localStorage.setItem('ps_wallet', JSON.stringify(wallet));
    localStorage.setItem('ps_transactions', JSON.stringify(transactions));
    localStorage.setItem('ps_stats', JSON.stringify(stats));
  }, [user, wallet, transactions, stats]);


  // --- FORMATADORES ---
  const formatKz = (amount) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('Kz', '') + ' Kz';
  };

  // --- AÇÕES DE AUTH ---
  const login = async (phone, pin) => {
    setIsLoading(true);
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Na demo, aceitamos o user simulado ou qualquer PIN 1234
    if (pin === '1234' || pin === INITIAL_DATA.user.pin) {
        // Se já existir user no mock, usamos, senão criamos um temporário
        if (!user) setUser(INITIAL_DATA.user); 
        setIsLoading(false);
        return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newUser = {
        ...INITIAL_DATA.user,
        ...userData, // Sobrescreve nome/telefone com o input do formulário
    };
    
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ps_user');
    // Não limpamos as transações para a demo não ficar vazia
  };

  // --- AÇÕES DE NEGÓCIO (CORE) ---
  
  // 1. Processar Nova Venda
  const processSale = async (amount, type = 'Dinheiro') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Delay dramático

    const newTransaction = {
        id: `TX-${Math.floor(Math.random() * 100000)}`,
        type: type === 'Dinheiro' ? 'sale_cash' : 'sale_qr',
        title: type === 'Dinheiro' ? 'Venda Presencial' : 'Venda Digital',
        amount: parseFloat(amount),
        date: new Date().toISOString(),
        status: 'completed',
        method: type,
        reference: type === 'Dinheiro' ? '---' : `REF-${Math.floor(Math.random() * 9999)}`
    };

    // Atualiza estados
    setTransactions(prev => [newTransaction, ...prev]); // Adiciona no topo
    setWallet(prev => ({ ...prev, balance: prev.balance + parseFloat(amount) }));
    setStats(prev => ({
        ...prev,
        todaySales: prev.todaySales + parseFloat(amount),
        todayCount: prev.todayCount + 1
    }));

    setIsLoading(false);
    return newTransaction;
  };

  // 2. Verificar Comprovativo (Feature Pedida)
  const verifyProof = async (code) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Delay para suspense

    // Procura nos códigos válidos estáticos OU nas transações feitas agora
    const staticProof = VALID_PROOF_CODES.find(p => p.code === code);
    const dynamicProof = transactions.find(t => t.reference === code || t.id === code);

    setIsLoading(false);

    if (staticProof) return staticProof;
    if (dynamicProof) return {
        code: dynamicProof.id,
        amount: dynamicProof.amount,
        date: dynamicProof.date,
        entity: "Cliente PayService",
        type: dynamicProof.title
    };

    throw new Error("Comprovativo não encontrado.");
  };

  // 3. Processar Transferência
  const processTransfer = async (transferData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Delay para simular processamento

    const { type, recipient, amount, description } = transferData;

    // Validações
    if (amount > wallet.balance) {
      setIsLoading(false);
      throw new Error("Saldo insuficiente para esta transferência.");
    }

    // Mapeamento de tipos para títulos
    const typeMap = {
      bank: 'Transferência Bancária',
      phone: 'Móbil Money',
      payservice: 'PayService+ Transfer'
    };

    const newTransaction = {
      id: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'transfer',
      title: typeMap[type] || 'Transferência',
      amount: -parseFloat(amount), // Negativo = saída
      date: new Date().toISOString(),
      status: 'completed',
      method: typeMap[type],
      reference: `TRF-${Math.floor(Math.random() * 9999)}`,
      recipient: recipient,
      description: description || ''
    };

    // Atualiza estados
    setTransactions(prev => [newTransaction, ...prev]); // Adiciona no topo
    setWallet(prev => ({ 
      ...prev, 
      balance: prev.balance - parseFloat(amount) 
    }));

    setIsLoading(false);
    return newTransaction;
  };

  return (
    <AppContext.Provider value={{
      user,
      wallet,
      transactions,
      stats,
      isLoading,
      formatKz,
      login,
      register,
      logout,
      processSale,
      verifyProof,
      processTransfer
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar o contexto fácil
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};