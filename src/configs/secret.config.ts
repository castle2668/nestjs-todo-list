import { registerAs } from '@nestjs/config';

export default registerAs('secret', () => {
  return {
    jwt: process.env.JWT_SECRET,
  };
});
