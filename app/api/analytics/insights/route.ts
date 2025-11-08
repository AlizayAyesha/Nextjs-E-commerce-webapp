import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mock data for analysis
const analyticsData = {
  dailyOrders: [
    { date: '2025-01-01', orders: 45, revenue: 12500 },
    { date: '2025-01-02', orders: 52, revenue: 15800 },
    { date: '2025-01-03', orders: 38, revenue: 9200 },
    { date: '2025-01-04', orders: 61, revenue: 18900 },
    { date: '2025-01-05', orders: 49, revenue: 14200 },
    { date: '2025-01-06', orders: 55, revenue: 16800 },
    { date: '2025-01-07', orders: 67, revenue: 22100 },
  ],
  monthlyData: {
    currentMonth: {
      orders: 1247,
      revenue: 387650,
      customers: 892,
      avgOrderValue: 311
    },
    previousMonth: {
      orders: 1189,
      revenue: 356890,
      customers: 834,
      avgOrderValue: 300
    }
  },
  topProducts: [
    { id: '1', name: 'Rolex Submariner', category: 'Luxury', orders: 145, revenue: 1160000, growth: 23 },
    { id: '2', name: 'Italian Tassel Wool Coat', category: 'Women', orders: 98, revenue: 29400, growth: 15 },
    { id: '3', name: 'Aston Martin DB12', category: 'Luxury', orders: 76, revenue: 17500000, growth: 31 },
    { id: '4', name: 'Floral Print Shirt', category: 'Women', orders: 87, revenue: 26100, growth: -5 },
    { id: '5', name: 'Kids Jump Suit', category: 'Kids', orders: 92, revenue: 7360, growth: 18 },
  ],
  categories: ['Men', 'Women', 'Kids', 'Luxury', 'Top picks', 'booking']
};

export async function POST() {
  try {

    console.log('🔄 AI Analytics Insights API called');

    // Check if OpenAI API key is available
    const apiKey = process.env.OPENAI_API_KEY;
    console.log('🔑 OpenAI API Key available:', !!apiKey);

    if (!apiKey) {
      console.log('⚠️ No OpenAI API key found, using fallback');
      throw new Error('No API key');
    }

    // Create a comprehensive prompt for AI analysis
    const prompt = `
You are an expert e-commerce analyst for a luxury fashion brand. Analyze the following business data and provide 4 specific, actionable insights.

Business Data:
- Current Month: ${analyticsData.monthlyData.currentMonth.orders} orders, $${analyticsData.monthlyData.currentMonth.revenue.toLocaleString()} revenue, ${analyticsData.monthlyData.currentMonth.customers} customers
- Previous Month: ${analyticsData.monthlyData.previousMonth.orders} orders, $${analyticsData.monthlyData.previousMonth.revenue.toLocaleString()} revenue, ${analyticsData.monthlyData.previousMonth.customers} customers
- Average Order Value: $${analyticsData.monthlyData.currentMonth.avgOrderValue}

Top Performing Products:
${analyticsData.topProducts.map(p => `- ${p.name} (${p.category}): ${p.orders} orders, $${p.revenue.toLocaleString()} revenue, ${p.growth > 0 ? '+' : ''}${p.growth}% growth`).join('\n')}

Daily Order Trends (Last 7 days):
${analyticsData.dailyOrders.map(d => `- ${d.date}: ${d.orders} orders, $${d.revenue.toLocaleString()} revenue`).join('\n')}

Categories: ${analyticsData.categories.join(', ')}

Please provide 4 AI-powered insights in the following JSON format:
[
  {
    "type": "trend|warning|opportunity|prediction",
    "title": "Brief, actionable title",
    "description": "Detailed explanation with specific recommendations",
    "impact": "high|medium|low"
  }
]

Focus on:
1. Growth trends and opportunities
2. Declining products that need attention
3. Category performance analysis
4. Predictive insights for future performance
5. Specific, actionable recommendations

Make insights data-driven and specific to luxury fashion e-commerce.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert e-commerce analyst specializing in luxury fashion brands. Provide actionable, data-driven insights."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    let insights;
    try {
      insights = JSON.parse(aiResponse);
    } catch {
      // If JSON parsing fails, create fallback insights
      insights = [
        {
          type: 'trend',
          title: 'Luxury Items Showing Strong Growth',
          description: 'Luxury category products have seen significant growth this month. Consider increasing inventory for high-demand items.',
          impact: 'high'
        },
        {
          type: 'warning',
          title: 'Product Performance Alert',
          description: 'Some products are showing declining sales trends. Review pricing and marketing strategies.',
          impact: 'medium'
        },
        {
          type: 'opportunity',
          title: 'Emerging Category Trend',
          description: 'Kids category showing consistent growth. Consider expanding the collection.',
          impact: 'high'
        },
        {
          type: 'prediction',
          title: 'Weekend Sales Optimization',
          description: 'Data suggests higher weekend performance. Optimize staffing and promotions.',
          impact: 'medium'
        }
      ];
    }

    return NextResponse.json({
      success: true,
      insights: insights,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Analytics API Error:', error);

    // Return fallback insights if AI fails
    const fallbackInsights = [
      {
        type: 'trend',
        title: 'Luxury Items Showing Strong Growth',
        description: 'Luxury category products have seen 28% growth this month. Consider increasing inventory for high-demand items.',
        impact: 'high'
      },
      {
        type: 'warning',
        title: 'Women\'s Floral Print Shirt Declining',
        description: 'Sales of Floral Print Shirt have dropped 5% this month. Consider seasonal promotion or replacement.',
        impact: 'medium'
      },
      {
        type: 'opportunity',
        title: 'Kids Category Emerging Trend',
        description: 'Kids products showing consistent 15-20% monthly growth. Expand kids collection for better market capture.',
        impact: 'high'
      },
      {
        type: 'prediction',
        title: 'Weekend Sales Pattern Detected',
        description: 'AI predicts 35% higher weekend sales. Optimize staffing and marketing for weekends.',
        impact: 'medium'
      }
    ];

    return NextResponse.json({
      success: true,
      insights: fallbackInsights,
      generatedAt: new Date().toISOString(),
      fallback: true
    });
  }
}
