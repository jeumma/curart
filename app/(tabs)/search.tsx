import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { exhibitions } from '../../store/exhibitions';

const cities = ["Alle", "Hamburg", "Berlin", "München", "Köln", "Frankfurt"];
const genres = ["Alle", "Abstrakt", "Romantik", "Expressionismus", "Skulptur", "Design"];

export default function SearchScreen() {
    const [query, setQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('Alle');
    const [selectedGenre, setSelectedGenre] = useState('Alle');

    const filtered = exhibitions.filter(ex => {
        const matchQuery = ex.title.toLowerCase().includes(query.toLowerCase()) ||
            ex.museum.toLowerCase().includes(query.toLowerCase());
        const matchCity = selectedCity === 'Alle' || ex.city === selectedCity;
        const matchGenre = selectedGenre === 'Alle' || ex.genre === selectedGenre;
        return matchQuery && matchCity && matchGenre;
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.subtitle}>Ausstellungen finden</Text>
                    <Text style={styles.title}>Suchen</Text>
                </View>

                {/* Search input */}
                <View style={styles.searchBox}>
                    <Text style={styles.searchIcon}>○</Text>
                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Ausstellung oder Museum..."
                        placeholderTextColor="#6a5a4a"
                        style={styles.searchInput}
                    />
                </View>

                {/* City filter */}
                <View style={styles.filterSection}>
                    <Text style={styles.filterLabel}>Stadt</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.filterRow}>
                            {cities.map(city => (
                                <TouchableOpacity key={city} onPress={() => setSelectedCity(city)} style={[
                                    styles.filterChip,
                                    selectedCity === city && styles.filterChipActive
                                ]}>
                                    <Text style={[styles.filterChipText, selectedCity === city && styles.filterChipTextActive]}>
                                        {city}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Genre filter */}
                <View style={styles.filterSection}>
                    <Text style={styles.filterLabel}>Genre</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.filterRow}>
                            {genres.map(genre => (
                                <TouchableOpacity key={genre} onPress={() => setSelectedGenre(genre)} style={[
                                    styles.filterChip,
                                    selectedGenre === genre && styles.filterChipActive
                                ]}>
                                    <Text style={[styles.filterChipText, selectedGenre === genre && styles.filterChipTextActive]}>
                                        {genre}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Results */}
                <View style={styles.results}>
                    <Text style={styles.resultCount}>{filtered.length} Ergebnisse</Text>
                    {filtered.map(ex => (
                        <TouchableOpacity key={ex.id} style={styles.card} onPress={() => router.push({
                            pathname: '/exhibition',
                            params: { title: ex.title, museum: ex.museum, city: ex.city, date: '', image: ex.image, tag: ex.genre, color: ex.color, ticketUrl: ex.ticketUrl }
                        })}>
                            <Image source={{ uri: ex.image }} style={styles.cardImage} />
                            <View style={styles.cardBody}>
                                <Text style={[styles.tag, { color: ex.color }]}>{ex.genre}</Text>
                                <Text style={styles.cardTitle}>{ex.title}</Text>
                                <Text style={styles.cardMuseum}>{ex.museum} · {ex.city}</Text>
                            </View>
                        </TouchableOpacity>
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
    searchBox: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginBottom: 20, backgroundColor: '#1a1612', borderWidth: 1, borderColor: '#2a2520', borderRadius: 12, padding: 12, gap: 10 },
    searchIcon: { color: '#6a5a4a', fontSize: 16 },
    searchInput: { flex: 1, color: '#e8e0d4', fontSize: 14 },
    filterSection: { marginBottom: 16 },
    filterLabel: { fontSize: 10, letterSpacing: 2, color: '#6a5a4a', textTransform: 'uppercase', marginBottom: 8, marginHorizontal: 24 },
    filterRow: { flexDirection: 'row', gap: 6, paddingHorizontal: 24 },
    filterChip: { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#2a2520' },
    filterChipActive: { backgroundColor: '#c8a882', borderColor: '#c8a882' },
    filterChipText: { fontSize: 12, color: '#8a7a6a' },
    filterChipTextActive: { color: '#0e0c0a' },
    results: { padding: 24 },
    resultCount: { fontSize: 10, letterSpacing: 2, color: '#6a5a4a', textTransform: 'uppercase', marginBottom: 14 },
    card: { flexDirection: 'row', backgroundColor: '#1a1612', borderWidth: 1, borderColor: '#2a2520', borderRadius: 14, overflow: 'hidden', marginBottom: 12 },
    cardImage: { width: 90, height: 110 },
    cardBody: { padding: 14, flex: 1 },
    tag: { fontSize: 10, letterSpacing: 1, marginBottom: 5 },
    cardTitle: { fontSize: 14, color: '#e8e0d4', marginBottom: 6 },
    cardMuseum: { fontSize: 11, color: '#6a5a4a' },
});