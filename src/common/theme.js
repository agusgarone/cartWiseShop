/**
 * Paleta "Crema & salvia"
 * - Canvas / fondo: #FCF3E9
 * - Acento principal (botones, tabs, check): #87A96B
 * - Superficies: papel cálido y blanco para tarjetas
 * - Terracota: acento secundario (voz / IA) complementario al verde
 */

const ColorsLight = {
  canvas: '#FCF3E9',
  surface: '#FFFBF6',
  elevated: '#FFFFFF',
  primary: '#87A96B',
  /** Pantallas con mucho color + texto claro (login, ajustes) */
  primaryStrong: '#6E8A54',
  primarySoft: '#C5D4B8',
  greyPrimary: '#8A8174',
  greySecondary: '#6B6254',
  /** Texto / iconos sobre botón primario */
  onPrimary: '#FFFFFF',
  white: '#FFFFFF',
  dark: '#2C2416',
  terracotta: '#C4836A',
  terracottaInk: '#5C3D32',
  terracottaMutedBg: '#EDD6CC',
};

const ColorsDark = {
  canvas: '#1E1B17',
  surface: '#2A2620',
  elevated: '#36312A',
  primary: '#9AB882',
  primaryStrong: '#7D9468',
  primarySoft: '#4A5540',
  greyPrimary: '#A89E91',
  greySecondary: '#C9BFB2',
  onPrimary: '#1E1B17',
  white: '#36312A',
  dark: '#F5EDE4',
  terracotta: '#D4A090',
  terracottaInk: '#F5D9CE',
  terracottaMutedBg: '#4A3230',
};

