import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { classes } from '~/app/styles/classes';
import Icon from 'react-native-ico-noto-emojis';
import LinkRequest from '../Link/LinkRequest';

const styles = StyleSheet.create({
  dailyGiftCard: {
    backgroundColor: '#74b9ff',
  },
  giftTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  giftDescription: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  giftIcon: {
    marginBottom: 10,
  },
  nextGiftsCard: {
    backgroundColor: '#fdcb6e',
  },
  nextGiftsTitle: {
    color: '#2d3436',
  },
  streakCard: {
    backgroundColor: '#fd79a8',
  },
  streakDescription: {
    fontSize: 16,
    color: 'white',
  },
  LinkRequestCard: {
    backgroundColor: '#00b894',
  },
  linkButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  linkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default function GiftSection() {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleLinkSuccess = () => {
    Alert.alert(
      'Demande envoyée !',
      "Votre demande de liaison a été envoyée. L'autre personne doit maintenant l'accepter.",
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={[classes.container]}>
      <ScrollView
        style={classes.scrollContainer}
        contentContainerStyle={classes.contentContainer}
      >
        <View style={[classes.centeredCard, styles.dailyGiftCard]}>
          <Icon
            name="party-popper"
            height={48}
            width={48}
            style={styles.giftIcon}
          />
          <Text style={styles.giftTitle}>Votre cadeau du jour !</Text>
          <Text style={styles.giftDescription}>
            Félicitations ! Vous avez reçu un cadeau spécial aujourd'hui.
          </Text>
        </View>

        <View style={[classes.centeredCard, styles.LinkRequestCard]}>
          <Icon name="link" height={48} width={48} style={styles.giftIcon} />
          <Text style={styles.giftTitle}>Se lier à une personne</Text>
          <Text style={styles.giftDescription}>
            Connect with someone using their profile ID.
          </Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => setIsBottomSheetVisible(true)}
          >
            <Text style={styles.linkButtonText}>Connect to someone</Text>
          </TouchableOpacity>
        </View>

        <View style={[classes.sectionCard, styles.nextGiftsCard]}>
          <View style={classes.sectionHeader}>
            <Icon name="calendar" height={20} width={20} />
            <Text style={[classes.sectionTitle, styles.nextGiftsTitle]}>
              Prochains cadeaux
            </Text>
          </View>
          <Text style={classes.sectionDescription}>
            Revenez demain pour découvrir votre prochain cadeau surprise !
          </Text>
        </View>

        <View
          style={[
            classes.sectionCard,
            styles.streakCard,
            classes.soonContainer,
          ]}
        >
          <View style={classes.sectionHeader}>
            <Icon name="sparkles" height={20} width={20} />
            <Text style={[classes.sectionTitle, classes.whiteText]}>
              Streak actuel
            </Text>
          </View>
          <Text style={styles.streakDescription}>
            7 jours consécutifs ! Continue comme ça !
          </Text>
          <View style={classes.soonOverlay}>
            <Text style={classes.soonText}>Soon</Text>
          </View>
        </View>
      </ScrollView>

      <LinkRequest
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        onSuccess={handleLinkSuccess}
      />
    </SafeAreaView>
  );
}
