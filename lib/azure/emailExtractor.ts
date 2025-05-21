/**
 * Extracts email from Azure AD userPrincipalName (UPN)
 * Handles various formats including:
 * - Regular UPNs (user@domain.com)
 * - Guest users (user_domain.com#EXT#@tenant.onmicrosoft.com)
 * - Legacy format (user_domain_com)
 */
export function extractEmailFromUPN(upn: string): string | null {
  if (!upn) return null;

  // Basic email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // If it's already a valid email, return it
  if (emailRegex.test(upn)) {
    return upn;
  }

  try {
    // Handle guest user format (contains #EXT#)
    if (upn.includes('#EXT#')) {
      // Extract the part before #EXT#
      const originalEmail = upn.split('#EXT#')[0];

      // Replace the last underscore with @ if it exists
      const lastUnderscoreIndex = originalEmail.lastIndexOf('_');
      if (lastUnderscoreIndex !== -1) {
        const reconstructedEmail =
          originalEmail.substring(0, lastUnderscoreIndex) +
          '@' +
          originalEmail.substring(lastUnderscoreIndex + 1);

        // Validate and return the reconstructed email
        if (emailRegex.test(reconstructedEmail)) {
          return reconstructedEmail;
        }
      }

      // If we can't reconstruct it properly, try to extract from the original part
      if (originalEmail.includes('@')) {
        return originalEmail;
      }
    }

    // Handle legacy format (user_domain_com)
    const parts = upn.split('_');
    if (parts.length >= 2) {
      // Try to reconstruct email by replacing the last underscore with @
      const lastUnderscoreIndex = upn.lastIndexOf('_');
      const reconstructedEmail =
        upn.substring(0, lastUnderscoreIndex) +
        '@' +
        upn.substring(lastUnderscoreIndex + 1);

      if (emailRegex.test(reconstructedEmail)) {
        return reconstructedEmail;
      }
    }

    // If UPN contains @ but didn't pass regex (might have valid but unusual format)
    if (upn.includes('@')) {
      const [localPart, domain] = upn.split('@');
      if (localPart && domain) {
        // Clean up any remaining underscores in local part
        const cleanLocalPart = localPart.replace(/_/g, '.');
        const cleanDomain = domain.split('#')[0]; // Remove any trailing artifacts
        const cleanEmail = `${cleanLocalPart}@${cleanDomain}`;

        if (emailRegex.test(cleanEmail)) {
          return cleanEmail;
        }
      }
    }

    // If all reconstruction attempts fail, return null
    return null;
  } catch (error) {
    console.error('Error extracting email from UPN:', error);
    return null;
  }
}
