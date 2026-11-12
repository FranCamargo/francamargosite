export const profile = {
  name: 'Franciely Camargo',
  shortName: 'Fran Camargo',
  role: 'Front-End Developer',
  specialty: 'UI/UX Specialist',
  email: 'francamargoads@gmail.com',
  linkedin: 'https://www.linkedin.com/in/francamargodev',
  linkedinHandle: '@francamargodev',
  github: 'https://github.com/francamargo',
  whatsapp: 'https://wa.me/5547988283491',
}

export const coreStack = [
  'Angular',
  'React',
  'TypeScript',
  'React Native',
  'Tailwind CSS',
  'Figma',
  'Node.js',
  'JavaScript',
  'Python',
  'Firebase',
  'PostgreSQL',
  'MongoDB',
  'DB2',
  'Godot',
  'GenAI',
]

export type Project = {
  name: string
  kind: 'Mobile' | 'Web'
  description: string
  stack: string[]
  url?: string
  linkLabel?: string
  statusLabel?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: 'Oliv Devocional',
    kind: 'Mobile',
    url: 'https://play.google.com/store/apps/details?id=com.francamargo.oliv',
    linkLabel: 'Ver na Google Play',
    stack: ['React Native', 'TypeScript', 'EAS'],
    featured: true,
    description:
      'Aplicativo devocional para mulheres cristãs que integra Bíblia, diário de oração e versículo do dia em uma experiência focada e livre de distrações. Desenvolvido de ponta a ponta, da concepção do produto ao deploy em produção na Google Play, com React Native e TypeScript e pipeline de build via EAS. Interface moderna com identidade visual autoral, recursos de acessibilidade e sistema de conquistas para engajamento.',
  },
  {
    name: 'Lírio App',
    kind: 'Mobile',
    statusLabel: 'Em breve na Google Play',
    stack: ['React Native', 'TypeScript', 'Firebase'],
    description:
      'Aplicativo de leitura de livros de domínio público com estante realista e personalizável, loja de decorações, conteúdo compartilhável e recursos de acessibilidade. Desenvolvido em React Native e TypeScript, com autenticação e sincronização em nuvem via Firebase e pipeline de build via EAS. Atualmente em fase de testes fechados na Google Play.',
  },
  {
    name: 'Chat.AI',
    kind: 'Web',
    url: 'https://fc-chatai.netlify.app/',
    stack: ['React', 'Redux', 'TypeScript'],
    featured: true,
    description:
      'SPA que simula uma plataforma de assistente de IA com autenticação, histórico de conversas persistido e análise de uso. Estudo prático de React com Redux. Acesse com qualquer senha; usuário "Admin" desbloqueia um dashboard de análise (inicie conversas para ver os dados, pois é mockado com persistência local).',
  },
  {
    name: 'OneRing Chat',
    kind: 'Web',
    url: 'https://chat2-ig7k.onrender.com/',
    stack: ['Angular', 'Node.js', 'Socket'],
    description:
      'Chat anônimo em Angular com backend Node.js e conexão entre sessões via Socket. Sem cadastro. Nome e cor únicos são gerados automaticamente. Conta com suporte a emoticons, mini jogos (Snake e Jogo da Velha) e termos de uso. Voltado para maiores de 18 anos.',
  },
  {
    name: 'Dicionário Angular',
    kind: 'Web',
    url: 'https://francamargo.github.io/dicionarioangular/',
    stack: ['Angular 21', 'Signals', 'TypeScript'],
    featured: true,
    description:
      'Glossário interativo com os principais termos, conceitos e depreciações do Angular, organizado por versão (v14 a v22). Traz uma lista geral pesquisável com filtros por categoria e paginação, além de uma aba dedicada às APIs descontinuadas, cada uma com a versão de depreciação e a alternativa recomendada. Projeto de estudo em Angular 21, com Signals e o novo control flow.',
  },
  {
    name: 'FWex Games',
    kind: 'Web',
    url: 'https://fwex-games-hub.web.app/',
    stack: ['JavaScript', 'Firebase', 'Godot'],
    featured: true,
    description:
      'Hub web de jogos com visual ultramoderno inspirado em animes. Reúne jogos feitos no Godot Engine, cada um hospedado no próprio site e carregado por um manifesto JSON, sem integrar o código ao hub. Tem login obrigatório (Google e e-mail), progresso sincronizado na nuvem, favoritos, estatísticas e player embutido. Inclui o Sakura Catch, um quebra-blocos autoral com áudio gerado por código. Desenvolvido com HTML, CSS, JavaScript, Canvas, Web Audio API e Firebase (Auth, Firestore e Hosting).',
  },
  {
    name: 'Fábrica de Renda',
    kind: 'Web',
    statusLabel: 'Uso pessoal · roda localmente',
    stack: ['TypeScript', 'Node.js', 'Claude Code'],
    description:
      'Equipe de agentes de IA que cria e mantém sozinha pequenos negócios online de custo zero, como sites, calculadoras e produtos digitais. Funciona num chat no navegador: os agentes pesquisam ideias, mostram o plano com a rotina de manutenção, e só começam a construir após a aprovação. Publicam e atualizam os sites na Netlify, cadastram produtos digitais na Hotmart com automação de navegador via Playwright e fazem manutenção periódica, contando no chat o que mudaram. As regras de custo zero e de zero horas recorrentes são validadas no código, não só no prompt.',
  },
  {
    name: 'CriptoMobile',
    kind: 'Mobile',
    statusLabel: 'APK em testes',
    stack: ['React Native', 'Expo', 'TypeScript'],
    description:
      'Radar cripto para Android, derivado da Fábrica de Renda, em que agentes de IA monitoram o mercado e explicam passo a passo como aproveitar cada oportunidade: airdrops e testnets gratuitos, jogos NFT, notícias e um verificador de golpes. Cada item traz links oficiais, checklist, nota de confiança e risco, e o que parece golpe é descartado no código. Inclui chat com os agentes, cotações e alertas de queda via CoinGecko e uma ponte local que conecta o app ao Claude Code do PC pela rede Wi-Fi. Desenvolvido com Expo, SQLite e notificações nativas.',
  },
  {
    name: 'RankWows',
    kind: 'Web',
    statusLabel: 'Uso pessoal · roda localmente',
    stack: ['Python', 'FastAPI', 'ffmpeg'],
    description:
      'Pipeline semiautomático que produz e agenda Shorts de ranking para um canal do YouTube. Busca vídeos com licença Creative Commons e salva a evidência da licença, corta os melhores trechos por detecção de cena e volume e renderiza vídeos verticais com lista numerada, emojis, efeitos sonoros sintetizados e áudio normalizado. Os vídeos só sobem após aprovação em um painel web local, agendados nos horários de pico, e as métricas priorizam os temas com melhor desempenho. Desenvolvido como CLI em Python com SQLite, Typer, Playwright, yt-dlp e YouTube Data API.',
  },
  {
    name: 'Pins Bestseller',
    kind: 'Web',
    statusLabel: 'Uso pessoal · roda localmente',
    stack: ['Node.js', 'JavaScript', 'APIs REST'],
    description:
      'Automação que busca os produtos mais vendidos do Mercado Livre, AliExpress e Amazon, cria pins com link de afiliado no Pinterest e mostra alcance, cliques e comissões num painel local. Usa somente APIs oficiais e gratuitas (Pinterest API v5 com OAuth, Mercado Livre, AliExpress Affiliates e Amazon PA-API), sem scraping e sem dependências externas. Para proteger a conta, distribui as postagens ao longo do dia, varia os textos, evita repetir produtos e pausa sozinha quando a plataforma pede.',
  },
  {
    name: 'UneBR',
    kind: 'Mobile',
    statusLabel: 'Em breve na Google Play',
    stack: ['React Native', 'Android'],
    description:
      'Aplicativo mobile independente e não oficial que reúne, em um só lugar, links oficiais e dicas de acesso a serviços públicos brasileiros (INSS, Receita Federal, Detran, Caixa Econômica Federal, entre outros). Sem login, cadastro ou armazenamento de dados em servidor próprio. Desenvolvido em React Native / Android Studio. Ainda não publicado na PlayStore.',
  },
  {
    name: 'Cozyfy',
    kind: 'Mobile',
    statusLabel: 'Em desenvolvimento',
    stack: ['Expo', 'React Native', 'TypeScript'],
    description:
      'Aplicativo mobile em desenvolvimento com Expo (React Native) e TypeScript, pensado como um espaço acolhedor de bem-estar digital. Deve reunir chat online com login, mini games originais em estilo 8-bit, funcionalidades zen como meditação guiada e respiração guiada, além de calendário, horóscopo, combinações e muito mais.',
  },
]
