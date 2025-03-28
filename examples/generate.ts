import { CAT, CommonAccessTokenRenewal } from '@eyevinn/cat';

async function main() {
  const generator = new CAT({
    keys: {
      Symmetric256: Buffer.from(
        '403697de87af64611c1d32a05dab0fe1fcb715a86ab435f1ec99192d79569388',
        'hex'
      )
    }
  });
  const base64encoded = await generator.generate(
    {
      iss: process.env.ISSUER || 'compose',
      sub: 'jonas',
      aud: 'one',
      exp: Math.floor(Date.now() / 1000) + 60,
      iat: Math.floor(Date.now() / 1000),
      catr: CommonAccessTokenRenewal.fromDict({
        type: 'header',
        'header-name': 'cta-common-access-token',
        expadd: 120,
        deadline: 30
      }).payload
    },
    {
      type: 'mac',
      alg: 'HS256',
      kid: 'Symmetric256',
      generateCwtId: true // automatically generate a random CWT Id (cti) claim (default: false)
    }
  );
  console.log(base64encoded);
}

main();
