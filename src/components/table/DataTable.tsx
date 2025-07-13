import { Button } from "@/components/ui/button";
import type { Card } from "@/types/card";
import type { Dispatch, SetStateAction } from "react";
import { brandLogos } from "@/data/mockCards";
import { CircleCheckBig, CircleCheckIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

type Props = {
	data: Card[];
	setData: Dispatch<SetStateAction<Card[]>>;
};

export const DataTable = ({ data, setData }: Props) => {
	const handleDelete = (id: string) => {
		setData((previous) => previous.filter((card) => card.id !== id));
	};

	const handleSetDefault = (id: string) => {
		setData((prev) =>
			prev.map((card) => ({
				...card,
				isDefault: card.id === id,
			}))
		);
	};

	return (
		<div className="bg-gray-100 dark:bg-gray-900 ">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Brand</TableHead>
						<TableHead>Last 4 Digits</TableHead>
						<TableHead>Default</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.length === 0 ? (
						<TableRow>
							<TableCell colSpan={4} className="text-center py-8">
								<div className="flex flex-col items-center gap-2">
									<p className="animate-pulse">No cards available.</p>
								</div>
							</TableCell>
						</TableRow>
					) : (
						data.map((card) => (
							<TableRow key={card.id}>
								<TableCell className="font-medium">
									<img
										className="w-20 h-15 object-contain"
										src={brandLogos[card.brand]}
										alt={`${card.brand} logo`}
									/>
								</TableCell>
								<TableCell>{card.last4}</TableCell>

								<TableCell className="cursor-default">
									<AnimatePresence mode="wait">
										{card.isDefault ? (
											<motion.div
												key="default"
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.8 }}
												transition={{ duration: 0.2 }}
											>
												<CircleCheckBig
													size={36}
													strokeWidth={2}
													className="text-green-600"
												/>
											</motion.div>
										) : (
											<motion.div
												key="not-default"
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.8 }}
												transition={{ duration: 0.2 }}
											>
												<Button
													onClick={() => handleSetDefault(card.id)}
													size="icon"
													variant="outline"
												>
													<CircleCheckIcon size={36} strokeWidth={2} />
												</Button>
											</motion.div>
										)}
									</AnimatePresence>
								</TableCell>

								<TableCell className=" gap-2">
									<Button
										className="cursor-pointer items-center"
										variant="destructive"
										onClick={() => handleDelete(card.id)}
									>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
};
