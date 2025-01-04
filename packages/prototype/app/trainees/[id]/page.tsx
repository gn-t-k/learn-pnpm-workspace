"use client";

import { TrainingHeatmap } from "@/components/TrainingHeatmap";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import { useState } from "react";
import { UserInfo } from "./_components/user-info";

export default function TraineePage() {
	const { id } = useParams();
	const { isAuthenticated, isLoading, logout } = useAuth();
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	// 仮のユーザーデータ（実際のアプリケーションではAPIから取得します）
	const user = {
		id: id,
		username: "トレーニー太郎",
		avatarUrl: "/placeholder.svg?height=100&width=100",
		trainingData: [
			{ date: "2025-06-01", count: 2 },
			{ date: "2025-06-03", count: 1 },
			{ date: "2025-06-05", count: 3 },
			{ date: "2025-06-07", count: 2 },
			{ date: "2025-06-10", count: 4 },
			// ... 必要に応じて他の日付とカウントを追加
		],
	};

	if (isLoading) {
		return <div>読み込み中...</div>;
	}

	const handleLogout = () => {
		logout();
		// ログアウト後のリダイレクト処理をここに追加
	};

	const handleDeleteAccount = () => {
		// アカウント削除の処理をここに実装
		console.log("アカウントを削除しました");
		setIsDeleteDialogOpen(false);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<UserInfo username={user.username} avatarUrl={user.avatarUrl} />
			<TrainingHeatmap trainingData={user.trainingData} />

			{true && (
				<div className="mt-8 space-y-4">
					<Button onClick={handleLogout} variant="outline">
						ログアウト
					</Button>
					<div>
						<AlertDialog
							open={isDeleteDialogOpen}
							onOpenChange={setIsDeleteDialogOpen}
						>
							<AlertDialogTrigger asChild>
								<Button variant="destructive">アカウントを削除</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										本当にアカウントを削除しますか？
									</AlertDialogTitle>
									<AlertDialogDescription>
										この操作は取り消せません。すべてのデータが永久に削除されます。
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>キャンセル</AlertDialogCancel>
									<AlertDialogAction onClick={handleDeleteAccount}>
										削除する
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>
			)}
		</div>
	);
}
