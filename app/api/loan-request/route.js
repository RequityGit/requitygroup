import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();

    const {
      loanType,
      propertyAddress,
      city,
      state,
      purchasePrice,
      loanAmount,
      unitsOrLots,
      rehabBudget,
      exitStrategy,
      timeline,
      additionalNotes,
      firstName,
      lastName,
      email,
      phone,
      company,
      experienceLevel,
    } = data;

    if (!loanType || !firstName || !lastName || !email || !phone || !loanAmount) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: parseInt(process.env.SMTP_PORT || '587') === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const unitsLabel = ['Manufactured Housing', 'RV Park', 'Multifamily'].includes(loanType)
      ? 'Number of Units'
      : 'Number of Units/Lots';

    const showRehab = ['Fix & Flip', 'New Construction', 'CRE Bridge'].includes(loanType);
    const rehabLabel = loanType === 'New Construction'
      ? 'Construction Budget'
      : loanType === 'Fix & Flip'
        ? 'Rehab Budget'
        : 'Rehab/Renovation Budget';

    const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0B1526;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background-color:#0B1526;">

    <!-- Header -->
    <div style="padding:40px 40px 32px;border-bottom:2px solid #E8622C;">
      <h1 style="margin:0;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:1px;">
        REQUIT<span style="color:#E8622C;">Y</span> LENDING
      </h1>
      <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.5);letter-spacing:2px;text-transform:uppercase;">
        New Loan Request
      </p>
    </div>

    <!-- Loan Type Badge -->
    <div style="padding:32px 40px 0;">
      <div style="display:inline-block;padding:10px 24px;background-color:rgba(232,98,44,0.15);border:1px solid rgba(232,98,44,0.3);border-radius:4px;">
        <span style="font-size:14px;font-weight:600;color:#E8622C;letter-spacing:1px;text-transform:uppercase;">${loanType}</span>
      </div>
    </div>

    <!-- Contact Information -->
    <div style="padding:32px 40px;">
      <h2 style="margin:0 0 20px;font-size:16px;color:#E8622C;letter-spacing:2px;text-transform:uppercase;font-weight:500;">
        Contact Information
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);width:40%;">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">Name</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:15px;color:#ffffff;font-weight:500;">${firstName} ${lastName}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">Email</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
            <a href="mailto:${email}" style="font-size:15px;color:#E8622C;text-decoration:none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">Phone</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
            <a href="tel:${phone}" style="font-size:15px;color:#E8622C;text-decoration:none;">${phone}</a>
          </td>
        </tr>
        ${company ? `
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">Company</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:15px;color:#ffffff;">${company}</span>
          </td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">Experience</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:15px;color:#ffffff;">${experienceLevel}</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Deal Details -->
    <div style="padding:0 40px 32px;">
      <h2 style="margin:0 0 20px;font-size:16px;color:#E8622C;letter-spacing:2px;text-transform:uppercase;font-weight:500;">
        Deal Details
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        ${propertyAddress ? `
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);width:40%;">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">Property Address</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:15px;color:#ffffff;">${propertyAddress}</span>
          </td>
        </tr>
        ` : ''}
        ${city || state ? `
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">City / State</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:15px;color:#ffffff;">${city}${city && state ? ', ' : ''}${state}</span>
          </td>
        </tr>
        ` : ''}
        ${purchasePrice ? `
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">Purchase Price / Value</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:15px;color:#ffffff;font-weight:600;">${purchasePrice}</span>
          </td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">Loan Amount Requested</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:15px;color:#E8622C;font-weight:700;">${loanAmount}</span>
          </td>
        </tr>
        ${unitsOrLots ? `
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">${unitsLabel}</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:15px;color:#ffffff;">${unitsOrLots}</span>
          </td>
        </tr>
        ` : ''}
        ${showRehab && rehabBudget ? `
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">${rehabLabel}</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:15px;color:#ffffff;">${rehabBudget}</span>
          </td>
        </tr>
        ` : ''}
        ${exitStrategy ? `
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">Exit Strategy</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:15px;color:#ffffff;">${exitStrategy}</span>
          </td>
        </tr>
        ` : ''}
        ${timeline ? `
        <tr>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:1px;">Timeline to Close</span>
          </td>
          <td style="padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:15px;color:#ffffff;">${timeline}</span>
          </td>
        </tr>
        ` : ''}
      </table>
    </div>

    ${additionalNotes ? `
    <!-- Additional Notes -->
    <div style="padding:0 40px 32px;">
      <h2 style="margin:0 0 16px;font-size:16px;color:#E8622C;letter-spacing:2px;text-transform:uppercase;font-weight:500;">
        Additional Notes
      </h2>
      <div style="padding:20px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-left:3px solid #E8622C;">
        <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.7);line-height:1.7;">${additionalNotes}</p>
      </div>
    </div>
    ` : ''}

    <!-- Footer -->
    <div style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);">
        Submitted via Requity Group Loan Request Form &middot; ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
      </p>
    </div>

  </div>
</body>
</html>`;

    const notifyEmail = process.env.NOTIFY_EMAIL || 'loans@requitygroup.com';

    await transporter.sendMail({
      from: `"Requity Lending" <${process.env.SMTP_USER}>`,
      to: notifyEmail,
      replyTo: email,
      subject: `New Loan Request: ${loanType} — ${firstName} ${lastName}`,
      html: htmlEmail,
    });

    return Response.json({ success: true, message: 'Loan request submitted successfully' });
  } catch (error) {
    console.error('Loan request error:', error);
    return Response.json(
      { error: 'Failed to submit loan request. Please try again.' },
      { status: 500 }
    );
  }
}
