import { Outlet, createRootRoute } from '@tanstack/react-router';
import { AuthProvider } from '../auth/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const Route = createRootRoute({
	component: () => (
		<div className="flex flex-col min-h-screen">
			<AuthProvider>
				<Header />
				<div className="flex-grow">
					<Outlet />
				</div>
			</AuthProvider>
			<Footer />
		</div>
	  ),
});




/*
flex flex-col min-h-screen --> ensures that the container 
takes up at least 100% of the viewport height and uses flexbox for layout.

flex-grow --> ensures that the main content area grows to take up the available space, 
pushing the footer to the bottom.
*/