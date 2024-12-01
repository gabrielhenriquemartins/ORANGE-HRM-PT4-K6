export function extractToken(responseBody) {
    const regex = /:token="&quot;([^"]+)/;
    const match = String(responseBody).match(regex);
    return match ? match[1].replace(/&quot;/g, '') : null;
}
