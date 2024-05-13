import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Importa la imagen del logo de la app
import logoImage from '../img/LOGOSTELLARFORT.png';

// Componente para el sistema de calificación de estrellas
const StarRating = () => {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => handleRatingChange(i)}>
                    <Text style={{ color: i <= rating ? '#FFD700' : '#e0caed', fontSize: 30 }}>
                        ★
                    </Text>
                </TouchableOpacity>
            );
        }
        return stars;
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderStars()}
            <Text style={{ color: '#e0caed', fontSize: 16, marginLeft: 10 }}>
                {rating.toFixed(1)} de 5 estrellas
            </Text>
        </View>
    );
};

export default function AppInfo() {
    const navigation = useNavigation();

    const [buttonType, setButtonType] = useState('comprar');

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const handleBuy = () => {
        Alert.alert(
            'Método de pago',
            'Selecciona el método de pago:',
            [
                {
                    text: 'Tarjeta de crédito',
                    onPress: () => handleConfirmPurchase('Tarjeta de crédito'),
                },
                {
                    text: 'PayPal',
                    onPress: () => handleConfirmPurchase('PayPal'),
                },
                {
                    text: 'Otro',
                    onPress: () => handleConfirmPurchase('Otro método de pago'),
                },
            ],
            { cancelable: true }
        );
    };

    const handleConfirmPurchase = (paymentMethod) => {
        Alert.alert(
            'Confirmar compra',
            `¿Quieres confirmar la compra utilizando ${paymentMethod}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        console.log(`Compra confirmada con ${paymentMethod}`);
                        setButtonType('eliminar');
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleDelete = () => {
        console.log('Eliminando');
        setButtonType('reinstalar');
    };

    const handleReinstall = () => {
        console.log('Reinstalando');
        setButtonType('eliminar');
    };

    const getButtonStyle = () => {
        switch (buttonType) {
            case 'comprar':
                return styles.buyButton;
            case 'eliminar':
                return styles.deleteButton;
            case 'reinstalar':
                return styles.reinstallButton;
            default:
                return styles.buyButton;
        }
    };

    return (
        <LinearGradient colors={['#090819', '#4B0988']} style={styles.gradient}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    {/* Sección superior */}
                    <View style={styles.topSection}>
                        <View style={styles.logoContainer}>
                            <Image source={logoImage} style={styles.logo} />
                        </View>
                        <View style={styles.appInfo}>
                            <Text style={styles.appName}>Nombre de la App</Text>
                            <Text style={styles.appDescription}>
                                Información breve sobre la app.
                            </Text>
                            <TouchableOpacity
                                style={getButtonStyle()}
                                onPress={
                                    buttonType === 'comprar' ? handleBuy :
                                    buttonType === 'eliminar' ? handleDelete :
                                    handleReinstall
                                }>
                                {buttonType === 'comprar' && (
                                    <Text style={styles.buyButtonText}>Comprar</Text>
                                )}
                                {buttonType === 'eliminar' && (
                                    <Text style={styles.buyButtonText}>Eliminar</Text>
                                )}
                                {buttonType === 'reinstalar' && (
                                    <Text style={styles.buyButtonText}>Reinstalar</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Sección de imágenes de la app */}
                    <View style={styles.appImagesSection}>
                        <Text style={styles.sectionTitle}>Imágenes de la app</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.imageRow}>
                                {/* Agrega las imágenes de la app */}
                                <Image source={{ uri: '../img/app.jpg' }} style={styles.appImage} />
                                <Image source={{ uri: 'ruta_de_la_imagen_2' }} style={styles.appImage} />
                                <Image source={{ uri: 'ruta_de_la_imagen_3' }} style={styles.appImage} />
                            </View>
                        </ScrollView>
                    </View>

                    {/* Sección de opiniones */}
                    <View style={styles.opinionsSection}>
                        <Text style={styles.sectionTitle}>Opiniones</Text>
                        <Text style={styles.opinionText}>
                            Aquí puedes mostrar las opiniones de los usuarios sobre la app.
                        </Text>
                        <StarRating />
                    </View>

                    {/* Sección de apps recomendadas */}
                    <View style={styles.recommendedAppsSection}>
                        <Text style={styles.sectionTitle}>Apps recomendadas</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.appRow}>
                                {/* Añade aquí los componentes de las apps recomendadas */}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
    },
    container: {
        width: '100%',
        padding: 20,
        marginTop: 40,
    },
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoContainer: {
        width: 100,
        height: 100,
        backgroundColor: '#382066',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    logo: {
        width: 90,
        height: 90,
    },
    appInfo: {
        flex: 1,
    },
    appName: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    appDescription: {
        color: '#e0caed',
        fontSize: 16,
        marginTop: 5,
        marginBottom: 10,
    },
    buyButton: {
        width: 120,
        backgroundColor: '#8f34d9',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    deleteButton: {
        width: 120,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    reinstallButton: {
        width: 130,
        backgroundColor: '#8f34d9',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buyButtonText: {
        color: '#e0caed',
        fontSize: 20,
    },
    appImagesSection: {
        marginBottom: 20,
    },
    imageRow: {
        flexDirection: 'row',
        gap: 10,
    },
    appImage: {
        width: 300,
        height: 600,
        marginRight: 10,
        borderRadius: 10,
    },
    opinionsSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    opinionText: {
        color: '#e0caed',
        fontSize: 16,
    },
    recommendedAppsSection: {
        marginBottom: 20,
    },
    appRow: {
        flexDirection: 'row',
        gap: 10,
    },
});
