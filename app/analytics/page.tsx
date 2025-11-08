"use client";

import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { client } from "../../lib/sanity";

interface UserInteraction {
  _id: string;
  userId: string;
  productId: string;
  action: "view" | "add_to_cart" | "purchase";
  timestamp: string;
}

interface PredictiveInsight {
  productId: string;
  predictedScore: number;
}

export default function AnalyticsPage() {
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndPredict = async () => {
      try {
        // Fetch user interactions from Sanity
        const interactions: UserInteraction[] = await client.fetch(
          `*[_type == "userInteraction"] | order(timestamp desc)`
        );

        if (interactions.length === 0) {
          setLoading(false);
          return;
        }

        // Prepare data for ML model (simple collaborative filtering simulation)
        const userProductMatrix: { [key: string]: { [key: string]: number } } = {};
        interactions.forEach((interaction) => {
          if (!userProductMatrix[interaction.userId]) {
            userProductMatrix[interaction.userId] = {};
          }
          const score = interaction.action === "purchase" ? 3 : interaction.action === "add_to_cart" ? 2 : 1;
          userProductMatrix[interaction.userId][interaction.productId] = score;
        });

        // Simple prediction: average scores per product
        const productScores: { [key: string]: number[] } = {};
        Object.values(userProductMatrix).forEach((userProducts) => {
          Object.entries(userProducts).forEach(([productId, score]) => {
            if (!productScores[productId]) productScores[productId] = [];
            productScores[productId].push(score);
          });
        });

        const predictions: PredictiveInsight[] = Object.entries(productScores).map(([productId, scores]) => ({
          productId,
          predictedScore: scores.reduce((a, b) => a + b, 0) / scores.length,
        }));

        // Sort by predicted score descending
        predictions.sort((a, b) => b.predictedScore - a.predictedScore);

        setInsights(predictions.slice(0, 10)); // Top 10
      } catch (error) {
        console.error("Error fetching data or predicting:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndPredict();
  }, []);

  if (loading) {
    return <div className="p-8">Loading predictive insights...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Predictive Insights Dashboard</h1>
      <p className="mb-4">Top predicted products based on user interactions:</p>
      <ul className="space-y-2">
        {insights.map((insight: PredictiveInsight, index: number) => (
          <li key={insight.productId} className="flex justify-between items-center p-4 bg-gray-100 rounded">
            <span>Product ID: {insight.productId}</span>
            <span>Predicted Score: {insight.predictedScore.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      {insights.length === 0 && <p>No data available for predictions.</p>}
    </div>
  );
}
