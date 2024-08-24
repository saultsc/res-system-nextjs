'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logout = (): void => {
	cookies().set('token', '', {
		expires: new Date(0),
		httpOnly: true,
		maxAge: 0,
	});

	redirect('/auth/login');
};
