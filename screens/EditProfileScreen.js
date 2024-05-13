import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
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
    const scrollViewRef = useRef();

    // Oculta el encabezado de la pantalla
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    // Estados del formulario
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Datos de usuario
    const userData = {
        name: 'Juan',
        surname: 'Pérez',
        username: 'juanp',
        email: 'juan.perez@example.com',
        password: '******',
    };

    // Carga los datos del usuario en los estados al montar el componente
    useEffect(() => {
        setName(userData.name);
        setSurname(userData.surname);
        setUsername(userData.username);
        setEmail(userData.email);
        setPassword(userData.password);
    }, []);

    // Valida el correo electrónico y la contraseña
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#\$%\^&\*]/.test(password);
        const hasNoSpaces = !/\s/.test(password);
        const hasMinLength = password.length >= 8;

        return hasUpperCase && hasNumber && hasSpecialChar && hasNoSpaces && hasMinLength;
    };

    const handleSave = () => {
        setError('');

        if (!emailRegex.test(email)) {
            setError('El correo electrónico no es válido');
            return;
        }

        if (!validatePassword(password)) {
            setError('La contraseña debe contener al menos una letra mayúscula, un número, un carácter especial, sin espacios y tener al menos 8 caracteres');
            return;
        }

        console.log('Guardar cuenta con los siguientes datos:');
        console.log('Nombre:', name);
        console.log('Apellido:', surname);
        console.log('Usuario:', username);
        console.log('Correo:', email);
        console.log('Contraseña:', password);
        // Lógica para guardar la cuenta

        // Cambia el modo de edición a false después de guardar
        setIsEditing(false);
    };

    const handleBack = () => {
        navigation.goBack(); // Regresa a la pantalla anterior
    };

    const handleEdit = () => {
        // Cambia el modo de edición al valor contrario
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    // Desplaza hacia abajo el contenido cuando el componente se carga
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 50, animated: true });
        }
    }, []);

    return (
        <LinearGradient colors={['#090819', '#4B0988']} style={styles.gradient}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
                        <Image source={logoImage} style={styles.logo} />

                        <Text style={styles.title}>Editar perfil</Text>

                        {error && <Text style={styles.errorText}>{error}</Text>}

                        {/* Campo de nombre */}
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre(s)"
                                value={name}
                                onChangeText={setName}
                                placeholderTextColor="#fff"
                            />
                        ) : (
                            <Text style={styles.text}>{name}</Text>
                        )}

                        {/* Campo de apellido */}
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                placeholder="Apellido(s)"
                                value={surname}
                                onChangeText={setSurname}
                                placeholderTextColor="#fff"
                            />
                        ) : (
                            <Text style={styles.text}>{surname}</Text>
                        )}

                        {/* Campo de usuario */}
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                placeholder="Usuario"
                                value={username}
                                onChangeText={setUsername}
                                placeholderTextColor="#fff"
                            />
                        ) : (
                            <Text style={styles.text}>{username}</Text>
                        )}

                        {/* Campo de correo */}
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                placeholder="Correo"
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor="#fff"
                            />
                        ) : (
                            <Text style={styles.text}>{email}</Text>
                        )}

                        {/* Campo de contraseña */}
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholderTextColor="#fff"
                            />
                        ) : (
                            <Text style={styles.text}>********</Text>
                        )}

                        <TouchableOpacity onPress={isEditing ? handleSave : handleEdit}>
                            <LinearGradient
                                colors={['#8f34d9', '#382066']}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={styles.createAccountButton}
                            >
                                <Text style={styles.createAccountButtonText}>
                                    {isEditing ? 'Guardar' : 'Editar'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                            <Text style={styles.backButtonText}>Cancelar</Text>
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
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingTop: 50, // Aumenta el padding superior para mover contenido más abajo
        paddingBottom: 40,
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20, // Aumenta el margen inferior del logo
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        width: 300,
        backgroundColor: 'transparent',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: '#fff',
        marginBottom: 10,
        fontSize: 16,
        lineHeight: 50,
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: 'transparent',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: '#fff',
        marginBottom: 10,
        fontSize: 16,
    },
    createAccountButton: {
        width: 300,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: '#c105ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        backgroundColor: 'transparent',
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
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1,
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
