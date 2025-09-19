import { redirect } from '@sveltejs/kit';
import { decode } from 'jsonwebtoken';

export async function load({ cookies }) {
    const token = cookies.get('auth_token');

    if (!token) {
        throw redirect(307, '/login');
    }

    try {
        const user = decode(token);
        if (!user) {
            throw redirect(307, '/login');
        }
        return { user };
    } catch (error) {
        console.error('Invalid token:', error);
        throw redirect(307, '/login');
    }
}