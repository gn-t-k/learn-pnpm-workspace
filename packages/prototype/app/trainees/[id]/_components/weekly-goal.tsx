import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface WeeklyGoalProps {
	trainingData: { date: string; count: number }[];
}

export function WeeklyGoal({ trainingData }: WeeklyGoalProps) {
	const [weeklyGoal, setWeeklyGoal] = useState(3);
	const [isEditing, setIsEditing] = useState(false);

	const calculateStreak = () => {
		let streak = 0;
		let currentStreak = 0;
		const sortedData = [...trainingData].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);

		for (let i = 0; i < sortedData.length; i += 7) {
			const weekData = sortedData.slice(i, i + 7);
			const weekTotal = weekData.reduce((sum, day) => sum + day.count, 0);

			if (weekTotal >= weeklyGoal) {
				currentStreak++;
			} else {
				break;
			}
		}

		streak = currentStreak;
		return streak;
	};

	const handleSave = () => {
		setIsEditing(false);
	};

	return (
		<div className="mt-6 mb-6 p-4 border rounded-lg shadow-sm">
			<h3 className="text-lg font-semibold mb-2">週間トレーニング目標</h3>
			{isEditing ? (
				<div className="flex items-center space-x-2">
					<Label htmlFor="weeklyGoal">週</Label>
					<Input
						id="weeklyGoal"
						type="number"
						value={weeklyGoal}
						onChange={(e) => setWeeklyGoal(Number(e.target.value))}
						className="w-20"
					/>
					<Label htmlFor="weeklyGoal">回</Label>
					<Button onClick={handleSave}>保存</Button>
				</div>
			) : (
				<div className="flex items-center justify-between">
					<p>週 {weeklyGoal} 回</p>
					<Button variant="outline" onClick={() => setIsEditing(true)}>
						編集
					</Button>
				</div>
			)}
			<p className="mt-4">現在の連続達成週数: {calculateStreak()} 週</p>
		</div>
	);
}
