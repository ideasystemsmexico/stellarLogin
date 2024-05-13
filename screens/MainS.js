import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Text,
    Image,
    ScrollView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import logoImage from '../img/LOGOSTELLARFORT.png';

export default function MainS() {
    const navigation = useNavigation();

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false, // Esto oculta completamente el encabezado
        });
    }, [navigation]);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Función para validar la seguridad de las contraseñas
    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#\$%\^&\*]/.test(password);
        const hasNoSpaces = !/\s/.test(password);
        const hasMinLength = password.length >= 8;

        return hasUpperCase && hasNumber && hasSpecialChar && hasNoSpaces && hasMinLength;
    };

    const handleCreateAccount = () => {
        setError('');

        // Validar correo electrónico
        if (!emailRegex.test(email)) {
            setError('El correo electrónico no es válido');
            return;
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Validar la seguridad de la contraseña
        if (!validatePassword(password)) {
            setError('La contraseña debe contener al menos una letra mayúscula, un número, un carácter especial, sin espacios y tener al menos 8 caracteres');
            return;
        }

        console.log('Crear cuenta con los siguientes datos:');
        console.log('Usuario:', username);
        console.log('Correo:', email);
        console.log('Contraseña:', password);
        console.log('Confirmar contraseña:', confirmPassword);
        // Agrega aquí la lógica para crear cuenta
    };

    const handleBack = () => {
        navigation.goBack(); // Regresa a la pantalla anterior
    };

    return (
        <LinearGradient colors={['#090819', '#4B0988']} style={styles.gradient}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Image source={logoImage} style={styles.logo} />

                        {/* Título "STELLAR" justo debajo del logo */}
                        <Text style={styles.title}>STELLAR</Text>

                        {error && <Text style={styles.errorText}>{error}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Usuario"
                            value={username}
                            onChangeText={setUsername}
                            placeholderTextColor="#fff"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Correo"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="#fff"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor="#fff"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            placeholderTextColor="#fff"
                        />

                        {/* Botón de creación de cuenta con fondo personalizado */}
                        <TouchableOpacity onPress={handleCreateAccount}>
                            <LinearGradient
                                colors={['#8f34d9', '#382066']} // Colores del gradiente
                                start={{ x: 0.5, y: 0 }} // Inicia desde la parte superior
                                end={{ x: 0.5, y: 1 }} // Termina en la parte inferior
                                style={styles.createAccountButton}
                            >
                                <Text style={styles.createAccountButtonText}>Crear cuenta</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Botón de regreso con estilo */}
                        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                            <Text style={styles.backButtonText}>Volver</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '100%',
    },
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 25,
        paddingBottom: 80,
        marginTop: 80,
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
    input: {
        width: 300,
        height: 50,
        backgroundColor: 'transparent',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        color: 'white',
        marginBottom: 10,
        fontSize: 16,
    },
    createAccountButton: {
        borderRadius: 3,
        width: 300,
        height: 50,
        padding: 10,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#c105ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginBottom: 20,
    },
    createAccountButtonText: {
        color: '#e0caed',
        fontSize: 16,
        fontFamily: 'Courier New',
        textShadowColor: '#8a00ad',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
    },
    backButton: {
        backgroundColor: '#382066',
        borderRadius: 5,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    backButtonText: {
        color: '#e0caed',
        fontSize: 16,
        fontFamily: 'Courier New',
        textShadowColor: '#8a00ad',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
});
