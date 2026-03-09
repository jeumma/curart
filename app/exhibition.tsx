import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useStore } from '../store/useStore';
import { Linking } from 'react-native';

export default function ExhibitionScreen() {
    const { title, museum, city, date, image, tag, color, ticketUrl, description } = useLocalSearchParams<{
        title: string;
        museum: string;
        city: string;
        date: string;
        image: string;
        tag: string;
        color: string;
        ticketUrl: string;
        description: string;
    }>();

    console.log('description:', description);

    const addToCalendar = useStore((state) => state.addToCalendar);
    console.log('ticketUrl:', ticketUrl);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.imageOverlay} />
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Text style={styles.backBtnText}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.imageInfo}>
                        <Text style={[styles.tag, { color: color }]}>{tag}</Text>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </View>

                {/* Info */}
                <View style={styles.info}>
                    <Text style={styles.museum}>{museum} · {city}</Text>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>

                {/* Ticket button */}
                <TouchableOpacity style={[styles.ticketBtn, { borderColor: color }]} onPress={() => { Linking.openURL(String(ticketUrl || 'https://www.hamburger-kunsthalle.de/tickets')); }}>
                    <Text style={[styles.ticketBtnText, { color: color }]}>Tickets kaufen →</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addBtn} onPress={() => addToCalendar({
                    id: String(Date.now()),
                    title: title as string,
                    museum: museum as string,
                    city: city as string,
                    date: date as string,
                    image: image as string,
                    tag: tag as string,
                    color: color as string,
                    visitDate: new Date().toISOString().split('T')[0],
                })}>
                    <Text style={styles.addBtnText}>+ Zum Kalender hinzufügen</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0e0c0a' },
    imageContainer: { height: 360, position: 'relative' },
    image: { width: '100%', height: '100%' },
    imageOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(14,12,10,0.4)' },
    backBtn: { position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(14,12,10,0.7)', alignItems: 'center', justifyContent: 'center' },
    backBtnText: { fontSize: 20, color: '#e8e0d4' },
    imageInfo: { position: 'absolute', bottom: 20, left: 20 },
    tag: { fontSize: 11, letterSpacing: 2, marginBottom: 6 },
    title: { fontSize: 24, color: '#e8e0d4', fontStyle: 'italic' },
    info: { padding: 24 },
    museum: { fontSize: 14, color: '#8a7a6a', marginBottom: 8 },
    date: { fontSize: 12, color: '#6a5a4a' },
    ticketBtn: { marginHorizontal: 24, padding: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center', marginBottom: 40 },
    ticketBtnText: { fontSize: 14, letterSpacing: 1 },
    addBtn: { marginHorizontal: 24, padding: 14, borderRadius: 12, backgroundColor: '#1a1612', borderWidth: 1, borderColor: '#2a2520', alignItems: 'center', marginBottom: 40 },
    addBtnText: { fontSize: 14, color: '#8a7a6a', letterSpacing: 1 },
    description: { fontSize: 14, color: '#8a7a6a', marginTop: 12, lineHeight: 22 },
});