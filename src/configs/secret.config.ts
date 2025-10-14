import { registerAs } from '@nestjs/config';

export default registerAs('secrets', () => {
  return {
    jwt: process.env.JWT_SECRET,
  };
});
