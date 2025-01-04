import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserInfoProps {
	username: string;
	avatarUrl: string;
}

export function UserInfo({ username, avatarUrl }: UserInfoProps) {
	return (
		<div className="flex items-center space-x-4">
			<Avatar className="w-20 h-20">
				<AvatarImage src={avatarUrl} alt={username} />
				<AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
			</Avatar>
			<h2 className="text-2xl font-bold">{username}</h2>
		</div>
	);
}
