import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-ico-noto-emojis';
import { classes } from '~/app/styles/classes';
import { useSessionStore } from '~/app/store/sessionStore';
import { getMyLinks, Link } from '~/services/linkService';

export default function LinkList() {
  const { session } = useSessionStore();
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getMyLinks();
      if (result) {
        setLinks(result);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchLinks();
    }, [fetchLinks])
  );

  const handleRequestResponse = async (requestId: number, accept: boolean) => {
    console.log('handleRequestResponse called:', { requestId, accept });
  };

  const processResponse = async (
    requestId: number,
    accept: boolean,
    pseudo?: string
  ) => {
    console.log('processResponse called:', { requestId, accept, pseudo });
  };

  const currentUserGeneratedId = session.user?.generatedId;

  const pendingRequests = links.filter((link) => {
    return (
      link.status === 'pending' &&
      link.toUserGeneratedId === currentUserGeneratedId
    );
  });

  const acceptedLinks = links.filter((link) => {
    return link.status === 'accepted';
  });

  const sentRequests = links.filter(
    (link) =>
      link.status === 'pending' &&
      link.fromUserGeneratedId === currentUserGeneratedId
  );

  if (loading) {
    return (
      <View style={[classes.sectionCard, styles.loadingCard]}>
        <Text style={styles.loadingText}>Chargement des liaisons...</Text>
      </View>
    );
  }

  return (
    <>
      {pendingRequests.length > 0 && (
        <View style={[classes.sectionCard, styles.requestsCard]}>
          <View style={classes.sectionHeader}>
            <Icon name="handshake" height={20} width={20} />
            <Text style={[classes.sectionTitle, styles.requestsTitle]}>
              Demandes reçues ({pendingRequests.length})
            </Text>
          </View>
          {pendingRequests.map((request) => (
            <View key={request.id} style={styles.requestItem}>
              <View style={styles.requestHeader}>
                <View style={styles.requestUser}>
                  <View style={styles.requestAvatar}>
                    <Icon name="technologist" height={20} width={20} />
                  </View>
                  <View style={styles.requestInfo}>
                    <Text style={styles.requestPseudo}>
                      ID: {request.fromUserGeneratedId}
                    </Text>
                    <Text style={styles.requestId}>
                      Souhaite se lier avec vous
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.requestActions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.rejectButton]}
                  onPress={() => handleRequestResponse(request.id, false)}
                >
                  <Icon name="cross-mark" height={16} width={16} />
                  <Text style={styles.rejectButtonText}>Refuser</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.acceptButton]}
                  onPress={() => handleRequestResponse(request.id, true)}
                >
                  <Icon name="check-mark" height={16} width={16} />
                  <Text style={styles.acceptButtonText}>Accepter</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Section des demandes envoyées en attente */}
      {sentRequests.length > 0 && (
        <View style={[classes.sectionCard, styles.sentRequestsCard]}>
          <View style={classes.sectionHeader}>
            <Icon name="hourglass-not-done" height={20} width={20} />
            <Text style={[classes.sectionTitle, styles.sentRequestsTitle]}>
              Demandes envoyées ({sentRequests.length})
            </Text>
          </View>
          {sentRequests.map((request) => (
            <View key={request.id} style={styles.sentRequestItem}>
              <View style={styles.requestUser}>
                <View style={styles.requestAvatar}>
                  <Icon name="technologist" height={20} width={20} />
                </View>
                <View style={styles.requestInfo}>
                  <Text style={styles.requestPseudo}>
                    Pseudo : {request.fromUserPseudo}
                  </Text>
                  <Text style={styles.requestId}>
                    → {request.toUserGeneratedId}
                  </Text>
                  <Text style={styles.requestId}>
                    En attente depuis le{' '}
                    {new Date(request.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Section des liaisons acceptées */}
      {acceptedLinks.length > 0 && (
        <View style={[classes.sectionCard, styles.linksCard]}>
          <View style={classes.sectionHeader}>
            <Icon name="link" height={20} width={20} />
            <Text style={[classes.sectionTitle, styles.linksTitle]}>
              Mes liaisons ({acceptedLinks.length})
            </Text>
          </View>
          {acceptedLinks.map((link) => (
            <View key={link.id} style={styles.linkItem}>
              <View style={styles.requestAvatar}>
                <Icon name="technologist" height={20} width={20} />
              </View>
              <View style={styles.linkInfo}>
                <Text style={styles.linkPseudo}>
                  {link.fromUserPseudo} ↔ {link.toUserPseudo}
                </Text>
                <Text style={styles.linkDate}>
                  Lié depuis le {new Date(link.updatedAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Message si aucune liaison */}
      {pendingRequests.length === 0 &&
        sentRequests.length === 0 &&
        acceptedLinks.length === 0 && (
          <View style={[classes.sectionCard, styles.emptyCard]}>
            <View style={classes.sectionHeader}>
              <Icon name="link" height={20} width={20} />
              <Text style={[classes.sectionTitle, styles.emptyTitle]}>
                Liaisons
              </Text>
            </View>
            <Text style={styles.emptyText}>
              Aucune liaison pour le moment. Utilisez le bouton "+" pour créer
              votre première liaison !
            </Text>
          </View>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingCard: {
    backgroundColor: '#ddd6fe',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  loadingText: {
    fontSize: 16,
    color: '#6c5ce7',
    fontWeight: '500',
  },
  requestsCard: {
    backgroundColor: '#e17055',
  },
  requestsTitle: {
    color: 'white',
  },
  requestItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  requestHeader: {
    marginBottom: 10,
  },
  requestUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  requestInfo: {
    flex: 1,
  },
  requestPseudo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  requestId: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  acceptButton: {
    backgroundColor: '#00b894',
  },
  rejectButton: {
    backgroundColor: '#d63031',
  },
  acceptButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  rejectButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  sentRequestsCard: {
    backgroundColor: '#fdcb6e',
  },
  sentRequestsTitle: {
    color: '#2d3436',
  },
  sentRequestItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  linksCard: {
    backgroundColor: '#00b894',
  },
  linksTitle: {
    color: 'white',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  linkInfo: {
    flex: 1,
    marginLeft: 12,
  },
  linkPseudo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  linkDate: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  emptyCard: {
    backgroundColor: '#74b9ff',
  },
  emptyTitle: {
    color: 'white',
  },
  emptyText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
});
