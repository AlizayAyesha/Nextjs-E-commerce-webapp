import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  let category = 'Luxury'; // Default category

  try {
    const body = await request.json();
    const { imageUrl, category: requestCategory } = body;
    category = requestCategory || category;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Enhanced prompt for luxury fashion products
    const prompt = `
You are an expert luxury fashion product analyst. Analyze this product image and provide detailed information for an e-commerce store.

Based on the image, generate:

1. **Product Title**: A compelling, luxury-sounding title (max 60 characters)
2. **Product Description**: A detailed, sales-oriented description (150-200 words) that highlights quality, materials, style, and target audience
3. **Category**: Suggest the most appropriate category from: ${category || 'Men, Women, Kids, Luxury, Top picks, booking'}
4. **Price Range**: Suggest a realistic price range in USD for this luxury item
5. **Key Features**: List 4-6 key features or selling points
6. **Target Audience**: Describe the ideal customer
7. **Style Keywords**: 5-7 relevant style/season keywords for SEO

Format your response as a valid JSON object with these exact keys:
{
  "title": "string",
  "description": "string",
  "suggestedCategory": "string",
  "priceRange": "string (e.g., '$299 - $399')",
  "keyFeatures": ["array of strings"],
  "targetAudience": "string",
  "styleKeywords": ["array of strings"]
}

Focus on luxury fashion terminology, high-quality materials, and aspirational language. Make it suitable for a premium e-commerce brand.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "high"
              }
            }
          ]
        }
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const aiResponse = response.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    let analysisResult;
    try {
      // Clean the response by removing markdown code blocks if present
      const cleanedResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
      analysisResult = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('AI Response:', aiResponse);

      // Fallback response
      analysisResult = {
        title: "Luxury Fashion Item",
        description: "A premium fashion piece that embodies elegance and sophistication. Crafted with the finest materials and attention to detail, this item represents the pinnacle of luxury fashion design.",
        suggestedCategory: category || "Luxury",
        priceRange: "$299 - $599",
        keyFeatures: [
          "Premium materials",
          "Expert craftsmanship",
          "Timeless design",
          "Versatile styling"
        ],
        targetAudience: "Discerning fashion enthusiasts seeking premium quality and elegance",
        styleKeywords: ["luxury", "premium", "elegant", "sophisticated", "timeless"]
      };
    }

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Product Analysis API Error:', error);

    // Return fallback analysis
    const fallbackAnalysis = {
      title: "Luxury Fashion Item",
      description: "A premium fashion piece that embodies elegance and sophistication. Crafted with the finest materials and attention to detail, this item represents the pinnacle of luxury fashion design.",
      suggestedCategory: category || "Luxury",
      priceRange: "$299 - $599",
      keyFeatures: [
        "Premium materials",
        "Expert craftsmanship",
        "Timeless design",
        "Versatile styling"
      ],
      targetAudience: "Discerning fashion enthusiasts seeking premium quality and elegance",
      styleKeywords: ["luxury", "premium", "elegant", "sophisticated", "timeless"]
    };

    return NextResponse.json({
      success: true,
      analysis: fallbackAnalysis,
      generatedAt: new Date().toISOString(),
      fallback: true
    });
  }
}
