import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert, KeyboardAvoidingView, ScrollView, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import logoImage from '../img/LOGOSTELLARFORT.png'; // Importa la imagen del logo

export default function Pass() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');


    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false, // Esto oculta completamente el encabezado
        });
    }, [navigation]);
    // Función para manejar el envío de la solicitud de restablecimiento de contraseña
    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Error', 'Por favor, ingresa tu correo electrónico');
            return;
        }

        try {
            // Aquí envías la solicitud al servidor para restablecer la contraseña
            // Puede ser una llamada a una API con la dirección de correo electrónico
            console.log('Solicitar restablecimiento de contraseña para:', email);
            
            // Simula una respuesta de éxito del servidor
            // (deberías reemplazar esto con una solicitud real al servidor)
            const response = { success: true };

            if (response.success) {
                // Muestra una alerta de éxito al usuario
                Alert.alert('Éxito', 'Hemos enviado un correo electrónico con instrucciones para restablecer tu contraseña.');
                // Redirige a la pantalla de inicio de sesión
                navigation.navigate('Login');
            } else {
                // Maneja cualquier error si la solicitud falla
                Alert.alert('Error', 'No pudimos enviar las instrucciones para restablecer tu contraseña. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error al solicitar restablecimiento de contraseña:', error);
            Alert.alert('Error', 'Hubo un error inesperado. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <LinearGradient colors={['#090819', '#4B0988']} style={styles.gradient}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.container}>
                        {/* Logo y título "STELLAR" */}
                        <Image source={logoImage} style={styles.logo} />
                        <Text style={styles.title}>STELLAR</Text>
                        
                        <Text style={styles.sectionTitle}>Olvidé mi contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Correo electrónico"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="#fff"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        {/* Botón para enviar la solicitud de restablecimiento de contraseña */}
                        <TouchableOpacity onPress={handleForgotPassword}>
                            <LinearGradient
                                colors={['#8f34d9', '#382066']}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={styles.submitButton}
                            >
                                <Text style={styles.submitButtonText}>Reestablecer contraseña</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Botón para volver a la pantalla de inicio de sesión */}
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.backToLoginText}>Inicar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
        paddingBottom: Platform.OS === 'ios' ? 200 : 50, // Ajusta el padding según la plataforma
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: 'transparent',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        color: 'white',
        marginBottom: 20,
        fontSize: 16,
    },
    submitButton: {
        width: 300,
        height: 50,
        borderRadius: 3,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#c105ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginBottom: 20,
    },
    submitButtonText: {
        color: '#e0caed',
        fontSize: 18,
        fontFamily: 'Courier New',
        textShadowColor: '#8a00ad',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
    },
    backToLoginText: {
        color: '#FFFFFF',
        fontSize: 16,
        textDecorationLine: 'none',
        marginTop: 10,
    },
});
