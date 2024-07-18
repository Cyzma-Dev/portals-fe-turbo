export const checkPermission = (
	permission: Record<string, string[]>,
	requiredPermission: string[]
): boolean => {
	return requiredPermission.every(x => {
		const permissionPath = x.split('.');
		if (permissionPath.length > 1 && permission[permissionPath[0]]) {
			return (permission[permissionPath[0]] || []).some(
				x => x.indexOf(permissionPath[1]) > -1
			);
		}
		return false;
	});
};