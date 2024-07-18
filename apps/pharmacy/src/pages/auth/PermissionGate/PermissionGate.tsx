import { AuthHook } from '@repo/common/common-library';
import { checkPermission } from './checkPermission';
import { ReactNode } from 'react';

interface IProps {
	requiredPermission: string[];
	children: ReactNode;
}

export const PermissionGate = (props: IProps) => {
	const { user } = AuthHook();
	const hasPermission = checkPermission(
		user?.permission_list || {},
		props.requiredPermission
	);

	return hasPermission ? <>{props.children}</> : null;
};
