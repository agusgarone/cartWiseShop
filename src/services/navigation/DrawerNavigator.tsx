import Home from '../../screens/Home';

/**
 * Pantalla raíz de la app. Antes envolvía tabs (Home + Productos); ahora solo Home.
 * ListEditor y el resto del flujo viven en el StackNavigator.
 */
export function DrawerNavigator() {
  return <Home />;
}
