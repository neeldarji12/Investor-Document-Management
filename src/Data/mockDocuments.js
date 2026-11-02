/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Data/mockDocuments.js
 * 
 * Initial mock document dataset containing 8 fictional documents across 
 * Identity, Financial, and Immigration categories with realistic statuses,
 * file metadata, and SVG-based preview assets.
 */

// Helper function to generate clean inline SVG document previews
const createSampleDocPreview = (title, status, docNumber, notes) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8fafc" />
        <stop offset="100%" stop-color="#e2e8f0" />
      </linearGradient>
    </defs>
    <rect width="600" height="800" fill="url(#grad)" rx="12" />
    <rect x="20" y="20" width="560" height="760" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" rx="8" />
    
    <!-- Header Banner -->
    <rect x="40" y="45" width="520" height="70" fill="#0f172a" rx="6" />
    <text x="60" y="85" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff">APPLEN SOLUTIONS PORTAL</text>
    <text x="60" y="103" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8">OFFICIAL INVESTOR DOCUMENT RECORD</text>
    
    <!-- Document Title & Badge -->
    <text x="60" y="160" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#1e293b">${title}</text>
    <rect x="60" y="175" width="120" height="26" rx="13" fill="#e0f2fe" />
    <text x="75" y="193" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0369a1">${status.toUpperCase()}</text>
    
    <!-- Meta fields -->
    <text x="60" y="240" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Document ID: <tspan font-weight="bold" fill="#1e293b">${docNumber}</tspan></text>
    <text x="60" y="270" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Verification Authority: <tspan font-weight="bold" fill="#1e293b">DJ Compliance Bureau</tspan></text>
    <text x="60" y="300" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Security Level: <tspan font-weight="bold" fill="#1e293b">Class 2 Verified Investor</tspan></text>
    
    <!-- Decorative Watermark/Box -->
    <rect x="60" y="340" width="480" height="260" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="6 4" rx="8" />
    <text x="80" y="380" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#334155">Summary &amp; Attestation:</text>
    <text x="80" y="415" font-family="Arial, sans-serif" font-size="13" fill="#475569">${notes}</text>
    <text x="80" y="445" font-family="Arial, sans-serif" font-size="12" fill="#64748b">This record demonstrates official investor verification criteria.</text>
    <text x="80" y="475" font-family="Arial, sans-serif" font-size="12" fill="#64748b">Validated against national identity &amp; financial compliance matrices.</text>
    
    <!-- Simulated Stamp -->
    <circle cx="450" cy="500" r="45" fill="none" stroke="#2563eb" stroke-width="3" opacity="0.6"/>
    <text x="415" y="495" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#2563eb">SEALED &amp;</text>
    <text x="418" y="515" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#2563eb">RECORDED</text>
    
    <!-- Footer -->
    <line x1="60" y1="670" x2="540" y2="670" stroke="#cbd5e1" stroke-width="1" />
    <text x="60" y="700" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8">Applen Solutions • DJ Investor Portal • System Generated Preview</text>
    <text x="60" y="720" font-family="Arial, sans-serif" font-size="10" fill="#cbd5e1">Confidential &amp; Proprietary. Unauthorized distribution prohibited.</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const initialMockDocuments = [
  // 1. IDENTITY CATEGORY
  {
    id: 'doc-aadhaar',
    title: 'Aadhaar Card',
    category: 'Identity',
    guidance: 'Upload front and back side copy of Aadhaar card in a single PDF or clear JPG format.',
    required: true,
    status: 'Verified',
    fileName: 'aadhaar_front_back_verified.pdf',
    fileType: 'application/pdf',
    fileSize: 1485760, // 1.42 MB
    selectedAt: '2026-03-12T10:30:00Z',
    rejectionReason: null,
    file: null,
    previewUrl: createSampleDocPreview(
      'Government of India - Aadhaar Card',
      'Verified',
      'ADH-8921-3490-8812',
      'Biometrics and demographic details verified successfully against UIDAI records.'
    )
  },
  {
    id: 'doc-pan',
    title: 'PAN Card',
    category: 'Identity',
    guidance: 'Clear color scan of permanent account number (PAN) card. Name must match investor records.',
    required: true,
    status: 'Under Review',
    fileName: 'pan_card_original.png',
    fileType: 'image/png',
    fileSize: 842100, // 822 KB
    selectedAt: '2026-03-20T14:15:00Z',
    rejectionReason: null,
    file: null,
    previewUrl: createSampleDocPreview(
      'Permanent Account Number (PAN) Card',
      'Under Review',
      'ABCDE1234F',
      'Income Tax Department credentials currently undergoing manual compliance check.'
    )
  },
  {
    id: 'doc-passport',
    title: 'Passport',
    category: 'Identity',
    guidance: 'Front page (photo & biographical details) and address page of valid passport.',
    required: true,
    status: 'Rejected',
    fileName: 'passport_scan_blurred.pdf',
    fileType: 'application/pdf',
    fileSize: 2210400, // 2.11 MB
    selectedAt: '2026-03-18T09:40:00Z',
    rejectionReason: 'The biographical page scan is too blurred, and the expiration date along with machine-readable zone (MRZ) is illegible. Please re-upload a clear 300+ DPI color scan.',
    file: null,
    previewUrl: createSampleDocPreview(
      'International Passport Record',
      'Rejected',
      'Z7890451',
      'REJECTED: Insufficient scan quality. Machine-readable zone obscured by reflection.'
    )
  },

  // 2. FINANCIAL CATEGORY
  {
    id: 'doc-bank-statement',
    title: 'Bank Statement',
    category: 'Financial',
    guidance: 'Last 6 consecutive months bank account statement showing consistent investor liquidity.',
    required: true,
    status: 'Uploaded',
    fileName: 'hdfc_bank_statement_6m.pdf',
    fileType: 'application/pdf',
    fileSize: 3450800, // 3.29 MB
    selectedAt: '2026-03-24T11:20:00Z',
    rejectionReason: null,
    file: null,
    previewUrl: createSampleDocPreview(
      'HDFC Premier Banking 6-Month Statement',
      'Uploaded',
      'STMT-2026-Q1-901',
      'Statement submitted by investor. Pending reviewer examination of source of funds.'
    )
  },
  {
    id: 'doc-income-proof',
    title: 'Income Proof',
    category: 'Financial',
    guidance: 'Salary slips (last 3 months) or certified Chartered Accountant audited income certificate.',
    required: true,
    status: 'Pending',
    fileName: null,
    fileType: null,
    fileSize: null,
    selectedAt: null,
    rejectionReason: null,
    file: null,
    previewUrl: null
  },
  {
    id: 'doc-tax-return',
    title: 'Tax Return',
    category: 'Financial',
    guidance: 'Income Tax Return (ITR-V) acknowledgement for the latest completed assessment year.',
    required: true,
    status: 'Pending',
    fileName: null,
    fileType: null,
    fileSize: null,
    selectedAt: null,
    rejectionReason: null,
    file: null,
    previewUrl: null
  },

  // 3. IMMIGRATION CATEGORY
  {
    id: 'doc-visa',
    title: 'Visa Document',
    category: 'Immigration',
    guidance: 'Valid Investor/Business Visa endorsement or active long-term residency permit copy.',
    required: true,
    status: 'Verified',
    fileName: 'investor_visa_endorsement.pdf',
    fileType: 'application/pdf',
    fileSize: 1845120, // 1.76 MB
    selectedAt: '2026-03-10T16:05:00Z',
    rejectionReason: null,
    file: null,
    previewUrl: createSampleDocPreview(
      'Immigration & Investor Visa Endorsement',
      'Verified',
      'VISA-INV-2026-88',
      'Cross-border investment visa validated with immigration registry and active until 2030.'
    )
  },
  {
    id: 'doc-address-proof',
    title: 'Address Proof',
    category: 'Immigration',
    guidance: 'Utility bill (electricity, water, broadband) or registered lease agreement under 3 months old.',
    required: true,
    status: 'Uploaded',
    fileName: 'electricity_utility_bill.png',
    fileType: 'image/png',
    fileSize: 940250, // 918 KB
    selectedAt: '2026-03-24T15:45:00Z',
    rejectionReason: null,
    file: null,
    previewUrl: createSampleDocPreview(
      'Residential Address Verification Bill',
      'Uploaded',
      'UTIL-ELEC-44091',
      'Proof of residence submitted. Verification queue waiting for address match with KYC.'
    )
  }
];

export default initialMockDocuments;
