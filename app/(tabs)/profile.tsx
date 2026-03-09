import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';

const artworks = [
  { id: 1, genre: "Impressionismus", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80" },
  { id: 2, genre: "Abstrakt", image: "https://images.unsplash.com/photo-1578926288207-32356338dba8?w=600&q=80" },
  { id: 3, genre: "Romantik", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80" },
  { id: 4, genre: "Expressionismus", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&q=80" },
  { id: 5, genre: "Design", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80" },
  { id: 6, genre: "Skulptur", image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=600&q=80" },
];

const cities = ["Hamburg", "Berlin", "München", "Köln", "Frankfurt", "Dresden"];

export default function ProfileScreen() {
  const [screen, setScreen] = useState<'profile' | 'setup-art' | 'setup-city' | 'done'>('profile');
  const [likedArt, setLikedArt] = useState<number[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>(['Hamburg']);
  const [currentArt, setCurrentArt] = useState(0);

  const likedGenres = [...new Set(artworks.filter(a => likedArt.includes(a.id)).map(a => a.genre))];

  const handleArtChoice = (liked: boolean) => {
    if (liked) setLikedArt(prev => [...prev, artworks[currentArt].id]);
    if (currentArt < artworks.length - 1) {
      setCurrentArt(prev => prev + 1);
    } else {
      setScreen('setup-city');
    }
  };

  const toggleCity = (city: string) => {
    setSelectedCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  if (screen === 'setup-art') {
    const art = artworks[currentArt];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Schritt 1 von 2</Text>
          <Text style={styles.title}>Was gefällt dir?</Text>
          <Text style={styles.hint}>Wähle Kunstwerke, die dich ansprechen</Text>
        </View>
        <View style={styles.progressRow}>
          {artworks.map((_, i) => (
            <View key={i} style={[styles.progressBar, { backgroundColor: i < currentArt ? '#c8a882' : i === currentArt ? '#c8a88280' : '#2a2520' }]} />
          ))}
        </View>
        <View style={styles.artCard}>
          <Image source={{ uri: art.image }} style={styles.artImage} />
          <View style={styles.artOverlay} />
          <View style={styles.artInfo}>
            <Text style={styles.artGenre}>{art.genre}</Text>
          </View>
        </View>
        <View style={styles.choiceRow}>
          <TouchableOpacity onPress={() => handleArtChoice(false)} style={styles.noBtn}>
            <Text style={styles.noBtnText}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleArtChoice(true)} style={styles.yesBtn}>
            <Text style={styles.yesBtnText}>♥</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.counter}>{currentArt + 1} / {artworks.length}</Text>
      </SafeAreaView>
    );
  }

  if (screen === 'setup-city') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Schritt 2 von 2</Text>
          <Text style={styles.title}>Welche Städte?</Text>
          <Text style={styles.hint}>Wähle Städte, die du besuchen möchtest</Text>
        </View>
        <View style={styles.cityGrid}>
          {cities.map(city => (
            <TouchableOpacity key={city} onPress={() => toggleCity(city)} style={[
              styles.cityChip,
              selectedCities.includes(city) && styles.cityChipActive
            ]}>
              <Text style={[styles.cityChipText, selectedCities.includes(city) && styles.cityChipTextActive]}>
                {city}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => setScreen('done')} style={styles.doneBtn}>
          <Text style={styles.doneBtnText}>Fertig →</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (screen === 'done') {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <Text style={styles.doneIcon}>✦</Text>
        <Text style={styles.doneTitle}>Perfekt!</Text>
        <Text style={styles.doneSubtitle}>Dein Geschmack wurde gespeichert</Text>
        {likedGenres.length > 0 && (
          <Text style={styles.doneGenres}>Du magst: {likedGenres.join(', ')}</Text>
        )}
        <TouchableOpacity onPress={() => { setScreen('profile'); setCurrentArt(0); }} style={styles.doneBtn}>
          <Text style={styles.doneBtnText}>Zum Profil →</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Mein Konto</Text>
          <Text style={styles.title}>Profil</Text>
        </View>
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>✦</Text>
          </View>
          <View>
            <Text style={styles.username}>Kunstliebhaberin</Text>
            <Text style={styles.location}>Hamburg, Deutschland</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mein Geschmack</Text>
            <TouchableOpacity onPress={() => { setScreen('setup-art'); setCurrentArt(0); setLikedArt([]); }} style={styles.resetBtn}>
              <Text style={styles.resetBtnText}>Neu einrichten</Text>
            </TouchableOpacity>
          </View>
          {likedGenres.length > 0 ? (
            <View style={styles.chipRow}>
              {likedGenres.map(genre => (
                <View key={genre} style={styles.genreChip}>
                  <Text style={styles.genreChipText}>{genre}</Text>
                </View>
              ))}
            </View>
          ) : (
            <>
              <Text style={styles.emptyText}>Noch nicht eingerichtet</Text>
              <TouchableOpacity onPress={() => setScreen('setup-art')} style={styles.setupBtn}>
                <Text style={styles.setupBtnText}>Geschmack einrichten →</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meine Städte</Text>
          <View style={styles.chipRow}>
            {selectedCities.map(city => (
              <View key={city} style={styles.cityChipProfile}>
                <Text style={styles.cityChipProfileText}>{city}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0c0a' },
  centered: { alignItems: 'center', justifyContent: 'center' },
  header: { padding: 24, paddingTop: 20 },
  subtitle: { fontSize: 11, letterSpacing: 2, color: '#8a7a6a', textTransform: 'uppercase', marginBottom: 4 },
  title: { fontSize: 26, color: '#c8a882', fontStyle: 'italic' },
  hint: { fontSize: 13, color: '#6a5a4a', marginTop: 4 },
  progressRow: { flexDirection: 'row', gap: 4, paddingHorizontal: 24, marginBottom: 24 },
  progressBar: { flex: 1, height: 2, borderRadius: 2 },
  artCard: { marginHorizontal: 24, borderRadius: 20, overflow: 'hidden', height: 300, marginBottom: 32 },
  artImage: { width: '100%', height: '100%' },
  artOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, backgroundColor: 'rgba(14,12,10,0.7)' },
  artInfo: { position: 'absolute', bottom: 20, left: 20 },
  artGenre: { fontSize: 11, letterSpacing: 2, color: '#c8a882' },
  choiceRow: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginBottom: 16 },
  noBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#1a1612', borderWidth: 1, borderColor: '#2a2520', alignItems: 'center', justifyContent: 'center' },
  noBtnText: { fontSize: 24, color: '#c88888' },
  yesBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#1a1612', borderWidth: 1, borderColor: '#c8a88244', alignItems: 'center', justifyContent: 'center' },
  yesBtnText: { fontSize: 24, color: '#c8a882' },
  counter: { textAlign: 'center', fontSize: 11, color: '#4a3a2a' },
  cityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: 24 },
  cityChip: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 20, borderWidth: 1, borderColor: '#2a2520' },
  cityChipActive: { backgroundColor: '#c8a88220', borderColor: '#c8a882' },
  cityChipText: { fontSize: 13, color: '#8a7a6a' },
  cityChipTextActive: { color: '#c8a882' },
  doneBtn: { marginHorizontal: 24, padding: 14, backgroundColor: '#c8a882', borderRadius: 12, alignItems: 'center' },
  doneBtnText: { fontSize: 14, color: '#0e0c0a', letterSpacing: 1 },
  doneIcon: { fontSize: 48, color: '#c8a882', marginBottom: 24 },
  doneTitle: { fontSize: 24, color: '#c8a882', fontStyle: 'italic', marginBottom: 8 },
  doneSubtitle: { fontSize: 14, color: '#8a7a6a', marginBottom: 8 },
  doneGenres: { fontSize: 12, color: '#6a5a4a', marginBottom: 32 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 24, marginBottom: 24 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#c8a882', alignItems: 'center', justifyContent: 'center' },
  avatarIcon: { fontSize: 24, color: '#0e0c0a' },
  username: { fontSize: 18, color: '#e8e0d4', marginBottom: 4 },
  location: { fontSize: 12, color: '#6a5a4a' },
  section: { marginHorizontal: 24, marginBottom: 16, backgroundColor: '#1a1612', borderWidth: 1, borderColor: '#2a2520', borderRadius: 16, padding: 18 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 11, letterSpacing: 2, color: '#8a7a6a', textTransform: 'uppercase' },
  resetBtn: { borderWidth: 1, borderColor: '#2a2520', borderRadius: 12, paddingVertical: 4, paddingHorizontal: 10 },
  resetBtnText: { fontSize: 10, color: '#c8a882', letterSpacing: 1 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  genreChip: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#c8a88220', borderWidth: 1, borderColor: '#c8a88244' },
  genreChipText: { fontSize: 12, color: '#c8a882' },
  emptyText: { fontSize: 13, color: '#6a5a4a', marginBottom: 12 },
  setupBtn: { backgroundColor: '#c8a882', borderRadius: 10, padding: 12, alignItems: 'center' },
  setupBtnText: { fontSize: 13, color: '#0e0c0a', letterSpacing: 1 },
  cityChipProfile: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#8899aa20', borderWidth: 1, borderColor: '#8899aa44' },
  cityChipProfileText: { fontSize: 12, color: '#8899aa' },
});