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
    ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import logoImage from '../img/LOGOSTELLARFORT.png';
import googleLogo from '../img/google.png';
import facebookLogo from '../img/facebook.png'; // Agregamos la imagen de Facebook
import userIcon from '../img/usuario.png';
import passwordIcon from '../img/pass.png';
import backgroundImage from '../img/Wallpaper.jpg';

export default function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <StatusBar barStyle="white-content"/>
            <View style={styles.topContainer}>
                <Image source={logoImage} style={styles.logo} />
                <Text style={styles.title}>STELLAR</Text>
            </View>
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
                        <View style={styles.inputContainer}>
                            <Image source={userIcon} style={styles.icon} />
                            <TextInput
                                style={[styles.input, {borderColor: isUsernameFocused ? '#FFFFFF' : 'rgba(116, 116, 116, 0.5)'}]}
                                placeholder="Usuario"
                                value={username}
                                onChangeText={setUsername}
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                onFocus={() => setIsUsernameFocused(true)}
                                onBlur={() => setIsUsernameFocused(false)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Image source={passwordIcon} style={styles.icon} />
                            <TextInput
                                style={[styles.input, {borderColor: isPasswordFocused ? '#FFFFFF' : 'rgba(116, 116, 116, 0.5)'}]}
                                placeholder="Contraseña"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                            />
                        </View>
                        <TouchableOpacity onPress={handleLogin}>
                            <LinearGradient
                                colors={['#24284E', '#24284E']}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Iniciar sesión</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={styles.separator}>
                            <View style={styles.line} />
                            <Text style={styles.separatorText}>Or continue with</Text>
                            <View style={styles.line} />
                        </View>
                        <View style={styles.socialButtonsContainer}>
                            <TouchableOpacity onPress={() => console.log('Iniciar sesión con Google')}>
                                <LinearGradient
                                    colors={['#24284E', '#24284E']}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    style={styles.socialLoginButton}
                                >
                                    <Image source={googleLogo} style={styles.socialLogo} />
                                    <Text style={styles.socialLoginButtonText}>Google</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Iniciar sesión con Facebook')}>
                                <LinearGradient
                                    colors={['#24284E', '#24284E']}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    style={styles.socialLoginButton}
                                >
                                    <Image source={facebookLogo} style={styles.socialLogo} />
                                    <Text style={styles.socialLoginButtonText}>Facebook</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
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
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        width: '100%',
        paddingBottom: Platform.OS === 'ios' ? 80 : 0,
        marginTop: -10,
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 1,
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
        borderColor: 'rgba(116, 116, 116, 0.5)',
        borderWidth: 1,
        borderRadius: 2,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
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
        color: 'rgba(116, 116, 116, 0.5)',
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
        color: 'rgba(116, 116, 116, 1)',
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
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Courier New',
        fontWeight:'bold'
    },
    socialLoginButton: {
        width: 140,
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
    socialLogo: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    socialLoginButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'Courier New',
        fontWeight:'bold',
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
        color: 'rgba(116, 116, 116, 0.8)',
        fontSize: 16,
        paddingHorizontal: 10,
    },
    line: {
        width: 130,
        height: 1,
        backgroundColor: 'rgba(116, 116, 116, 0.5)',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        marginBottom: 15,
    },
});
