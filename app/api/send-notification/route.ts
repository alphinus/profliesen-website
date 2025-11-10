import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Resend only when API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, images } = body;

    // Skip email if Resend is not configured
    if (!resend) {
      console.warn('RESEND_API_KEY not configured, skipping email notification');
      return NextResponse.json({ success: true, emailSkipped: true });
    }

    // Sende Benachrichtigung an dich
    const { data, error } = await resend.emails.send({
      from: 'ProFliesen Kontaktformular <onboarding@resend.dev>',
      to: ['alphinus@gmail.com'],
      subject: `🔔 Neue Kontaktanfrage von ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
                padding: 15px;
                background: white;
                border-radius: 8px;
                border-left: 4px solid #22c55e;
              }
              .label {
                font-weight: bold;
                color: #16a34a;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .value {
                color: #1f2937;
                font-size: 16px;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
                white-space: pre-wrap;
                font-family: 'Courier New', monospace;
              }
              .images {
                margin-top: 10px;
              }
              .image-link {
                display: inline-block;
                margin: 5px 10px 5px 0;
                padding: 8px 16px;
                background: #22c55e;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-size: 14px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                color: #6b7280;
                font-size: 12px;
              }
              .action-button {
                display: inline-block;
                margin: 20px 0;
                padding: 12px 30px;
                background: #22c55e;
                color: white;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Neue Kontaktanfrage!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">ProFliesen Website</p>
              </div>

              <div class="content">
                <div class="field">
                  <div class="label">👤 Name</div>
                  <div class="value">${name}</div>
                </div>

                <div class="field">
                  <div class="label">📧 E-Mail</div>
                  <div class="value">
                    <a href="mailto:${email}" style="color: #22c55e; text-decoration: none;">
                      ${email}
                    </a>
                  </div>
                </div>

                ${phone ? `
                  <div class="field">
                    <div class="label">📞 Telefon</div>
                    <div class="value">
                      <a href="tel:${phone}" style="color: #22c55e; text-decoration: none;">
                        ${phone}
                      </a>
                    </div>
                  </div>
                ` : ''}

                ${service ? `
                  <div class="field">
                    <div class="label">🔧 Gewünschte Leistung</div>
                    <div class="value">${service}</div>
                  </div>
                ` : ''}

                <div class="field">
                  <div class="label">💬 Nachricht</div>
                  <div class="message-box">${message}</div>
                </div>

                ${images && images.length > 0 ? `
                  <div class="field">
                    <div class="label">📎 Hochgeladene Bilder (${images.length})</div>
                    <div class="images">
                      ${images.map((url: string, i: number) =>
                        `<a href="${url}" class="image-link" target="_blank">Bild ${i + 1} öffnen →</a>`
                      ).join('')}
                    </div>
                  </div>
                ` : ''}

                <div style="text-align: center;">
                  <a href="https://app.supabase.com/project/ribcbajrgmmxjidemyvj/editor"
                     class="action-button"
                     target="_blank">
                    📊 Alle Anfragen in Supabase anzeigen
                  </a>
                </div>

                <div class="footer">
                  <p><strong>Empfangen am:</strong> ${new Date().toLocaleString('de-DE', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                    timeZone: 'Europe/Berlin'
                  })}</p>
                  <p style="margin-top: 10px; color: #9ca3af;">
                    Diese Email wurde automatisch von deinem ProFliesen Kontaktformular gesendet.
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Email notification error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
