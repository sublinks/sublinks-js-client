

export interface Login {
  username_or_email: string;
  password: string;
  totp_2fa_token?: string;
}
