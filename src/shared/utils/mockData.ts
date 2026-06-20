export interface MockUser {
	email: string;
	password: string;
}

export interface MockOTP {
	email: string;
	OTP: string;
}

export const mockUsers: MockUser[] = [
	{ email: "test@pulsify.com", password: "password123" },
];

export const mockOTP: MockOTP[] = [{ email: "test@pulsify.com", OTP: "123456" }];
