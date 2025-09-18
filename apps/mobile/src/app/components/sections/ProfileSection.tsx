import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { classes } from '../../styles/classes';
import Icon from 'react-native-ico-noto-emojis';
import { useState } from 'react';

export default function ProfileSection() {
  const [userId, setUserId] = useState('');

  return (
    <SafeAreaView style={[classes.container]}>
      <ScrollView
        style={classes.scrollContainer}
        contentContainerStyle={classes.contentContainer}
      >
        <View style={classes.pageHeader}>
          <Icon name="bust-in-silhouette" height={32} width={32} />
          <Text style={classes.pageTitle}>Profile</Text>
        </View>

        <View style={[classes.centeredCard, styles.profileCard]}>
          <View style={classes.avatar}>
            <Icon name="technologist" height={32} width={32} />
          </View>
          <View>
            <Text>Votre identifiant : </Text>
            <Text>{userId}</Text>
          </View>
          <Text style={styles.userName}>Utilisateur</Text>
          <Text style={styles.memberSince}>Membre depuis aujourd'hui</Text>
        </View>

        <View
          style={[
            classes.sectionCard,
            styles.statisticsCard,
            classes.soonContainer,
          ]}
        >
          <View style={classes.sectionHeader}>
            <Icon name="bar-chart" height={20} width={20} />
            <Text style={[classes.sectionTitle, classes.whiteText]}>
              Statistiques
            </Text>
          </View>
          <View style={styles.statisticsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Jours</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Cadeaux</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Succès</Text>
            </View>
          </View>
          <View style={classes.soonOverlay}>
            <Text style={classes.soonText}>Soon</Text>
          </View>
        </View>

        <View
          style={[
            classes.sectionCard,
            styles.successCard,
            classes.soonContainer,
          ]}
        >
          <View style={classes.sectionHeader}>
            <Icon name="trophy" height={20} width={20} />
            <Text style={[classes.sectionTitle, classes.whiteText]}>
              Succès récents
            </Text>
          </View>
          <View style={styles.successItem}>
            <Icon name="check-mark" height={14} width={14} />
            <Text style={styles.successText}>Premier connexion</Text>
          </View>
          <View style={styles.successItem}>
            <Icon name="check-mark" height={14} width={14} />
            <Text style={styles.successText}>Streak de 7 jours</Text>
          </View>
          <View style={styles.successItemLast}>
            <Icon name="check-mark" height={14} width={14} />
            <Text style={styles.successText}>Premier cadeau réclamé</Text>
          </View>
          <View style={classes.soonOverlay}>
            <Text style={classes.soonText}>Soon</Text>
          </View>
        </View>

        <View style={[classes.sectionCard, styles.settingsCard]}>
          <View style={classes.sectionHeader}>
            <Icon name="gear" height={20} width={20} />
            <Text style={[classes.sectionTitle, styles.settingsTitle]}>
              Paramètres
            </Text>
          </View>
          <Text style={classes.sectionDescription}>
            Notifications activées • Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: '#6c5ce7',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 16,
    color: '#ddd6fe',
  },
  statisticsCard: {
    backgroundColor: '#00cec9',
  },
  statisticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: '#b2dfdb',
  },
  successCard: {
    backgroundColor: '#fd79a8',
  },
  successItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  successItemLast: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  successText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 8,
  },
  settingsCard: {
    backgroundColor: '#fdcb6e',
  },
  settingsTitle: {
    color: '#2d3436',
  },
});
