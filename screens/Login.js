import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Text,
    Platform,
    Image,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import logoImage from '../img/LOGOSTELLARFORT.png';
import googleLogo from '../img/google.png';
import userIcon from '../img/usuario.png';
import passwordIcon from '../img/pass.png';

export default function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const handleLogin = () => {
        navigation.navigate('AppStore');
    };

    const handleCreateAccount = () => {
        navigation.navigate('MainS');
    };

    const handleForgotPassword = () => {
        navigation.navigate('Pass');
    };

    return (
        <LinearGradient colors={['#090819', '#4B0988']} style={styles.gradient}>
            <StatusBar barStyle="white-content"/>
            
            {/* Colocamos el título y el logo fuera del KeyboardAvoidingView */}
            <View style={styles.topContainer}>
                <Image source={logoImage} style={styles.logo} />
                <Text style={styles.title}>STELLAR</Text>
            </View>

            {/* Envuelve el contenido principal en TouchableWithoutFeedback */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={10}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Los elementos de entrada y botones */}
                        <View style={styles.inputContainer}>
                            <Image source={userIcon} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Usuario"
                                value={username}
                                onChangeText={setUsername}
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Image source={passwordIcon} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            />
                        </View>

                        <TouchableOpacity onPress={handleLogin}>
                            <LinearGradient
                                colors={['#8f34d9', '#382066']}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Iniciar sesión</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.separator}>
                            <View style={styles.line} />
                            <Text style={styles.separatorText}>Ó</Text>
                            <View style={styles.line} />
                        </View>

                        <TouchableOpacity onPress={() => console.log('Iniciar sesión con Google')}>
                            <LinearGradient
                                colors={['#FFFFFF', '#FFFFFF']}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={styles.socialLoginButton}
                            >
                                <Image source={googleLogo} style={styles.googleLogo} />
                                <Text style={styles.socialLoginButtonText}>
                                    Iniciar sesión con Google
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <Text style={styles.link} onPress={handleForgotPassword}>
                            Olvidé mi contraseña
                        </Text>

                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
                            <TouchableOpacity onPress={handleCreateAccount}>
                                <Text style={styles.registerLink}> Regístrate</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
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
        paddingBottom: Platform.OS === 'ios' ? 80 : 0,
        marginTop: -10, // Ajusta este valor según tus necesidades para mover el contenido más arriba
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, // Ajusta este valor si es necesario
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 1, // Agrega un paddingTop para mover los elementos más arriba
        paddingBottom: -50,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 10,
        marginTop: 60,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        marginBottom: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: 'rgba(96, 37, 166, 0.7)',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 15,
        marginBottom: 10,
        width: 300,
        height: 50,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
    },
    link: {
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 18,
    },
    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    registerText: {
        color: '#8f34d9',
        fontSize: 15,
    },
    registerLink: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 5,
    },
    button: {
        width: 300,
        height: 50,
        borderRadius: 6,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#e0caed',
        fontSize: 18,
        fontFamily: 'Courier New',
        textShadowColor: '#8a00ad',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
    },
    socialLoginButton: {
        width: 300,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        padding: 10,
        marginTop: 1,
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    googleLogo: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    socialLoginButtonText: {
        color: '#000000',
        fontSize: 17,
        fontFamily: 'Courier New',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    separatorText: {
        color: 'rgba(96, 37, 166, 0.8)',
        fontSize: 16,
        paddingHorizontal: 10,
    },
    line: {
        width: 130,
        height: 1,
        backgroundColor: 'rgba(96, 37, 166, 0.5)',
    },
});
