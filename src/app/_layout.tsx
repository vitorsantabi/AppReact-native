import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Oculta o cabeçalho para todas as telas
      }}>
      {/* Rota para a página inicial (index) */}
      <Stack.Screen name="index" />

      {/* Rotas para as páginas dentro do diretório (album) */}
      <Stack.Screen name="(album)/album1" />
      <Stack.Screen name="(album)/album2" />
      <Stack.Screen name="(album)/album3" />
      <Stack.Screen name="(album)/album4" />
      <Stack.Screen name="(album)/album5" />
    </Stack>
  );
}
