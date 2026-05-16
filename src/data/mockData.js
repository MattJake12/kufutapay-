/**
 * MOCK DATA - PAYSERVICE+ VISION
 * Dados simulados para o contexto de Angola.
 * As datas são geradas dinamicamente para parecerem sempre recentes.
 */

const getRelativeDate = (daysOffset, hours = 12, minutes = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysOffset);
    date.setHours(hours, minutes, 0, 0);
    return date.toISOString();
  };
  
  export const INITIAL_DATA = {
    user: {
      name: "Edson Rocha",
      businessName: "Mercearia do Povo",
      phone: "923 456 789",
      pin: "1234", // PIN de demonstração
      avatar: "https://i.pravatar.cc/150?u=edson",
      isVerified: true,
      tier: "Vendedor", // Nível do comerciante
    },
    
    wallet: {
      balance: 850400, // Saldo inicial maior
      pendingBalance: 45000, 
      lastSync: new Date().toISOString(),
    },
  
    stats: {
      todaySales: 185400,
      todayCount: 6,
      weekGrowth: 24, // %
      topSellingTime: "16:00 - 18:00",
      savingsGoal: 1500000,
      currentSavings: 850000,
      creditScore: 840,
    },
  
    // Lista inicial de transações
    transactions: [
      {
        id: "TX-9981",
        type: "sale_cash",
        title: "Venda Presencial",
        amount: 85500,
        date: getRelativeDate(0, 14, 32),
        status: "completed",
        method: "Dinheiro",
        reference: "---"
      },
      {
        id: "TX-9980",
        type: "sale_qr",
        title: "Pagamento QR",
        amount: 125000,
        date: getRelativeDate(0, 13, 15),
        status: "pending",
        method: "Multicaixa",
        reference: "MC-88219"
      },
      {
        id: "TX-9979",
        type: "sale_qr",
        title: "Pagamento QR",
        amount: 42100,
        date: getRelativeDate(0, 12, 48),
        status: "completed",
        method: "Kikuia",
        reference: "KK-11209"
      },
      {
        id: "TX-9978",
        type: "expense",
        title: "Fornecedor Coca-Cola",
        amount: -120000,
        date: getRelativeDate(0, 10, 0),
        status: "completed",
        method: "Transferência",
        reference: "REF-9910"
      },
      // Ontem
      {
        id: "TX-9977",
        type: "service",
        title: "Recarga Unitel",
        amount: 5000,
        date: getRelativeDate(1, 18, 45),
        status: "completed",
        method: "Saldo",
        reference: "UTL-5543"
      },
      {
        id: "TX-9976",
        type: "sale_cash",
        title: "Venda Presencial",
        amount: 78000,
        date: getRelativeDate(1, 16, 20),
        status: "completed",
        method: "Dinheiro",
        reference: "---"
      },
      {
        id: "TX-9975",
        type: "sale_ref",
        title: "Pagamento Referência",
        amount: 250000,
        date: getRelativeDate(1, 9, 30),
        status: "completed",
        method: "BAI Directo",
        reference: "882 192 001"
      },
      // Semana Passada
      {
        id: "TX-9970",
        type: "withdrawal", // Levantamento
        title: "Levantamento",
        amount: -50000,
        date: getRelativeDate(3, 11, 0),
        status: "completed",
        method: "Agente Bancário",
        reference: "LEV-3321"
      }
    ]
  };
  
  // Códigos válidos para a funcionalidade "Consultar Comprovativo"
  export const VALID_PROOF_CODES = [
    { code: "PS-2024-X", amount: 5000, date: "2024-05-10 14:30", entity: "Maria Cliente", type: "Transferência Recebida" },
    { code: "123456", amount: 12500, date: "Hoje 10:00", entity: "Fornecedor Zé", type: "Pagamento Fornecedor" }
  ];