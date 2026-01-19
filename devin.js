{
  id: number,
  type: 'resource' | 'api',
  account: string,        // Nome da conta AWS
  name: string,           // Nome do recurso/API
  tech: string,           // Tecnologia (EC2, RDS, Lambda, API Gateway, etc)
  owner: string,          // Nome do responsável
  team: string,           // Nome do time
  cost: number,           // Custo mensal em USD
  deadline: string,       // Data limite (formato: YYYY-MM-DD)
  status: string,         // Status atual (ver opções abaixo)
  desc: string,           // Descrição detalhada do status
  update: string,         // Data da última atualização (formato: YYYY-MM-DD)
  
  // Apenas para type === 'api':
  pentest: boolean,       // Se pentest foi realizado
  pentestDate: string,    // Data do pentest (formato: YYYY-MM-DD)
  pentestBy: string       // Quem realizou o pentest
}
```

### Status Disponíveis:
- `nao-iniciado`: Não Iniciado (vermelho #ef4444)
- `em-analise`: Em Análise (amarelo #eab308)
- `planejado`: Planejado (laranja #f97316)
- `em-execucao`: Em Execução (azul #3b82f6)
- `concluido`: Concluído (verde #22c55e)
- `bloqueado`: Bloqueado (cinza #6b7280)

## Funcionalidades Principais

### 1. **Overview (Dashboard Principal)**
Exibir 4 cards de métricas:
- Total de Itens (com breakdown: X recursos • Y APIs)
- Progresso (percentual de concluídos)
- Economia Projetada (custo total e quanto já foi economizado)
- APIs - Pentest (quantos pentests concluídos/pendentes)

Exibir 2 gráficos:
- **Gráfico de Pizza**: Distribuição por status
- **Gráfico de Linha**: Timeline 2026 mostrando itens planejados vs concluídos por mês (Janeiro a Dezembro)

### 2. **Aba Recursos**
Tabela com colunas:
- Recurso (nome + tecnologia)
- Conta AWS
- Responsável (nome + time)
- Custo/Mês
- Deadline (destacar em vermelho se < 7 dias e não concluído)
- Status (badge colorido com ícone)
- Descrição do Status (texto + data de atualização)

**Funcionalidades**:
- Busca por nome ou responsável
- Filtro por status
- Ordenação por qualquer coluna (clique no header)
- Indicador visual de ordenação (setas)

### 3. **Aba APIs**
Mesma estrutura da aba Recursos, MAS com coluna adicional:
- **Status Pentest**: 
  - Se concluído: Badge verde "✓ Concluído" + data + responsável
  - Se pendente: Badge laranja "Pendente"

### 4. **Aba Timeline**
Gráfico de linha maior (400px altura) mostrando:
- Linha laranja: Itens planejados por mês
- Linha verde: Itens concluídos por mês
- Todos os 12 meses de 2026 (mesmo sem dados)

### 5. **Export/Import CSV**

**Export**:
- Botão "Exportar CSV" no header
- Exporta dados da aba atual (Recursos ou APIs)
- Formato CSV com encoding UTF-8 BOM (para Excel)
- Nome do arquivo: `sre-tracker-{tipo}-{data}.csv`

**Colunas para Recursos**:
```
Tipo,Nome,Conta,Tecnologia,Responsável,Time,Custo,Deadline,Status,Descrição,Atualização
```

**Colunas para APIs** (adiciona 3 colunas):
```
...(colunas de recursos),Pentest Realizado,Data Pentest,Realizado Por
```

**Import**:
- Botão "Importar CSV" no header
- Ler arquivo CSV e adicionar novos itens ao estado
- Converter status do label para key (ex: "Concluído" → "concluido")
- Mostrar alert com quantidade de itens importados

## Design/UI

### Layout:
- **Header**: Gradiente azul (from-blue-600 to-blue-800), título "SRE Tracker", subtítulo "AWS Decommissioning Dashboard"
- **Navigation**: Abas horizontais (Overview, Recursos, APIs, Timeline)
- **Tabelas**: Hover effect nas linhas, headers com fundo cinza claro
- **Cards**: Sombra, borda colorida à esquerda, ícone grande com opacidade baixa
- **Responsivo**: Grid adaptativo (mobile-first)

### Elementos Visuais:
- Badges de status: Arredondados, coloridos, com ícone
- Alertas de urgência: Texto vermelho em bold para deadlines < 7 dias
- Ícones: Usar do lucide-react conforme contexto
- Espaçamento: Generoso (padding e gaps adequados)

### Cores (Tailwind):
- Azul: `blue-600`, `blue-800`
- Verde: `green-600`
- Vermelho: `red-600`
- Laranja: `orange-600`
- Cinza: `gray-50`, `gray-500`, etc.

## Dados de Exemplo (Seed Data)
Incluir ~8 itens mockados:
- 4 recursos AWS (EC2, RDS, S3, Lambda)
- 4 APIs (API Gateway, GraphQL, REST, BFF)
- Mix de status diferentes
- 3 APIs com pentest concluído, 1 pendente
- Alguns itens com deadline próximo (para testar urgência)

## Requisitos Técnicos

1. **Estado**: Usar `useState` para gerenciar dados
2. **Memoização**: Usar `useMemo` para cálculos de métricas e filtros
3. **Ordenação**: Implementar sort bidirecional (asc/desc)
4. **Código Limpo**: Componentes reutilizáveis (ex: MetricCard, TableRow)
5. **Performance**: Evitar re-renders desnecessários
6. **Acessibilidade**: Botões com hover states, inputs com labels

## Estrutura do Código
```
SRETracker (componente principal)
├── Estado (data, search, filters, sort, view)
├── Funções (handleSort, exportToExcel, importFromExcel)
├── Memoized Values (filtered, metrics, statusData, timelineData)
├── Subcomponentes
│   ├── MetricCard
│   ├── SortIcon
│   └── TableRow
└── Render
    ├── Header (título + botões export/import)
    ├── Navigation (abas)
    └── Views
        ├── Overview (metrics + charts)
        ├── Recursos (filters + table)
        ├── APIs (filters + table com pentest)
        └── Timeline (line chart)