const light = {
  backgroundScreen: ColorsLight.canvas,
  /** FAB flotante principal (+ crear producto / añadir a lista) */
  floatFab: {
    background: ColorsLight.primary,
    icon: ColorsLight.onPrimary,
  },
  /** FAB asistente de voz (Sparkles) */
  fabAi: {
    background: ColorsLight.terracotta,
    icon: ColorsLight.onPrimary,
    shadowColor: ColorsLight.dark,
  },
  modal: {
    background: ColorsLight.elevated,
    borderColor: ColorsLight.primarySoft,
    text: ColorsLight.dark,
    icon: ColorsLight.dark,
  },
  button: {
    background: ColorsLight.primary,
    text: ColorsLight.onPrimary,
    backgroundSecondary: ColorsLight.elevated,
    textSecondary: ColorsLight.primary,
  },
  input: {
    color: ColorsLight.dark,
    background: ColorsLight.elevated,
    borderColor: ColorsLight.primarySoft,
    placeHolder: ColorsLight.greySecondary,
  },
  select: {
    background: ColorsLight.elevated,
    dropdownIconRipple: ColorsLight.dark,
    dropdownIcon: ColorsLight.dark,
    color: ColorsLight.dark,
    borderColor: ColorsLight.primarySoft,
  },
  header: {
    background: ColorsLight.surface,
    shadow: ColorsLight.dark,
  },
  loader: {
    color: ColorsLight.primary,
    isLoadingPreferences: ColorsLight.dark,
  },
  profileButton: {
    background: ColorsLight.greySecondary,
  },
  addProducts: {
    renderProduct: {
      background: ColorsLight.elevated,
      backgroundSelected: ColorsLight.primary,
      color: ColorsLight.greySecondary,
      colorSelected: ColorsLight.onPrimary,
    },
  },
  createList: {
    listEmpty: {
      color: ColorsLight.greySecondary,
    },
    renderProduct: {
      background: ColorsLight.elevated,
      color: ColorsLight.greySecondary,
      icon: ColorsLight.greySecondary,
    },
    newProductChip: {
      background: ColorsLight.terracottaMutedBg,
      color: ColorsLight.terracottaInk,
    },
  },
  home: {
    color: ColorsLight.greySecondary,
    renderProduct: {
      background: ColorsLight.elevated,
      titleColor: ColorsLight.dark,
      subtitleColor: ColorsLight.greySecondary,
    },
    emptyList: {
      iconIA: ColorsLight.onPrimary,
      iconManual: ColorsLight.primary,
    },
  },
  listDetail: {
    titleColor: ColorsLight.dark,
    button: {
      background: ColorsLight.primarySoft,
      icon: ColorsLight.dark,
    },
    renderProduct: {
      background: ColorsLight.elevated,
      color: ColorsLight.greySecondary,
      checkboxTrue: ColorsLight.primary,
      checkboxFalse: ColorsLight.greySecondary,
    },
  },
  listEditor: {
    segmentBackground: ColorsLight.primarySoft,
    segmentActive: ColorsLight.primary,
    segmentActiveText: ColorsLight.onPrimary,
    segmentInactiveText: ColorsLight.greySecondary,
    inputBackground: ColorsLight.elevated,
    inputBorder: ColorsLight.primarySoft,
    productRowBackground: ColorsLight.elevated,
    categoryChipBackground: ColorsLight.primarySoft,
    categoryChipText: ColorsLight.dark,
    filterChipBackground: ColorsLight.elevated,
    filterChipText: ColorsLight.greySecondary,
  },
  login: {
    background: ColorsLight.primaryStrong,
    backgroundDiv: ColorsLight.elevated,
    color: ColorsLight.dark,
    signIn: {
      iconColor: ColorsLight.onPrimary,
      descriptionColor: ColorsLight.dark,
      colorTextButton: ColorsLight.primary,
    },
    logIn: {
      iconColor: ColorsLight.onPrimary,
      descriptionColor: ColorsLight.dark,
      colorTextButton: ColorsLight.primary,
    },
  },
  products: {
    color: ColorsLight.greySecondary,
    buttonFilter: {
      background: ColorsLight.primary,
      color: ColorsLight.onPrimary,
    },
    renderProduct: {
      background: ColorsLight.elevated,
      color: ColorsLight.greyPrimary,
      colorSelected: ColorsLight.onPrimary,
      icon: ColorsLight.greySecondary,
    },
  },
  userSettings: {
    background: ColorsLight.primaryStrong,
    backgroundDiv: ColorsLight.elevated,
    nameColor: ColorsLight.dark,
    descriptionColor: ColorsLight.greySecondary,
    itemSettingColor: ColorsLight.dark,
    iconColor: ColorsLight.dark,
  },
  tab: {
    iconFocus: ColorsLight.primary,
    icon: ColorsLight.greySecondary,
    activeTabColor: ColorsLight.primary,
    background: ColorsLight.surface,
  },
  stack: {
    icon: ColorsLight.dark,
    background: ColorsLight.surface,
    titleScreen: ColorsLight.dark,
  },
  filterProducts: {
    background: ColorsLight.canvas,
    title: ColorsLight.dark,
    subtitle: ColorsLight.dark,
    sortIcon: ColorsLight.greySecondary,
    renderProduct: {
      text: ColorsLight.greyPrimary,
      true: ColorsLight.primary,
      false: ColorsLight.greySecondary,
    },
  },
};

