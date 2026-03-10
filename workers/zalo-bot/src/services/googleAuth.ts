import { SignJWT, importPKCS8 } from 'jose';

export class GoogleAuthService {
    private clientEmail: string;
    private privateKey: string;

    constructor(clientEmail: string, privateKey: string) {
        this.clientEmail = clientEmail;
        this.privateKey = privateKey;
    }

    async getAccessToken(scopes: string[]): Promise<string> {
        const alg = 'RS256';
        let keyText = this.privateKey;
        // Fix up the private key format if it's missing newlines
        if (!keyText.includes('\n')) {
            keyText = keyText.replace(/\\n/g, '\n');
        }

        const privateKey = await importPKCS8(keyText, alg);

        const now = Math.floor(Date.now() / 1000);
        const claims = {
            iss: this.clientEmail,
            sub: this.clientEmail,
            aud: 'https://oauth2.googleapis.com/token',
            iat: now,
            exp: now + 3600,
            scope: scopes.join(' ')
        };

        const jwt = await new SignJWT(claims)
            .setProtectedHeader({ alg, typ: 'JWT' })
            .sign(privateKey);

        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: jwt
            }).toString()
        });

        const data = await response.json() as any;
        if (!response.ok) {
            throw new Error(`Failed to get Google access token: ${data.error_description || 'Unknown error'}`);
        }

        return data.access_token;
    }
}
