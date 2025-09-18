import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { classes } from '../../styles/classes';
import Icon from 'react-native-ico-noto-emojis';

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
});

export const GiftSection = () => {
  return (
    <SafeAreaView style={[classes.container]}>
      <ScrollView
        style={classes.scrollContainer}
        contentContainerStyle={classes.contentContainer}
      >
        <View style={classes.pageHeader}>
          <Icon name="wrapped-gift" height={32} width={32} />
          <Text style={classes.pageTitle}>Daily Gift</Text>
        </View>

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
    </SafeAreaView>
  );
};
