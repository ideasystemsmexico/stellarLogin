import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AppStore() {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
    const [userMenuVisible, setUserMenuVisible] = useState(false);
    const [menuAnimation] = useState(new Animated.Value(0));
    const [userMenuAnimation] = useState(new Animated.Value(0));

    // Manejador de eventos de retroceso
    useEffect(() => {
        navigation.setOptions({ headerShown: false });

        const handleBackPress = () => {
            if (menuVisible) {
                setMenuVisible(false);
                animateMenuClose();
                return true; // Evento manejado
            }
            if (userMenuVisible) {
                setUserMenuVisible(false);
                animateUserMenuClose();
                return true; // Evento manejado
            }
            return false; // Evento no manejado
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove();
        };
    }, [menuVisible, userMenuVisible]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        Animated.timing(menuAnimation, {
            toValue: menuVisible ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const toggleUserMenu = () => {
        setUserMenuVisible(!userMenuVisible);
        Animated.timing(userMenuAnimation, {
            toValue: userMenuVisible ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const animateMenuClose = () => {
        Animated.timing(menuAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const animateUserMenuClose = () => {
        Animated.timing(userMenuAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const handleMenuSelection = (option) => {
        console.log(`Opción seleccionada: ${option}`);
        animateMenuClose();
        setMenuVisible(false);
        if (option === 'Cerrar sesión') {
            handleLogout();
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Confirmación',
            '¿Estás seguro de que quieres cerrar sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Aceptar',
                    onPress: () => {
                        navigation.navigate('Login');
                    },
                },
            ]
        );
    };

    const navigateToAppInfo = () => {
        navigation.navigate('AppInfo');
    };

    const handleEditProfile = () => {
        navigation.navigate('EditProfileScreen');
        setUserMenuVisible(false);
    };

    return (
        <LinearGradient colors={['#090819', '#4B0988']} style={styles.container}>
            <LinearGradient colors={['#090819', '#4B0988']} style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                    <Ionicons name="menu" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>StellarStore</Text>
                <TouchableOpacity style={styles.userButton} onPress={toggleUserMenu}>
                    <Text style={styles.userButtonText}>U</Text>
                </TouchableOpacity>
            </LinearGradient>

            {/* Menú desplegable para el menú principal */}
            {menuVisible && (
                <Animated.View
                    style={{
                        ...styles.dropdownMenu,
                        transform: [
                            {
                                translateX: menuAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-200, 0],
                                }),
                            },
                        ],
                    }}
                >
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuSelection('Actualizaciones')}>
                            <Ionicons name="refresh" size={20} color="white" style={styles.icon} />
                            <Text style={styles.menuOptionText}>Actualizaciones</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuSelection('Categorias')}>
                            <Ionicons name="pricetag" size={20} color="white" style={styles.icon} />
                            <Text style={styles.menuOptionText}>Categorias</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuSelection('Métodos de Pago')}>
                            <Ionicons name="card" size={20} color="white" style={styles.icon} />
                            <Text style={styles.menuOptionText}>Métodos de Pago</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuSelection('Mis Apps')}>
                            <Ionicons name="apps" size={20} color="white" style={styles.icon} />
                            <Text style={styles.menuOptionText}>Mis Apps</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuSelection('Descargas')}>
                            <Ionicons name="cloud-download" size={20} color="white" style={styles.icon} />
                            <Text style={styles.menuOptionText}>Descargas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuOption} onPress={handleLogout}>
                            <Ionicons name="log-out" size={20} color="white" style={styles.icon} />
                            <Text style={styles.menuOptionText}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            {/* Menú desplegable para el botón de usuario */}
            {userMenuVisible && (
                <Animated.View
                    style={{
                        ...styles.userDropdownMenu,
                        transform: [
                            {
                                translateX: userMenuAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-50, 0],
                                }),
                            },
                        ],
                    }}
                >
                    <View style={styles.userMenuContainer}>
                        <TouchableOpacity style={styles.menuOption} onPress={handleEditProfile}>
                            <Ionicons name="person" size={20} color="white" style={styles.icon} />
                            <Text style={styles.menuOptionText}>Editar perfil</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.appButton} onPress={navigateToAppInfo}>
                    <Text style={styles.appButtonText}>App</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    menuButton: {
        padding: 10,
        borderRadius: 20,
        elevation: 5,
        backgroundColor: '#9D33FA', // Añadí un color de fondo para hacerlo más visible
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
    },
    userButton: {
        color: 'white',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 100,
        left: 0,
        backgroundColor: '#090819',
        padding: 10,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 1,
        width: 200,
    },
    userDropdownMenu: {
        position: 'absolute',
        top: 85,
        right: 10,
        backgroundColor: '#090819',
        padding: 15,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 2,
        width: 200,
    },
    menuContainer: {
        flexDirection: 'column',
    },
    userMenuContainer: {
        flexDirection: 'column',
    },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    menuOptionText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
    icon: {
        marginRight: 15,
    },
    contentContainer: {
        flex: 1,
        padding: 10,
        marginTop: 20,
    },
    appButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4B0988',
        borderRadius: 10,
        elevation: 3,
    },
    appButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
