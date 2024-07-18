import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserService } from '../utility/service/userService';
import { ILocalUser } from '../common-props';
interface IProps {
	isAuthenticated: boolean | null;
	user: ILocalUser | null;
	login?: (item: ILocalUser) => void;
	logout?: () => void;
	loading: boolean;
}

const AuthContext = createContext<IProps>({
	isAuthenticated: null,
	user: null,
	loading: false
});

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const [user, setUser] = useState<ILocalUser | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadToken = () => {
			setIsAuthenticated(UserService.isLoggedIn());
			setUser(UserService.getLocally());
			setLoading(false);
		};
		loadToken();
	}, []);

	const login = (data: ILocalUser) => {
		setIsAuthenticated(true);
		setUser(data);
	};

	const logout = () => {
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{ user, loading, isAuthenticated, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const AuthHook = () => useContext(AuthContext);

interface ProtectRouteProps {
	children: JSX.Element;
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
	const { isAuthenticated, loading } = AuthHook();
	if (loading) {
		return null;
	}

	if (!isAuthenticated) {
		return (
			<Navigate
				to={{
					pathname: '/login',
					search: `?return=${window.location.pathname}`
				}}
			/>
		);
	}

	return children;
};
