import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Get the Web3Forms key from env
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    
    // If the key is not configured, fall back to a public keyless submit or return error
    if (!accessKey || accessKey === "your_web3forms_key_here") {
      return NextResponse.json(
        { error: "SMTP/Web3Forms access key is not configured. Please add it to your .env.local file." },
        { status: 500 }
      );
    }

    // Send the contact form data to Web3Forms API
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        message: message,
        subject: `New Portfolio Message from ${name}`,
        from_name: "Developer Portfolio"
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Web3Forms submission failed");
    }
    
    return NextResponse.json({ success: true, message: data.message });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
