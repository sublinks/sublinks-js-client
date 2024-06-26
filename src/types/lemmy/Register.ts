

export interface Register {
  username: string;
  password: string;
  password_verify: string;
  show_nsfw: boolean;
  email?: string;
  captcha_uuid?: string;
  captcha_answer?: string;
  honeypot?: string;
  answer?: string;
}
