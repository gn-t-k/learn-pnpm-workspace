import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface TrainingHeatmapProps {
	trainingData: { date: string; count: number }[];
}

const colorLevels = [
	"bg-primary/10",
	"bg-primary/30",
	"bg-primary/50",
	"bg-primary/70",
	"bg-primary/90",
];

function getColorLevel(count: number): string {
	if (count === 0) return "bg-muted";
	if (count <= 1) return colorLevels[0];
	if (count <= 2) return colorLevels[1];
	if (count <= 3) return colorLevels[2];
	if (count <= 4) return colorLevels[3];
	return colorLevels[4];
}

export function TrainingHeatmap({ trainingData }: TrainingHeatmapProps) {
	const [currentYear] = useState(new Date().getFullYear());
	const startDate = new Date(currentYear, 0, 1);
	const endDate = new Date(currentYear, 11, 31);

	const daysInYear = Math.round(
		(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
	);
	const weeks = Math.ceil(daysInYear / 7);

	const trainingMap = new Map(
		trainingData.map((item) => [item.date, item.count]),
	);

	const heatmapData = Array.from({ length: daysInYear }, (_, index) => {
		const date = new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000);
		const dateString = date.toISOString().split("T")[0];
		return {
			date: dateString,
			count: trainingMap.get(dateString) || 0,
		};
	});

	return (
		<div className="mt-4">
			<h3 className="text-lg font-semibold mb-2">トレーニング頻度</h3>
			<div className="overflow-x-auto">
				<TooltipProvider>
					<div
						className="inline-grid grid-rows-7 gap-1"
						style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}
					>
						{Array.from({ length: weeks * 7 }).map((_, index) => {
							const dayIndex = index % 7;
							const weekIndex = Math.floor(index / 7);
							const dataIndex = weekIndex * 7 + dayIndex;
							const dayData = heatmapData[dataIndex];

							if (!dayData) return <div key={index} className="w-3 h-3" />;

							return (
								<Tooltip key={index}>
									<TooltipTrigger asChild>
										<div
											className={`w-3 h-3 rounded-sm ${getColorLevel(dayData.count)}`}
										/>
									</TooltipTrigger>
									<TooltipContent>
										<p>{dayData.date}</p>
										<p>{dayData.count}回のトレーニング</p>
									</TooltipContent>
								</Tooltip>
							);
						})}
					</div>
				</TooltipProvider>
			</div>
		</div>
	);
}
