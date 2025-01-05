import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface UserInfoProps {
	username: string;
	avatarUrl: string;
	onLogout: () => void;
	onDeleteAccount: () => void;
}

export function UserInfo({
	username,
	avatarUrl,
	onLogout,
	onDeleteAccount,
}: UserInfoProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedUsername, setEditedUsername] = useState(username);

	const handleSave = () => {
		// ここで実際の保存処理を行う（APIリクエストなど）
		setIsEditing(false);
	};

	return (
		<div className="flex items-center space-x-4">
			<Avatar className="w-20 h-20">
				<AvatarImage src={avatarUrl} alt={username} />
				<AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
			</Avatar>
			<div className="flex items-center space-x-2">
				{isEditing ? (
					<Input
						value={editedUsername}
						onChange={(e) => setEditedUsername(e.target.value)}
						className="text-2xl font-bold"
					/>
				) : (
					<h2 className="text-2xl font-bold">{username}</h2>
				)}
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-48">
						<div className="flex flex-col space-y-2">
							{isEditing ? (
								<Button onClick={handleSave}>保存</Button>
							) : (
								<Button onClick={() => setIsEditing(true)}>名前を編集</Button>
							)}
							<Button onClick={onLogout}>ログアウト</Button>
							<Button variant="destructive" onClick={onDeleteAccount}>
								アカウントを削除
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
