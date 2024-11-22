import { Outlet, createRootRoute } from '@tanstack/react-router';
import { AuthProvider } from '../auth/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const Route = createRootRoute({
	// component: () => <Outlet />,
	component: () => (
		<>
			<AuthProvider>
				<Header />
				<Outlet />
			</AuthProvider>
			<Footer />
		</>
	),
});
