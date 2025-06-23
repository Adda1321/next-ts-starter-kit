import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { WebhookService } from '@/services/webhookService';


const prisma = new PrismaClient();

/**
 * Contact Form API Endpoint
 * 
 * This endpoint handles contact form submissions:
 * - POST: Submit a new contact message
 * - Triggers webhook events for contact.created
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create contact in database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    // Trigger webhook event for contact.created
    try {
      await WebhookService.triggerWebhook('contact.created', {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        message: contact.message,
        createdAt: contact.createdAt,
      });
    } catch (webhookError) {
      console.error('Failed to trigger webhook for contact.created:', webhookError);
      // Don't fail the contact creation if webhook fails
    }

    return NextResponse.json(
      { 
        success: true, 
        data: contact,
        message: 'Contact message sent successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send contact message' },
      { status: 500 }
    );
  }
}

/**
 * Get all contact messages (for admin purposes)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.contact.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
} 