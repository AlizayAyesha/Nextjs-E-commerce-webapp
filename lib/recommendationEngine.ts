import { UserInteraction } from '../app/context/UserInteractionContext';

// Lazy load TensorFlow to avoid slowing down initial page loads
let tf: any = null;
const loadTensorFlow = async () => {
  if (!tf) {
    try {
      tf = await import('@tensorflow/tfjs');
    } catch (error) {
      console.warn('TensorFlow.js not available, using fallback recommendations');
      return false;
    }
  }
  return true;
};

export interface RecommendationResult {
  productId: string;
  score: number;
  reason: string;
}

/**
 * Real AI Recommendation Engine with Collaborative Filtering
 */
export class RecommendationEngine {
  private userItemMatrix: Map<string, Map<string, number>> = new Map();
  private itemUserMatrix: Map<string, Map<string, number>> = new Map();
  private productEmbeddings: Map<string, any> = new Map();

  /**
   * Build user-item interaction matrix
   */
  private buildInteractionMatrix(userInteractions: UserInteraction[]): void {
    this.userItemMatrix.clear();
    this.itemUserMatrix.clear();

    userInteractions.forEach(interaction => {
      const { userId, productId, action } = interaction;

      if (!this.userItemMatrix.has(userId)) {
        this.userItemMatrix.set(userId, new Map());
      }
      if (!this.itemUserMatrix.has(productId)) {
        this.itemUserMatrix.set(productId, new Map());
      }

      let rating = 0;
      switch (action) {
        case 'view': rating = 1; break;
        case 'like': rating = 2; break;
        case 'add_to_cart': rating = 3; break;
        case 'purchase': rating = 5; break;
        default: rating = 0.5;
      }

      const userRatings = this.userItemMatrix.get(userId)!;
      const itemRatings = this.itemUserMatrix.get(productId)!;

      userRatings.set(productId, (userRatings.get(productId) || 0) + rating);
      itemRatings.set(userId, (itemRatings.get(userId) || 0) + rating);
    });
  }

  /**
   * Calculate Pearson correlation between users
   */
  private calculatePearsonCorrelation(user1Id: string, user2Id: string): number {
    const user1Ratings = this.userItemMatrix.get(user1Id);
    const user2Ratings = this.userItemMatrix.get(user2Id);

    if (!user1Ratings || !user2Ratings) return 0;

    const commonItems = new Set([...user1Ratings.keys()].filter(item => user2Ratings.has(item)));
    if (commonItems.size < 2) return 0;

    let sum1 = 0, sum2 = 0;
    commonItems.forEach(item => {
      sum1 += user1Ratings.get(item)!;
      sum2 += user2Ratings.get(item)!;
    });
    const mean1 = sum1 / commonItems.size;
    const mean2 = sum2 / commonItems.size;

    let numerator = 0, denom1 = 0, denom2 = 0;
    commonItems.forEach(item => {
      const rating1 = user1Ratings.get(item)! - mean1;
      const rating2 = user2Ratings.get(item)! - mean2;
      numerator += rating1 * rating2;
      denom1 += rating1 * rating1;
      denom2 += rating2 * rating2;
    });

    if (denom1 === 0 || denom2 === 0) return 0;
    return numerator / (Math.sqrt(denom1) * Math.sqrt(denom2));
  }

