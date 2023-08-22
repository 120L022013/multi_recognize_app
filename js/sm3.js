function test(){
	const message = 'Hello, world!';
	const hash = sm3Hash(message);
	console.log('SM3 Hash:', hash);
}

function sm3Hash(message) {
	function leftRotate(x, n) {
		return (x << n) | (x >>> (32 - n));
	}
			
	function padding(message) {
		const length = message.length * 8;
		message.push(0x80);
	
		while ((message.length * 8) % 512 !== 448) {
		message.push(0x00);
	}
			
			    message.push((length >> 24) & 0xFF);
			    message.push((length >> 16) & 0xFF);
			    message.push((length >> 8) & 0xFF);
			    message.push(length & 0xFF);
			  }
			
			  function processBlock(block) {
			    const W = new Array(68);
			    const V = new Array(8);
			    const T = new Array(64);
			
			    for (let i = 0; i < 16; i++) {
			      W[i] = (block[i * 4] << 24) | (block[i * 4 + 1] << 16) | (block[i * 4 + 2] << 8) | block[i * 4 + 3];
			    }
			
			    for (let i = 16; i < 68; i++) {
			      const tmp = W[i - 16] ^ W[i - 9] ^ leftRotate(W[i - 3], 15);
			      W[i] = leftRotate(tmp, 1);
			    }
			
			    for (let i = 0; i < 64; i++) {
			      T[i] = (0x79CC4519 << 32) | (0x7A879D8A);
			    }
			
			    for (let i = 0; i < 64; i++) {
			      const SS1 = leftRotate((leftRotate(V[0], 12) + V[4] + leftRotate(T[i], i)), 7);
			      const SS2 = SS1 ^ leftRotate(V[0], 12);
			      const TT1 = (FF0(V[0], V[1], V[2]) + V[3] + SS2 + W[i]) >>> 0;
			      const TT2 = (FF1(V[4], V[5], V[6]) + V[7] + SS1 + W[i]) >>> 0;
			
			      V[3] = V[2];
			      V[2] = leftRotate(V[1], 9);
			      V[1] = V[0];
			      V[0] = TT1;
			      V[7] = V[6];
			      V[6] = leftRotate(V[5], 19);
			      V[5] = V[4];
			      V[4] = P0(TT2);
			    }
			
			    for (let i = 0; i < 8; i++) {
			      V[i] = (V[i] + block[i]) >>> 0;
			    }
			
			    return V;
			  }
			
			  function FF0(X, Y, Z) {
			    return X ^ Y ^ Z;
			  }
			
			  function FF1(X, Y, Z) {
			    return (X & Y) | (X & Z) | (Y & Z);
			  }
			
			  function P0(X) {
			    return X ^ leftRotate(X, 9) ^ leftRotate(X, 17);
			  }
			
			  const messageBytes = [];
			  for (let i = 0; i < message.length; i++) {
			    messageBytes.push(message.charCodeAt(i));
			  }
			
			  padding(messageBytes);
			
			  const blocks = [];
			  for (let i = 0; i < messageBytes.length / 64; i++) {
			    const block = messageBytes.slice(i * 64, (i + 1) * 64);
			    blocks.push(block);
			  }
			
			  let V = [
			    0x7380166F, 0x4914B2B9, 0x172442D7, 0xDA8A0600,
			    0xA96F30BC, 0x163138AA, 0xE38DEE4D, 0xB0FB0E4E
			  ];
			
			  for (let i = 0; i < blocks.length; i++) {
			    const block = blocks[i];
			    const VPrime = processBlock(block);
			
			    for (let j = 0; j < 8; j++) {
			      V[j] = (V[j] ^ VPrime[j]) >>> 0;
			    }
			  }
			
			  let hashHex = '';
			  for (let i = 0; i < 8; i++) {
			    hashHex += V[i].toString(16).padStart(8, '0');
			  }
			
			  return hashHex;
}