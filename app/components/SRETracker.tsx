'use client';

import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  ChevronUp,
  ChevronDown,
  Download,
  Upload,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
  Server,
  Globe,
  DollarSign,
  TrendingUp,
  ChevronRight,
  X,
  Sun,
} from 'lucide-react';

interface DecommissionItem {
  id: number;
  type: 'resource' | 'api';
  account: string;
  name: string;
  tech: string;
  owner: string;
  team: string;
  cost: number;
  deadline: string;
  status:
    | 'nao-iniciado'
    | 'em-analise'
    | 'planejado'
    | 'em-execucao'
    | 'concluido'
    | 'bloqueado';
  desc: string;
  update: string;
  pentest?: boolean;
  pentestDate?: string;
  pentestBy?: string;
}

const STATUS_COLORS: Record<string, { bg: string; text: string; icon: any }> = {
  'nao-iniciado': { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
  'em-analise': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
  planejado: { bg: 'bg-orange-100', text: 'text-orange-800', icon: TrendingUp },
  'em-execucao': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Zap },
  concluido: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle2 },
  bloqueado: { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertCircle },
};

const STATUS_LABELS: Record<string, string> = {
  'nao-iniciado': 'Não Iniciado',
  'em-analise': 'Em Análise',
  planejado: 'Planejado',
  'em-execucao': 'Em Execução',
  concluido: 'Concluído',
  bloqueado: 'Bloqueado',
};

const STATUS_COLORS_PIE: Record<string, string> = {
  'nao-iniciado': '#ef4444',
  'em-analise': '#eab308',
  planejado: '#f97316',
  'em-execucao': '#3b82f6',
  concluido: '#22c55e',
  bloqueado: '#6b7280',
};

const SEED_DATA: DecommissionItem[] = [
  {
    id: 1,
    type: 'resource',
    account: 'Production',
    name: 'EC2-WebServer-01',
    tech: 'EC2',
    owner: 'João Silva',
    team: 'Platform',
    cost: 1250,
    deadline: '2026-02-15',
    status: 'em-execucao',
    desc: 'Migração para ECS em andamento. Verificação de dependências concluída.',
    update: '2026-01-15',
  },
  {
    id: 2,
    type: 'resource',
    account: 'Production',
    name: 'RDS-MySQL-Legacy',
    tech: 'RDS',
    owner: 'Maria Santos',
    team: 'Database',
    cost: 4000,
    deadline: '2026-03-20',
    status: 'planejado',
    desc: 'Aguardando aprovação de migração para Aurora PostgreSQL. Backup completo realizado.',
    update: '2026-01-10',
  },
  {
    id: 3,
    type: 'resource',
    account: 'Staging',
    name: 'S3-Backups-Old',
    tech: 'S3',
    owner: 'Carlos Oliveira',
    team: 'Storage',
    cost: 600,
    deadline: '2026-01-22',
    status: 'nao-iniciado',
    desc: 'Preparando limpeza de dados antigos. Validação de espaço necessária.',
    update: '2026-01-05',
  },
  {
    id: 4,
    type: 'resource',
    account: 'Development',
    name: 'Lambda-OldFunction',
    tech: 'Lambda',
    owner: 'Ana Costa',
    team: 'Serverless',
    cost: 225,
    deadline: '2026-02-28',
    status: 'concluido',
    desc: 'Migrado para nova versão. Testes de performance aprovados.',
    update: '2026-01-12',
  },
  {
    id: 5,
    type: 'api',
    account: 'Production',
    name: 'Legacy REST API',
    tech: 'API Gateway',
    owner: 'Roberto Lima',
    team: 'Backend',
    cost: 2500,
    deadline: '2026-04-10',
    status: 'em-analise',
    desc: 'Em análise de dependências. Mapeamento de clientes em progresso.',
    update: '2026-01-14',
    pentest: true,
    pentestDate: '2026-01-08',
    pentestBy: 'Security Team',
  },
  {
    id: 6,
    type: 'api',
    account: 'Production',
    name: 'GraphQL Server',
    tech: 'GraphQL',
    owner: 'Felipe Torres',
    team: 'API',
    cost: 1750,
    deadline: '2026-05-15',
    status: 'planejado',
    desc: 'Aguardando aprovação do cliente. Documentação técnica finalizada.',
    update: '2026-01-13',
    pentest: false,
    pentestDate: '',
    pentestBy: '',
  },
  {
    id: 7,
    type: 'api',
    account: 'Staging',
    name: 'BFF - Mobile',
    tech: 'REST',
    owner: 'Lucas Alves',
    team: 'Mobile',
    cost: 1000,
    deadline: '2026-06-01',
    status: 'em-execucao',
    desc: 'Refatoração em andamento. 60% completo.',
    update: '2026-01-16',
    pentest: true,
    pentestDate: '2026-01-09',
    pentestBy: 'Security Team',
  },
  {
    id: 8,
    type: 'api',
    account: 'Development',
    name: 'Internal Dashboard API',
    tech: 'REST',
    owner: 'Juliana Souza',
    team: 'Internal',
    cost: 750,
    deadline: '2026-03-30',
    status: 'concluido',
    desc: 'Completamente migrada e em operação. Zero incidentes.',
    update: '2026-01-17',
    pentest: true,
    pentestDate: '2026-01-11',
    pentestBy: 'Security Team',
  },
];

