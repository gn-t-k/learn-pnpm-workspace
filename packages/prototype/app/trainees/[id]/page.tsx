"use client";

import { TrainingHeatmap } from "@/components/TrainingHeatmap";
import { UserInfo } from "@/components/UserInfo";
import { WeeklyGoal } from "@/components/WeeklyGoal";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function TraineePage() {
	const { id } = useParams();
	const { isAuthenticated, isLoading, logout } = useAuth();
	const [username, setUsername] = useState("トレーニー太郎");

	// 仮のユーザーデータ（実際のアプリケーションではAPIから取得します）
	const user = {
		id: id,
		username: username,
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
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<UserInfo
				username={user.username}
				avatarUrl={user.avatarUrl}
				onLogout={handleLogout}
				onDeleteAccount={handleDeleteAccount}
			/>
			<WeeklyGoal trainingData={user.trainingData} />
			<TrainingHeatmap trainingData={user.trainingData} />
		</div>
	);
}
