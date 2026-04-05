export type ProductCategory =
  | 'Lácteos'
  | 'Carnicería'
  | 'Verdulería'
  | 'Panadería'
  | 'Almacén'
  | 'Bebidas'
  | 'Limpieza'
  | 'Higiene'
  | 'Congelados'
  | 'Mascotas'
  | 'Sin categoría';

export type CatalogProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  keywords: string[];
};

/** Mapeo de categorías del catálogo local a IDs del sistema (DEFAULT_CATEGORIES). */
export const CATALOG_CATEGORY_TO_APP_ID: Record<ProductCategory, number> = {
  Lácteos: 3,
  Carnicería: 2,
  Verdulería: 1,
  Panadería: 4,
  Almacén: 8,
  Bebidas: 5,
  Limpieza: 6,
  Higiene: 7,
  Congelados: 9,
  Mascotas: 10,
  'Sin categoría': 10,
};

/** Nombre visible en la UI (puede diferir del nombre interno del sistema). */
export const CATALOG_CATEGORY_DISPLAY_NAME: Record<ProductCategory, string> = {
  Lácteos: 'Lácteos',
  Carnicería: 'Carnicería',
  Verdulería: 'Verdulería',
  Panadería: 'Panadería',
  Almacén: 'Almacén',
  Bebidas: 'Bebidas',
  Limpieza: 'Limpieza',
  Higiene: 'Higiene',
  Congelados: 'Congelados',
  Mascotas: 'Mascotas',
  'Sin categoría': 'Sin categoría',
};

