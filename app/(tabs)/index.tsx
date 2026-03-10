import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { exhibitions } from '../../store/exhibitions';

export default function HomeScreen() {
  const [saved, setSaved] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  
  console.log('first exhibition:', exhibitions[0].description);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Für dich kuratiert</Text>
          <Text style={styles.title}>Guten Morgen,{'\n'}
            <Text style={styles.titleAccent}>Kunstliebhaberin</Text>
          </Text>
        </View>

        {exhibitions.map(ex => (
          <TouchableOpacity key={ex.id} style={styles.card} onPress={() => router.push({
            pathname: '/exhibition',
            params: { title: ex.title, museum: ex.museum, city: ex.city, date: ex.date, image: ex.image, tag: ex.tag, color: ex.color, ticketUrl: ex.ticketUrl, description: ex.description }
          })}>
            <Image source={{ uri: ex.image }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={[styles.tag, { color: ex.color }]}>{ex.tag}</Text>
              <Text style={styles.cardTitle}>{ex.title}</Text>
              <Text style={styles.cardMuseum}>{ex.museum} · {ex.city}</Text>
              <Text style={styles.cardDate}>{ex.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0c0a' },
  header: { padding: 24, paddingTop: 20 },
  subtitle: { fontSize: 11, letterSpacing: 2, color: '#8a7a6a', textTransform: 'uppercase', marginBottom: 4 },
  title: { fontSize: 26, color: '#e8e0d4' },
  titleAccent: { color: '#c8a882', fontStyle: 'italic' },
  card: { marginHorizontal: 24, marginBottom: 16, borderRadius: 16, overflow: 'hidden', backgroundColor: '#1a1612', borderWidth: 1, borderColor: '#2a2520' },
  cardImage: { width: '100%', height: 200 },
  cardBody: { padding: 16 },
  tag: { fontSize: 11, letterSpacing: 1, marginBottom: 6 },
  cardTitle: { fontSize: 17, color: '#e8e0d4', marginBottom: 4 },
  cardMuseum: { fontSize: 12, color: '#8a7a6a', marginBottom: 8 },
  cardDate: { fontSize: 11, color: '#6a5a4a' },
});