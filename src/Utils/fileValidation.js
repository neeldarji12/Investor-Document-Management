/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Utils/fileValidation.js
 * 
 * Provides file type and size validation logic, human-friendly size formatters,
 * and MIME type checks for secure and compliant document uploads.
 */

// Maximum allowed file size in bytes: 5 Megabytes
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5,242,880 bytes

// Allowed MIME types
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png'
];

// Allowed extensions for checking filename extension fallback
export const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];

/**
 * Validates a selected File object against allowed types and maximum 5MB size.
 * @param {File} file - The file to validate.
 * @returns {{ isValid: boolean, error: string | null }}
 */
export const validateFile = (file) => {
  if (!file) {
    return {
      isValid: false,
      error: 'No file selected. Please select a valid document.'
    };
  }

  // 1. Validate File Size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const fileSizeFormatted = formatFileSize(file.size);
    return {
      isValid: false,
      error: `File size exceeds the 5 MB limit (Selected: ${fileSizeFormatted}). Please compress or choose a smaller file.`
    };
  }

  if (file.size === 0) {
    return {
      isValid: false,
      error: 'Selected file is empty (0 bytes). Please upload a valid document.'
    };
  }

  // 2. Validate MIME type or extension
  const fileType = file.type ? file.type.toLowerCase() : '';
  const fileName = file.name ? file.name.toLowerCase() : '';
  
  const hasValidMime = ALLOWED_MIME_TYPES.includes(fileType);
  const hasValidExt = ALLOWED_FILE_EXTENSIONS.some(ext => fileName.endsWith(ext));

  if (!hasValidMime && !hasValidExt) {
    return {
      isValid: false,
      error: 'Unsupported file format. Please upload PDF, JPG, JPEG, or PNG files only.'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Converts a raw byte number into a readable human format (KB, MB).
 * @param {number|null} bytes
 * @returns {string} Formatted string, e.g. "2.4 MB" or "450 KB"
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0 || bytes === null || bytes === undefined) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${formatted} ${sizes[i]}`;
};

/**
 * Checks whether the given MIME type or file name corresponds to a PDF.
 * @param {string} fileType
 * @param {string} fileName
 * @returns {boolean}
 */
export const isPdfFile = (fileType, fileName = '') => {
  if (fileType && fileType.toLowerCase().includes('pdf')) return true;
  if (fileName && fileName.toLowerCase().endsWith('.pdf')) return true;
  return false;
};

/**
 * Checks whether the given MIME type or file name corresponds to an Image (JPG/PNG).
 * @param {string} fileType
 * @param {string} fileName
 * @returns {boolean}
 */
export const isImageFile = (fileType, fileName = '') => {
  if (fileType && (fileType.toLowerCase().includes('image') || fileType.toLowerCase().includes('jpeg') || fileType.toLowerCase().includes('png'))) {
    return true;
  }
  const lowerName = (fileName || '').toLowerCase();
  return lowerName.endsWith('.png') || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg');
};

/**
 * Returns a friendly badge/label for the file type.
 * @param {string} fileType
 * @param {string} fileName
 * @returns {string}
 */
export const getFileTypeBadge = (fileType, fileName = '') => {
  if (isPdfFile(fileType, fileName)) return 'PDF Document';
  if (isImageFile(fileType, fileName)) return 'Image File';
  return 'Document';
};
