import { Button } from '@/components';

export const LoginForm = () => {
	return (
		<div className="w-96">
			<h1 className="text-2xl font-semibold mb-4">Login</h1>
			<form>
				{/* Username Input */}
				<div className="mb-4">
					<label className="block text-gray-600">Correo</label>
					<input
						type="email"
						name="email"
						className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
						autoComplete="off"
					/>
				</div>
				{/* Password Input */}
				<div className="mb-4">
					<label className="block text-gray-600">Contraseña</label>
					<input
						type="password"
						name="password"
						className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
						autoComplete="off"
					/>
				</div>
				{/* Remember Me Checkbox */}
				<div className="mb-4 flex items-center">
					<input type="checkbox" name="rememberMe" className="text-blue-500" />
					<label className="text-gray-600 ml-2">Recordar usuario</label>
				</div>
				{/* Login Button */}
				<LoginButton />
			</form>
		</div>
	);
};

function LoginButton({ isSubmitting }: { isSubmitting?: boolean }) {
	return (
		<Button type="submit" className="w-full">
			Iniciar
		</Button>
	);
}