export const PRODUCT_CATALOG: CatalogProduct[] = [
  // —— Lácteos ——
  {
    id: 'leche',
    name: 'Leche',
    category: 'Lácteos',
    keywords: ['leche', 'leche entera', 'leche descremada', 'sachet de leche'],
  },
  {
    id: 'queso',
    name: 'Queso',
    category: 'Lácteos',
    keywords: ['queso', 'queso cremoso', 'queso rallado', 'mozzarella', 'parmesano'],
  },
  {
    id: 'yogur',
    name: 'Yogur',
    category: 'Lácteos',
    keywords: ['yogur', 'yogurt', 'yogures', 'yogur griego'],
  },
  {
    id: 'manteca',
    name: 'Manteca',
    category: 'Lácteos',
    keywords: ['manteca', 'mantequilla'],
  },
  {
    id: 'crema',
    name: 'Crema',
    category: 'Lácteos',
    keywords: ['crema', 'crema de leche', 'crema para cocinar', 'nata'],
  },
  {
    id: 'dulce-de-leche',
    name: 'Dulce de leche',
    category: 'Lácteos',
    keywords: ['dulce de leche', 'ddl', 'dulce leche'],
  },
  {
    id: 'ricota',
    name: 'Ricota',
    category: 'Lácteos',
    keywords: ['ricota', 'ricotta'],
  },
  {
    id: 'leche-en-polvo',
    name: 'Leche en polvo',
    category: 'Lácteos',
    keywords: ['leche en polvo', 'leche polvo', 'la lechera'],
  },

  // —— Panadería ——
  {
    id: 'pan',
    name: 'Pan',
    category: 'Panadería',
    keywords: ['pan', 'pan lactal', 'flauta', 'baguette', 'pan de molde'],
  },
  {
    id: 'galletitas',
    name: 'Galletitas',
    category: 'Panadería',
    keywords: ['galletitas', 'galletas', 'oreo', 'pepitos', 'sonrisas'],
  },
  {
    id: 'tostadas',
    name: 'Tostadas',
    category: 'Panadería',
    keywords: ['tostadas', 'tostada', 'pan tostado'],
  },
  {
    id: 'medialunas',
    name: 'Medialunas',
    category: 'Panadería',
    keywords: ['medialunas', 'medialuna', 'facturas', 'croissant'],
  },
  {
    id: 'bizcochos',
    name: 'Bizcochos',
    category: 'Panadería',
    keywords: ['bizcochos', 'bizcocho', 'saladitos'],
  },

  // —— Verdulería ——
  {
    id: 'tomate',
    name: 'Tomate',
    category: 'Verdulería',
    keywords: ['tomate', 'tomates', 'tomate perita', 'tomate redondo'],
  },
  {
    id: 'papa',
    name: 'Papa',
    category: 'Verdulería',
    keywords: ['papa', 'papas', 'patata', 'patatas'],
  },
  {
    id: 'cebolla',
    name: 'Cebolla',
    category: 'Verdulería',
    keywords: ['cebolla', 'cebollas', 'cebolla morada', 'cebolla colorada'],
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'Verdulería',
    keywords: ['banana', 'bananas', 'banana ecuador', 'cambur'],
  },
  {
    id: 'manzana',
    name: 'Manzana',
    category: 'Verdulería',
    keywords: ['manzana', 'manzanas', 'manzana roja', 'manzana verde'],
  },
  {
    id: 'zanahoria',
    name: 'Zanahoria',
    category: 'Verdulería',
    keywords: ['zanahoria', 'zanahorias'],
  },
  {
    id: 'lechuga',
    name: 'Lechuga',
    category: 'Verdulería',
    keywords: ['lechuga', 'lechuga capuchina', 'lechuga morada'],
  },
  {
    id: 'ajo',
    name: 'Ajo',
    category: 'Verdulería',
    keywords: ['ajo', 'cabezas de ajo', 'diente de ajo'],
  },
  {
    id: 'morron',
    name: 'Morrón',
    category: 'Verdulería',
    keywords: ['morron', 'morrón', 'morrones', 'pimiento', 'pimenton'],
  },
  {
    id: 'zapallo',
    name: 'Zapallo',
    category: 'Verdulería',
    keywords: ['zapallo', 'zapallito', 'zucchini', 'zuchinni', 'calabacin'],
  },
  {
    id: 'naranja',
    name: 'Naranja',
    category: 'Verdulería',
    keywords: ['naranja', 'naranjas', 'jugo de naranja natural'],
  },
  {
    id: 'limon',
    name: 'Limón',
    category: 'Verdulería',
    keywords: ['limon', 'limón', 'limones'],
  },
  {
    id: 'palta',
    name: 'Palta',
    category: 'Verdulería',
    keywords: ['palta', 'paltas', 'aguacate', 'aguacates'],
  },
  {
    id: 'espinaca',
    name: 'Espinaca',
    category: 'Verdulería',
    keywords: ['espinaca', 'espinacas', 'acelga'],
  },
  {
    id: 'brocoli',
    name: 'Brócoli',
    category: 'Verdulería',
    keywords: ['brocoli', 'brócoli', 'broccoli'],
  },
  {
    id: 'pera',
    name: 'Pera',
    category: 'Verdulería',
    keywords: ['pera', 'peras'],
  },
  {
    id: 'uva',
    name: 'Uva',
    category: 'Verdulería',
    keywords: ['uva', 'uvas'],
  },
  {
    id: 'sandia',
    name: 'Sandía',
    category: 'Verdulería',
    keywords: ['sandia', 'sandía', 'melon', 'melón'],
  },
  {
    id: 'pepino',
    name: 'Pepino',
    category: 'Verdulería',
    keywords: ['pepino', 'pepinos'],
  },
  {
    id: 'apio',
    name: 'Apio',
    category: 'Verdulería',
    keywords: ['apio'],
  },
  {
    id: 'berenjena',
    name: 'Berenjena',
    category: 'Verdulería',
    keywords: ['berenjena', 'berenjenas'],
  },
  {
    id: 'choclo',
    name: 'Choclo',
    category: 'Verdulería',
    keywords: ['choclo', 'maiz', 'maíz', 'choclo fresco'],
  },

  // —— Carnicería ——
  {
    id: 'carne',
    name: 'Carne',
    category: 'Carnicería',
    keywords: ['carne', 'carne picada', 'bife', 'asado', 'vacuna', 'carne vacuna'],
  },
  {
    id: 'pollo',
    name: 'Pollo',
    category: 'Carnicería',
    keywords: ['pollo', 'pechuga', 'pata muslo', 'pollo entero', 'suprema'],
  },
  {
    id: 'cerdo',
    name: 'Cerdo',
    category: 'Carnicería',
    keywords: ['cerdo', 'carne de cerdo', 'bondiola', 'costilla de cerdo'],
  },
  {
    id: 'chorizo',
    name: 'Chorizo',
    category: 'Carnicería',
    keywords: ['chorizo', 'chorizos', 'chorizo colorado', 'chorizo criollo'],
  },
  {
    id: 'milanesa',
    name: 'Milanesa',
    category: 'Carnicería',
    keywords: ['milanesa', 'milanesas', 'milanesa de carne', 'milanesa de pollo'],
  },
  {
    id: 'pescado',
    name: 'Pescado',
    category: 'Carnicería',
    keywords: ['pescado', 'filet de pescado', 'pescado fresco'],
  },
  {
    id: 'merluza',
    name: 'Merluza',
    category: 'Carnicería',
    keywords: ['merluza', 'filet de merluza'],
  },
  {
    id: 'salmon',
    name: 'Salmón',
    category: 'Carnicería',
    keywords: ['salmon', 'salmón', 'salmón rosado'],
  },
  {
    id: 'hamburguesa-carne',
    name: 'Hamburguesas (carne)',
    category: 'Carnicería',
    keywords: ['hamburguesa', 'hamburguesas', 'medallon', 'medallón', 'medallones'],
  },

  // —— Embutidos y fiambres ——
  {
    id: 'jamon',
    name: 'Jamón',
    category: 'Carnicería',
    keywords: [
      'jamon',
      'jamón',
      'jamon cocido',
      'jamón cocido',
      'jamon paladini',
      'jamon cagnoli',
      'fiambre de jamon',
    ],
  },
  {
    id: 'jamon-crudo',
    name: 'Jamón crudo',
    category: 'Carnicería',
    keywords: [
      'jamon crudo',
      'jamón crudo',
      'jamon serrano',
      'jamón serrano',
      'prosciutto crudo',
      'jamon crudo español',
    ],
  },
  {
    id: 'paleta',
    name: 'Paleta',
    category: 'Carnicería',
    keywords: ['paleta', 'paleta de cerdo', 'paleta cocida', 'fiambre paleta'],
  },
  {
    id: 'matambre',
    name: 'Matambre',
    category: 'Carnicería',
    keywords: [
      'matambre',
      'matambre casero',
      'matambre arrollado',
      'matambre a la pizza',
    ],
  },
  {
    id: 'salchichon',
    name: 'Salchichón',
    category: 'Carnicería',
    keywords: ['salchichon', 'salchichón', 'salchichon primavera', 'salchichon danica'],
  },
  {
    id: 'mortadela',
    name: 'Mortadela',
    category: 'Carnicería',
    keywords: [
      'mortadela',
      'mortadela con aceitunas',
      'mortadela bologna',
      'mortadela con pistachos',
    ],
  },
  {
    id: 'salame',
    name: 'Salame',
    category: 'Carnicería',
    keywords: [
      'salame',
      'salamín',
      'salamin',
      'salame casero',
      'salame tandil',
      'salame cantimpalo',
      'salame milan',
    ],
  },
  {
    id: 'lomito-ahumado',
    name: 'Lomito ahumado',
    category: 'Carnicería',
    keywords: [
      'lomito',
      'lomito ahumado',
      'lomo ahumado',
      'lomo embuchado',
      'fiambre lomito',
    ],
  },
  {
    id: 'bondiola-fiambre',
    name: 'Bondiola (fiambre)',
    category: 'Carnicería',
    keywords: [
      'bondiola ahumada',
      'bondiola fiambre',
      'bondiola de cerdo ahumada',
      'fiambre bondiola',
    ],
  },
  {
    id: 'panceta',
    name: 'Panceta',
    category: 'Carnicería',
    keywords: [
      'panceta',
      'panceta ahumada',
      'panceta salada',
      'panceta arrollada',
      'bacon',
    ],
  },
  {
    id: 'coppeta',
    name: 'Coppeta',
    category: 'Carnicería',
    keywords: ['coppeta', 'copa', 'copa de lomo', 'copa lomo'],
  },
  {
    id: 'morcilla',
    name: 'Morcilla',
    category: 'Carnicería',
    keywords: ['morcilla', 'morcillas', 'morcilla vasca', 'morcilla casera'],
  },
  {
    id: 'longaniza',
    name: 'Longaniza',
    category: 'Carnicería',
    keywords: ['longaniza', 'longanizas', 'lingüica', 'linguica'],
  },
  {
    id: 'butifarra',
    name: 'Butifarra',
    category: 'Carnicería',
    keywords: ['butifarra', 'salchicha alemana', 'salchicha tipo alemana'],
  },
  {
    id: 'salchicha',
    name: 'Salchicha',
    category: 'Carnicería',
    keywords: [
      'salchicha',
      'salchichas',
      'salchicha viena',
      'salchicha parrillera',
      'viena',
    ],
  },
  {
    id: 'paté',
    name: 'Paté',
    category: 'Carnicería',
    keywords: ['pate', 'paté', 'paté de campaña', 'paté grasa', 'paté picado'],
  },
  {
    id: 'queso-fiambrero',
    name: 'Queso fiambrero',
    category: 'Carnicería',
    keywords: [
      'queso fiambrero',
      'queso tybo',
      'tybo',
      'queso de máquina',
      'queso maquina',
      'queso port salut fiambre',
      'queso para sándwich',
      'queso para sandwich',
    ],
  },
  {
    id: 'queso-crema-fiambre',
    name: 'Queso crema (fiambre)',
    category: 'Carnicería',
    keywords: [
      'queso crema',
      'queso crema la serenisima',
      'queso untable',
      'crema cheese',
    ],
  },
  {
    id: 'fiambre-picado',
    name: 'Fiambre picado',
    category: 'Carnicería',
    keywords: [
      'fiambre picado',
      'jamon picado',
      'jamón picado',
      'paleta picada',
      'mezcla de fiambres',
    ],
  },
  {
    id: 'baston-jamon',
    name: 'Bastón de jamón',
    category: 'Carnicería',
    keywords: ['baston de jamon', 'bastón de jamón', 'baston jamon'],
  },
  {
    id: 'rodaja-jamon',
    name: 'Jamón en rodajas',
    category: 'Carnicería',
    keywords: ['jamon en rodajas', 'jamón en rodajas', 'jamon feteado', 'fiambre feteado'],
  },

  // —— Almacén ——
  {
    id: 'huevos',
    name: 'Huevos',
    category: 'Almacén',
    keywords: ['huevo', 'huevos', 'docena de huevos', 'maple de huevos'],
  },
  {
    id: 'yerba',
    name: 'Yerba',
    category: 'Almacén',
    keywords: ['yerba', 'yerba mate', 'playadito', 'taragui', 'taragüi', 'cbse'],
  },
  {
    id: 'arroz',
    name: 'Arroz',
    category: 'Almacén',
    keywords: ['arroz', 'arroz largo fino', 'arroz integral', 'arroz parboil'],
  },
  {
    id: 'fideos',
    name: 'Fideos',
    category: 'Almacén',
    keywords: ['fideos', 'fideo', 'spaghetti', 'tallarines', 'mostacholi', 'ravioles secos'],
  },
  {
    id: 'aceite',
    name: 'Aceite',
    category: 'Almacén',
    keywords: ['aceite', 'aceite de girasol', 'aceite de oliva', 'aceite de maiz'],
  },
  {
    id: 'azucar',
    name: 'Azúcar',
    category: 'Almacén',
    keywords: ['azucar', 'azúcar', 'azucar impalpable', 'azucar mascabo'],
  },
  {
    id: 'sal',
    name: 'Sal',
    category: 'Almacén',
    keywords: ['sal', 'sal fina', 'sal gruesa'],
  },
  {
    id: 'salsa',
    name: 'Salsa',
    category: 'Almacén',
    keywords: [
      'salsa',
      'salsa de tomate',
      'salsa golf',
      'salsa criolla',
      'salsa portena',
      'pure de tomate',
      'puré de tomate',
    ],
  },
  {
    id: 'harina',
    name: 'Harina',
    category: 'Almacén',
    keywords: ['harina', 'harina 000', 'harina leudante', 'harina integral'],
  },
  {
    id: 'cafe',
    name: 'Café',
    category: 'Almacén',
    keywords: ['cafe', 'café', 'cafe molido', 'cafe en grano', 'cafe instantaneo', 'nescafe'],
  },
  {
    id: 'te',
    name: 'Té',
    category: 'Almacén',
    keywords: ['te', 'té', 'te en saquitos', 'saquitos de te', 'té verde', 'té negro'],
  },
  {
    id: 'mermelada',
    name: 'Mermelada',
    category: 'Almacén',
    keywords: ['mermelada', 'dulce de fruta', 'confiture'],
  },
  {
    id: 'miel',
    name: 'Miel',
    category: 'Almacén',
    keywords: ['miel', 'miel de abeja'],
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    category: 'Almacén',
    keywords: ['chocolate', 'chocolatin', 'chocolatada', 'cacao'],
  },
  {
    id: 'atun',
    name: 'Atún',
    category: 'Almacén',
    keywords: ['atun', 'atún', 'lata de atun', 'conserva de atun'],
  },
  {
    id: 'arvejas',
    name: 'Arvejas',
    category: 'Almacén',
    keywords: ['arvejas', 'arveja', 'guisantes', 'lata de arvejas'],
  },
  {
    id: 'lentejas',
    name: 'Lentejas',
    category: 'Almacén',
    keywords: ['lentejas', 'lenteja'],
  },
  {
    id: 'porotos',
    name: 'Porotos',
    category: 'Almacén',
    keywords: ['porotos', 'poroto', 'porotos negros', 'porotos alubia'],
  },
  {
    id: 'garbanzos',
    name: 'Garbanzos',
    category: 'Almacén',
    keywords: ['garbanzos', 'garbanzo'],
  },
  {
    id: 'mayonesa',
    name: 'Mayonesa',
    category: 'Almacén',
    keywords: ['mayonesa', 'mayo'],
  },
  {
    id: 'mostaza',
    name: 'Mostaza',
    category: 'Almacén',
    keywords: ['mostaza'],
  },
  {
    id: 'ketchup',
    name: 'Ketchup',
    category: 'Almacén',
    keywords: ['ketchup', 'catchup'],
  },
  {
    id: 'vinagre',
    name: 'Vinagre',
    category: 'Almacén',
    keywords: ['vinagre', 'vinagre de alcohol', 'vinagre de manzana'],
  },
  {
    id: 'aceitunas',
    name: 'Aceitunas',
    category: 'Almacén',
    keywords: ['aceitunas', 'aceituna', 'aceitunas verdes', 'aceitunas negras'],
  },
  {
    id: 'caldo',
    name: 'Caldo',
    category: 'Almacén',
    keywords: ['caldo', 'cubitos de caldo', 'caldo de verduras', 'caldo de carne'],
  },
  {
    id: 'cereal',
    name: 'Cereal',
    category: 'Almacén',
    keywords: ['cereal', 'cereales', 'cornflakes', 'copos de maiz', 'granola'],
  },
  {
    id: 'avena',
    name: 'Avena',
    category: 'Almacén',
    keywords: ['avena', 'avena instantanea', 'gachas'],
  },
  {
    id: 'papas-fritas',
    name: 'Papas fritas',
    category: 'Almacén',
    keywords: ['papas fritas', 'papitas', 'chips', 'snack'],
  },
  {
    id: 'palitos',
    name: 'Palitos salados',
    category: 'Almacén',
    keywords: ['palitos', 'palitos salados', 'pehuamar'],
  },
  {
    id: 'manteca-de-mani',
    name: 'Manteca de maní',
    category: 'Almacén',
    keywords: ['manteca de mani', 'manteca de maní', 'peanut butter'],
  },
  {
    id: 'levadura',
    name: 'Levadura',
    category: 'Almacén',
    keywords: ['levadura', 'levadura seca', 'levadura fresca'],
  },
  {
    id: 'polvo-hornear',
    name: 'Polvo de hornear',
    category: 'Almacén',
    keywords: ['polvo de hornear', 'polvo para hornear'],
  },

  // —— Bebidas ——
  {
    id: 'agua',
    name: 'Agua',
    category: 'Bebidas',
    keywords: ['agua', 'agua mineral', 'agua sin gas', 'agua con gas'],
  },
  {
    id: 'gaseosa',
    name: 'Gaseosa',
    category: 'Bebidas',
    keywords: ['gaseosa', 'coca cola', 'coca-cola', 'pepsi', 'sprite', 'fanta', 'seven up'],
  },
  {
    id: 'cerveza',
    name: 'Cerveza',
    category: 'Bebidas',
    keywords: ['cerveza', 'cervezas', 'quilmes', 'brahma', 'stella', 'heineken'],
  },
  {
    id: 'vino',
    name: 'Vino',
    category: 'Bebidas',
    keywords: ['vino', 'vino tinto', 'vino blanco', 'vino rosado', 'malbec'],
  },
  {
    id: 'jugo',
    name: 'Jugo',
    category: 'Bebidas',
    keywords: ['jugo', 'jugos', 'jugo en polvo', 'bc', 'citric'],
  },
  {
    id: 'fernet',
    name: 'Fernet',
    category: 'Bebidas',
    keywords: ['fernet', 'branca', 'fernet con coca'],
  },
  {
    id: 'soda',
    name: 'Soda',
    category: 'Bebidas',
    keywords: ['soda', 'sifon', 'sifón', 'agua saborizada'],
  },

  // —— Limpieza ——
  {
    id: 'detergente',
    name: 'Detergente',
    category: 'Limpieza',
    keywords: ['detergente', 'detergente liquido', 'detergente en polvo', 'skip', 'ala'],
  },
  {
    id: 'lavandina',
    name: 'Lavandina',
    category: 'Limpieza',
    keywords: ['lavandina', 'bleach', 'hipoclorito'],
  },
  {
    id: 'lavavajillas',
    name: 'Lavavajillas',
    category: 'Limpieza',
    keywords: ['lavavajillas', 'detergente para platos', 'magistral', 'cif'],
  },
  {
    id: 'esponja',
    name: 'Esponja',
    category: 'Limpieza',
    keywords: ['esponja', 'esponjas', 'esponja de acero', 'virulana'],
  },
  {
    id: 'suavizante',
    name: 'Suavizante',
    category: 'Limpieza',
    keywords: ['suavizante', 'softener', 'vivere', 'comfort'],
  },
  {
    id: 'rollo-cocina',
    name: 'Rollo de cocina',
    category: 'Limpieza',
    keywords: ['rollo de cocina', 'papel de cocina', 'rollos de cocina'],
  },
  {
    id: 'bolsa-residuos',
    name: 'Bolsas de residuos',
    category: 'Limpieza',
    keywords: ['bolsa de residuos', 'bolsas de basura', 'bolsas negras'],
  },
  {
    id: 'jabon-ropa',
    name: 'Jabón para ropa',
    category: 'Limpieza',
    keywords: ['jabon en polvo', 'jabón en polvo', 'jabon liquido ropa'],
  },

  // —— Higiene ——
  {
    id: 'papel-higienico',
    name: 'Papel higiénico',
    category: 'Higiene',
    keywords: ['papel higienico', 'papel higiénico', 'rollos de papel'],
  },
  {
    id: 'shampoo',
    name: 'Shampoo',
    category: 'Higiene',
    keywords: ['shampoo', 'champú', 'champu', 'acondicionador'],
  },
  {
    id: 'jabon',
    name: 'Jabón',
    category: 'Higiene',
    keywords: ['jabon', 'jabón', 'jabon de tocador', 'jabon liquido'],
  },
  {
    id: 'pasta-dental',
    name: 'Pasta dental',
    category: 'Higiene',
    keywords: ['pasta dental', 'dentifrico', 'dentífrico', 'colgate', 'odol'],
  },
  {
    id: 'cepillo-dental',
    name: 'Cepillo de dientes',
    category: 'Higiene',
    keywords: ['cepillo de dientes', 'cepillo dental', 'cepillos'],
  },
  {
    id: 'desodorante',
    name: 'Desodorante',
    category: 'Higiene',
    keywords: ['desodorante', 'antitranspirante', 'dove', 'axe', 'rexona'],
  },
  {
    id: 'toallas-femeninas',
    name: 'Toallas femeninas',
    category: 'Higiene',
    keywords: ['toallas femeninas', 'toallitas', 'tampones', 'protectores diarios'],
  },
  {
    id: 'panuelos',
    name: 'Pañuelos',
    category: 'Higiene',
    keywords: ['panuelos', 'pañuelos', 'pañuelitos', 'kleenex'],
  },
  {
    id: 'crema-corporal',
    name: 'Crema corporal',
    category: 'Higiene',
    keywords: ['crema corporal', 'crema hidratante', 'nivea', 'vaselina'],
  },
  {
    id: 'afeitadora',
    name: 'Afeitadora',
    category: 'Higiene',
    keywords: ['afeitadora', 'maquina de afeitar', 'espuma de afeitar', 'gillette'],
  },

  // —— Congelados ——
  {
    id: 'helado',
    name: 'Helado',
    category: 'Congelados',
    keywords: ['helado', 'helados', 'pote de helado', 'frigor'],
  },
  {
    id: 'pizza-congelada',
    name: 'Pizza congelada',
    category: 'Congelados',
    keywords: ['pizza congelada', 'pizza', 'muzzarella congelada'],
  },
  {
    id: 'empanadas-congeladas',
    name: 'Empanadas congeladas',
    category: 'Congelados',
    keywords: ['empanadas congeladas', 'empanadas', 'empanada'],
  },
  {
    id: 'hamburguesa-congelada',
    name: 'Hamburguesas congeladas',
    category: 'Congelados',
    keywords: ['hamburguesas congeladas', 'patitas', 'nuggets', 'medallones congelados'],
  },
  {
    id: 'papas-congeladas',
    name: 'Papas congeladas',
    category: 'Congelados',
    keywords: ['papas congeladas', 'papas baston', 'papas noisette'],
  },
  {
    id: 'verduras-congeladas',
    name: 'Verduras congeladas',
    category: 'Congelados',
    keywords: ['verduras congeladas', 'mix de verduras', 'espinaca congelada'],
  },
  {
    id: 'ravioles-congelados',
    name: 'Ravioles congelados',
    category: 'Congelados',
    keywords: ['ravioles congelados', 'ravioles', 'ñoquis congelados', 'sorrentinos'],
  },

  // —— Mascotas ——
  {
    id: 'alimento-mascotas',
    name: 'Alimento para mascotas',
    category: 'Mascotas',
    keywords: [
      'alimento perro',
      'alimento gato',
      'comida perro',
      'comida gato',
      'balanceado',
      'piedras sanitarias',
    ],
  },
  {
    id: 'arena-gatos',
    name: 'Arena para gatos',
    category: 'Mascotas',
    keywords: ['arena para gatos', 'arena gatos', 'piedras sanitarias'],
  },
];
