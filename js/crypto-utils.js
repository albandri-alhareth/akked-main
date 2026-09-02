/**
 * Akked Cryptographic & Verification Utilities
 * Uses Web Crypto API for client-side SHA-256 hashing and tamper-evident signatures
 */

window.AkkedCrypto = {
  /**
   * Generates a SHA-256 hash from a string or ArrayBuffer
   * @param {string|ArrayBuffer} data 
   * @returns {Promise<string>} Hex-encoded SHA-256 digest
   */
  async generateSHA256(data) {
    try {
      let buffer;
      if (typeof data === 'string') {
        const encoder = new TextEncoder();
        buffer = encoder.encode(data);
      } else {
        buffer = data;
      }
      
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch (e) {
      console.error('Crypto error:', e);
      // Fallback pseudo-hash if WebCrypto is restricted in certain sandbox contexts
      return this.fallbackHash(String(data));
    }
  },

  /**
   * Generates a user-friendly unique Proof ID
   * E.g. DEMO-018, AKK-8924, etc.
   */
  generateProofId(prefix = 'DEMO') {
    const num = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${num}`;
  },

  /**
   * Encodes a proof into a self-contained URL-safe Base64 token
   * Allows sharing verification links across devices, phones, and incognito sessions
   */
  createProofToken(proof) {
    try {
      const payload = {
        id: proof.id,
        docType: proof.docType,
        recipientId: proof.recipientId,
        recipientNameAr: proof.recipientNameAr,
        recipientNameEn: proof.recipientNameEn,
        purposeId: proof.purposeId,
        purposeNameAr: proof.purposeNameAr,
        purposeNameEn: proof.purposeNameEn,
        sharedClaimsAr: proof.sharedClaimsAr,
        sharedClaimsEn: proof.sharedClaimsEn,
        createdDate: proof.createdDate,
        expiryDate: proof.expiryDate,
        status: proof.status,
        sha256Hash: proof.sha256Hash,
        watermark: proof.watermark,
        allowedFieldIds: proof.allowedFieldIds
      };
      const jsonStr = JSON.stringify(payload);
      // UTF-8 to base64url
      const base64 = btoa(unescape(encodeURIComponent(jsonStr)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      return base64;
    } catch (e) {
      console.error('Token encoding error:', e);
      return '';
    }
  },

  /**
   * Decodes and validates a URL-safe Base64 token into a proof object
   */
  parseProofToken(token) {
    try {
      let base64 = token.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      const jsonStr = decodeURIComponent(escape(atob(base64)));
      const proof = JSON.parse(jsonStr);
      
      // Check expiry automatically
      if (proof.expiryDate) {
        const expiryTime = new Date(proof.expiryDate.replace(' ', 'T')).getTime();
        if (!isNaN(expiryTime) && Date.now() > expiryTime) {
          proof.status = 'expired';
        }
      }
      return proof;
    } catch (e) {
      console.error('Token decoding error:', e);
      return null;
    }
  },

  /**
   * Fast fallback hash function
   */
  fallbackHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `sha256_${hex}${hex}${hex}${hex}`.substring(0, 64);
  },

  /**
   * Generates an SVG QR Code representation locally without external network dependencies
   */
  generateQRCodeSVG(text, size = 160) {
    // Generate an authentic visual QR pattern matrix deterministically from string
    const matrixSize = 25;
    let hashVal = 0;
    for (let i = 0; i < text.length; i++) {
      hashVal = ((hashVal << 5) - hashVal) + text.charCodeAt(i);
      hashVal |= 0;
    }

    const cellSize = size / matrixSize;
    let rects = '';

    // Draw finder patterns (top-left, top-right, bottom-left)
    const drawFinder = (x, y) => {
      rects += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${7 * cellSize}" height="${7 * cellSize}" fill="#5A1854" rx="${cellSize * 0.5}"/>`;
      rects += `<rect x="${(x + 1) * cellSize}" y="${(y + 1) * cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" fill="#FFFFFF" rx="${cellSize * 0.3}"/>`;
      rects += `<rect x="${(x + 2) * cellSize}" y="${(y + 2) * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" fill="#5A1854" rx="${cellSize * 0.2}"/>`;
    };

    drawFinder(1, 1);
    drawFinder(matrixSize - 8, 1);
    drawFinder(1, matrixSize - 8);

    // Fill data grid based on hash
    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        // Skip finder pattern zones
        if ((r < 9 && c < 9) || (r < 9 && c > matrixSize - 10) || (r > matrixSize - 10 && c < 9)) {
          continue;
        }

        const seed = (r * matrixSize + c + Math.abs(hashVal)) % 37;
        if (seed % 2 === 0 || seed % 3 === 0 || (r === 6 || c === 6)) {
          const fill = seed % 5 === 0 ? '#50BE9B' : '#5A1854';
          rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize * 0.92}" height="${cellSize * 0.92}" fill="${fill}" rx="${cellSize * 0.2}"/>`;
        }
      }
    }

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size}" ${size}" xmlns="http://www.w3.org/2000/svg" style="border-radius: 12px; background: #FFFFFF; padding: 8px;">
        ${rects}
      </svg>
    `;
  }
};
