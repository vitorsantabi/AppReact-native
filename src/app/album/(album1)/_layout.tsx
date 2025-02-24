import React from 'react';
import { Tabs } from "expo-router/tabs";
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

const Layout = () => {
    return (
        <Tabs  screenOptions={{
            tabBarActiveTintColor: "rgba(6, 58, 34, 0.8)", // Cor do ícone/texto quando ativo
            tabBarInactiveTintColor: "rgba(70, 68, 68, 0.8)", // Cor do ícone/texto quando inativo
            tabBarStyle: {
              position: "absolute",
              width: "95%",
              marginBottom: 15,
              marginLeft: "2%",
              marginRight: "2%",
              borderRadius: 50,
              height: 70,
              
              backgroundColor:  "rgba(253, 253, 253, 0.94)", // Cor de fundo da barra
              shadowColor: "#000", // Sombra para efeito visual
              shadowOffset: { width: 10, height: 10 },
              shadowOpacity: 1,
              shadowRadius: 4,
              elevation: 5,
            },
            headerShown: false, // Remove o cabeçalho de todas as páginas
            tabBarShowLabel: false, // Mostra os nomes das abas
          }}>
            <Tabs.Screen 
            name="index" 
            options={{ 
                tabBarIcon: ({ color, size }) => (
                    <View style={styles.menu}>
                    <Ionicons name="home" color={color} size={40} />
                    <Text style={styles.text}>Home</Text>
                </View>
            ),
            }} 
            />
            <Tabs.Screen 
            name="page-galeria" 
            options={{ 
                tabBarIcon: ({ color, size }) => (
                    <View style={styles.menu}>
                    <Ionicons name="images" color={color} size={40} />
                    <Text style={styles.text}>Galeria</Text>
                </View>
            ),
            }} 
            />
            <Tabs.Screen 
            name="singles"
             
            options={{ 
                
                tabBarIcon: ({ color, size }) => (
                    <View style={styles.menu}>
                        <Ionicons name="musical-notes" color={color} size={40} />
                        <Text style={styles.text}>Singles</Text>
                    </View>
                ),
                
            }} 
            />
        </Tabs>
    );
};
const styles = StyleSheet.create({
    menu:{
        backgroundColor: 'rgba(253, 253, 253, 0.01)',
        width: 60,
        height: 70,
        position: 'relative',
        top: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    text:{
        fontSize: 12,
    }
})
export default Layout;