type SortField = keyof DecommissionItem;
type SortOrder = 'asc' | 'desc' | null;

const DASHBOARD_NAMES = [
  'CloudSunset',
  'Cloud Lifecycle Manager',
  'AWS Asset Retirement Hub',
  'Resource Decommission Center',
  'Infrastructure Sunset Portal',
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export default function SRETracker() {
  const [items, setItems] = useState<DecommissionItem[]>(SEED_DATA);
  const [activeTab, setActiveTab] = useState<'overview' | 'recursos' | 'apis' | 'timeline'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [selectedDashboardName, setSelectedDashboardName] = useState(0);

  const toggleRowExpansion = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortOrder(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      const matchesType =
        activeTab === 'overview' ||
        (activeTab === 'recursos' && item.type === 'resource') ||
        (activeTab === 'apis' && item.type === 'api');

      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === '' || item.status === statusFilter;

      return matchesType && matchesSearch && matchesStatus;
    });

    if (sortField && sortOrder) {
      result.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (typeof aVal === 'string') {
          return sortOrder === 'asc'
            ? aVal.localeCompare(bVal as string)
            : (bVal as string).localeCompare(aVal);
        }

        if (typeof aVal === 'number') {
          return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
        }

        return 0;
      });
    }

    return result;
  }, [items, activeTab, searchTerm, statusFilter, sortField, sortOrder]);

  const metrics = useMemo(() => {
    const total = items.length;
    const resources = items.filter((i) => i.type === 'resource').length;
    const apis = items.filter((i) => i.type === 'api').length;
    const completed = items.filter((i) => i.status === 'concluido').length;
    const progressPercent = Math.round((completed / total) * 100);
    const totalCost = items.reduce((acc, i) => acc + i.cost, 0);
    const completedCost = items.filter((i) => i.status === 'concluido').reduce((acc, i) => acc + i.cost, 0);
    const pentestCompleted = items.filter((i) => i.type === 'api' && i.pentest).length;
    const pentestTotal = items.filter((i) => i.type === 'api').length;

    return {
      total,
      resources,
      apis,
      completed,
      progressPercent,
      totalCost,
      completedCost,
      pentestCompleted,
      pentestTotal,
      pentestPending: pentestTotal - pentestCompleted,
    };
  }, [items]);

  const statusData = useMemo(() => {
    const counts = Object.keys(STATUS_LABELS).map((status) => ({
      name: STATUS_LABELS[status],
      value: items.filter((i) => i.status === status).length,
      color: STATUS_COLORS_PIE[status],
    }));
    return counts.filter((c) => c.value > 0);
  }, [items]);

  const timelineData = useMemo(() => {
    const months = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    return months.map((month, idx) => {
      const monthNum = String(idx + 1).padStart(2, '0');
      const planned = items.filter(
        (i) => i.deadline.includes(`2026-${monthNum}`) && i.status !== 'concluido'
      ).length;
      const completed = items.filter(
        (i) => i.deadline.includes(`2026-${monthNum}`) && i.status === 'concluido'
      ).length;
      return { name: month, planejado: planned, concluido: completed };
    });
  }, [items]);

  const exportToCSV = () => {
    const dataToExport = filteredItems;
    const isAPI = activeTab === 'apis';

    const headers = isAPI
      ? [
          'Tipo',
          'Nome',
          'Conta',
          'Tecnologia',
          'Responsável',
          'Time',
          'Custo (R$)',
          'Deadline',
          'Status',
          'Descrição',
          'Atualização',
          'Pentest Realizado',
          'Data Pentest',
          'Realizado Por',
        ]
      : [
          'Tipo',
          'Nome',
          'Conta',
          'Tecnologia',
          'Responsável',
          'Time',
          'Custo (R$)',
          'Deadline',
          'Status',
          'Descrição',
          'Atualização',
        ];

    const rows = dataToExport.map((item) => {
      const baseRow = [
        item.type === 'resource' ? 'Recurso' : 'API',
        item.name,
        item.account,
        item.tech,
        item.owner,
        item.team,
        item.cost,
        item.deadline,
        STATUS_LABELS[item.status],
        item.desc,
        item.update,
      ];

      if (isAPI) {
        return [
          ...baseRow,
          item.pentest ? 'Sim' : 'Não',
          item.pentestDate || '',
          item.pentestBy || '',
        ];
      }
      return baseRow;
    });

    const csvContent = [
      '\uFEFF' + headers.join(','),
      ...rows.map((row) =>
        row
          .map((cell) => {
            const cellStr = String(cell);
            return cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')
              ? `"${cellStr.replace(/"/g, '""')}"`
              : cellStr;
          })
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const now = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `sre-tracker-${activeTab}-${now}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importFromCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const text = event.target.result;
          const lines = text.split('\n').filter((line: string) => line.trim());

          if (lines.length < 2) {
            alert('Arquivo CSV vazio ou inválido');
            return;
          }

          const headerLine = lines[0].replace('\uFEFF', '');
          const isAPI = headerLine.includes('Pentest Realizado');
          const headers = headerLine.split(',').map((h: string) => h.trim());

          const newItems: DecommissionItem[] = [];
          let importedCount = 0;

          for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line.trim()) continue;

            const values = line.split(',').map((v: string) => v.trim().replace(/^"(.+)"$/, '$1'));
            if (values.length < 11) continue;

            const statusKey = Object.entries(STATUS_LABELS).find(
              ([, label]) => label === values[8]
            )?.[0] || 'nao-iniciado';

            const newItem: DecommissionItem = {
              id: Math.max(...items.map((it) => it.id), 0) + importedCount + 1,
              type: values[0].toLowerCase().includes('api') ? 'api' : 'resource',
              account: values[2],
              name: values[1],
              tech: values[3],
              owner: values[4],
              team: values[5],
              cost: parseFloat(values[6]) || 0,
              deadline: values[7],
              status: statusKey as DecommissionItem['status'],
              desc: values[9],
              update: values[10],
            };

            if (isAPI && values.length >= 14) {
              newItem.pentest = values[11].toLowerCase() === 'sim';
              newItem.pentestDate = values[12] || '';
              newItem.pentestBy = values[13] || '';
            }

            newItems.push(newItem);
            importedCount++;
          }

          setItems((prev) => [...prev, ...newItems]);
          alert(`${importedCount} itens importados com sucesso!`);
        } catch (error) {
          alert('Erro ao processar arquivo CSV');
          console.error(error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const isDeadlineUrgent = (deadline: string, status: string) => {
    if (status === 'concluido') return false;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 7 && diffDays >= 0;
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronUp className="w-4 h-4 text-gray-300" />;
    }
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-600" />
    );
  };

  const MetricCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: any;
    color: string;
  }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color} border border-gray-200 hover:shadow-lg transition`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-gray-500 text-xs mt-2">{subtitle}</p>}
        </div>
        <Icon className={`w-12 h-12 opacity-10 ${color.replace('border-', 'text-')}`} />
      </div>
    </div>
  );

  const renderTable = () => {
    const isAPI = activeTab === 'apis';

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <tr>
              <th className="w-8 px-4 py-3"></th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-2" onClick={() => handleSort('name')}>
                  Recurso <SortIcon field="name" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-2" onClick={() => handleSort('account')}>
                  Conta <SortIcon field="account" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-2" onClick={() => handleSort('owner')}>
                  Responsável <SortIcon field="owner" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-2" onClick={() => handleSort('cost')}>
                  Custo/Mês <SortIcon field="cost" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-2" onClick={() => handleSort('deadline')}>
                  Deadline <SortIcon field="deadline" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-2" onClick={() => handleSort('status')}>
                  Status <SortIcon field="status" />
                </div>
              </th>
              {isAPI && (
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Pentest
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredItems.map((item) => {
              const isUrgent = isDeadlineUrgent(item.deadline, item.status);
              const StatusIcon = STATUS_COLORS[item.status].icon;
              const isExpanded = expandedRows.has(item.id);

              return (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-blue-50 transition cursor-pointer">
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleRowExpansion(item.id)}
                        className="inline-flex items-center justify-center w-6 h-6 rounded hover:bg-gray-200 transition"
                      >
                        <ChevronRight
                          className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.tech}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.account}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.owner}</p>
                        <p className="text-xs text-gray-500">{item.team}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(item.cost)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isUrgent ? 'font-bold text-red-600' : 'text-gray-600'}`}>
                      {item.deadline}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          STATUS_COLORS[item.status].bg
                        } ${STATUS_COLORS[item.status].text}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {STATUS_LABELS[item.status]}
                      </div>
                    </td>
                    {isAPI && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.pentest ? (
                          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="w-4 h-4" />
                            Concluído
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Pendente
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                  {isExpanded && (
                    <tr className="bg-blue-50 border-t-2 border-blue-200">
                      <td colSpan={isAPI ? 9 : 8} className="px-6 py-4">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Descrição Detalhada</p>
                            <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Última Atualização</p>
                              <p className="text-sm text-gray-700">{item.update}</p>
                            </div>
                            {isAPI && item.pentest && (
                              <div>
                                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Pentest</p>
                                <p className="text-sm text-gray-700">{item.pentestDate} por {item.pentestBy}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                <Sun className="w-7 h-7 text-yellow-300 animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold">{DASHBOARD_NAMES[selectedDashboardName]}</h1>
            </div>
            <p className="text-blue-100 text-sm">Dashboard de Descomissionamento AWS • Janeiro 2026</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition backdrop-blur-sm border border-white/20"
            >
              <Download className="w-5 h-5" />
              Exportar CSV
            </button>
            <button
              onClick={importFromCSV}
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition shadow-md"
            >
              <Upload className="w-5 h-5" />
              Importar CSV
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex px-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'recursos', label: 'Recursos' },
            { id: 'apis', label: 'APIs' },
            { id: 'timeline', label: 'Timeline' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSearchTerm('');
                setStatusFilter('');
                setSortField(null);
                setSortOrder(null);
                setExpandedRows(new Set());
              }}
              className={`px-6 py-4 font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total de Itens"
                value={metrics.total}
                subtitle={`${metrics.resources} recursos • ${metrics.apis} APIs`}
                icon={Server}
                color="border-blue-600"
              />
              <MetricCard
                title="Progresso"
                value={`${metrics.progressPercent}%`}
                subtitle={`${metrics.completed} de ${metrics.total} concluídos`}
                icon={TrendingUp}
                color="border-green-600"
              />
              <MetricCard
                title="Economia Projetada"
                value={formatCurrency(metrics.completedCost)}
                subtitle={`de ${formatCurrency(metrics.totalCost)}`}
                icon={DollarSign}
                color="border-orange-600"
              />
              <MetricCard
                title="APIs - Pentest"
                value={`${metrics.pentestCompleted}/${metrics.pentestTotal}`}
                subtitle={`${metrics.pentestPending} pendentes`}
                icon={Globe}
                color="border-purple-600"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Distribuição por Status</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Timeline Chart */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Timeline 2026</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="planejado"
                      stroke="#f97316"
                      strokeWidth={2}
                      name="Planejado"
                    />
                    <Line
                      type="monotone"
                      dataKey="concluido"
                      stroke="#22c55e"
                      strokeWidth={2}
                      name="Concluído"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recursos' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex gap-4 flex-wrap">
              <div className="flex-1 min-w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar
                </label>
                <input
                  type="text"
                  placeholder="Nome ou responsável..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div className="min-w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Todos</option>
                  {Object.entries(STATUS_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            {renderTable()}
          </div>
        )}

        {activeTab === 'apis' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex gap-4 flex-wrap">
              <div className="flex-1 min-w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar
                </label>
                <input
                  type="text"
                  placeholder="Nome ou responsável..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div className="min-w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Todos</option>
                  {Object.entries(STATUS_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            {renderTable()}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Timeline Completa 2026</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="planejado"
                  stroke="#f97316"
                  strokeWidth={3}
                  name="Planejado"
                  dot={{ fill: '#f97316', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="concluido"
                  stroke="#22c55e"
                  strokeWidth={3}
                  name="Concluído"
                  dot={{ fill: '#22c55e', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
