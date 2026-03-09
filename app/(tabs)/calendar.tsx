import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useStore } from '../../store/useStore';

const mySchedule = [
    {
        id: 1,
        title: "Gerhard Richter: Abstrakte Bilder",
        museum: "Hamburger Kunsthalle",
        city: "Hamburg",
        visitDate: "2026-03-10",
        image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=600&q=80",
        color: "#c8a882",
        status: "upcoming"
    },
    {
        id: 2,
        title: "Caspar David Friedrich",
        museum: "Alte Nationalgalerie",
        city: "Berlin",
        visitDate: "2026-03-22",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
        color: "#8899aa",
        status: "upcoming"
    },
    {
        id: 3,
        title: "Bauhaus & Moderne",
        museum: "Museum Ludwig",
        city: "Köln",
        visitDate: "2026-02-15",
        image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80",
        color: "#b5a0c8",
        status: "visited"
    },
];

const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

export default function CalendarScreen() {
    const calendar = useStore((state) => state.calendar);
    const removeFromCalendar = useStore((state) => state.removeFromCalendar);
    const [filter, setFilter] = useState<'upcoming' | 'visited'>('upcoming');

    const visible = filter === 'upcoming' ? calendar : [];

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return `${days[d.getDay()]}, ${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    const daysUntil = (dateStr: string) => {
        return Math.ceil((new Date(dateStr).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.subtitle}>Meine Ausstellungen</Text>
                    <Text style={styles.title}>Kalender</Text>
                </View>

                {/* Filter */}
                <View style={styles.filterRow}>
                    {(['upcoming', 'visited'] as const).map(f => (
                        <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[
                            styles.filterChip,
                            filter === f && styles.filterChipActive
                        ]}>
                            <Text style={[styles.filterChipText, filter === f && styles.filterChipTextActive]}>
                                {f === 'upcoming' ? 'Geplant' : 'Besucht'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* List */}
                <View style={styles.list}>
                    {visible.length === 0 ? (
                        <View style={styles.empty}>
                            <Text style={styles.emptyIcon}>□</Text>
                            <Text style={styles.emptyText}>
                                {filter === 'upcoming' ? 'Keine geplanten Besuche' : 'Noch keine besuchten Ausstellungen'}
                            </Text>
                        </View>
                    ) : visible.map(ex => (
                        <View key={ex.id} style={styles.card}>
                            {/* Date bar */}
                            <View style={styles.dateBar}>
                                <View style={[styles.dateBox, { borderColor: ex.color + '44' }]}>
                                    <Text style={[styles.dateDay, { color: ex.color }]}>{new Date(ex.visitDate).getDate()}</Text>
                                    <Text style={styles.dateMonth}>{months[new Date(ex.visitDate).getMonth()]}</Text>
                                </View>
                                <View>
                                    <Text style={styles.dateText}>{formatDate(ex.visitDate)}</Text>
                                    {filter === 'upcoming' && (
                                        <Text style={[styles.daysLeft, { color: ex.color }]}>
                                            {daysUntil(ex.visitDate)} Tage noch
                                        </Text>
                                    )}
                                </View>
                            </View>

                            {/* Exhibition */}
                            <View style={styles.cardBody}>
                                <Image source={{ uri: ex.image }} style={styles.cardImage} />
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardTitle}>{ex.title}</Text>
                                    <Text style={styles.cardMuseum}>{ex.museum} · {ex.city}</Text>
                                    <TouchableOpacity onPress={() => removeFromCalendar(ex.id)} style={styles.removeBtn}>
                                        <Text style={styles.removeBtnText}>Entfernen</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0e0c0a' },
    header: { padding: 24, paddingTop: 20 },
    subtitle: { fontSize: 11, letterSpacing: 2, color: '#8a7a6a', textTransform: 'uppercase', marginBottom: 4 },
    title: { fontSize: 26, color: '#c8a882', fontStyle: 'italic' },
    filterRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 24, marginBottom: 24 },
    filterChip: { paddingVertical: 6, paddingHorizontal: 18, borderRadius: 20, borderWidth: 1, borderColor: '#2a2520' },
    filterChipActive: { backgroundColor: '#c8a882', borderColor: '#c8a882' },
    filterChipText: { fontSize: 12, color: '#8a7a6a' },
    filterChipTextActive: { color: '#0e0c0a' },
    list: { paddingHorizontal: 24, paddingBottom: 100 },
    empty: { alignItems: 'center', paddingVertical: 48 },
    emptyIcon: { fontSize: 32, color: '#4a3a2a', marginBottom: 12 },
    emptyText: { fontSize: 14, color: '#4a3a2a' },
    card: { backgroundColor: '#1a1612', borderWidth: 1, borderColor: '#2a2520', borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
    dateBar: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, backgroundColor: '#151210', borderBottomWidth: 1, borderBottomColor: '#2a2520' },
    dateBox: { width: 36, height: 36, borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    dateDay: { fontSize: 16, lineHeight: 18 },
    dateMonth: { fontSize: 8, letterSpacing: 1, color: '#6a5a4a' },
    dateText: { fontSize: 12, color: '#8a7a6a' },
    daysLeft: { fontSize: 11 },
    cardBody: { flexDirection: 'row' },
    cardImage: { width: 90, height: 110 },
    cardInfo: { padding: 14, flex: 1 },
    cardTitle: { fontSize: 14, color: '#e8e0d4', marginBottom: 6 },
    cardMuseum: { fontSize: 11, color: '#6a5a4a', marginBottom: 12 },
    removeBtn: { borderWidth: 1, borderColor: '#2a2520', borderRadius: 12, paddingVertical: 4, paddingHorizontal: 10, alignSelf: 'flex-start' },
    removeBtnText: { fontSize: 10, color: '#6a5a4a', letterSpacing: 1 },
});