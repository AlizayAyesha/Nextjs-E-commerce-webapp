import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  let description = '';
  let title = '';

  try {
    const body = await request.json();
    const { description: requestDescription, title: requestTitle, category, price } = body;
    description = requestDescription;
    title = requestTitle;

    console.log('🔄 AI Enhancement API called with:', { title, category, price, descriptionLength: description?.length });

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    const apiKey = process.env.OPENAI_API_KEY;
    console.log('🔑 OpenAI API Key available:', !!apiKey);

    if (!apiKey) {
      console.log('⚠️ No OpenAI API key found, using fallback');
      throw new Error('No API key');
    }

    // Enhanced prompt for luxury product description generation
    const prompt = `
You are a master luxury brand copywriter specializing in high-end fashion and lifestyle products. Transform the basic product description into a compelling, aspirational luxury product description.

Original Product Details:
- Title: ${title || 'Not provided'}
- Category: ${category || 'Luxury'}
- Price: ${price ? `$${price}` : 'Not specified'}
- Original Description: "${description}"

Create a luxury product description in this EXACT format:

**Custom [Enhanced Title] — [Luxury Edition/Collection Name]**

[Opening hook line that creates desire and aspiration.]

[Detailed luxury description with sophisticated language, emphasizing premium materials, craftsmanship, and exclusivity.]

[Additional compelling details about uniqueness, customization, or heritage.]

**✨ Key Features:**

• [Feature 1 with luxury language]
• [Feature 2 with luxury language]
• [Feature 3 with luxury language]
• [Feature 4 with luxury language]
• [Feature 5 with luxury language]

**[Elegant emoji] [Strong call-to-action that creates urgency and desire.]**

Requirements:
- Make the title more luxurious and compelling (add "Custom", "Signature", "Elite", etc.)
- Use sophisticated, aspirational language throughout
- Include premium material references (platinum, diamond-cut, handcrafted, etc.)
- Add exclusivity elements (limited, custom-made, bespoke, etc.)
- Include sensory and emotional appeal
- Use luxury brand terminology and phrasing
- Keep it elegant but persuasive
- Include relevant emojis strategically
- End with a powerful call-to-action

Make it sound like it belongs in a luxury e-commerce store with premium positioning.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a luxury fashion copywriter specializing in creating compelling product descriptions for high-end e-commerce brands."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const aiResponse = response.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from OpenAI');
    }

    // Clean the response
    const enhancedDescription = aiResponse.trim();

    return NextResponse.json({
      success: true,
      analysis: {
        enhancedDescription,
        originalLength: description.length,
        enhancedLength: enhancedDescription.length,
        improvement: enhancedDescription.length > description.length ? 'expanded' : 'refined'
      },
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Description Enhancement Error:', error);

    // Return a luxury-formatted enhanced version as fallback
    const enhancedTitle = title ? `Custom ${title} — Luxury Edition` : 'Custom Luxury Item — Signature Collection';
    const basicEnhancement = `**${enhancedTitle}**

Turn every moment into a statement of luxury.

${description}

This exquisite piece represents the pinnacle of luxury craftsmanship, meticulously designed for the discerning individual who appreciates unparalleled quality and timeless elegance. Each detail has been carefully considered to create an item that transcends ordinary fashion.

**✨ Key Features:**

• Premium materials with exceptional quality
• Expert craftsmanship and attention to detail
• Timeless design that never goes out of style
• Versatile styling for any occasion
• Made to last with superior durability

🕰️ Elevate your style. Embrace luxury.`;

    return NextResponse.json({
      success: true,
      analysis: {
        enhancedDescription: basicEnhancement,
        originalLength: description.length,
        enhancedLength: basicEnhancement.length,
        improvement: 'basic-enhancement'
      },
      generatedAt: new Date().toISOString(),
      fallback: true
    });
  }
}