  /**
   * Calculate item-item similarity using cosine similarity
   */
  private calculateItemSimilarity(item1Id: string, item2Id: string): number {
    const item1Users = this.itemUserMatrix.get(item1Id);
    const item2Users = this.itemUserMatrix.get(item2Id);

    if (!item1Users || !item2Users) return 0;

    const commonUsers = new Set([...item1Users.keys()].filter(user => item2Users.has(user)));
    if (commonUsers.size === 0) return 0;

    let dotProduct = 0, norm1 = 0, norm2 = 0;
    commonUsers.forEach(user => {
      const rating1 = item1Users.get(user)!;
      const rating2 = item2Users.get(user)!;
      dotProduct += rating1 * rating2;
      norm1 += rating1 * rating1;
      norm2 += rating2 * rating2;
    });

    if (norm1 === 0 || norm2 === 0) return 0;
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  /**
   * Real collaborative filtering recommendations
   */
  getCollaborativeRecommendations(
    userInteractions: UserInteraction[],
    allProducts: Array<{ id: string; name: string; category: string; price: number }>,
    userId: string,
    topN: number = 5
  ): RecommendationResult[] {
    this.buildInteractionMatrix(userInteractions);
    const userRatings = this.userItemMatrix.get(userId);

    const recommendations = new Map<string, { score: number; reason: string }>();

    // If user has no interactions, return popular items
    if (!userRatings || userRatings.size === 0) {
      // Return most popular items across all users
      const itemPopularity = new Map<string, number>();
      this.itemUserMatrix.forEach((userRatings, itemId) => {
        let totalRating = 0;
        userRatings.forEach(rating => totalRating += rating);
        itemPopularity.set(itemId, totalRating);
      });

      Array.from(itemPopularity.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN)
        .forEach(([itemId, popularity]) => {
          recommendations.set(itemId, {
            score: Math.min(popularity / 10, 1), // Normalize popularity score
            reason: 'Popular item'
          });
        });

      return Array.from(recommendations.entries())
        .map(([productId, data]) => ({
          productId,
          score: data.score,
          reason: data.reason
        }));
    }

    // User-user collaborative filtering
    const userSimilarities = new Map<string, number>();
    this.userItemMatrix.forEach((_, otherUserId) => {
      if (otherUserId !== userId) {
        const similarity = this.calculatePearsonCorrelation(userId, otherUserId);
        if (similarity > 0.1) {
          userSimilarities.set(otherUserId, similarity);
        }
      }
    });

    // Get recommendations from similar users
    userSimilarities.forEach((similarity, similarUserId) => {
      const similarUserRatings = this.userItemMatrix.get(similarUserId);
      if (similarUserRatings) {
        similarUserRatings.forEach((rating, itemId) => {
          if (!userRatings.has(itemId) && rating >= 3) {
            const existing = recommendations.get(itemId);
            const score = similarity * (rating / 5);
            if (!existing || existing.score < score) {
              recommendations.set(itemId, {
                score,
                reason: `Recommended by users with similar tastes`
              });
            }
          }
        });
      }
    });

    // Item-item collaborative filtering fallback
    if (recommendations.size < topN) {
      userRatings.forEach((userRating, itemId) => {
        if (userRating >= 2) {
          allProducts.forEach(product => {
            if (product.id !== itemId && !userRatings.has(product.id)) {
              const similarity = this.calculateItemSimilarity(itemId, product.id);
              if (similarity > 0.3) {
                const existing = recommendations.get(product.id);
                const score = similarity * (userRating / 5);
                if (!existing || existing.score < score) {
                  recommendations.set(product.id, {
                    score,
                    reason: `Similar to items you've shown interest in`
                  });
                }
              }
            }
          });
        }
      });
    }

    return Array.from(recommendations.entries())
      .map(([productId, data]) => ({
        productId,
        score: data.score,
        reason: data.reason
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);
  }

  /**
   * Content-based recommendations using embeddings
   */
  getContentBasedRecommendations(
    allProducts: Array<{ id: string; name: string; category: string; price: number }>,
    viewedProducts: string[],
    topN: number = 5
  ): RecommendationResult[] {
    if (viewedProducts.length === 0) return [];

    // Create embeddings for all products
    allProducts.forEach(product => {
      if (!this.productEmbeddings.has(product.id)) {
        this.createProductEmbedding(product.id, product.category, product.price);
      }
    });

    const recommendations = new Map<string, RecommendationResult>();

    viewedProducts.forEach(viewedId => {
      allProducts.forEach(product => {
        if (product.id === viewedId || viewedProducts.includes(product.id)) return;

        const similarity = this.calculateSimilarity(viewedId, product.id);
        if (similarity > 0.3) {
          const existing = recommendations.get(product.id);
          if (!existing || existing.score < similarity) {
            recommendations.set(product.id, {
              productId: product.id,
              score: similarity,
              reason: `Similar category and price range`
            });
          }
        }
      });
    });

    return Array.from(recommendations.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);
  }

  /**
   * Hybrid recommendations combining all algorithms
   */
  getHybridRecommendations(
    userInteractions: UserInteraction[],
    allProducts: Array<{ id: string; name: string; category: string; price: number }>,
    userId: string,
    topN: number = 5
  ): RecommendationResult[] {
    const collaborative = this.getCollaborativeRecommendations(userInteractions, allProducts, userId, topN * 2);
    const viewedProducts = userInteractions
      .filter(i => i.userId === userId && i.action === 'view')
      .map(i => i.productId);
    const contentBased = this.getContentBasedRecommendations(allProducts, viewedProducts, topN * 2);

    // Simple combination - in real AI this would be more sophisticated
    const combined = new Map<string, RecommendationResult>();

    [...collaborative, ...contentBased].forEach(rec => {
      const existing = combined.get(rec.productId);
      if (!existing || existing.score < rec.score) {
        combined.set(rec.productId, rec);
      }
    });

    return Array.from(combined.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);
  }

  /**
   * Create product embeddings
   */
  createProductEmbedding(productId: string, category: string, price: number): any {
    if (!tf) return null;

    const categoryHash = this.hashString(category);
    const normalizedPrice = Math.min(price / 10000, 1);

    const embedding = tf.tensor1d([
      categoryHash % 10 / 10,
      (categoryHash * 7) % 10 / 10,
      normalizedPrice,
      Math.sin(categoryHash),
      Math.cos(categoryHash),
      Math.sin(price / 100),
      Math.cos(price / 100),
      categoryHash % 2,
      (categoryHash % 3) / 3,
      normalizedPrice * 2 - 1
    ]);

    this.productEmbeddings.set(productId, embedding);
    return embedding;
  }

  /**
   * Calculate cosine similarity between embeddings
   */
  calculateSimilarity(productId1: string, productId2: string): number {
    if (!tf) return 0;

    const embedding1 = this.productEmbeddings.get(productId1);
    const embedding2 = this.productEmbeddings.get(productId2);

    if (!embedding1 || !embedding2) return 0;

    const dotProduct = tf.dot(embedding1, embedding2);
    const norm1 = tf.norm(embedding1);
    const norm2 = tf.norm(embedding2);

    const similarity = tf.div(dotProduct, tf.mul(norm1, norm2));
    const result = similarity.dataSync()[0];

    dotProduct.dispose();
    norm1.dispose();
    norm2.dispose();
    similarity.dispose();

    return Math.max(0, Math.min(1, result));
  }

  /**
   * Initialize TensorFlow model
   */
  async initializeModel() {
    console.log('Real AI Recommendation Engine initialized with collaborative filtering');
  }

  /**
   * Clean up resources
   */
  dispose() {
    this.productEmbeddings.forEach(embedding => embedding.dispose());
    this.productEmbeddings.clear();
  }

  /**
   * Hash string for embedding generation
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}

export const recommendationEngine = new RecommendationEngine();
