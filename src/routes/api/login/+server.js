import { json } from '@sveltejs/kit';

const API_BASE_URL = 'http://localhost:8080';

export async function POST({ request, cookies }) {
    const { username, password } = await request.json();

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return json({ error: errorData.error || 'Login failed' }, { status: response.status });
        }

        const data = await response.json();

        cookies.set('auth_token', data.token, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
        });

        return json(data);
    } catch (error) {
        console.error('Login error:', error);
        return json({ error: 'An internal error occurred' }, { status: 500 });
    }
}