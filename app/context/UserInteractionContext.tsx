'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export interface UserInteraction {
  userId: string;
  productId: string;
  action: 'view' | 'add_to_cart' | 'purchase' | 'like' | 'share';
  timestamp: number;
  sessionId: string;
  productData?: {
    name: string;
    category: string;
    price: number;
  };
}

interface UserInteractionContextType {
  interactions: UserInteraction[];
  addInteraction: (interaction: Omit<UserInteraction, 'userId' | 'timestamp' | 'sessionId'>) => void;
  getUserInteractions: (userId: string) => UserInteraction[];
  getProductInteractions: (productId: string) => UserInteraction[];
  clearInteractions: () => void;
}

const UserInteractionContext = createContext<UserInteractionContextType | undefined>(undefined);

export const useUserInteractions = () => {
  const context = useContext(UserInteractionContext);
  if (!context) {
    throw new Error('useUserInteractions must be used within a UserInteractionProvider');
  }
  return context;
};

interface UserInteractionProviderProps {
  children: ReactNode;
}

export const UserInteractionProvider: React.FC<UserInteractionProviderProps> = ({ children }) => {
  const [interactions, setInteractions] = useState<UserInteraction[]>([]);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [userId] = useState(() => {
    // Get or create user ID from localStorage
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('userId');
      if (!id) {
        id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('userId', id);
      }
      return id;
    }
    return 'anonymous';
  });

  // Load interactions from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userInteractions');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Only keep the most recent 100 interactions to prevent quota issues
          const limited = parsed.slice(-100);
          setInteractions(limited);
        } catch (error) {
          console.error('Error loading user interactions:', error);
          // Clear corrupted data
          localStorage.removeItem('userInteractions');
        }
      }
    }
  }, []);

  // Save interactions to localStorage whenever they change (with quota handling)
  useEffect(() => {
    if (typeof window !== 'undefined' && interactions.length > 0) {
      try {
        // Keep only the most recent 100 interactions
        const limitedInteractions = interactions.slice(-100);

        // Try to save to localStorage
        localStorage.setItem('userInteractions', JSON.stringify(limitedInteractions));

        // If we still have too many interactions, reduce further
        if (interactions.length > 50) {
          const furtherLimited = interactions.slice(-50);
          setInteractions(furtherLimited);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          console.warn('localStorage quota exceeded, reducing stored interactions');
          // Reduce to last 20 interactions
          const reduced = interactions.slice(-20);
          setInteractions(reduced);
          try {
            localStorage.setItem('userInteractions', JSON.stringify(reduced));
          } catch (secondError) {
            console.error('Still unable to save interactions, clearing storage');
            // Last resort: clear all interactions
            setInteractions([]);
            localStorage.removeItem('userInteractions');
          }
        } else {
          console.error('Error saving user interactions:', error);
        }
      }
    }
  }, [interactions]);

  const addInteraction = useCallback((interaction: Omit<UserInteraction, 'userId' | 'timestamp' | 'sessionId'>) => {
    const newInteraction: UserInteraction = {
      ...interaction,
      userId,
      timestamp: Date.now(),
      sessionId,
    };

    setInteractions(prev => [...prev, newInteraction]);
    console.log('User interaction added:', newInteraction);
  }, [userId, sessionId]);

  const getUserInteractions = (targetUserId: string) => {
    return interactions.filter(interaction => interaction.userId === targetUserId);
  };

  const getProductInteractions = (productId: string) => {
    return interactions.filter(interaction => interaction.productId === productId);
  };

  const clearInteractions = () => {
    setInteractions([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userInteractions');
    }
  };

  const value: UserInteractionContextType = {
    interactions,
    addInteraction,
    getUserInteractions,
    getProductInteractions,
    clearInteractions,
  };

  return (
    <UserInteractionContext.Provider value={value}>
      {children}
    </UserInteractionContext.Provider>
  );
};