const dark = {
  backgroundScreen: ColorsDark.canvas,
  floatFab: {
    background: ColorsDark.primary,
    icon: ColorsDark.onPrimary,
  },
  fabAi: {
    background: ColorsDark.terracotta,
    icon: ColorsDark.onPrimary,
    shadowColor: '#000000',
  },
  modal: {
    background: ColorsDark.elevated,
    borderColor: ColorsDark.primarySoft,
    text: ColorsDark.dark,
    icon: ColorsDark.dark,
  },
  button: {
    background: ColorsDark.primary,
    text: ColorsDark.onPrimary,
    backgroundSecondary: ColorsDark.elevated,
    textSecondary: ColorsDark.primary,
  },
  input: {
    color: ColorsDark.dark,
    background: ColorsDark.elevated,
    borderColor: ColorsDark.primarySoft,
    placeHolder: ColorsDark.greySecondary,
  },
  select: {
    background: ColorsDark.elevated,
    dropdownIconRipple: ColorsDark.dark,
    dropdownIcon: ColorsDark.dark,
    color: ColorsDark.dark,
    borderColor: ColorsDark.primarySoft,
  },
  header: {
    background: ColorsDark.surface,
    shadow: ColorsDark.dark,
  },
  loader: {
    color: ColorsDark.primary,
    isLoadingPreferences: ColorsDark.dark,
  },
  profileButton: {
    background: ColorsDark.greySecondary,
  },
  addProducts: {
    renderProduct: {
      background: ColorsDark.elevated,
      backgroundSelected: ColorsDark.primary,
      color: ColorsDark.greyPrimary,
      colorSelected: ColorsDark.onPrimary,
    },
  },
  createList: {
    listEmpty: {
      color: ColorsDark.greySecondary,
    },
    renderProduct: {
      background: ColorsDark.elevated,
      color: ColorsDark.greySecondary,
      icon: ColorsDark.greySecondary,
    },
    newProductChip: {
      background: ColorsDark.terracottaMutedBg,
      color: ColorsDark.terracottaInk,
    },
  },
  home: {
    color: ColorsDark.greySecondary,
    renderProduct: {
      background: ColorsDark.elevated,
      titleColor: ColorsDark.dark,
      subtitleColor: ColorsDark.greySecondary,
    },
  },
  listDetail: {
    titleColor: ColorsDark.dark,
    button: {
      background: ColorsDark.primarySoft,
      icon: ColorsDark.dark,
    },
    renderProduct: {
      background: ColorsDark.elevated,
      color: ColorsDark.greyPrimary,
      checkboxTrue: ColorsDark.primary,
      checkboxFalse: ColorsDark.greySecondary,
    },
  },
  listEditor: {
    segmentBackground: ColorsDark.primarySoft,
    segmentActive: ColorsDark.primary,
    segmentActiveText: ColorsDark.onPrimary,
    segmentInactiveText: ColorsDark.greySecondary,
    inputBackground: ColorsDark.elevated,
    inputBorder: ColorsDark.primarySoft,
    productRowBackground: ColorsDark.elevated,
    categoryChipBackground: ColorsDark.primarySoft,
    categoryChipText: ColorsDark.dark,
    filterChipBackground: ColorsDark.elevated,
    filterChipText: ColorsDark.greyPrimary,
  },
  login: {
    background: ColorsDark.primaryStrong,
    backgroundDiv: ColorsDark.elevated,
    color: ColorsDark.dark,
    signIn: {
      iconColor: ColorsDark.onPrimary,
      descriptionColor: ColorsDark.dark,
      colorTextButton: ColorsDark.primary,
    },
    logIn: {
      iconColor: ColorsDark.onPrimary,
      descriptionColor: ColorsDark.dark,
      colorTextButton: ColorsDark.primary,
    },
  },
  products: {
    color: ColorsDark.greySecondary,
    buttonFilter: {
      background: ColorsDark.primary,
      color: ColorsDark.onPrimary,
    },
    renderProduct: {
      background: ColorsDark.elevated,
      color: ColorsDark.greyPrimary,
      colorSelected: ColorsDark.onPrimary,
      icon: ColorsDark.greySecondary,
    },
  },
  userSettings: {
    background: ColorsDark.primaryStrong,
    backgroundDiv: ColorsDark.elevated,
    nameColor: ColorsDark.dark,
    descriptionColor: ColorsDark.greySecondary,
    itemSettingColor: ColorsDark.dark,
    iconColor: ColorsDark.dark,
  },
  tab: {
    iconFocus: ColorsDark.primary,
    icon: ColorsDark.greySecondary,
    activeTabColor: ColorsDark.primary,
    background: ColorsDark.surface,
  },
  stack: {
    icon: ColorsDark.dark,
    background: ColorsDark.surface,
    titleScreen: ColorsDark.dark,
  },
  filterProducts: {
    background: ColorsDark.canvas,
    title: ColorsDark.dark,
    subtitle: ColorsDark.dark,
    sortIcon: ColorsDark.greySecondary,
    renderProduct: {
      text: ColorsDark.greyPrimary,
      true: ColorsDark.primary,
      false: ColorsDark.greySecondary,
    },
  },
};

const fontSize = {
  xxs: 8,
  xs: 10,
  s: 12,
  m: 14,
  l: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
};

const theme = {
  light,
  dark,
  fontSize,
};

export default theme;
