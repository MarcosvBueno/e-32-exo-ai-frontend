export const translations = {
  en: {
    // Header
    'header.brand': 'E-32',
    'header.nav.home': 'Home',
    'header.nav.insights': 'Exoplanet Insights',
    'header.nav.form': 'Detection Form',
    'header.cta': 'Join the mission',

    // Hero - Initial state
    'hero.title.initial': 'Decoding Exoplanet Signatures',
    'hero.description.initial':
      'Surface the hidden patterns inside stellar light curves and forecast how likely each dataset reveals a new world.',

    // Hero - Midpoint state
    'hero.title.midpoint': 'Charting Detection Probabilities',
    'hero.description.midpoint':
      'Our upcoming analysis form will translate your mission inputs into precise exoplanet likelihood percentages for every candidate.',

    // Hero - Chips
    'hero.chip.mission': 'continuous mission',
    'hero.chip.telemetry': 'real-time telemetry',
    'hero.chip.collaboration': 'global collaboration',

    // Exoplanet Knowledge Section
    'knowledge.subtitle': 'Knowledge in Orbit',
    'knowledge.title': 'Explore the universe of exoplanets',
    'knowledge.description':
      'Learn what they are, how we detect them, and uncover surprising insights about worlds orbiting distant stars.',
    'knowledge.footer':
      'Step through these discoveries and get ready to run your own detection analysis.',
    'knowledge.button.previous': 'Previous',
    'knowledge.button.next': 'Next',

    // Knowledge insights
    'knowledge.insight1.title': 'What are exoplanets?',
    'knowledge.insight1.description':
      'Exoplanets are worlds orbiting stars beyond our Sun. They range from rocky Earth-like bodies to gas giants larger than Jupiter, revealing the staggering diversity of the cosmos.',
    'knowledge.insight1.fact1.title': 'First confirmed discovery',
    'knowledge.insight1.fact1.summary':
      'In 1992, astronomers detected the first exoplanets orbiting a pulsar, a highly magnetized neutron star.',
    'knowledge.insight1.fact2.title': 'Expanding catalog',
    'knowledge.insight1.fact2.summary':
      'More than five thousand exoplanets are confirmed, with thousands of additional candidates awaiting validation from space agencies.',

    'knowledge.insight2.title': 'How are they detected?',
    'knowledge.insight2.description':
      "Astronomers rely on methods like transit photometry and radial velocity measurements. Each technique uncovers unique clues about a planet's size, mass, and orbit.",
    'knowledge.insight2.fact1.title': 'Transit method',
    'knowledge.insight2.fact1.summary':
      "Monitors periodic dips in a star's brightness when a planet crosses in front, enabling estimates of the planet's radius.",
    'knowledge.insight2.fact2.title': 'Radial velocity',
    'knowledge.insight2.fact2.summary':
      "Measures tiny shifts in the stellar spectrum caused by a planet's gravity, which helps calculate an approximate mass.",

    'knowledge.insight3.title': 'Cosmic curiosities',
    'knowledge.insight3.description':
      'Exoplanets display remarkable traits, from ultra-fast worlds orbiting within hours to planets blanketed by endless global oceans.',
    'knowledge.insight3.fact1.title': 'Super-Earths',
    'knowledge.insight3.fact1.summary':
      "Some exoplanets exceed Earth's size yet remain smaller than Neptune, potentially hosting towering mountain chains and solid surfaces.",
    'knowledge.insight3.fact2.title': 'Habitable zones',
    'knowledge.insight3.fact2.summary':
      'Planets positioned at the right distance from their stars can retain liquid water, a key ingredient for life as we know it.',

    // Main page tabs
    'page.tabs.user': 'User',
    'page.tabs.scientist': 'Scientist',

    // User Form
    'form.user.subtitle': 'E-32 detector',
    'form.user.title':
      'Submit transit parameters to reveal the detected planet',
    'form.user.description':
      'Every field is sent directly to the official API. Default values simulate an Earth-like candidate so you can explore quickly.',

    // Form fields
    'form.field.orbital_period': 'Orbital period (days)',
    'form.field.transit_depth_ppm': 'Transit depth (ppm)',
    'form.field.transit_depth': 'Transit depth',
    'form.field.transit_duration': 'Transit duration (hours)',
    'form.field.planet_radius': 'Planet radius (R⊕)',
    'form.field.planet_mass': 'Planet mass (M⊕)',
    'form.field.stellar_temperature': 'Stellar temperature (K)',
    'form.field.stellar_radius': 'Stellar radius (R☉)',
    'form.field.stellar_mass': 'Stellar mass (M☉)',
    'form.field.radius_ratio': 'Radius ratio (Rp/Rs)',
    'form.field.semi_major_axis': 'Semi-major axis (AU)',
    'form.field.equilibrium_temp': 'Equilibrium temp. (K)',
    'form.field.log_orbital_period': 'Log orbital period',
    'form.field.period_mass_interaction': 'Period-mass interaction',
    'form.field.stellar_teff_bin': 'Stellar temperature bin (K)',

    // Form buttons
    'form.button.submit': 'Send to API',
    'form.button.submitting': 'Sending…',
    'form.button.clear': 'Clear inputs',
    'form.button.reset': 'Run another analysis',

    // Scientist Form
    'form.scientist.subtitle': 'E-32 Advanced Detector',
    'form.scientist.title':
      'Submit advanced transit parameters for detailed exoplanet detection',
    'form.scientist.description':
      'Designed for researchers, this form includes additional computed fields for precise predictions. Default values represent a confirmed exoplanet.',

    // Planet metrics
    'metrics.classification': 'Classification',
    'metrics.radius': 'Radius (R⊕)',
    'metrics.mass': 'Mass (M⊕)',
    'metrics.equilibrium_temp': 'Equilibrium temp.',
    'metrics.insolation': 'Insolation',

    // NASA Visualization
    'nasa.subtitle': 'Exoplanet visualization',
    'nasa.title': 'Explore the planet in detail',
    'nasa.description':
      'Rotate, zoom, and compare the detected world using NASA Eyes on Exoplanets.',

    // Detection - Not Planet Candidate
    'detection.not_candidate.subtitle': 'Low Confidence Detection',
    'detection.not_candidate.title': 'Not a Planet Candidate',
    'detection.not_candidate.description':
      'Our ML models indicate this transit signal is unlikely caused by an exoplanet.',
    'detection.not_candidate.confidence': 'Average Confidence',
  },
  pt: {
    // Header
    'header.brand': 'E-32',
    'header.nav.home': 'Início',
    'header.nav.insights': 'Insights de Exoplanetas',
    'header.nav.form': 'Formulário de Detecção',
    'header.cta': 'Junte-se à missão',

    // Hero - Initial state
    'hero.title.initial': 'Decodificando Assinaturas de Exoplanetas',
    'hero.description.initial':
      'Descubra os padrões ocultos nas curvas de luz estelares e preveja a probabilidade de cada conjunto de dados revelar um novo mundo.',

    // Hero - Midpoint state
    'hero.title.midpoint': 'Mapeando Probabilidades de Detecção',
    'hero.description.midpoint':
      'Nosso próximo formulário de análise traduzirá suas entradas de missão em porcentagens precisas de probabilidade de exoplanetas para cada candidato.',

    // Hero - Chips
    'hero.chip.mission': 'missão contínua',
    'hero.chip.telemetry': 'telemetria em tempo real',
    'hero.chip.collaboration': 'colaboração global',

    // Exoplanet Knowledge Section
    'knowledge.subtitle': 'Conhecimento em Órbita',
    'knowledge.title': 'Explore o universo dos exoplanetas',
    'knowledge.description':
      'Aprenda o que são, como os detectamos e descubra insights surpreendentes sobre mundos orbitando estrelas distantes.',
    'knowledge.footer':
      'Percorra essas descobertas e prepare-se para executar sua própria análise de detecção.',
    'knowledge.button.previous': 'Anterior',
    'knowledge.button.next': 'Próximo',

    // Knowledge insights
    'knowledge.insight1.title': 'O que são exoplanetas?',
    'knowledge.insight1.description':
      'Exoplanetas são mundos orbitando estrelas além do nosso Sol. Eles variam de corpos rochosos semelhantes à Terra a gigantes gasosos maiores que Júpiter, revelando a impressionante diversidade do cosmos.',
    'knowledge.insight1.fact1.title': 'Primeira descoberta confirmada',
    'knowledge.insight1.fact1.summary':
      'Em 1992, astrônomos detectaram os primeiros exoplanetas orbitando um pulsar, uma estrela de nêutrons altamente magnetizada.',
    'knowledge.insight1.fact2.title': 'Catálogo em expansão',
    'knowledge.insight1.fact2.summary':
      'Mais de cinco mil exoplanetas são confirmados, com milhares de candidatos adicionais aguardando validação das agências espaciais.',

    'knowledge.insight2.title': 'Como são detectados?',
    'knowledge.insight2.description':
      'Astrônomos dependem de métodos como fotometria de trânsito e medições de velocidade radial. Cada técnica revela pistas únicas sobre o tamanho, massa e órbita de um planeta.',
    'knowledge.insight2.fact1.title': 'Método de trânsito',
    'knowledge.insight2.fact1.summary':
      'Monitora quedas periódicas no brilho de uma estrela quando um planeta cruza à frente, permitindo estimativas do raio do planeta.',
    'knowledge.insight2.fact2.title': 'Velocidade radial',
    'knowledge.insight2.fact2.summary':
      'Mede pequenos deslocamentos no espectro estelar causados pela gravidade de um planeta, o que ajuda a calcular uma massa aproximada.',

    'knowledge.insight3.title': 'Curiosidades cósmicas',
    'knowledge.insight3.description':
      'Exoplanetas exibem características notáveis, desde mundos ultra-rápidos orbitando em horas até planetas cobertos por oceanos globais infinitos.',
    'knowledge.insight3.fact1.title': 'Super-Terras',
    'knowledge.insight3.fact1.summary':
      'Alguns exoplanetas excedem o tamanho da Terra, mas permanecem menores que Netuno, potencialmente hospedando cadeias de montanhas altíssimas e superfícies sólidas.',
    'knowledge.insight3.fact2.title': 'Zonas habitáveis',
    'knowledge.insight3.fact2.summary':
      'Planetas posicionados à distância certa de suas estrelas podem reter água líquida, um ingrediente-chave para a vida como a conhecemos.',

    // Main page tabs
    'page.tabs.user': 'Usuário',
    'page.tabs.scientist': 'Cientista',

    // User Form
    'form.user.subtitle': 'Detector E-32',
    'form.user.title':
      'Envie os parâmetros de trânsito para revelar o planeta detectado',
    'form.user.description':
      'Cada campo é enviado diretamente para a API oficial. Os valores padrão simulam um candidato semelhante à Terra para você explorar rapidamente.',

    // Form fields
    'form.field.orbital_period': 'Período orbital (dias)',
    'form.field.transit_depth_ppm': 'Profundidade de trânsito (ppm)',
    'form.field.transit_depth': 'Profundidade de trânsito',
    'form.field.transit_duration': 'Duração do trânsito (horas)',
    'form.field.planet_radius': 'Raio do planeta (R⊕)',
    'form.field.planet_mass': 'Massa do planeta (M⊕)',
    'form.field.stellar_temperature': 'Temperatura estelar (K)',
    'form.field.stellar_radius': 'Raio estelar (R☉)',
    'form.field.stellar_mass': 'Massa estelar (M☉)',
    'form.field.radius_ratio': 'Razão de raio (Rp/Rs)',
    'form.field.semi_major_axis': 'Semieixo maior (UA)',
    'form.field.equilibrium_temp': 'Temp. de equilíbrio (K)',
    'form.field.log_orbital_period': 'Log período orbital',
    'form.field.period_mass_interaction': 'Interação período-massa',
    'form.field.stellar_teff_bin': 'Bin de temperatura estelar (K)',

    // Form buttons
    'form.button.submit': 'Enviar para API',
    'form.button.submitting': 'Enviando…',
    'form.button.clear': 'Limpar campos',
    'form.button.reset': 'Executar outra análise',

    // Scientist Form
    'form.scientist.subtitle': 'Detector Avançado E-32',
    'form.scientist.title':
      'Envie parâmetros avançados de trânsito para detecção detalhada de exoplanetas',
    'form.scientist.description':
      'Projetado para pesquisadores, este formulário inclui campos calculados adicionais para previsões precisas. Os valores padrão representam um exoplaneta confirmado.',

    // Planet metrics
    'metrics.classification': 'Classificação',
    'metrics.radius': 'Raio (R⊕)',
    'metrics.mass': 'Massa (M⊕)',
    'metrics.equilibrium_temp': 'Temp. de equilíbrio',
    'metrics.insolation': 'Insolação',

    // NASA Visualization
    'nasa.subtitle': 'Visualização de exoplaneta',
    'nasa.title': 'Explore o planeta em detalhes',
    'nasa.description':
      'Rotacione, amplie e compare o mundo detectado usando o NASA Eyes on Exoplanets.',

    // Detection - Not Planet Candidate
    'detection.not_candidate.subtitle': 'Detecção de Baixa Confiança',
    'detection.not_candidate.title': 'Não é um Candidato a Planeta',
    'detection.not_candidate.description':
      'Nossos modelos de ML indicam que este sinal de trânsito provavelmente não é causado por um exoplaneta.',
    'detection.not_candidate.confidence': 'Confiança Média',
  },
};
