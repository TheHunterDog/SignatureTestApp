/**
 * HomeScreen Component
 * 
 * This is the main landing screen that presents users with different signature
 * implementation options to test and compare. Each option is rated on a 
 * production-readiness scale from 1-100.
 * 
 * Features:
 * - Visual comparison of signature implementations
 * - Production readiness scores
 * - Color-coded rating system (green=good, orange=ok, red=poor)
 * - Navigation to individual test screens
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

/**
 * Navigation type definitions
 * Ensures type safety when navigating between screens
 */
type RootStackParamList = {
  Home: undefined;
  CustomSignature: undefined;
  EnhancedCustomSignature: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

/**
 * HomeScreen Component
 * 
 * Displays a list of signature implementation options with ratings and
 * allows navigation to test each implementation.
 */
const HomeScreen: React.FC<Props> = ({navigation}) => {
  /**
   * Determines background color for score badge based on production readiness
   * 
   * @param score - Production readiness score (1-100)
   * @returns Hex color code for background
   */
  const getScoreBackgroundColor = (score: number) => {
    if (score >= 80) return '#E8F5E8'; // Light green for excellent (80-100)
    if (score >= 60) return '#FFF3E0'; // Light orange for good (60-79)
    return '#FFEBEE'; // Light red for poor (0-59)
  };

  /**
   * Determines text color for score badge based on production readiness
   * 
   * @param score - Production readiness score (1-100)
   * @returns Hex color code for text
   */
  const getScoreTextColor = (score: number) => {
    if (score >= 80) return '#2E7D32'; // Dark green for excellent
    if (score >= 60) return '#F57C00'; // Dark orange for good
    return '#D32F2F'; // Dark red for poor
  };

  /**
   * Configuration for signature implementation test options
   * 
   * Each option includes:
   * - id: Unique identifier
   * - title: Display name
   * - description: Brief explanation
   * - route: Navigation target
   * - color: Theme color for visual consistency
   * - score: Production readiness rating (1-100)
   * - pros: Key advantages
   */
  const signatureTests = [
    {
      id: 1,
      title: 'Enhanced Custom Signature',
      description: 'Production-ready custom SVG implementation',
      route: 'EnhancedCustomSignature' as const,
      color: '#4CAF50', // Green - highest score
      score: 95, // Excellent for production use
      pros: 'Full control, performant, no dependencies',
    },
    {
      id: 2,
      title: 'Basic Custom Signature',
      description: 'Simple custom implementation demo',
      route: 'CustomSignature' as const,
      color: '#9C27B0', // Purple - moderate score
      score: 70, // Good for learning, basic functionality
      pros: 'Learning example, basic functionality',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header section with app title and description */}
        <View style={styles.header}>
          <Text style={styles.title}>Signature Test App</Text>
          <Text style={styles.subtitle}>
            Compare different React Native signature implementations
          </Text>
        </View>

        {/* List of signature implementation options */}
        <View style={styles.testContainer}>
          {signatureTests.map(test => (
            <TouchableOpacity
              key={test.id}
              style={[styles.testButton, {borderLeftColor: test.color}]}
              onPress={() => navigation.navigate(test.route)}>
              
              {/* Main content area of each option */}
              <View style={styles.testContent}>
                {/* Title row with score badge */}
                <View style={styles.titleRow}>
                  <Text style={styles.testTitle}>{test.title}</Text>
                  {/* Production readiness score badge */}
                  <View style={[styles.scoreContainer, {
                    backgroundColor: getScoreBackgroundColor(test.score)
                  }]}>
                    <Text style={[styles.scoreText, {
                      color: getScoreTextColor(test.score)
                    }]}>
                      {test.score}/100
                    </Text>
                  </View>
                </View>
                
                {/* Description and key benefits */}
                <Text style={styles.testDescription}>{test.description}</Text>
                <Text style={styles.testPros}>✓ {test.pros}</Text>
              </View>
              
              {/* Color indicator bar on the right */}
              <View style={[styles.colorIndicator, {backgroundColor: test.color}]} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Styles for the HomeScreen component
 * 
 * Design principles:
 * - Clean, modern card-based design
 * - Color-coded visual hierarchy
 * - Responsive spacing and typography
 * - Subtle shadows for depth
 */
const styles = StyleSheet.create({
  // Main container - light gray background
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background for contrast
  },
  
  // Scroll view content container
  scrollContainer: {
    flexGrow: 1,
    padding: 20, // Consistent padding around content
  },
  
  // Header section styling
  header: {
    alignItems: 'center', // Center-align header content
    marginBottom: 30,
    paddingVertical: 20,
  },
  
  // Main title styling
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Dark gray for good contrast
    marginBottom: 8,
  },
  
  // Subtitle styling
  subtitle: {
    fontSize: 16,
    color: '#666', // Medium gray for secondary text
    textAlign: 'center',
    lineHeight: 22, // Improved readability
  },
  
  // Container for test option cards
  testContainer: {
    gap: 15, // Consistent spacing between cards
  },
  
  // Individual test option card
  testButton: {
    backgroundColor: 'white',
    borderRadius: 12, // Rounded corners for modern look
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4, // Colored accent border
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
  },
  
  // Content area of each test card
  testContent: {
    flex: 1, // Take up available space
  },
  
  // Title row with score badge
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  
  // Test option title
  testTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1, // Allow text to wrap if needed
  },
  
  // Production score badge container
  scoreContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12, // Pill-shaped badge
    marginLeft: 8,
  },
  
  // Score text styling
  scoreText: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Description text styling
  testDescription: {
    fontSize: 14,
    color: '#666', // Secondary text color
    lineHeight: 20,
    marginBottom: 4,
  },
  
  // Key benefits text styling
  testPros: {
    fontSize: 12,
    color: '#4CAF50', // Green for positive attributes
    fontStyle: 'italic',
  },
  
  // Right-side color indicator bar
  colorIndicator: {
    width: 8,
    height: 40,
    borderRadius: 4, // Rounded edges
    marginLeft: 15,
  },
});

export default HomeScreen;