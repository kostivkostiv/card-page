export type CardBrand = "visa" | "mastercard" | "amex";

export type Card = {
	id: string;
	brand: "visa" | "mastercard" | "amex";
	last4: string;
	isDefault: boolean;
};
